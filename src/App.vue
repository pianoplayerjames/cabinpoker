<template>
  <waves />
    <div class="flex">
      <router-view />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import waves from './components/ui/bg/waves.vue'

const loggedin = ref(null)

if(localStorage.getItem('token') === null) {
  loggedin.value = null
} else {
  loggedin.value = 1
}

provide("loggedin", loggedin)
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
  background: #3c467f;
  overflow: hidden;
}
.room {
  scale: 1;
}
</style>
