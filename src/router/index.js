import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/Dashboard";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects.Overview',
    component: () => import('@/views/projects/ProjectsOverview.vue'),
    children:[
    ]
  },
  {
    path: '/projects/:id',
    name: 'Projects.Detail',
    component: () => import('@/views/projects/ProjectDetail.vue'),
    props: true
  },

  {
    path: '/projects/new',
    name: 'Projects.New',
    component: () => import('@/views/projects/ProjectNew.vue'),
  },

  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
