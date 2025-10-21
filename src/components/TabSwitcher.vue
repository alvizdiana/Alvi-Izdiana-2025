<script setup lang="ts">
defineProps({
  activeTab: String,
})

type TabName = 'projects' | 'certificates'

interface Props {
  activeTab: TabName
}

const emit = defineEmits<{
  (e: 'update:tab', tabName: TabName): void
}>()

const changeTab = (tabName: TabName) => {
  emit('update:tab', tabName)
}
</script>

<template>
  <div class="flex md:overflow-x-auto rounded-full w-full h-10 pl-7 pr-7">
    <button
      @click="changeTab('projects')"
      :class="[
        'flex-1 md:flex-1 w-1/2 text-center text-sm md:text-lg font-semibold transition-all duration-300 rounded-full',
        activeTab === 'projects' ? 'bg-[#fbb359] text-[#351a40]' : 'bg-[#612a55] text-[#fbb359]',

        'mr-1 md:mr-[-18px] rounded-full',
      ]"
    >
      My Projects
    </button>

    <button
      @click="changeTab('certificates')"
      :class="[
        'flex-1 w-1/2 text-center text-sm md:text-lg font-semibold transition-all duration-300 rounded-full',
        activeTab === 'certificates'
          ? 'bg-[#fbb359] text-[#351a40]'
          : 'bg-[#612a55] text-[#fbb359]',

        'md:ml-[-18px] rounded-full',
      ]"
    >
      My Certificates
    </button>
  </div>
</template>
