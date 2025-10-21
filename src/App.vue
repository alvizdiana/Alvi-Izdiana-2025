<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProjectView from '@/components/ProjectView.vue'
import HeaderView from '@/components/HeaderView.vue'
import HeroView from '@/components/HeroView.vue'
import SendMessage from '@/components/SendMessage.vue'
import TabSwitcher from '@/components/TabSwitcher.vue'
import CertificatesView from './components/CertificatesView.vue'
import BackToTop from './components/BackToTop.vue'
import ThreeBG from './components/ThreeBG.vue'

const route = useRoute()

onMounted(() => {
  if (route.hash) {
    scrollToSection(route.hash)
  }
})

watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      scrollToSection(newHash)
    }
  },
)

const scrollToSection = (href: string, offset = 80) => {
  const section = document.querySelector(href)
  if (section) {
    setTimeout(() => {
      const yCoordinate = section.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' })
    }, 100)
  }
}

type TabName = 'projects' | 'certificates'

const activeTab = ref<TabName>('projects')

const setActiveTab = (tabName: TabName) => {
  activeTab.value = tabName
}
</script>

<template>
  <div class="body bg-[#1a1438]/70 overflow-x-hidden font-mono w-full overflow-y-hidden">
    <ThreeBG />
    <div data-aos="fade-down" data-aos-duration="600">
      <HeaderView />
      <main>
        <div
          id="about"
          class="w-full min-h-[calc(100vh-80px)]"
          data-aos="zoom-out"
          data-aos-delay="600"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          <HeroView />
        </div>
        <div
          id="projects"
          class="flex flex-col justify-center mt-40 md:mt-10"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          <TabSwitcher :activeTab="activeTab" @update:tab="setActiveTab" />
          <div v-if="activeTab === 'projects'" class="mt-10 px-4">
            <ProjectView />
          </div>
          <div v-if="activeTab === 'certificates'" class="mt-10 px-4">
            <CertificatesView />
          </div>
        </div>
        <div
          id="contact"
          class="flex flex-col content-center mt-10"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          <SendMessage />
        </div>
      </main>
      <footer>
        <div class="text-sm md:text-xl p-7 text-center font-bold text-white">
          Alvi Zumaela Izdiana - 2025
        </div>
      </footer>
    </div>
  </div>
  <BackToTop />
</template>
