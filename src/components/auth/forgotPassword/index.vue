<template>
    <div v-if="!loggedin" class="grid mx-auto content-center h-screen w-full sm:w-[600px]">
        <div class="bg-[#00000033] rounded-lg p-4 mx-7">
            <h2 class="text-center p-2 text-white text-[24px] mb-3">Forgotten Password?</h2>
            <form @submit.prevent>
            <input type="text" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full mb-3" placeholder="Username or Email Address" v-ref="username" /><br />
            <div class="grid mx-auto">
                <button @click="signIn" class="bg-[#48bb7e] hover:bg-[#54d490] text-[#FFF] text-[20px] p-3 rounded mt-3">Recover Account</button>
            </div>
        </form>
        </div>


        <div class="bg-[#00000033] rounded-lg p-4 mx-7 mt-5">
            <h2 class="text-center p-2 text-white text-[24px] mb-3">Forgotten Username?</h2>
            <form @submit.prevent>
            <input type="text" class="bg-[#e5e0e0] p-5 text-[22px] rounded w-full mb-3" placeholder="Email Address" v-ref="email" /><br />
            <div class="grid mx-auto">
                <button @click="signIn" class="bg-[#48bb7e] hover:bg-[#54d490] text-[#FFF] text-[20px] p-3 rounded mt-3">Send Reminder</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const loggedin = inject("loggedin")

function signIn() {
    
}
</script>

<style scoped>

</style>