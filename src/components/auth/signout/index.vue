<template>
<div class="grid mx-auto content-center h-screen w-full sm:w-[600px]">
    <div class="bg-green-600 p-5 rounded text-white">You are now signed out!</div>
</div>
</template>

<script setup>
import { inject } from 'vue'
const loggedin = inject("loggedin")
localStorage.clear()
loggedin.value = 0
</script>

<style scoped>

</style>