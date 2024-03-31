<template>
<div v-if="!loggedin" class="grid mx-auto content-center h-screen w-full sm:w-[600px]">
    <div class="bg-[#00000033] rounded-lg p-4 mx-7">
    <h2 class="text-center p-2 text-white text-[24px] mb-3">Login to CabinPoker</h2>
    <div v-if="error" style="background: #cc0000; color: #FFF;" class="p-2 my-2 rounded">Error: {{ error }}</div>
    <form @submit.prevent>
        <input type="text" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full mb-3" placeholder="Username" v-model="loginUsername" autocomplete="off" /><br />
        <input type="password" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full" placeholder="Password" v-model="loginPassword" autocomplete="off" /><br />
        <div class="grid mx-auto">
            <button @click="signIn" class="bg-[#48bb7e] hover:bg-[#54d490] text-[#FFF] text-[20px] p-3 rounded mt-3">Login</button>
        </div>

        <div @click="$router.push('/register')" class="text-[#60b9a9] mt-4 ml-2 text-[24px] float-left cursor-pointer">Create Account</div>
        <div @click="$router.push('/forgot')" class="text-white mt-6 mr-2 float-right cursor-pointer">Forgotten Password?</div>
    </form>
    </div>
</div>
<div v-else class="grid mx-auto content-center h-screen w-full sm:w-[600px]">
    <div class="bg-green-600 p-5 rounded text-white">You are signed in, Welcome to CabinPoker!</div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
const loggedin = inject("loggedin")
const loginUsername = ref()
const loginPassword = ref()
const error = ref()

function signIn() {

    let user = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    axios.post('http://localhost:3001/login', user)
    .then(res => {
        if(res.status === 200) {
            localStorage.setItem('token', res.data.token)
            loggedin.value = 1
        }
    }, err => {
        error.value = err.response.data.error
    })
}
</script>
<style scoped>

</style>