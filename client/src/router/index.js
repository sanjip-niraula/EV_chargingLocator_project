import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import FindStation from '../views/FindStation.vue'//
import About from '../views/About.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/find',
    name: 'FindStation',
    component: FindStation
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  },

  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const isAdmin = localStorage.getItem('adminAuth')

    if (!isAdmin) {
      next('/admin-login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;