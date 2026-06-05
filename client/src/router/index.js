import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'

import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

import UserLogin from '../views/UserLogin.vue'
import UserSignup from '../views/UserSignup.vue'
import UserDashboard from '../views/UserDashboard.vue'

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

  // =========================
  // EV USER ROUTES
  // =========================

  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },

  {
    path: '/signup',
    name: 'UserSignup',
    component: UserSignup
  },

  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresUser: true }
  },

  // =========================
  // ADMIN ROUTES
  // =========================

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

// Route Protection
router.beforeEach((to, from, next) => {

  // Admin Protection
  if (to.meta.requiresAdmin) {
    const isAdmin = localStorage.getItem('adminAuth')

    if (!isAdmin) {
      next('/admin-login')
    } else {
      next()
    }
  }

  // User Protection
  else if (to.meta.requiresUser) {
    const isUser = localStorage.getItem('userAuth')

    if (!isUser) {
      next('/login')
    } else {
      next()
    }
  }

  else {
    next()
  }
})

export default router;