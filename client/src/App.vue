<script setup>
import { RouterLink, RouterView } from 'vue-router'

const API = 'http://localhost:5000/api/auth'

const loginUser = () => {
  window.location.href = `${API}/google/user`
}

const loginOwner = () => {
  window.location.href = `${API}/google/owner`
}
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">⚡ ChargeNP</div>

      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/find">FindStation</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <div class="auth-buttons">
        <button @click="loginUser">
          EV User
        </button>

        <RouterLink to="/admin-login">
          <button>
            Station Owner
          </button>
        </RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: green;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-links a {
  text-decoration: none;
  color: black;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: green;
}

.auth-buttons {
  display: flex;
  gap: 12px;
}

.auth-buttons button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background: green;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.auth-buttons button:hover {
  opacity: 0.9;
}
</style>