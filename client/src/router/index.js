import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserAuth from '../views/UserAuth.vue'
import StationLogin from '../views/StationLogin.vue'
import UserDashboard from '../views/UserDashboard.vue'
import StationDashboard from '../views/StationDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-auth',
    name: 'UserAuth',
    component: UserAuth
  },
  {
    path: '/station-login',
    name: 'StationLogin',
    component: StationLogin
  },
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/station/dashboard',
    name: 'StationDashboard',
    component: StationDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken')
  const isAdmin = localStorage.getItem('adminAuth')

  if (to.meta.requiresAuth) {
    if (!authToken) {
      next('/user-auth')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
