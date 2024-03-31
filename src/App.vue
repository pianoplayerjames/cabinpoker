<template>
  <navBar />
  <waves />
    <div class="flex">
      <sideMenu />
      <router-view />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import waves from './components/ui/bg/waves.vue'
import sideMenu from './components/ui/nav/sideMenu.vue'
import navBar from './components/ui/nav/navBar.vue'
import { io } from 'socket.io-client'

const loggedin = ref(null)
const socketId = ref(null)

if(localStorage.getItem('token') === null) {
  loggedin.value = null
} else {
  loggedin.value = 1
}

provide("loggedin", loggedin)

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log(`you connected with id: ${socket.id}`)
    socketId.value = socket.id
})

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background: #483d7d;
  overflow: hidden;
}
.room {
  scale: 1;
}
</style>
