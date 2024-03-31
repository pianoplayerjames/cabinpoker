<template>
    <div class="grid mx-auto content-center h-screen">
    <div class="room">
            <pokerTable :id="tableId" :tableName="tableName" :currency="currency" :sb="smallBlind" :bb="bigBlind" />
        </div>
    </div>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import pokerTable from './pokerTable.vue'

const tableId = ref(1)
const currency = ref("$")
const smallBlind = ref(2.50)
const bigBlind = ref(5)
const flop1 = ref(0)
const flop2 = ref(0)
const flop3 = ref(0)
const turn = ref(0)
const river = ref(0)
const tableName = ref("CabinPoker Cash table VI - Blinds:")
const playerAction = ref(0)

const playersList = ref([
{
    player: 'LexVeldhuis',
    seat: 1,
    bankroll: '1,385.34',
    img: 'https://i.pravatar.cc/300?img=1',
    playing: 0,
    class: '-top-10 sm:-top-10 md:-top-10 lg:-top-10 2xl:-top-10 left-0 sm:left-24 md:left-28 lg:left-28 2xl:left-1/4',
    pos: 'btn',
    card1: null,
    card2: null
}, {
    player: 'PeterMassalombarda',
    seat: 2,
    bankroll: '1684.57',
    img: 'https://i.pravatar.cc/300?img=2',
    playing: 0,
    class: '-top-10 sm:-top-10 md:-top-10 lg:-top-10 2xl:-top-10 -right-10 sm:right-10 md:right-[100px] lg:right-1/4 2xl:right-1/4',
    pos: 'sb',
    card1: null,
    card2: null
}, {
    player: 'Mike365',
    seat: 3,
    bankroll: '1,193.56',
    img: 'https://i.pravatar.cc/300?img=3',
    playing: 0,
    class: 'top-10 sm:top-10 md:top-10 lg:-top-5 2xl:top-10 -right-20 sm:-right-16 md:-right-20 lg:-right-10 2xl:-right-20',
    pos: 'bb',
    card1: null,
    card2: null
}, {
    player: 'ThatBreadThough',
    seat: 4,
    bankroll: '1485.23',
    img: 'https://i.pravatar.cc/300?img=4',
    playing: 0,
    class: 'bottom-2/4 sm:bottom-36 md:bottom-36 lg:bottom-1/2 2xl:bottom-1/3 -right-[100px] sm:-right-[100px] md:-right-[120px] lg:-right-[100px] 2xl:-right-[100px]',
    pos: 'utg',
    card1: null,
    card2: null
}, {
    player: 'StheP1973',
    seat: 5,
    bankroll: '2,119.27',
    img: 'https://i.pravatar.cc/300?img=5',
    playing: 0,
    class: 'bottom-16 sm:bottom-0 md:bottom-5 lg:bottom-0 2xl:-bottom-8 -right-10 sm:-right-10 md:-right-20 lg:-right-10 2xl:-right-10',
    pos: 'utg1',
    card1: null,
    card2: null
}, {
    player: 'bluffpatrol_rapha',
    seat: 6,
    bankroll: '3586.39',
    img: 'https://i.pravatar.cc/300?img=6',
    playing: 0,
    class: '-bottom-10 sm:-bottom-10 md:-bottom-10 lg:-bottom-10 2xl:-bottom-10 right-[20px] sm:right-[80px] md:right-[100px] lg:right-1/4 2xl:right-1/4',
    pos: 'utg2',
    card1: null,
    card2: null
}, {
    player: 'FSpadex',
    seat: 7,
    bankroll: '485.84',
    img: 'https://i.pravatar.cc/300?img=7',
    playing: 0,
    class: '-bottom-10 sm:-bottom-10 md:-bottom-10 lg:-bottom-10 2xl:-bottom-10 left-5 sm:left-1/4 md:left-1/4 lg:left-1/4 2xl:left-1/4',
    pos: 'mp1',
    card1: null,
    card2: null
}, {
    player: 'Soydubi',
    seat: 8,
    bankroll: '1,384.75',
    img: 'https://i.pravatar.cc/300?img=8',
    playing: 0,
    class: 'bottom-16 sm:bottom-0 md:bottom-0 lg:-bottom-5 2xl:-bottom-8 -left-10 sm:-left-10 md:-left-10 lg:-left-10 2xl:-left-10',
    pos: 'mp2',
    card1: null,
    card2: null
}, {
    player: 'pianoJames',
    seat: 9,
    bankroll: '1,128.29',
    img: 'https://i.pravatar.cc/300?img=9',
    playing: 0,
    class: 'bottom-2/4 sm:bottom-36 md:bottom-32 lg:bottom-1/3 2xl:bottom-1/3 -left-20 sm:-left-16 md:-left-16 lg:-left-20 2xl:-left-20',
    pos: 'mp3',
    card1: null,
    card2: null
}, {
    player: 'JulieStrator',
    seat: 10,
    bankroll: '2,349.45',
    img: 'https://i.pravatar.cc/300?img=10',
    playing: 0,
    class: 'top-12 sm:top-12 md:top-10 lg:top-5 2xl:top-0 -left-20 sm:-left-12 md:-left-12 lg:-left-20 2xl:-left-20',
    pos: 'co',
    card1: null,
    card2: null
}
])

const players = reactive({
    playersList
})

provide("flop1", flop1)
provide("flop2", flop2)
provide("flop3", flop3)
provide("turn", turn)
provide("river", river)
provide("playersList", playersList)
provide("playerAction", playerAction)

</script>