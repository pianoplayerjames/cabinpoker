import { createRouter, createWebHistory } from 'vue-router'
import cashier from '../components/cashier/index.vue'
import forgotPassword from '../components/auth/forgotPassword/index.vue'
import lobby from '../components/lobby/index.vue'
import login from '../components/auth/login/index.vue'
import register from '../components/auth/register/index.vue'
import room from '../components/room/index.vue'
import signout from '../components/auth/signout/index.vue'
import settings from '../components/settings/index.vue'


const routes = [
    { path: '/', component: lobby },
    { path: '/cashier', component: cashier },
    { path: '/forgot', component: forgotPassword },
    { path: '/login', component: login },
    { path: '/signout', component: signout },
    { path: '/register', component: register },
    { path: '/room/:roomId', component: room },
    { path: '/settings', component: settings }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router