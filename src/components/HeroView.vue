<script setup lang="ts">
import { ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
const photoA = 'me/default.png'

const photoOptions = [
  'me/alvi-itech-1.png',
  'me/alvi-magang-1.png',
  'me/alvi-sempro-1.png',
  'me/alvi-sidang-1.png',
]

const photoB = ref(photoOptions[0])
const flipped = ref(false)

function flipPhoto() {
  if (!flipped.value) {
    const randomIndex = Math.floor(Math.random() * photoOptions.length)
    photoB.value = photoOptions[randomIndex]
  }
  flipped.value = true
}
const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf'
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-10 md:mt-20 md:flex-row">
    <div class="md:w-1/2 w-full text-center h-auto md:h-20 md:text-left md:pr-10 md:mb-0">
      <h1
        class="flex flex-col md:flex-row font-mono text-white text-2xl md:text-4xl font-bold pb-2 md:mt-15 lg:mt-10"
      >
        🕊️ Hello,
        <span
          class="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#a74760] to-[#fbb359]"
          >I'am Alvi</span
        >
      </h1>
      <h2 class="font-mono text-white text-xl md:text-2xl p-5 lg:py-2 text-shadow-lg/30">
        An IT Fresh Graduate
      </h2>
      <p class="text-white text-sm p-5 text-center md:text-justify md:w-auto text-shadow-lg/30">
        I'm an aspiring Fullstack Developer with hands-on experience in
        <b>CodeIgniter 4 and MySQL</b>. I also like Analyzing, using
        <b>Python, Excel, and Google Sheets</b> to turn data into insights.
      </p>
      <button
        class="inline-flex items-center font-mono rounded-full md:px-7 py-2 md:py-3 text-sm bg-transparent border-2 border-[#fefedf] text-[#fefedf] hover:border-transparent hover:bg-[#744A82] p-3 m-3 transition duration-300 h-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>

        <span class="pl-3"><a :href="resumeUrl" download="resume.pdf"> Download Resume </a></span>
      </button>
    </div>

    <div
      class="md:w-1/3 w-60 h-60 pt-25 md:p-0 item-start relative perspective cursor-pointer"
      @mouseenter="flipPhoto"
      @mouseleave="flipped = false"
    >
      <div
        :class="[
          'relative transition-transform duration-700 transform-style-preserve-3d',
          { 'rotate-y-180': flipped },
        ]"
      >
        <img
          :src="photoA"
          alt="Foto A Default"
          class="absolute backface-hidden object-cover rounded-full ring-4 ring-[#fefedf] ring-opacity-50 transition-all duration-300"
          :style="{ boxShadow: '0 0 30px rgba(254, 254, 223, 0.8)' }"
        />

        <img
          :src="photoB"
          alt="Foto B Random"
          class="absolute backface-hidden object-cover rotate-y-180 rounded-full ring-4 ring-[#fefedf] ring-opacity-50 transition-all duration-300"
          :style="{ boxShadow: '0 0 30px rgba(254, 254, 223, 0.8)' }"
        />
      </div>
    </div>
  </div>
</template>

<style>
.perspective {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
