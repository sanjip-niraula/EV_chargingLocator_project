<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('adminAuth')
  router.push('/admin')
}
</script>

<template>
  <div class="dashboard">
    <h1>Station Dashboard</h1>

    <div class="cards">
      <div class="card">
        <h3>Total Stations</h3>
        <p>25</p>
      </div>

      <div class="card">
        <h3>Total Users</h3>
        <p>150</p>
      </div>

      <div class="card">
        <h3>Pending Requests</h3>
        <p>5</p>
      </div>
    </div>

    <button @click="logout">
      Logout
    </button>
  </div>
</template>