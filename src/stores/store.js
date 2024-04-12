import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    roomExists: false,
    roomId: null,
    toAct: null,
    initialTimer: null,
    actionTimer: null,
    timer: null,
    tableName: null,
    currency: null,
    smallBlind: null,
    bigBlind: null,
    flop: null,
    turn: null,
    river: null,
    gameType: null,
    gameVariant: null,
    playerAction: 0,
    players: []
  }),
  actions: {
    async checkRoomExists(roomId, socket) {
      return new Promise((resolve) => {
        socket.emit('checkRoomExists', parseInt(roomId), (exists) => {
          this.roomExists = exists;
          if(exists) {
            this.setRoomId(roomId);
          }
          resolve(exists);
        });
      });
    },
    async getRoomState(roomId, socket, token = null) {
      return new Promise((resolve) => {
        socket.emit('getRoomState', roomId, token, async (data, error) => {
          if(error) {
            resolve(null);
            return;
          }
    
          console.log(data);
      
          if(data) {
            this.tableName = data.tableName || this.tableName;
            this.currency = data.currency || this.currency;
            this.smallBlind = data.smallBlind || this.smallBlind;
            this.bigBlind = data.bigBlind || this.bigBlind;
            this.gameType = data.gameType || this.gameType;
            this.gameVariant = data.gameVariant || this.gameVariant;
            this.flop = data.flop || this.flop;
            this.turn = data.turn || this.turn;
            this.river = data.river || this.river;
    
            this.players = data.players.map(seat => {
              if(seat.player) {
                return {
                  ...seat,
                  player: seat.player.username,
                  bankroll: seat.bankroll || seat.player.bankroll,
                  card1: seat.player.card1,
                  card2: seat.player.card2,
                };
              } else {
                return {
                  ...seat,
                  player: null,
                  bankroll: null,
                  card1: null,
                  card2: null,
                };
              }
            });
            resolve(data);
          } else {
            resolve(null);
          }
        });
      });
    },
    playerSeated(playerData) {
      const seatIndex = playerData.seat;
      if(seatIndex !== undefined && this.players[seatIndex]) {
        this.players[seatIndex] = {
          ...this.players[seatIndex],
          ...playerData,
          player: playerData.player
        };
      } else {
        console.error('Tried to seat a player in an invalid or occupied seat');
      }
    },
    holeCards(seat, cards) {
      const playerIndex = this.players.findIndex(player => player.seat === seat);
      if(playerIndex !== -1) {
        this.players[playerIndex] = {
          ...this.players[playerIndex],
          card1: cards.card1,
          card2: cards.card2,
        };
      } else {
        console.error(`Player not found at seat ${seat}`);
      }
    },
    startActionTimer(seat, duration) {
      this.toAct = seat;
      this.actionTimer = duration;
      this.initialTimer = duration; // Ensure this is only set once per turn/start
    },
    updateActionTimer(initialTimer, seat, timeLeft) {
      this.initialTimer = initialTimer;
      this.actionTimer = timeLeft;
      this.toAct = seat;
    },
    clearActionTimer() {
      this.actionTimer = null;
    },
    setToAct(seat) {
      this.toAct = seat;
      this.actionTimer = this.initialTimer;
    },
    setFlop(flop) {
      this.flop = flop;
    },
    setTurn(turn) {
      this.turn = turn;
    },
    setRiver(river) {
      this.river = river;
    },
    setRoomId(roomId) {
      this.roomId = roomId;
    },
    updateTimer(timerValue) {
      if (timerValue <= 0) {
        this.timer = null;
      } else {
        this.timer = timerValue;
      }
    },
    playerFolded(seat) {
      // Find the player at the specified seat
      const playerIndex = this.players.findIndex(player => player.seat === seat);
      if (playerIndex !== -1) {
        // Set the cards to null and update other necessary state fields
        this.players[playerIndex].card1 = null;
        this.players[playerIndex].card2 = null;
        // Assuming 'playing' field indicates whether the player is active in the current round
        this.players[playerIndex].playing = 0;
    
        // Optionally, update UI or handle other changes that should occur when a player folds
        // For example, you might want to emit an event or log this action
        console.log(`Player at seat ${seat} has folded.`);
      } else {
        console.error(`No player found at seat ${seat} to fold.`);
      }
    },
    
  },
  getters: {
    playerPositions: (state) => {
      const numPlayers = state.players.length
      const positions = useGameStore().getPositions(numPlayers)
      return state.players.map((player, index) => ({
        ...player,
        class: positions[index]
      }))
    },
    getPositions: (state) => (numPlayers) => {
      switch (numPlayers) {
        case 2:
          return [
            '-top-0 left-1/2 sm:-top-10 sm:left-10 md:-top-10 md:left-24 lg:-top-24 lg:left-1/4 xl:-top-24 xl:left-1/4 2xl:-top-24',
            '-bottom-0 left-1/2 sm:-bottom-10 sm:left-10 md:-bottom-10 md:left-24 lg:-bottom-24 lg:left-1/2 xl:-bottom-24 xl:left-1/4'
          ]
        case 10:
          return [
            '-top-10 left-16 sm:-top-10 sm:left-10 md:-top-10 md:left-24 lg:-top-24 lg:left-1/4 xl:-top-24 xl:left-1/4',
            '-top-10 right-16 sm:-top-10 sm:right-10 md:-top-10 md:right-24 lg:-top-24 lg:right-1/4 xl:-top-24 xl:right-1/4',
            '-right-16 top-16 sm:-right-28 sm:top-20 md:-right-20 md:top-5 lg:-right-20 xl:-right-20 2xl:-right-20',
            'top-52 -right-16 sm:top-1/2 sm:-right-28 md:top-1/2 md:-right-28 lg:top-1/2 lg:-right-40 xl:top-1/2 xl:-right-40',
            'bottom-10 -right-16 sm:-bottom-0 sm:-right-24 md:-bottom-10 md:-right-20 lg:-bottom-20 lg:-right-20 xl:-bottom-20 xl:-right-20',
            '-bottom-20 right-16 sm:-bottom-20 sm:right-10 md:-bottom-1/4 md:right-24 lg:-bottom-1/4 lg:right-1/4 xl:-bottom-1/4 xl:right-1/4',
            '-bottom-20 left-16 sm:-bottom-20 sm:left-10 md:-bottom-1/4 md:left-24 lg:-bottom-1/4 lg:left-1/4 xl:-bottom-1/4 xl:left-1/4',
            'bottom-10 -left-16 sm:-bottom-0 sm:-left-24 md:-bottom-10 md:-left-20 lg:-bottom-20 lg:-left-20 xl:-bottom-20 xl:-bottom-20',
            'top-52 -left-16 sm:top-1/2 sm:-left-28 md:top-1/2 md:-left-24 lg:top-1/2 lg:-left-40 xl:top-1/2 xl:-left-40',
            '-left-16 top-16 sm:-left-28 sm:top-20 md:-left-20 md:top-5 lg:-left-20 xl:-left-20',
          ]
      }
    }
  }
})