<template>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
</template>

<style scoped>
@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}
.wave {
    background: rgb(0,0,0, 3%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 70%;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 000px;
    left: 0;
    z-index: -1;
}
.wave:nth-of-type(2) {
    animation: wave 18s linear reverse infinite;
    opacity: 0.8;
}
.wave:nth-of-type(3) {
    animation: wave 20s -1s reverse infinite;
    opacity: 0.9;
}
@keyframes wave {
    2% {
        transform: translateX(1);
    }
    25% {
        transform: translateX(-25%);
    }
    50% {
        transform: translateX(-50%);
    }
    75% {
        transform: translateX(-25%);
    }
    100% {
        transform: translateX(1);
    }
}
</style>