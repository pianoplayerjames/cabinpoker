import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    roomExists: false,
    roomData: null,
    roomId: null,
    tableName: "CabinPoker Cash table VI - Blinds:",
    currency: "$",
    smallBlind: 2.50,
    bigBlind: 5,
    flop: null,
    turn: null,
    river: null,
    playerAction: 0,
    players: Array(10).fill().map((_, index) => ({
      player: '',
      seat: index,
      bankroll: '0',
      playing: 0,
      pos: '',
      card1: null,
      card2: null
    })),
    deck: [
      "as", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "js", "qs", "ks",
      "ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "jc", "qc", "kc",
      "ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "jh", "qh", "kh",
      "ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "jd", "qd", "kd"
    ]
  }),
  actions: {
    async checkRoomExists(roomId, socket) {
      return new Promise((resolve) => {
        socket.emit('checkRoomExists', parseInt(roomId), (exists) => {
          this.roomExists = exists;
          resolve(exists);
        });
      });
    },
    async getRoomData(roomId, socket) {
      return new Promise((resolve) => {
        socket.emit('getRoomData', roomId, (roomData) => {
          this.roomData = roomData;
          resolve(roomData);
        });
      });
    },
    setRoomId(roomId) {
      this.roomId = roomId
    },
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
    
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }
  },
  getters: {
    playersWithPositions: (state) => {
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
        default:
          return Array(numPlayers).fill('-top-10 left-1/2 transform -translate-x-1/2')
      }
    }
  }
})