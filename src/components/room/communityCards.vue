<template>
    <div class="w-[285px] sm:w-[330px] md:w-[395px] lg:w-[420px] m-auto">
        <div v-if="flop1 != 0" :style="{ backgroundImage : 'url(./src/assets/deck/default/' + flop1 + '.svg)', backgroundSize : 'cover' }" class="card absolute w-[50px] h-[68px] ml-[10px] mt-[30px] sm:w-[60px] sm:h-[80px] sm:ml-0 md:w-[70px] md:h-[95px] md:ml-0 lg:w-[80px] lg:h-[109px] lg:ml-0 rounded p-0"></div>
        <div v-if="flop2 != 0" :style="{ backgroundImage : 'url(./src/assets/deck/default/' + flop2 + '.svg)', backgroundSize : 'cover' }" class="card absolute w-[50px] h-[68px] ml-[63px] mt-[30px] sm:w-[60px] sm:h-[80px] sm:ml-[70px] md:w-[70px] md:h-[95px] md:ml-[80px] lg:w-[80px] lg:h-[109px] lg:ml-[90px] rounded"></div>
        <div v-if="flop3 != 0" :style="{ backgroundImage : 'url(./src/assets/deck/default/' + flop3 + '.svg)', backgroundSize : 'cover' }" class="card absolute w-[50px] h-[68px] ml-[116px] sm:w-[60px] sm:h-[80px] sm:ml-[140px] mt-[30px] md:w-[70px] md:h-[95px] md:ml-[160px] lg:w-[80px] lg:h-[109px] lg:ml-[180px] rounded"></div>
        <div v-if="turn != 0" :style="{ backgroundImage : 'url(./src/assets/deck/default/' + turn + '.svg)', backgroundSize : 'cover' }" class="card absolute w-[50px] h-[68px] ml-[169px] sm:w-[60px] sm:h-[80px] sm:ml-[210px] mt-[30px] md:w-[70px] md:h-[95px] md:ml-[240px] lg:w-[80px] lg:h-[109px] lg:ml-[270px] rounded"></div>
        <div v-if="river != 0" :style="{ backgroundImage : 'url(./src/assets/deck/default/' + river + '.svg)', backgroundSize : 'cover' }" class="card absolute w-[50px] h-[68px] ml-[222px] sm:w-[60px] sm:h-[80px] sm:ml-[280px] mt-[30px] md:w-[70px] md:h-[95px] md:ml-[320px] lg:w-[80px] lg:h-[109px] lg:ml-[360px] rounded"></div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

var flop1 = inject("flop1")
var flop2 = inject("flop2")
var flop3= inject("flop3")
var turn = inject("turn")
var river = inject("river")
</script>

<style scoped>
.card {
    background: #FFF;
    box-shadow: 0px 2px 10px -2px #000;
}
</style>