import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/Home.vue'
import FindStation from '../views/FindStation.vue'
import About from '../views/About.vue'


// Station Owner
import StationLogin from '../views/StationLogin.vue'
import StationDashboard from '../views/StationDashboard.vue'


// User
import UserAuth from '../views/UserAuth.vue'
import UserDashboard from '../views/UserDashboard.vue'


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



  // =====================
  // USER
  // =====================


  {
    path: '/user-auth',
    name: 'UserAuth',
    component: UserAuth
  },


  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
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