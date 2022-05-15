import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/Dashboard";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/customers',
    name: 'Customers.Overview',
    component: () => import('@/views/customers/overview.vue'),
    children:[
    ]
  },
  {
    path: '/customers/:id',
    name: 'Customer.Detail',
    component: () => import('@/views/customers/detail.vue'),
    props: true
  },

  {
    path: '/customers/new',
    name: 'Customer.New',
    component: () => import('@/views/customers/new.vue'),
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
