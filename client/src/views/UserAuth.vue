<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('login')
const showPassword = ref(false)

const loginData = ref({
  email: '',
  password: '',
  remember: false
})

const signupData = ref({
  fullName: '',
  email: '',
  phone: '',
  vehicleType: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const login = () => {
  localStorage.setItem('userAuth', 'true')
  router.push('/user/dashboard')
}

const register = () => {
  if (signupData.value.password !== signupData.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  if (!signupData.value.agree) {
    alert('Please accept Terms & Conditions')
    return
  }

  alert('Account Created Successfully!')
  activeTab.value = 'login'
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-card">

      <!-- LEFT PANEL -->
      <div class="auth-left">

        <div class="logo">
          ⚡ ChargeNP
        </div>

        <div class="portal-badge">
          EV User Portal
        </div>

        <h1>Drive Electric. Charge Smart.</h1>

        <p>
          Find charging stations, book charging slots,
          monitor charging sessions and manage your EV
          journey from one platform.
        </p>

        <div class="features">
          <div>✓ Find Nearby Stations</div>
          <div>✓ Live Availability</div>
          
        </div>

      </div>

      <!-- RIGHT PANEL -->
      <div class="auth-right">

        <div class="tabs">

          <button
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
            type="button"
          >
            Login
          </button>

          <button
            :class="{ active: activeTab === 'signup' }"
            @click="activeTab = 'signup'"
            type="button"
          >
            Sign Up
          </button>

        </div>

        <!-- LOGIN -->
        <form
          v-if="activeTab === 'login'"
          @submit.prevent="login"
        >
          <h2>Welcome Back 👋</h2>

          <p class="subtitle">
            Login to access your ChargeNP account.
          </p>

          <div class="input-group">
            <label>Email Address</label>

            <input
              type="email"
              v-model="loginData.email"
              placeholder="Enter email"
              required
            />
          </div>

          <div class="input-group">
            <label>Password</label>

            <div class="password-box">

              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginData.password"
                placeholder="Enter password"
                required
              />

              <span
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </span>

            </div>
          </div>

          <div class="options">

            <label>
              <input
                type="checkbox"
                v-model="loginData.remember"
              />
              Remember Me
            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            class="auth-btn"
          >
            Login
          </button>

        </form>

        <!-- SIGNUP -->
        <form
          v-else
          @submit.prevent="register"
        >

          <h2>Create Account</h2>

          <p class="subtitle">
            Register as an EV User.
          </p>

          <div class="signup-grid">

            <div class="input-group">
              <label>Full Name</label>

              <input
                type="text"
                v-model="signupData.fullName"
                placeholder="Full Name"
                required
              />
            </div>

            <div class="input-group">
              <label>Email Address</label>

              <input
                type="email"
                v-model="signupData.email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div class="input-group">
              <label>Phone Number</label>

              <input
                type="text"
                v-model="signupData.phone"
                placeholder="+977 98XXXXXXXX"
                required
              />
            </div>

            <div class="input-group">
              <label>Vehicle Type</label>

              <select
                v-model="signupData.vehicleType"
                required
              >
                <option value="">
                  Select Vehicle
                </option>

                <option>Electric Car</option>
                <option>Electric Bike</option>
                <option>Electric Scooter</option>

              </select>
            </div>

            <div class="input-group">
              <label>Password</label>

              <input
                type="password"
                v-model="signupData.password"
                placeholder="Create Password"
                required
              />
            </div>

            <div class="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                v-model="signupData.confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>

          </div>

          <div class="terms">

            <input
              type="checkbox"
              v-model="signupData.agree"
            />

            <span>
              I agree to the Terms & Conditions
            </span>

          </div>

          <button
            type="submit"
            class="auth-btn"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>

  </div>
</template>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.auth-page{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:30px;
  background:linear-gradient(
    135deg,
    #022c22,
    #063d33,
    #021f1b
  );
}

.auth-card{
  width:1150px;
  max-width:100%;
  display:grid;
  grid-template-columns:1fr 1fr;
  background:#fff;
  border-radius:25px;
  overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,.25);
}

.auth-left{
  padding:60px;
  background:linear-gradient(
    135deg,
    #00c17c,
    #008f5c
  );
  color:white;
}

.logo{
  font-size:40px;
  font-weight:700;
  margin-bottom:15px;
}

.portal-badge{
  display:inline-block;
  padding:8px 18px;
  border-radius:30px;
  background:rgba(255,255,255,.2);
  margin-bottom:25px;
}

.auth-left h1{
  font-size:42px;
  margin-bottom:20px;
}

.auth-left p{
  line-height:1.8;
  margin-bottom:30px;
}

.features{
  display:flex;
  flex-direction:column;
  gap:15px;
}

.auth-right{
  padding:50px;
}

.tabs{
  display:flex;
  margin-bottom:30px;
  border-radius:12px;
  overflow:hidden;
  background:#f3f4f6;
}

.tabs button{
  flex:1;
  border:none;
  padding:15px;
  cursor:pointer;
  background:transparent;
  font-weight:600;
}

.tabs button.active{
  background:#00c17c;
  color:white;
}

.subtitle{
  color:#6b7280;
  margin-bottom:25px;
}

.input-group{
  margin-bottom:18px;
}

.input-group label{
  display:block;
  margin-bottom:8px;
  font-weight:600;
}

.input-group input,
.input-group select{
  width:100%;
  padding:14px;
  border:1px solid #d1d5db;
  border-radius:10px;
  outline:none;
}

.input-group input:focus,
.input-group select:focus{
  border-color:#00c17c;
  box-shadow:0 0 0 4px rgba(0,193,124,.15);
}

.password-box{
  position:relative;
}

.toggle-password{
  position:absolute;
  top:15px;
  right:15px;
  cursor:pointer;
}

.options{
  display:flex;
  justify-content:space-between;
  margin-bottom:25px;
}

.options a{
  text-decoration:none;
  color:#00c17c;
}

.signup-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:15px;
}

.terms{
  display:flex;
  align-items:center;
  gap:10px;
  margin:20px 0;
}

.auth-btn{
  width:100%;
  border:none;
  padding:15px;
  border-radius:10px;
  background:#00c17c;
  color:white;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
  transition:.3s;
}

.auth-btn:hover{
  background:#009d66;
  transform:translateY(-2px);
}

@media(max-width:900px){

  .auth-card{
    grid-template-columns:1fr;
  }

  .auth-left{
    display:none;
  }

  .signup-grid{
    grid-template-columns:1fr;
  }

  .auth-right{
    padding:30px;
  }
}
</style>