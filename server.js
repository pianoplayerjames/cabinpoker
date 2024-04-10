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

console.log(rooms);

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
      if (err) {
        callback(false, 'Invalid token');
        return;
      }
      const { userId, username } = decoded;
  
      if(rooms[roomId]) {
        const alreadySeated = rooms[roomId].players.some(playerSlot => playerSlot.player?.userId === userId);
        if (alreadySeated) {
          callback(false, 'User is already seated');
          return;
        }

        const seatOccupied = rooms[roomId].players[seatIndex] && rooms[roomId].players[seatIndex].player !== null;
        if (seatOccupied) {
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
        if (seatedPlayersCount === 2) {
          let timeLeft = 10;
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
    if (!room) {
      callback(null, 'Room does not exist');
      return;
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      let sendData = {
        tableName: room.tableName,
        currency: room.currency,
        smallBlind: room.smallBlind,
        bigBlind: room.bigBlind,
        gameType: room.gameType,
        gameVariant: room.gameVariant,
        players: [],
      };
  
      const userId = decoded ? decoded.userId : null;
  
      room.players.forEach(playerSlot => {
        if (!playerSlot.player) {
          sendData.players.push({
            seat: playerSlot.seat,
            playing: playerSlot.playing,
            pos: playerSlot.pos,
            bankroll: null,
            player: null,
          });
        } else {
          sendData.players.push({
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
  
      callback(sendData, null);
    });
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
  
  for (let suit of suits) {
    for (let value of values) {
      deck.push(value + suit);
    }
  }
  
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

function deal(roomId) {
  const room = rooms[roomId];
  if (!room) return;

  room.deck = shuffleDeck();

  room.players.forEach(player => {
    if (player.player !== null) { // Ensure the player object exists
      player.card1 = room.deck.pop();
      player.card2 = room.deck.pop();
      player.playing = 1; // Mark the player as actively playing
      
      // Emit the dealt cards to the specific player
      io.to(player.player.socketId).emit('dealCards', {
        seat: player.seat,
        card1: player.card1,
        card2: player.card2
      });
    }
  });

  // Notify all clients in the room about the updated playing status
  io.to(roomId).emit('updatePlayersStatus', room.players.map(player => ({
    seat: player.seat,
    playing: player.playing
  })));
}


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));