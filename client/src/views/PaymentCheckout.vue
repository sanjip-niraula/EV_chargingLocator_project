<template>
  <div class="payment-page">
    <div v-if="loading" class="center">Loading...</div>
    <div v-else-if="error" class="center error">{{ error }}</div>

    <div v-else class="payment-card">
      <h1>Complete Payment</h1>
      <p class="subtitle">Secure checkout for your charging booking</p>

      <div class="summary">
        <div class="row"><span>Station</span><strong>{{ booking.station?.name }}</strong></div>
        <div class="row"><span>Port</span><strong>{{ booking.port?.portNumber }} ({{ booking.port?.connectorType }})</strong></div>
        <div class="row"><span>Time</span><strong>{{ formatTime(booking.startTime) }} – {{ formatTime(booking.endTime) }}</strong></div>
        <div class="row total"><span>Amount</span><strong>Rs. {{ amount }}</strong></div>
      </div>

      <div v-if="!paid">
        <h3>Select Payment Method</h3>
        <div class="methods">
          <label v-for="m in methods" :key="m.id" :class="{ active: method === m.id }">
            <input type="radio" v-model="method" :value="m.id" />
            <span>{{ m.icon }} {{ m.name }}</span>
          </label>
        </div>
        <button class="pay-btn" :disabled="paying" @click="handlePay">
          {{ paying ? 'Processing...' : `Pay Rs. ${amount}` }}
        </button>
        <p v-if="payError" class="error">{{ payError }}</p>
      </div>

      <div v-else class="success">
        <div class="check">✓</div>
        <h2>Payment Successful!</h2>
        <p>Your booking is confirmed.</p>
        <div class="code-box">
          <span>Check-in Code</span>
          <strong>{{ paidBooking.checkInCode }}</strong>
        </div>
        <p class="hint">Show this code at the station to start charging.</p>
        <RouterLink to="/user/dashboard" class="dash-btn">Go to My Bookings</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api.js'
import { initiatePayment, confirmPayment } from '../services/payments.js'

const route = useRoute()
const booking = ref(null)
const amount = ref(0)
const loading = ref(true)
const error = ref('')
const method = ref('esewa')
const paying = ref(false)
const payError = ref('')
const paid = ref(false)
const paidBooking = ref(null)

const methods = [
  { id: 'esewa', name: 'eSewa', icon: '💚' },
  { id: 'khalti', name: 'Khalti', icon: '💜' },
  { id: 'card', name: 'Debit/Credit Card', icon: '💳' }
]

const formatTime = (t) => new Date(t).toLocaleString()

onMounted(async () => {
  try {
    const res = await api.get(`/bookings/${route.params.bookingId}`)
    booking.value = res.data.data
    amount.value = booking.value.totalCost || 0
    if (booking.value.paymentStatus === 'paid') {
      paid.value = true
      paidBooking.value = booking.value
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Booking not found'
  } finally {
    loading.value = false
  }
})

const handlePay = async () => {
  payError.value = ''
  paying.value = true
  try {
    const init = await initiatePayment(booking.value._id, method.value)
    await new Promise((r) => setTimeout(r, 1500))
    const result = await confirmPayment(booking.value._id, init.transactionRef)
    paid.value = true
    paidBooking.value = result
  } catch (err) {
    payError.value = err.response?.data?.message || 'Payment failed'
  } finally {
    paying.value = false
  }
}
</script>

<style scoped>
.payment-page { min-height: 80vh; display: flex; justify-content: center; padding: 40px 20px; background: #f3f4f6; }
.center { padding: 60px; text-align: center; }
.error { color: #c33; }
.payment-card {
  background: white; border-radius: 20px; padding: 40px; max-width: 520px; width: 100%;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}
.subtitle { color: #666; margin-bottom: 24px; }
.summary { background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
.row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
.row.total { border-top: 1px solid #e5e7eb; margin-top: 8px; padding-top: 16px; font-size: 18px; }
.methods { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.methods label {
  display: flex; align-items: center; gap: 10px; padding: 14px; border: 2px solid #e5e7eb;
  border-radius: 10px; cursor: pointer;
}
.methods label.active { border-color: #00c17c; background: #f0fdf8; }
.methods input { display: none; }
.pay-btn {
  width: 100%; padding: 16px; background: #00c17c; color: white; border: none;
  border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer;
}
.pay-btn:disabled { background: #999; }
.success { text-align: center; }
.check {
  width: 64px; height: 64px; background: #00c17c; color: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 32px;
  margin: 0 auto 16px;
}
.code-box {
  background: #f0fdf8; border: 2px dashed #00c17c; border-radius: 12px;
  padding: 20px; margin: 20px 0;
}
.code-box span { display: block; font-size: 13px; color: #666; }
.code-box strong { font-size: 28px; letter-spacing: 4px; color: #00c17c; }
.hint { color: #666; font-size: 14px; }
.dash-btn {
  display: inline-block; margin-top: 16px; padding: 12px 24px; background: #00c17c;
  color: white; text-decoration: none; border-radius: 8px; font-weight: 600;
}
</style>
