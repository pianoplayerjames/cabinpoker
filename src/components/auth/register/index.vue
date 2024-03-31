<template>
<div v-if="!loggedin" class="grid mx-auto content-center h-screen w-full sm:w-[600px]">
    <div class="bg-[#00000033] rounded-lg p-4 mx-7">
        <h2 class="text-center p-2 text-white text-[24px] mb-3">Create a CabinPoker Account</h2>
        <div v-if="error" style="background: #cc0000; color: #FFF;" class="p-2 my-2 rounded">Error: {{ error }}</div>
        <form @submit.prevent>
            <input type="email" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full mb-3" placeholder="Email Address" v-model="email" /><br />
            <input type="text" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full mb-3" placeholder="Username" v-model="username" /><br />
            <input type="password" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full" placeholder="Password" v-model="password" /><br />
        <div class="grid mx-auto">
            <button @click="registerAccount" class="bg-[#48bb7e] hover:bg-[#54d490] text-[#FFF] text-[20px] p-3 rounded mt-3">Create Account</button>
        </div>

        <div @click="$router.push('/login')" class="text-[#60b9a9] mt-4 ml-2 text-[24px] float-left cursor-pointer">Login Instead</div>
    </form>
    </div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios';

const loggedin = inject("loggedin")
const username = ref("")
const password = ref("")
const email = ref("")
const error = ref("")

function registerAccount() {

    let newUser = {
        username: username.value,
        password: password.value,
        email: email.value
    }

    axios.post("http://localhost:3001/register", newUser)
    .then(res => {
        error.value = ''
        loggedin.value = 1
    }, err => {
        console.log(err.response)
        error.value = err.response.data.error
    })
}
</script>

<style scoped>

</style>