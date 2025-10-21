<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { name: 'About Me', href: '#about' },
  { name: 'Projects & Certification', href: '#projects' },
  { name: 'Contact', href: '#contact' },
])

const isMenuOpen = ref(false)

const scrollToSection = (href: string, offset = 80) => {
  isMenuOpen.value = false

  const section = document.querySelector(href)
  if (section) {
    const yCoordinate = section.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="top-0 z-50">
    <div class="container mx-auto flex justify-between items-center p-4 md:px-8 flex-wrap">
      <a href="#" @click.prevent="scrollToSection('#about', 80)">
        <img alt="Vue logo" src="/public/me/icon.png" width="50" height="50" class="rounded-full" />
      </a>

      <nav class="hidden md:block">
        <ul class="flex space-x-6 font-mono text-white items-center">
          <li v-for="item in menuItems" :key="item.name">
            <a
              :href="item.href"
              class="text-lg font-medium hover:text-[#a583b0] transition-colors duration-300"
              @click.prevent="scrollToSection(item.href, 80)"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="md:hidden z-50">
        <button
          type="button"
          class="text-white focus:outline-none"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle Menu"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
          <svg
            v-else
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <nav
      :class="[
        'md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center h-screen transform transition-transform duration-300 overflow-y-auto', // Pastikan full height dan bisa scroll
        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <ul class="text-white text-2xl space-y-8 px-6 py-16 mt-16">
        <li v-for="item in menuItems" :key="item.name" class="text-center">
          <a :href="item.href" class="block p-2" @click.prevent="scrollToSection(item.href, 80)">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
