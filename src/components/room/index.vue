<template>
<div class="grid mx-auto content-center h-screen">
  <div class="room">
    <div v-if="!roomExists">
      <p>The room doesn't exist.</p>
    </div>
    <div v-else>
      <pokerTable :id="tableId" :tableName="tableName" :currency="currency" :sb="smallBlind" :bb="bigBlind" />
    </div>
  </div>
</div>
</template>

<script setup>
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../../stores/store'
import { useRoute } from 'vue-router'
import pokerTable from './pokerTable.vue'

const gameStore = useGameStore();
const socket = inject('socket');
const route = useRoute();

const roomExists = computed(() => gameStore.roomExists);

onMounted(async () => {
  const roomId = route.params.roomId;
  await gameStore.checkRoomExists(roomId, socket);

  if (gameStore.roomId) {
    socket.emit('joinRoom', gameStore.roomId, () => {
      console.log(`Joined room ${gameStore.roomId}`);
      const token = localStorage.getItem('token') || null;
      gameStore.getRoomState(gameStore.roomId, socket, token);
    });
  }
});

socket.on('getRoomState', (updatedRoomState) => {
  gameStore.getRoomState(updatedRoomState);
});

socket.on('playerSeated', (playerData) => {
  gameStore.playerSeated(playerData);
});

socket.on('updatePlayersStatus', (playersStatus) => {
  console.log(playersStatus);
  playersStatus.forEach(statusUpdate => {
    const playerIndex = gameStore.players.findIndex(player => player.seat === statusUpdate.seat);
    if (playerIndex !== -1) {
      gameStore.players[playerIndex].playing = statusUpdate.playing;
    }
  });
});


onUnmounted(() => {

});
</script>