<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/auth.css'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()

const signup = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  alert('Account Created Successfully')
  router.push('/login')
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <div class="auth-logo">🔋</div>

      <h1 class="auth-title">Create Account</h1>

      <p class="auth-subtitle">
        Join ChargeNP today
      </p>

      <form class="auth-form" @submit.prevent="signup">

        <div class="input-group">
          <label>Full Name</label>
          <input
            type="text"
            v-model="name"
            placeholder="Enter full name"
            required
          />
        </div>

        <div class="input-group">
          <label>Email</label>
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
            placeholder="Create password"
            required
          />
        </div>

        <div class="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm password"
            required
          />
        </div>

        <button type="submit" class="auth-btn">
          Create Account
        </button>

      </form>

      <div class="auth-footer">
        Already have an account?
        <RouterLink to="/login">
          Login
        </RouterLink>
      </div>

    </div>

  </div>
</template>