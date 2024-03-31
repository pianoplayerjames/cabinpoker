<template>
    <div class="visible md:invisible flex fixed left-3 gap-3 mt-3">
        <button class="bg-[#1a1c1b] text-[#fff] p-2 rounded float-left">Menu</button>
    </div>
    <div v-if="loggedin" class="flex fixed right-3 gap-3 mt-3">
        <button class=" text-[#5cb06c] p-2 rounded float-right"><icon name="fa-dollar-sign" />1,284.59 (play money)</button>
        <button class=" text-[#ce58ae] p-2 rounded float-right">
            <icon name="fa-bolt" /> 1035/2958</button>
        <button @click="$router.push('/cashier')" class="bg-[#29e09076] hover:bg-[#29e091a5] text-[#fff] p-2 rounded float-right">Cashier</button>
        <button @click="$router.push('/profile')" class="bg-[#3dab7b1d] hover:bg-[#3dab7b41] text-[#fff] p-2 rounded float-right">PianoJames</button>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const loggedin = inject("loggedin")
</script>

<style scoped>

</style>