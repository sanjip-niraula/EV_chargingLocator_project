<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">

    <!-- Navbar -->
    <nav class="navbar">

      <!-- Logo -->
      <div class="logo">
        ⚡ ChargeNP
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/find">FindStation</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <!-- Login Buttons -->
      <div class="auth-buttons">

        <!-- EV User Login -->
        <RouterLink to="/user-auth" class="btn-link">
  <button class="login-btn">
    🚗 EV User
  </button>
</RouterLink>

        <!-- Station Owner Login -->
        <RouterLink to="/station-login" class="btn-link">
          <button class="login-btn">
           🔌 Station Owner
          </button>
        </RouterLink>

      </div>

    </nav>

    <!-- Page Content -->
    <RouterView />

  </div>
</template>

<style scoped>
/* Main Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 50px;
  background: white;
  border-bottom: 1px solid #ddd;
}

/* Logo */
.logo {
  font-size: 32px;
  font-weight: bold;
  color: #0b8f15;
}

/* Center Links */
.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-weight: 600;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #0b8f15;
}

/* Right Buttons */
.auth-buttons {
  display: flex;
  gap: 12px;
}

.btn-link {
  text-decoration: none;
}

.login-btn {
  padding: 10px 22px;
  background: #0b8f15;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: #087410;
}

/* Active Route */
.router-link-active {
  color: #0b8f15 !important;
}
</style>