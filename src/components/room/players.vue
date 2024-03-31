<template>
<div v-for="players in playersList" :style="{ position: 'absolute'}" :class="players.class" class="player border border-[#07070c]" :id="players.seat">

    <div v-if="players.pos == 'btn'" class="dealerBtn p-auto text-center border -top-2 -left-2 z-10" style="position: absolute;">D</div>

    <div v-if="players.playing == 1" :style="{ backgroundImage : 'url(./src/assets/deck/default/'+players.card1+'.svg)', backgroundSize : 'cover' }" class="card_hand float-left ml-1 rounded-t absolute -mt-[30px] w-[40px] h-[30px] sm:-mt-[50px] sm:w-[70px] sm:h-[50px] md:-mt-[60px] md:w-[90px] md:h-[59px]"></div>
    <div v-else-if="players.playing == 1" class="card_back float-left rounded-t absolute border border-[#000] w-7 h-7 -mt-7 ml-3 sm:w-10 sm:h-10 sm:-mt-10 sm:ml-1 md:w-12 md:h-12 md:-mt-12 md:ml-1"></div>
    
    <div v-if="players.playing == 1" :style="{ backgroundImage : 'url(./src/assets/deck/default/'+players.card2+'.svg)', backgroundSize : 'cover' }" class="card_hand float-left rounded-t absolute -mt-[30px] w-[40px] h-[30px] ml-[15px] sm:-mt-[50px] sm:w-[70px] sm:h-[50px] md:-mt-[60px] md:w-[90px] md:h-[59px]"></div>
    <div v-else-if="players.playing == 1" class="card_back float-left rounded-t absolute border border-[#000] w-7 h-7 -mt-7 sm:w-10 sm:h-10 sm:-mt-10 sm:ml-3 md:w-12 md:h-12 md:-mt-12 md:ml-4"></div>

    <img :src="players.img" class="rounded m-1 float-left h-12 md:h-10 lg:h-12 hidden md:inline-block" />

    <div class="float-right ml-1 mr-2">
        <div class="player_display tracking-tight text-[2.5vw] sm:text-[2vw] md:text-[1.9vw] lg:text-[1.4vw] 2xl:text-[1.1vw] sm:h-4 md:h-5 lg:h-6 2xl:h-6 text-center">{{players.player }}</div>
        <div class="bankroll text-[14px] tracking-tight text-[2.5vw] sm:text-[14px] md:text-[18px] lg:text-[20px]">${{ players.bankroll }}</div>
    </div>
    <playerTimer />
</div>
</template>
    
<script setup>
import { inject } from 'vue'
import playerTimer from './playerTimer.vue'

var playersList = inject("playersList")
</script>

<style scoped>
.player {
    font-size: 1vw;
    background: rgb(27,25,41);
    background: -moz-linear-gradient(0deg, #1d1a32 0%, #222742 100%);
    background: -webkit-linear-gradient(0deg, #1d1a32 0%, #222742 100%);
    background: linear-gradient(0deg, #1d1a32 0%, #222742 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1d1a32",endColorstr="#222742",GradientType=1);
    display: inline-block;
    box-shadow: 0px 10px 30px -10px #000;
    border-radius: 5px;
}
.player_display {
    color: #FFF;
}
.bankroll {
    color: #a67c3d;
}
.players .player {
    width: 300px;
    position: absolute;
}
.transform {
    -webkit-transform: translatex(-50%) translatey(-50%);
    transform: translatex(-50%) translatey(-50%);
}
.dealerBtn {
    width: 25px;
    height: 25px;
    border-radius: 20px;
    background: #333;
    color: #FFF;
    font-size: 16px;
    box-shadow: 0px 2px 10px -2px #000;
    pointer-events: none;
}
.card_hand {
    box-shadow: 0px 2px 10px -2px #000;
    transition: all 0.2s ease-out;
}
.card_hand:hover {
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease-in;
}
.card_back {
    background-image: url('../../../assets/backs/pattern.svg');
}
</style>