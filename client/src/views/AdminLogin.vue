<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  if (
    username.value === 'admin' &&
    password.value === 'admin123'
  ) {
    localStorage.setItem('adminAuth', 'true')
    router.push('/admin/dashboard')
  } else {
    alert('Invalid Username or Password')
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Admin Login</h2>

    <input
      v-model="username"
      placeholder="Username"
    />

    <input
      type="password"
      v-model="password"
      placeholder="Password"
    />

    <button @click="login">
      Login
    </button>
  </div>
</template>