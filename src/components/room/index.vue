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
import { inject, computed, onMounted } from 'vue'
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
});
</script>