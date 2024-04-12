<template>
   <div v-if="playerAction" class="w-10/12 mx-auto rounded-lg p-1 relative z-10 text-[14px]">
      <!-- Modified div for centering -->
      <div class="flex flex-col items-center justify-center m-1 cursor-pointer">
         <input type="range" class="cursor-grab mr-5 w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/6 mb-5" min="0" max="100"/>
         <div class="flex items-center justify-center">
            <input type="text" class="bg-[#1b2d34] inline-block w-20 p-1 border rounded mr-2 outline-none border-black text-white text-center" placeholder="amount" />
            <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 mr-2 rounded text-center">Min</div>
            <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 mr-2 rounded text-center">Half</div>
            <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 rounded mr-2 text-center">Pot</div>
            <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 rounded text-center">All-In</div>
         </div>
      </div>
         
      <div class="flex mx-auto gap-3 justify-center">
         <div class="cursor-pointer bg-[#893434] hover:bg-[#a04444] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#672626]">Fold</div>
         <div class="cursor-pointer bg-[#c98354] hover:bg-[#da9363] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#a36339]">Check</div>
         <div class="cursor-pointer bg-[#278f4b] hover:bg-[#2eac5a] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#1c6f39]">Call $0.27</div>
      </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useGameStore } from '../../stores/store'
const gameStore = useGameStore()
const playerAction = computed(() => gameStore.playerAction)
</script>


<style scoped>
input[type="range"] {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
}
input[type="range"]::-webkit-slider-runnable-track {
   background-color: #00000025;
   border-radius: 5px;
   height: 10px;
   box-shadow: 0px 10px 70px 10px rgba(158, 133, 201, 0.201);
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
   appearance: none;
   margin-top: -11px;
   background-color: #2a41b2;
   border-radius: 7px;
   border: 1px #1a16307e solid;
   width: 15px;
   height: 30px;
}
input[type="range"]::-moz-range-track {
   background-color: #053a5f;
   border-radius: 0.5rem;
   height: 0.5rem;
}
input[type="range"]::-moz-range-thumb {
   border: none;
   border-radius: 0;
   background-color: #5cd5eb;
   height: 2rem;
   width: 1rem;
}
input[type="range"]:focus::-moz-range-thumb {
  border: 1px solid #053a5f;
  outline: 3px solid #053a5f;
  outline-offset: 0.125rem; 
}
</style>