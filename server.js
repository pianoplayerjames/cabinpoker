const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {
  "1": {
    tableName: "Test Room 1",
    currency: "$",
    smallBlind: 2.50,
    bigBlind: 5,
    gameType: "cash",
    gameVariant: "holdem",
    seats: 10,
    actionTimer: 10,
    dealerPosition: 0,
    players: [],
    deck: null,
    flop: null,
    turn: null,
    river: null,
  },
  "2": {
    tableName: "Hourly Arena",
    currency: "$",
    smallBlind: 1,
    bigBlind: 2,
    gameType: "tournament",
    gameVariant: "holdem",
    seats: 2,
    actionTimer: 10,
    dealerPosition: 0,
    players: [],
    deck: null,
    flop: null,
    turn: null,
    river: null,
  },
};

Object.keys(rooms).forEach(roomId => {
  const room = rooms[roomId];
  room.players = new Array(room.seats).fill(null).map((_, index) => ({
    player: null,
    seat: index,
    bankroll: null,
    playing: 0,
    pos: null,
    card1: null,
    card2: null,
  }));
});

const secretKey = process.env.JWT_SECRET;

io.on('connection', (socket) => {

  socket.on('checkRoomExists', (roomId, callback) => {
    const roomExists = rooms.hasOwnProperty(roomId);
    callback(roomExists);
  });

  socket.on('joinRoom', (roomId, callback) => {
    socket.join(roomId);
    callback();
  });

  socket.on('seatPlayer', (roomId, seatIndex, token, callback) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err) {
        callback(false, 'Invalid token');
        return;
      }
      const { userId, username } = decoded;
  
      if(rooms[roomId]) {
        const alreadySeated = rooms[roomId].players.some(playerSlot => playerSlot.player?.userId === userId);
        if(alreadySeated) {
          callback(false, 'User is already seated');
          return;
        }

        const seatOccupied = rooms[roomId].players[seatIndex] && rooms[roomId].players[seatIndex].player !== null;
        if(seatOccupied) {
          callback(false, 'Seat is already occupied');
          return;
        }
  
        const playerData = {
          socketId: socket.id,
          userId,
          player: username,
          seat: seatIndex,
          bankroll: 1000,
          playing: 0,
          pos: null,
          card1: null,
          card2: null,
        };
  
        rooms[roomId].players[seatIndex].player = playerData;

        const seatedPlayersCount = rooms[roomId].players.filter(playerSlot => playerSlot.player !== null).length;
        if(seatedPlayersCount === 2) {
          let timeLeft = rooms[roomId].actionTimer;
          const timerId = setInterval(() => {
            io.to(roomId).emit('updateTimer', timeLeft);
            timeLeft -= 1;
            if(timeLeft < 0) {
              clearInterval(timerId);
              deal(roomId)
            }
          }, 1000);
        }
  
        const playerDataForClients = { ...playerData };
        delete playerDataForClients.userId;
        io.to(roomId).emit('playerSeated', playerDataForClients);
        callback(true, null, playerDataForClients);
      } else {
        callback(false, 'Room does not exist');
      }
    });
  });
  
  
  socket.on('getRoomState', (roomId, token, callback) => {
    const room = rooms[roomId];
    if(!room) {
      callback(null, 'Room does not exist');
      return;
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {

      let roomData = {
        tableName: room.tableName,
        currency: room.currency,
        smallBlind: room.smallBlind,
        bigBlind: room.bigBlind,
        gameType: room.gameType,
        gameVariant: room.gameVariant,
        flop: room.flop || null,
        turn: room.turn || null,
        river: room.river || null,
        players: [],
      };
  
      const userId = decoded ? decoded.userId : null;
  
      room.players.forEach(playerSlot => {
        if(!playerSlot.player) {
          roomData.players.push({
            seat: playerSlot.seat,
            playing: playerSlot.playing,
            pos: playerSlot.pos,
            bankroll: null,
            player: null,
          });
        } else {
          roomData.players.push({
            seat: playerSlot.seat,
            playing: playerSlot.playing,
            pos: playerSlot.pos,
            bankroll: playerSlot.player.bankroll,
            player: {
              username: playerSlot.player.player,
              card1: userId === playerSlot.player.userId ? playerSlot.card1 : null,
              card2: userId === playerSlot.player.userId ? playerSlot.card2 : null,
            },
          });
        }
      });
  
      callback(roomData, null);
    });
  });


  socket.on('playerAction', (roomId, action, amount) => {
    const room = rooms[roomId];
    const playerIndex = room.players.findIndex(p => p.player && p.player.socketId === socket.id);
    if(playerIndex === -1) return;

    clearInterval(room.players[playerIndex].actionTimerId);
    switch(action) {
      case 'fold':
        fold(roomId, socket.id);
        break;
      case 'check':
        check(roomId, socket.id);
        break;
      case 'raise':
        raise(roomId, playerIndex, amount);
        break;
    }
    continueGame(roomId);
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    console.log('Current rooms object:', rooms);
  });
});

function shuffleDeck() {
  const suits = ['h', 'd', 'c', 's'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
  let deck = [];
  
  for(let suit of suits) {
    for(let value of values) {
      deck.push(value + suit);
    }
  }
  
  for(let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

function handlePlayerAction(roomId, playerIndex) {
  const room = rooms[roomId];
  const player = room.players[playerIndex];

  if(player.playing !== 1) {
      const nextPlayerIndex = nextPlayerToAct(room, playerIndex);
      if (nextPlayerIndex !== -1) {
          handlePlayerAction(roomId, nextPlayerIndex);
      }
      return;
  }

  console.log(`It's now the turn of player ${player.player.player} at seat ${player.seat}`);
  let timeLeft = room.actionTimer;
  player.actionTimerId = setInterval(() => {
      timeLeft--;
      io.to(roomId).emit('updateActionTimer', {
          initialTimer: room.actionTimer,
          seat: player.seat,
          timeLeft: timeLeft,
      });

      if(timeLeft <= 0) {
          clearInterval(player.actionTimerId);
          player.actionTimerId = null;
          fold(roomId, player.player.socketId);
      }
  }, 1000);
}

function continueGame(roomId) {
  const room = rooms[roomId];
  const activePlayers = room.players.filter(p => p.playing === 1);

  if(activePlayers.length <= 1) {
      if(activePlayers.length === 1) {
          clearInterval(activePlayers[0].actionTimerId);
          activePlayers[0].actionTimerId = null;
      }
      console.log(`Player ${activePlayers[0]?.player.player} wins the pot!`);
      deal(roomId);
      return;
  }

  const currentPlayerIndex = room.players.findIndex(p => p.actionTimerId);
  if(currentPlayerIndex !== -1) {
      clearInterval(room.players[currentPlayerIndex].actionTimerId);
      room.players[currentPlayerIndex].actionTimerId = null;
  }

  const nextPlayerIndex = nextPlayerToAct(room, currentPlayerIndex);
  if(nextPlayerIndex !== -1) {
      handlePlayerAction(roomId, nextPlayerIndex);
  } else {
      console.error("Failed to find the next player to act.");
  }
}

function broadcastPlayerStatus(roomId) {
  const room = rooms[roomId];
  if(!room) {
    console.error(`Room not found for id: ${roomId}`);
    return;
  }
  io.to(roomId).emit('updatePlayersStatus', room.players.map(player => ({
    seat: player.seat,
    playing: player.playing
  })));
  console.log(`Updating players status in room: ${roomId}`);
}

function nextPlayerToAct(room, currentIndex) {
  let startIndex = currentIndex + 1;
  const count = room.players.length;
  
  // If currentIndex is -1, it means we need to start from the dealer's next player (small blind in heads-up)
  if (currentIndex === -1) {
    // In heads-up, the small blind acts first pre-flop, which is the player right after the dealer
    startIndex = (room.dealerPosition + 1) % count;
  }

  let nextIndex = startIndex;
  do {
    const player = room.players[nextIndex];
    // Check if the player is seated and still active in the game
    if (player.player !== null && player.playing === 1) {
      return nextIndex;
    }
    nextIndex = (nextIndex + 1) % count;
  } while (nextIndex !== startIndex);

  // If no active player is found, return -1
  return -1;
}


function broadcastCards(roomId) {
  const room = rooms[roomId];
  if(!room) {
    console.error(`Room not found for id: ${roomId}`);
    return;
  }
  room.players.forEach(player => {
    if(player.player !== null) {
      io.to(player.player.socketId).emit('dealCards', {
        seat: player.seat,
        card1: player.card1,
        card2: player.card2
      });
      console.log(`Broadcasting dealt cards to player ${player.player.player} at seat ${player.seat}: ${player.card1}, ${player.card2}`);
    }
  });
}

function shiftPositions(roomId) {
  const room = rooms[roomId];
  if (!room) {
    console.error(`Room not found for id: ${roomId}`);
    return;
  }

  let dealerPosition = room.dealerPosition;
  let activePlayers = room.players.filter(player => player.player !== null);

  // Advance the dealer position to the next active player
  do {
    dealerPosition = (dealerPosition + 1) % room.seats;
  } while (room.players[dealerPosition].player === null);

  room.dealerPosition = dealerPosition;

  // Re-assign positions with the updated dealer position
  assignPositions(roomId);
}


function assignPositions(roomId) {
  const room = rooms[roomId];
  if (!room) {
    console.error(`Room not found for id: ${roomId}`);
    return;
  }

  const activePlayers = room.players.filter(player => player.player !== null);
  const count = activePlayers.length;

  let positions;
  switch (count) {
    case 2:
      positions = ['sb', 'bb'];
      break;
    case 3:
      positions = ['btn', 'sb', 'bb'];
      break;
    case 4:
      positions = ['btn', 'sb', 'bb', 'utg'];
      break;
    case 5:
      positions = ['btn', 'sb', 'bb', 'utg', 'co'];
      break;
    case 6:
      positions = ['btn', 'sb', 'bb', 'utg', 'mp', 'co'];
      break;
    case 7:
      positions = ['btn', 'sb', 'bb', 'utg', 'mp', 'mp2', 'co'];
      break;
    case 8:
      positions = ['btn', 'sb', 'bb', 'utg', 'mp1', 'mp2', 'co', 'hj'];
      break;
    case 9:
      positions = ['btn', 'sb', 'bb', 'utg', 'mp1', 'mp2', 'mp3', 'co', 'hj'];
      break;
    case 10:
      positions = ['btn', 'sb', 'bb', 'utg', 'utg+1', 'mp1', 'mp2', 'mp3', 'co', 'hj'];
      break;
    default:
      positions = [];
      break;
  }

  let currentPosition = 0;
  let dealerPosition = room.dealerPosition;

  for (let i = 0; i < room.seats; i++) {
    const playerIndex = (dealerPosition + i) % room.seats;
    const player = room.players[playerIndex];
    if (player.player !== null) {
      player.pos = positions[currentPosition];
      console.log(`Position for player ${player.player.player}: ${player.pos}`);
      currentPosition = (currentPosition + 1) % positions.length;
    }
  }
}


function check(roomId, playerSocketId) {

}

function raise(roomId, playerIndex) {

}

function fold(roomId, playerSocketId) {
  const room = rooms[roomId];
  const playerIndex = room.players.findIndex(player => player.player && player.player.socketId === playerSocketId);
  if(playerIndex === -1) return;

  clearInterval(room.players[playerIndex].actionTimerId);
  room.players[playerIndex].actionTimerId = null;
  room.players[playerIndex].playing = 0;
  room.players[playerIndex].card1 = null;
  room.players[playerIndex].card2 = null;

  io.to(roomId).emit('playerFolded', {
    seat: room.players[playerIndex].seat
  });

  console.log(`Player at seat ${room.players[playerIndex].seat} folded.`);
  continueGame(roomId);
}

function deal(roomId) {
  const room = rooms[roomId];
  if(!room) {
    console.log(`Room not found for id: ${roomId}`);
    return;
  }

  shiftPositions(roomId);

  console.log(`Shuffling deck for room: ${roomId}`);
  room.deck = shuffleDeck();

  console.log(`Dealing cards to players in room: ${roomId}`);
  room.players.forEach(player => {
    if (player.player !== null) {
      player.card1 = room.deck.pop();
      player.card2 = room.deck.pop();
      player.playing = 1;
      console.log(`Player ${player.player.player} dealt: ${player.card1}, ${player.card2}`);
    }
  });

  broadcastCards(roomId);
  assignPositions(roomId);
  broadcastPlayerStatus(roomId);

  const firstToActIndex = nextPlayerToAct(room, -1);
  if(firstToActIndex !== -1) {
    handlePlayerAction(roomId, firstToActIndex);
  } else {
    console.error("No valid player found to start the action.");
  }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));