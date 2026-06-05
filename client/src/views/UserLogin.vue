<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/auth.css'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  localStorage.setItem('userAuth', 'true')
  router.push('/user/dashboard')
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <div class="auth-logo">⚡</div>

      <h1 class="auth-title">EV User Login</h1>

      <p class="auth-subtitle">
        Access your ChargeNP account
      </p>

      <form class="auth-form" @submit.prevent="login">

        <div class="input-group">
          <label>Email Address</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" class="auth-btn">
          Login
        </button>

      </form>

      <div class="auth-footer">
        Don't have an account?
        <RouterLink to="/signup">
          Sign Up
        </RouterLink>
      </div>

    </div>

  </div>
</template>