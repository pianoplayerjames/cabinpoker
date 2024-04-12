<template>
<div class="grid mx-auto content-center h-screen">
  <div class="room">
    <div v-if="!roomExists">
      <p>The room doesn't exist.</p>
    </div>
    <div v-else>
      <pokerTable />
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

socket.on('toAct', (data) => {
  gameStore.startActionTimer(data.seat, data.timeLeft);
});

socket.on('updateActionTimer', (data) => {
    console.log(`Timer update received for seat ${data.seat} with ${data.timeLeft} seconds remaining`);
    gameStore.updateActionTimer(data.initialTimer - 1, data.seat, data.timeLeft - 1);
});

socket.on('playerFolded', (data) => {
    console.log(`Player at seat ${data.seat} has folded.`);
    gameStore.playerFolded(data.seat);
});


socket.on('flop', (flopCards) => {
    gameStore.setFlop(flopCards);
  });

  socket.on('turn', (turnCard) => {
    gameStore.setTurn(turnCard);
  });

  socket.on('river', (riverCard) => {
    gameStore.setRiver(riverCard);
  });


onUnmounted(() => {

});
</script>