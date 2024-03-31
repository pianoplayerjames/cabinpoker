<template>
<div class='table w-[340px] h-[500px] sm:h-[400px] md:h-[400px] lg:h-[400px] sm:w-[450px] md:w-[600px] lg:w-[800px] 2xl:w-[900px]'>
    <players />
    <div class="text-center mt-12 text-white text-[14px] text-opacity-40" style="pointer-events: none; -webkit-text-stroke-color: #0000004d; -webkit-text-stroke-width: 0.5px;">{{ tableName }} {{currency}}{{ sb }}/{{currency}}{{ bb }}</div>
    <communityCards />
    <div class="absolute bottom-10 mx-auto inset-x-0">
        <actions />
    </div>
</div>
</template>

<script setup>
import { inject, ref,  onMounted } from 'vue'
import communityCards from './communityCards.vue'
import players from './players.vue'
import shuffle from '../../assets/js/shuffle.js'
import actions from '../room/actions/actions.vue'

const props = defineProps(['id', 'currency', 'tableName', 'sb', 'bb'])
var flop1 = inject("flop1")
var flop2 = inject("flop2")
var flop3 = inject("flop3")
var turn = inject("turn")
var river = inject("river")
var playersList = inject("playersList")

onMounted(() => {
    deal()
})

const deal = () => {
    console.log('New Round Initiated')

    console.log("players at table: ", playersList)

    const deck = [
        "as", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "js", "qs", "ks",
        "ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "jc", "qc", "kc",
        "ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "jh", "qh", "kh",
        "ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "jd", "qd", "kd"
    ]

    shuffle(deck);

    console.log("shuffled deck: ", deck)

    console.log("posting small blind (" + props.currency + props.sb + ")")

    console.log("posting big blind (" + props.currency + props.bb + ")")
    console.log("remove top card before dealing hand")
    deck.shift()

    console.log("dealing hands")

    for(let i = 0; i < playersList.length; i++) {
        playersList[i].playing = 1
        playersList[i].card1 = deck[i]
        deck.shift()
    }

    console.log(playersList.length)

    for(let j = 0; j < playersList.length; j++) {
        playersList[j].card2 = deck[j]
        deck.shift()
    }

    for(let k = 0; k < playersList.length; k++) {
        console.log(playersList[k].player + ": " + playersList[k].card1 , playersList[k].card2)
    }

    console.log("cards left: ", deck)

    console.log("first round of betting")

    console.log("remove top card before flop")
    deck.shift()

    flop1.value = deck[0]
    deck.shift()
    flop2.value = deck[0]
    deck.shift()
    flop3.value = deck[0]
    deck.shift()

    console.log("[FLOP]: " + flop1, flop2, flop3)

    console.log("cards left after flop: ", deck)

    console.log("round of betting")

    console.log("remove top card before turn")
    deck.shift()

    turn.value = deck[0]
    deck.shift()
    console.log("[TURN]: " + turn)

    console.log("round of betting")

    console.log("remove top card before river")
    deck.shift()

    river.value = deck[0]
    deck.shift()
    console.log("[RIVER]: " + river)

    console.log("final round of betting")

    console.log("[SHOWDOWN]")

    for(let k = 0; k < playersList.length; k++) {
        console.log(playersList[k].player + ": " + playersList[k].card1 , playersList[k].card2, flop1, flop2, flop3, turn, river)
    }

    console.log("cards left at end of hand:", deck)

    // move table position

    // post small and big blinds

    // deal hand

    // UTG acts first

    // check if all bets are equal

    // deal flop

    // round of betting

    // deal turn

    // round of betting 

    // deal river

    // round of betting

    // showdown

    // give pot to winner

    // give side pots

    // update database

    // reset data

}
</script>

<style scoped>
.table {
    border: 20px #242630 solid;
    background: #994646;
    text-align: center;
    border-radius: 150px;
    box-shadow: inset 0 0 5px rgb(0, 0, 0), inset 0 0 5px rgb(0, 0, 0), inset 0 0 5px rgb(0, 0, 0);
    outline: 10px solid rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-out;
}
</style>