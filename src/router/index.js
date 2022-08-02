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
    component: () => import('@/views/FileAnalyserView.vue'),
  },
  {
    path: '/translator',
    name: 'Translator',
    component: () => import('@/views/TranslatorView.vue'),
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue')
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
