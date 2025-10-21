import { createRouter, createWebHistory, useRoute } from 'vue-router'
import App from '@/App.vue'
import ProjectView from '@/components/ProjectView.vue'
import HeroView from '@/components/HeroView.vue'
import SendMessage from '@/components/SendMessage.vue'
import CertificatesView from '@/components/CertificatesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: App,
    // },
    {
      path: '/',
      name: 'home',
      // Gunakan HomeView atau komponen utama lainnya, bukan 'App'
      component: HeroView,
    },
    {
      path: '/about',
      name: 'about',
      component: HeroView, // Rute /about ditambahkan
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView,
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: CertificatesView, // Rute /certificates ditambahkan
    },
    {
      path: '/contact',
      name: 'contact',
      component: SendMessage, // Rute /contact ditambahkan
    },
    // Jika user mengakses URL yang tidak ada, arahkan ke home atau 404
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
