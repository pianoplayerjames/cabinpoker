import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaHome, FaInbox, FaCoins, FaTrophy, FaStar, FaGraduationCap, FaDonate, FaCog, FaLock, FaBolt, FaCrown, FaDollarSign  } from "oh-vue-icons/icons/fa";
addIcons(FaHome, FaInbox, FaCoins, FaTrophy, FaStar, FaGraduationCap, FaDonate, FaCog, FaLock, FaBolt, FaCrown, FaDollarSign  );

const app = createApp(App).component("icon", OhVueIcon).use(router).mount('#app')