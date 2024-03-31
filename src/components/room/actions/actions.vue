<template>
    <div v-if="playerAction" class="w-10/12 mx-auto rounded-lg p-1 text-[14px]">
            <betValue />
            <div class="flex mx-auto gap-3 justify-center">
                <div class="cursor-pointer bg-[#893434] hover:bg-[#a04444] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#672626]">Fold</div>

                <div class="cursor-pointer bg-[#c98354] hover:bg-[#da9363] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#a36339]">Check</div>

                <div class="cursor-pointer bg-[#278f4b] hover:bg-[#2eac5a] text-white text-center text-[16px] p-2 my-2 rounded border-2 border-[#1c6f39]">Call $0.27</div>
            </div>

    </div>
</template>

<script setup>
import { inject } from 'vue'
import betValue from './betValue.vue'

var playerAction = inject("playerAction")
</script>