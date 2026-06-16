import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'

import StationLogin from '../views/StationLogin.vue'
import StationDashboard from '../views/StationDashboard.vue'

import UserAuth from '../views/UserAuth.vue'
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

  // USER

  {
    path: '/user-auth',
    name: 'UserAuth',
    component: UserAuth
  },

  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresUser: true }
  },

  // STATION OWNER

  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: StationLogin
  },

 {
  path: '/admin/dashboard',
  name: 'AdminDashboard',
  component: StationDashboard,
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

  }

  else if (to.meta.requiresUser) {

    const isUser = localStorage.getItem('userAuth')

    if (!isUser) {
      next('/user-auth')
    } else {
      next()
    }

  }

  else {
    next()
  }

})

export default router