<template>
  <waves />
    <div class="flex">
      <router-view />
    </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import waves from './components/ui/bg/waves.vue'

const loggedin = ref(null)

if(localStorage.getItem('token') === null) {
  loggedin.value = null
} else {
  loggedin.value = 1
}

provide("loggedin", loggedin)

onMounted(() => {
  preloadCardImages();
});

function preloadCardImages() {
  const suits = ['h', 's', 'c', 'd'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

  suits.forEach(suit => {
    values.forEach(value => {
      const imagePath = `../src/assets/deck/mini/${value}${suit}.svg`;
      preloadImage(imagePath);
    });
  });
}

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}
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
