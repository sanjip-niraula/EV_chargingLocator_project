<template>
  <div class="auth-page">
    <div class="auth-card">

      <!-- Left Side (Visual/Branding) -->
      <div class="auth-visual">
        <div class="visual-glow"></div>
        <div class="logo">⚡ ChargeNP</div>
        <h1>Power up your journey</h1>
        <p>Join the thousands of EV drivers across Nepal finding Chargers in real-time. Fast, reliable, and always up to date.</p>
        
        <div class="info-badges">
          <div class="badge">📍 100+ Stations</div>
          <div class="badge">⚡ Real-time Live Status</div>
          <div class="badge">⭐ Trusted Reviews</div>
        </div>

        <div class="visual-footer">
          Are you a station owner? 
          <RouterLink to="/station-login">Go to Owner Portal</RouterLink>
        </div>
      </div>

      <!-- Right Side (Form) -->
      <div class="auth-form">
        <div class="form-tabs">
          <button 
            :class="{ active: mode === 'login' }" 
            @click="mode = 'login'"
          >Login</button>
          <button 
            :class="{ active: mode === 'signup' }" 
            @click="mode = 'signup'"
          >Sign Up</button>
        </div>

        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>

        <form @submit.prevent="handleSubmit">
          <h2 class="form-title">{{ mode === 'login' ? 'Welcome back' : 'Create account' }}</h2>
          <p class="form-subtitle">
            {{ mode === 'login' ? 'Enter your details to access your profile.' : 'Join the community of EV drivers in Nepal.' }}
          </p>

          <div v-if="mode === 'signup'" class="input-group">
            <label>Full Name</label>
            <input v-model="form.name" type="text" placeholder="John Doe" required />
          </div>

          <div class="input-group">
            <label>Email Address</label>
            <input v-model="form.email" type="email" placeholder="john@example.com" required />
          </div>

          <div class="input-group">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="••••••••" required />
          </div>

          <div v-if="mode === 'signup'" class="input-group">
            <label>Vehicle Type</label>
            <select v-model="form.vehicleType">
              <option value="Car">Electric Car</option>
              <option value="Scooter">Electric Scooter / Bike</option>
              <option value="Bus">Electric Bus / Van</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button class="submit-btn" :disabled="loading">
            {{ loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account') }}
          </button>
          
          <div class="switch-mode">
            {{ mode === 'login' ? "Don't have an account?" : "Already have an account?" }}
            <button type="button" @click="mode = mode === 'login' ? 'signup' : 'login'">
              {{ mode === 'login' ? 'Sign up here' : 'Login here' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api.js'

const router = useRouter()
const mode = ref('login')
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  vehicleType: 'Car'
})

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    if (mode.value === 'login') {
      const res = await api.post('/account/login', {
        email: form.value.email,
        password: form.value.password
      })
      
      const { user, token } = res.data.data
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      router.push(user.role === 'station_owner' ? '/station/dashboard' : '/user/dashboard')
    } else {
      await api.post('/account/register', {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        vehicleType: form.value.vehicleType,
        role: 'user'
      })
      success.value = 'Account created successfully! Please login.'
      mode.value = 'login'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.auth-page {
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #0a0e1a;
  font-family: 'Inter', sans-serif;
}

.auth-card {
  width: 1000px;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  background: #111827;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
}

/* Visual Side */
.auth-visual {
  background: linear-gradient(135deg, #0d212d, #06111a);
  padding: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 229, 157, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.logo {
  font-size: 28px;
  font-weight: 800;
  color: #00e59d;
  margin-bottom: 32px;
}

.auth-visual h1 {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.auth-visual p {
  color: #94a3b8;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 40px;
}

.info-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 60px;
}

.badge {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.visual-footer {
  font-size: 14px;
  color: #64748b;
}

.visual-footer a {
  color: #00e59d;
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
}

/* Form Side */
.auth-form {
  background: #111827;
  padding: 60px;
  display: flex;
  flex-direction: column;
}

.form-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.form-tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.2s;
}

.form-tabs button.active {
  background: #00e59d;
  color: #0a1a0e;
}

.form-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
}

.form-subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 32px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 13px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #f1f5f9;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus, .input-group select:focus {
  border-color: #00e59d;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #00e59d, #00b4a0);
  border: none;
  border-radius: 12px;
  color: #0a1a0e;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 12px;
  transition: transform 0.2s, opacity 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.switch-mode {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #64748b;
}

.switch-mode button {
  background: none;
  border: none;
  color: #00e59d;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
}

.alert {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.alert-success {
  background: rgba(0, 229, 157, 0.1);
  color: #00e59d;
  border: 1px solid rgba(0, 229, 157, 0.2);
}

@media (max-width: 900px) {
  .auth-card {
    grid-template-columns: 1fr;
  }
  .auth-visual {
    padding: 40px;
    text-align: center;
  }
  .auth-visual h1 { font-size: 32px; }
  .info-badges { display: none; }
  .auth-form { padding: 40px; }
}
</style>
