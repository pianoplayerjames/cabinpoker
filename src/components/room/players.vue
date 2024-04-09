<template>
  <div v-for="(player, index) in playersWithPositions" :key="player.seat" class="player absolute" :class="player.class" :id="`player-${player.seat}`">
    <div v-if="player.pos === 'btn'" class="dealerBtn absolute -top-2 -left-2 z-10">D</div>
    <div class="px-2">
      <div class="player_display text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] xl:text-[24px] w-[95px] sm:w-[105px] md:w-[135px] lg:w-[135px] xl:w-[165px]">
        <div v-for="cardIndex in [1, 2]" :key="`card-${cardIndex}-${player.seat}`"
     v-if="player.player !== '' && player[`card${cardIndex}`] !== null"
     :class="[player.playing === 1 ? 'card_hand' : 'card_back', 'float-left', 'rounded-t', 'absolute', '-mt-[64px]', cardIndex === 1 ? 'ml-1' : 'ml-[40px]', 'w-[60px]', 'h-[80px]', 'sm:w-[70px]', 'sm:h-[100px]', 'md:w-[90px]', 'md:h-[120px]', '2xl:w-[110px]', '-z-10']"
     :style="getCardStyle(cardIndex, player)">
</div>
        {{ player.player !== '' ? player.player : 'Empty Seat' }}
      </div>
    </div>
    <div v-if="player.player !== ''" class="bankroll text-[16px] text-[14px] sm:text-[14px] md:text-[18px] lg:text-[20px] xl:text-[24px]">${{ player.bankroll }}</div>
    <div v-else class="sit-button" @click="sitDown(index)">Sit Here</div>
    <playerTimer />
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import { useGameStore } from '../../stores/store'
import playerTimer from './playerTimer.vue'

const socket = inject('socket')
const gameStore = useGameStore()
const playersWithPositions = computed(() => gameStore.playersWithPositions)

onMounted(() => {

})

const getCardStyle = (cardIndex, player) => {
  if (player.player !== '' && player.playing === 1) {
    return {
      backgroundImage: `url(./src/assets/deck/mini/${player[`card${cardIndex}`]}.svg)`,
      backgroundSize: 'cover',
    };
  } else {
    return {
      backgroundImage: "url('./src/assets/backs/pattern.svg')",
    };
  }
};

const sitDown = (index) => {

}
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
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>