<script setup lang="ts">
import { ref } from 'vue'

const getImageUrl = (name: string): string => {
  return import.meta.env.BASE_URL + name.replace(/^\/+/, '')
}

interface Project {
  title: string
  description: string
  imgSrc: string
  sourceLink: string
  detailProject: string
  techStack: string
}

const projects: Project[] = [
  {
    title: 'Web Development Project',
    description:
      'An expert system for early detection of depression, built with CodeIgniter 4 and MySQL, using the Forward Chaining method.',
    imgSrc: getImageUrl('/Projects/web-dev-project.png'),
    sourceLink: 'https://github.com/alvizdiana/Expert-System-for-Depressive-with-Forward-Chaining',
    detailProject:
      'An expert system for early detection of depressive disorders built with CodeIgniter 4 and MySQL, this system uses the forward chaining method as its inference engine, SMTP Gmail for email validation, and equipped with AJAX on its dashboard to display page changes without needing to reload the page.',
    techStack: 'Codeigniter 4, MySQL, AJAX, SMTP Gmail',
  },
  {
    title: 'Data Visualization and Analyst',
    description:
      'Web-based interactive data visualization dashboard for employee data, built with Dash and Plotly.',
    imgSrc: getImageUrl('/Projects/int-dash-analyst.png'),
    sourceLink: 'https://github.com/alvizdiana/Employee-Satisfaction-And-Performance-with-Dash',
    detailProject:
      'An interactive web-based dashboard for data visualization and analysis. Built with Dash (Plotly, Dash Core Component, Dash Bootstrap Component), the analysis results include patterns of relationships between several factors with performance scores and employee satisfaction levels, as well as factors that influence employee resignation decisions.',
    techStack: 'Dash, Plotly, Dash Core Component(dcc), Dash Bootstrap Component(dbc)',
  },
  {
    title: 'AIDS Classification with KNN',
    description:
      'A data mining project for classifying AIDS patients based on their medical records, using the K-Nearest Neighbors algorithm.',
    imgSrc: getImageUrl('/Projects/aids-classification-KNN.png'),
    sourceLink: 'https://github.com/alvizdiana/AIDS-Classification-with-K-NN',
    detailProject:
      'A data mining project for classifying patients infected with AIDS using the K-Nearest Neighbor (K-NN) algorithm, equipped with a confusion matrix to compare predicted data with actual data and evaluate the performance of K-NN with evaluation metrics (accuracy, precision, recall, and f1-score)',
    techStack: 'Jupyter Notebook, Python',
  },
  {
    title: 'Web UI Design Project',
    description:
      'A project focused on designing user interfaces for web applications, utilizing modern design principles with Figma.',
    imgSrc: getImageUrl('/Projects/web-UI-Design.png'),
    sourceLink:
      'https://www.figma.com/design/kfi24SKHOaSMybfFLMCdBL/WebApp-UMKM--Copy-?m=auto&t=FzRHgXCwxqrzj87S-1',
    detailProject:
      'User interface (UI) design for web-based e-commerce, created using Figma with simple and appealing modern design principles.',
    techStack: 'Figma',
  },
]

// modal
const openModal = ref(false)
const selectedProject = ref<Project | null>(null)

const open = (project: Project) => {
  selectedProject.value = project
  openModal.value = true
}

const closeModal = () => {
  openModal.value = false
}

const dialogOpenState = {
  opacity: 1,
  filter: 'blur(0px)',
  rotateX: 0,
  rotateY: 0,
  z: 0,
  transition: {
    delay: 0.2,
    duration: 0.5,
    ease: [0.17, 0.67, 0.51, 1],
    opacity: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const dialogInitialState = {
  opacity: 0,
  filter: 'blur(10px)',
  z: -100,
  rotateY: 25,
  rotateX: 5,
  transformPerspective: 500,
  transition: {
    duration: 0.3,
    ease: [0.67, 0.17, 0.62, 0.64],
  },
}
</script>

<template>
  <div class="p-4">
    <div
      class="flex overflow-x-scroll snap-x mandatory space-x-4 md:grid md:grid-cols-2 md:overflow-x-hidden md:overflow-y-hidden md:space-x-0 lg:grid-cols-3 xl:grid-cols-4 md:gap-8"
    >
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="flex flex-col project-card shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300 w-[80vw] md:w-auto flex-shrink-0 snap-center"
      >
        <img
          class="w-full max-h-full object-cover p-3 rounded-t-xl"
          :src="project.imgSrc"
          :alt="project.title"
        />

        <div class="p-5 flex flex-col flex-grow">
          <h4 class="text-xl md:text-2xl font-bold mb-3 text-center text-[#351a40]">
            {{ project.title }}
          </h4>
          <p class="text-sm mb-6 flex-grow text-[#351a40]">
            {{ project.description }}
          </p>

          <div class="flex flex-row justify-between mt-auto space-x-2">
            <button
              class="rounded-full w-1/2 bg-[#612a55] text-white text-center hover:bg-[#a74760] p-1 md:p-3 transition duration-300 font-medium cursor-pointer"
              @click="open(project)"
            >
              Detail
            </button>
            <a
              class="rounded-full w-1/2 bg-[#612a55] text-white text-center hover:bg-[#a74760] p-1 md:p-3 transition duration-300 font-medium"
              :href="project.sourceLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Source
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- modal view -->
    <transition name="dialog">
      <div
        v-if="openModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#1b0c38]/50"
        v-bind="dialogOpenState"
        :initial="dialogInitialState"
      >
        <div
          v-if="selectedProject"
          class="bg-[#fbb359] p-6 rounded-lg max-w-md w-full max-h-[100vh] overflow-y-auto"
        >
          <h2 class="text-2xl font-bold mb-4">{{ selectedProject.title }}</h2>
          <img
            class="w-full h-70 object-cover rounded mb-4"
            :src="selectedProject.imgSrc"
            :alt="selectedProject.title"
          />
          <p class="mb-4">{{ selectedProject.detailProject }}</p>
          <p><b>Tech Stack:</b> {{ selectedProject.techStack }}</p>
          <div class="m-4 flex flex-center">
            <a
              class="rounded-full w-1/2 bg-[#612a55] text-white text-center hover:bg-[#a74760] p-1 md:p-3 transition duration-300 font-medium mr-9"
              :href="selectedProject.sourceLink"
              target="_blank"
              rel="noopener noreferrer"
              >Source</a
            >
            <button
              class="rounded-full w-1/2 bg-[#612a55] text-white text-center hover:bg-[#a74760] p-1 md:p-3 transition duration-300 font-medium mr-2"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
