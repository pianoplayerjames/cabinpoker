<template>
<div class='table w-[450px] h-[490px] sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px] sm:h-[500px] md:h-[400px] lg:h-[450px] xl:h-[450px] -z-10'>
    <players />
    <div class="text-center mt-12 text-white text-[14px] text-opacity-40" style="pointer-events: none; -webkit-text-stroke-color: #0000004d; -webkit-text-stroke-width: 0.5px;">{{ tableName }} {{currency}}{{ sb }}/{{currency}}{{ bb }}</div>
    <div class="timer" v-if="gameStore.timer !== null">
    {{ gameStore.timer }}
  </div>
    <communityCards />
    <div class="absolute bottom-10 mx-auto inset-x-0">
        <actions />
    </div>
</div>
</template>

<script setup>
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../../stores/store'
import communityCards from './communityCards.vue'
import players from './players.vue'
import actions from '../room/actions/actions.vue'

const socket = inject('socket')
const gameStore = useGameStore()
const timer = computed(() => gameStore.timer)
const tableName = computed(() => gameStore.tableName)
const sb = computed(() => gameStore.smallBlind)
const bb = computed(() => gameStore.bigBlind)
const currency = computed(() => gameStore.currency)

onMounted(() => {
    
})

onUnmounted(() => {
  socket.off('updateTimer');
});

socket.on('updateTimer', (timerValue) => {
  gameStore.updateTimer(timerValue);
});
</script>

<style scoped>
.table::before {
    content: '';
    position: absolute;
    top: -35px;
    left: -35px;
    right: -35px;
    bottom: -35px;
    border: 15px solid rgba(0, 0, 0, 0.1);
    border-radius: calc(150px + 20px);
    z-index: -10;
    box-sizing: border-box;
}

.table {
    border: 20px #242630 solid;
    background: #913939;
    text-align: center;
    border-radius: 150px;
    box-shadow: inset 0 0 5px rgb(0, 0, 0), inset 0 0 5px rgb(0, 0, 0), inset 0 0 5px rgb(0, 0, 0);
    transition: all 0.2s ease-out;
    position: relative;
}
</style>