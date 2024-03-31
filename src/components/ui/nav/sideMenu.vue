<template>
<div class="md:grid md:content-center md:grid-cols-1 md:col-start-3 md:h-screen md:text-white invisible md:visible hidden md:inline-block">
        <ul class="md:p-5">
            <div class="visible md:visible">
                <img @click="$router.push('/')" src="../../../assets/icons/cabin2.svg" class="w-[80px] mb-5 mx-auto cursor-pointer" />
                <div class="text-[#e1d4d4] text-center leading-[1px] mb-10">CabinPoker</div>
            </div>
            <template v-for="item in menu">
                <li v-if="item.auth == loggedin || item.auth == 0" @click="$router.push(item.url)" class="hover:bg-[#00000034] md:display-inline text-[#beb2cdb3] fontSize-[20px] p-2 rounded cursor-pointer mb-1">
                    <div v-if="item.notif > 0" class="float-right bg-[#b12020] text-white rounded p-1 border border-[#000] text-[11px]">{{ item.notif }}</div>
                    <icon :style="{ color: item.color }" :name="item.icon" /> &nbsp;{{ item.name }}
            </li>
            </template>
        </ul>
        <div class="md:ml-5 md:gap-2 md:flex">
            <button v-if="!loggedin" @click="$router.push('/login')" class="bg-[#9f54a3] hover:bg-[#b964be] p-2 rounded border border-[#0000006d]">Login</button>
            <button v-if="!loggedin" @click="$router.push('/register')" class="bg-[#6f9e36] hover:bg-[#7eb23e] p-2 rounded border border-[#0000006d]">Sign Up</button>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const loggedin = inject("loggedin")

const menu = [
    { name: 'Lobby', url: '/', icon: 'fa-home', color: '#d18a8a', notif: 0, auth: 0 },
    { name: 'Inbox', url: '/inbox', icon: 'fa-inbox', color: '#519775', notif: 20, auth: 1 },
    { name: 'Cash Games', url: '/cash', icon: 'fa-coins', color: '#bf7e26', notif: 0, auth: 0 },
    { name: 'Arena', url: '/arena', icon: 'fa-trophy', color: '#7b70c9', notif: 0, auth: 0 },
    { name: 'Sit & go', url: '/sitngo', icon: 'fa-star', color: '#a559a7', notif: 0, auth: 0 },
    { name: 'School', url: '/school', icon: 'fa-graduation-cap', color: '#7d9042', notif: 0, auth: 0 },
    { name: 'Donate', url: '/donate', icon: 'fa-donate', color: '#ba769a', notif: 0, auth: 0 },
    { name: 'Leaderboards', url: '/leaderboards', icon: 'fa-crown', color: '#bfb688', notif: 0, auth: 0 },
    { name: 'Settings', url: '/settings', icon: 'fa-cog', color: '#666c52', notif: 0, auth: 1 },
    { name: 'Sign Out', url: '/signout', icon: 'fa-lock', color: '#867a90', notif: 0, auth: 1 },
]
</script>

<style scoped>

</style>