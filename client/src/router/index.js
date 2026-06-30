import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


import Home from '../views/Home.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'


// Station Owner
import StationLogin from '../views/StationLogin.vue'
import StationDashboard from '../views/StationDashboard.vue'


// User
import UserAuth from '../views/UserAuth.vue'
import StationLogin from '../views/StationLogin.vue'
import UserDashboard from '../views/UserDashboard.vue'
import StationDashboard from '../views/StationDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'
import StationDetail from '../views/StationDetail.vue'


// // Admin
// import AdminLogin from '../views/admin/AdminLogin.vue'
// import AdminDashboard from '../views/admin/AdminDashboard.vue'
// import StationDetails from '../views/admin/StationDetails.vue'



const routes = [

  // PUBLIC

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



  // =====================
  // USER
  // =====================


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
    meta: { 
      requiresUser: true 
    }
  },




  // =====================
  // STATION OWNER
  // =====================


  {
    path: '/station-login',
    name: 'StationLogin',
    component: StationLogin
  },


  {
    path: '/station/dashboard',
    name: 'StationDashboard',
    component: StationDashboard,
    meta:{
      requiresStation:true
    }
  },




  // // =====================
  // // ADMIN
  // // =====================


  // {
  //   path: '/admin-login',
  //   name: 'AdminLogin',
  //   component: AdminLogin
  // },


  // {
  //   path: '/admin',
  //   name: 'AdminDashboard',
  //   component: AdminDashboard,
  //   meta:{
  //     requiresAdmin:true
  //   }
  // },


  // {
  //   path:'/admin/station/:id',
  //   name:'StationDetails',
  //   component:StationDetails,
  //   meta:{
  //     requiresAdmin:true
  //   }
  // }


]





const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  } catch {
    return null

  history:createWebHistory(),

  routes

})





// ROUTE PROTECTION

router.beforeEach((to, from, next)=>{


  // ADMIN CHECK

  if(to.meta.requiresAdmin){


    const isAdmin = localStorage.getItem('adminAuth')


    if(!isAdmin){

      next('/admin-login')

    }
    else{

      next()

    }


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


  // USER CHECK

  else if(to.meta.requiresUser){


    const isUser = localStorage.getItem('userAuth')


    if(!isUser){

      next('/user-auth')

    }
    else{

      next()

    }


  }



  // STATION OWNER CHECK

  else if(to.meta.requiresStation){


    const isStation = localStorage.getItem('stationAuth')


    if(!isStation){

      next('/station-login')

    }
    else{

      next()

    }


  }



  else{

    next()

  }


})




export default router
