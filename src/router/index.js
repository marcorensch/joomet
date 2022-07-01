import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/DashboardView";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/checker',
    name: 'File Analyser',
    component: () => import('@/views/FileAnalyser/UploadView.vue'),
  },
  {
    path: '/checkerresult',
    name: 'File Analyser Results',
    component: () => import('@/views/FileAnalyser/ResultsView.vue'),
    props: true
  },
  {
    path: '/translator',
    name: 'Translator',
    component: () => import('@/views/TranslatorView.vue'),
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path:'/tasks',
    name:'Tasks.Overview',
    component: () => import('@/views/tasks/overview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
