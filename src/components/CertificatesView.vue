<script setup lang="ts">
const getImageUrl = (name: string): string => {
  return import.meta.env.BASE_URL + name.replace(/^\/+/, '')
}
const certificates = [
  {
    title: 'Magang Bersertifikat 2023 (Dinkominfo Surabaya)',
    imgSrc: getImageUrl('/certificate/alvi-sertif-magang.png'),
    sourceLink:
      'https://servicedesk.surabaya.go.id/qr/eyJpdiI6Im5MOVp1VHBTeUx1Q3Vib0xZZnRYK2c9PSIsInZhbHVlIjoiK0g4c1BKRHFTdWliZG5UMHdLdG9CUT09IiwibWFjIjoiOTE2NTBkMDEzYTAyNTJhZjNhZDZkMTA3NDE1MDIzMGJlY2MyMTVkNTVjOWNiMGY0MDdmYzVjYjQ5MTQyM2JiZiIsInRhZyI6IiJ9',
  },
  {
    title: 'HelpDesk Technician Certificate',
    imgSrc: getImageUrl('/certificate/alvi-sertif-hdt.png'),
    sourceLink:
      'https://drive.google.com/file/d/1THXQd4JFpnuuqrOlHN2zJ_y3AmkVEEKc/view?usp=sharing',
  },
  {
    title: 'R for Data Science Certificates -DQLab',
    imgSrc: getImageUrl('/certificate/alvi-sertif-R-dqlab.png'),
    sourceLink: 'https://academy.dqlab.id/certificate/pdf/DQLABPEDTRJENHOH',
  },
]
</script>

<template>
  <div class="p-4">
    <div
      class="flex overflow-x-scroll snap-x mandatory space-x-4 md:grid md:grid-cols-2 md:overflow-x-hidden md:overflow-y-hidden md:space-x-0 lg:grid-cols-3 xl:grid-cols-4 md:gap-8"
    >
      <div
        v-for="(certificate, index) in certificates"
        :key="index"
        class="flex flex-col project-card shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300 bg-[#351a40] text-[#fefedf] w-[80vw] md:w-auto flex-shrink-0 snap-center"
      >
        <img
          class="w-full max-h-full object-cover p-3 rounded-t-xl"
          :src="certificate.imgSrc"
          :alt="certificate.title"
        />

        <div class="p-5 flex flex-col flex-grow">
          <h5 class="text-xl md:text-2xl font-bold mb-3 text-center text-[#351a40]">
            {{ certificate.title }}
          </h5>

          <div class="flex flex-row-reverse justify-between mt-auto space-x-2">
            <a
              class="rounded-full w-1/2 bg-[#612a55] text-white text-center hover:bg-[#a74760] p-1 md:p-3 transition duration-300 font-medium"
              :href="certificate.sourceLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Source
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
