<template>
  <div class="card-container w-[285px] sm:w-[320px] md:w-[450px] lg:w-[550px] m-auto">
    <div
      v-for="(card, index) in cards"
      :key="index"
      v-if="card !== null"
      :style="{
        backgroundImage: `url(../src/assets/deck/mini/${card}.svg)`,
        backgroundSize: 'cover',
      }"
      class="card absolute rounded"
      :class="getCardClasses(index)"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../../stores/store'

const gameStore = useGameStore()

const cards = computed(() => {
  const flopCards = gameStore.flop ? gameStore.flop.filter(card => card !== null) : []
  return [
    ...flopCards,
    gameStore.turn,
    gameStore.river
  ].filter(card => card !== null)
})

const getCardClasses = (index) => {
  const baseClasses = 'w-[50px] h-[68px] mt-[50px] sm:mt-[50px] md:mt-[20px]'
  const marginClasses = [
    'ml-[10px] sm:ml-[0px] md:ml-[30px] lg:ml-[40px]',
    'ml-[63px] sm:ml-[65px] md:ml-[110px] lg:ml-[130px]',
    'ml-[116px] sm:ml-[130px] md:ml-[190px] lg:ml-[220px]',
    'ml-[169px] sm:ml-[195px] md:ml-[270px] lg:ml-[310px]',
    'ml-[222px] sm:ml-[260px] md:ml-[350px] lg:ml-[400px]',
  ]
  const sizeClasses = [
    'sm:w-[60px] sm:h-[80px] md:w-[70px] md:h-[95px] lg:w-[80px] lg:h-[109px]',
  ]
  return `${baseClasses} ${marginClasses[index] || ''} ${sizeClasses.join(' ')}`
}
</script>

<style scoped>
.card-container {
  position: relative;
}

.card {
  background: #fff;
  box-shadow: 0px 2px 10px -2px #000;
}
</style>