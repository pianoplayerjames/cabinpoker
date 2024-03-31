import { createRouter, createWebHistory } from 'vue-router'
import arena from '../components/arena/index.vue'
import cashier from '../components/arena/index.vue'
import donate from '../components/donate/index.vue'
import forgotPassword from '../components/auth/forgotPassword/index.vue'
import lobby from '../components/lobby/index.vue'
import login from '../components/auth/login/index.vue'
import profile from '../components/profile/index.vue'
import register from '../components/auth/register/index.vue'
import room from '../components/room/index.vue'
import signout from '../components/auth/signout/index.vue'
import settings from '../components/settings/index.vue'


const routes = [
    {
        path: '/',
        component: lobby
    },
    {
        path: '/arena',
        component: arena
    },
    {
        path: '/cashier',
        component: cashier
    },
    {
        path: '/donate',
        component: donate
    },
    {
        path: '/forgot',
        component: forgotPassword
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/signout',
        component: signout
    },
    {
        path: '/profile',
        component: profile
    }, {
        path: '/register',
        component: register
    },
    {
        path: '/room',
        component: room
    },
    {
        path: '/settings',
        component: settings
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router