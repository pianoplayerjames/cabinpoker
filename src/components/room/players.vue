<template>
  <div v-for="(seat, index) in playerPositions" :key="seat.seat" class="player absolute" :class="seat.class" :id="`player-${seat.seat}`">
    <div v-if="seat.pos === 'btn'" class="dealerBtn absolute -top-2 -left-2 z-10">D</div>
    <div class="px-2">
      <div class="player_display text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] xl:text-[24px] w-[95px] sm:w-[105px] md:w-[135px] lg:w-[135px] xl:w-[165px]">
        <!-- Display cards and player name if the seat is occupied -->
        <template v-if="seat.player">
          <div v-for="cardIndex in [1, 2]" :key="`card-${cardIndex}-${seat.seat}`"
            v-if="seat.playing === 1"
            :class="[seat[`card${cardIndex}`] !== null ? 'card_hand' : 'card_back', 'float-left', 'rounded-t', 'absolute', '-mt-[64px]', cardIndex === 1 ? 'ml-1' : 'ml-[40px]', 'w-[60px]', 'h-[80px]', 'sm:w-[70px]', 'sm:h-[100px]', 'md:w-[90px]', 'md:h-[120px]', '2xl:w-[110px]', '-z-10']"
            :style="getCardStyle(cardIndex, seat)">
          </div>
          {{ seat.player }}
        </template>
        <!-- Show "Sit Here" if the seat is empty -->
        <div v-else class="sit-button" @click="sitDown(index)">Sit Here</div>
      </div>
    </div>
    <div v-if="seat.player" class="bankroll text-[16px] text-[14px] sm:text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px]">${{ seat.bankroll }}</div>
    <playerTimer />
  </div>
</template>


<script setup>
import { inject, computed, onMounted } from 'vue'
import { useGameStore } from '../../stores/store'
import playerTimer from './playerTimer.vue'

const socket = inject('socket')
const gameStore = useGameStore()
const playerPositions = computed(() => gameStore.playerPositions)

onMounted(() => {

});

socket.on('dealCards', (data) => {
  console.log("deal info:", data); // Check if card1 and card2 have values here
  gameStore.holeCards(data.seat, { card1: data.card1, card2: data.card2 });
});


const getCardStyle = (cardIndex, player) => {
  if (player.player !== '' && player.playing === 1 && player[`card${cardIndex}`] !== null) {
    return {
      backgroundImage: `url(../src/assets/deck/mini/${player[`card${cardIndex}`]}.svg)`,
      backgroundSize: 'cover',
    };
  } else {
    return {
      backgroundImage: "url('../src/assets/backs/pattern.svg')",
    };
  }
};

const sitDown = (index) => {
  const token = localStorage.getItem('token');

  socket.emit('seatPlayer', gameStore.roomId, index, token, (success, message, playerData) => {
    if (success) {
      console.log("Successfully seated the player.");
    } else {
      console.error("Failed to seat the player:", message);
    }
  });
};


</script>

<style scoped>
.player {
  font-size: 1vw;
  background: #1a1a17;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1d1a32", endColorstr="#222742", GradientType=1);
  box-shadow: 0px 10px 30px -10px #000;
  border-radius: 10px;
  padding: 5px;
}

.player_display {
  color: #FFF;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bankroll {
  color: #f9d378;
}

.dealerBtn {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 25px;
  height: 25px;
  border-radius: 20px;
  background: #333;
  color: #FFF;
  font-size: 16px;
  box-shadow: 0px 2px 10px -2px #000;
  pointer-events: none;
  text-align: center;
}

.card_hand,
.card_back {
  transition: all 0.2s ease-out;
  box-shadow: 0px 2px 10px -2px #000;
}

.card_hand {
  background: #FFF;
}

.card_back {
  background-image: url('./src/assets/backs/pattern.svg');
}

.sit-button {
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>