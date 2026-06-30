import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserAuth from '../views/UserAuth.vue'
import StationLogin from '../views/StationLogin.vue'
import UserDashboard from '../views/UserDashboard.vue'
import StationDashboard from '../views/StationDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'
import StationDetail from '../views/StationDetail.vue'
import PaymentCheckout from '../views/PaymentCheckout.vue'

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
    path: '/stations/:id',
    name: 'StationDetail',
    component: StationDetail
  },
  {
    path: '/payment/:bookingId',
    name: 'PaymentCheckout',
    component: PaymentCheckout,
    meta: { requiresAuth: true, role: 'user' }
  },
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
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/station/dashboard',
    name: 'StationDashboard',
    component: StationDashboard,
    meta: { requiresAuth: true, role: 'station_owner' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null
  }
}

const getDashboardForRole = (role) => {
  if (role === 'station_owner') return '/station/dashboard'
  if (role === 'admin') return '/admin/dashboard'
  return '/user/dashboard'
}

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken')
  const user = getStoredUser()

  if (to.meta.requiresAuth && !authToken) {
    next(to.meta.role === 'user' ? '/user-auth' : '/station-login')
    return
  }

  if (to.meta.role && user && user.role !== to.meta.role) {
    next(getDashboardForRole(user.role))
    return
  }

  next()
})

export default router
