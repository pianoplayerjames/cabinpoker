<template>
    <div class="m-1 cursor-pointer">
        <input type="range" class="cursor-grab mr-5 w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/6 mb-5" min="0" max="100"/>
        <input type="text" class="bg-[#1b2d34] inline-block w-20 p-1 border rounded mr-2 outline-none border-black text-white text-center" placeholder="amount" />
        <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 mr-2 rounded text-center">Min</div>
        <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 mr-2 rounded text-center">Half</div>
        <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 rounded mr-2 text-center">Pot</div>
        <div class="bg-[#ffffff2b] hover:bg-[#52649e] inline-block text-white p-1 rounded text-center">All-In</div>
    </div>
</template>

<script setup>

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