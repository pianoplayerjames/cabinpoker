import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaHome, FaInbox, FaCoins, FaTrophy, FaStar, FaGraduationCap, FaDonate, FaCog, FaLock, FaBolt, FaCrown, FaDollarSign } from "oh-vue-icons/icons/fa";
import { io } from 'socket.io-client'

addIcons(FaHome, FaInbox, FaCoins, FaTrophy, FaStar, FaGraduationCap, FaDonate, FaCog, FaLock, FaBolt, FaCrown, FaDollarSign);

const pinia = createPinia()

// Establish the socket connection
const socket = io('http://localhost:3000')

const app = createApp(App)
  .component("icon", OhVueIcon)
  .use(router)
  .use(pinia)

// Make the socket connection available to all components
app.provide('socket', socket)

app.mount('#app')