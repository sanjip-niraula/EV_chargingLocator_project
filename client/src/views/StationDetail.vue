<template>
  <div class="detail-page">
    <div v-if="loading" class="center">Loading station...</div>
    <div v-else-if="error" class="center error">{{ error }}</div>

    <template v-else-if="station">
      <div class="header">
        <RouterLink to="/find" class="back">← Back to stations</RouterLink>
        <h1>{{ station.name }}</h1>
        <p>{{ station.address?.formatted }}</p>
        <div class="live-badge"><span class="dot"></span> Live — {{ liveStatus.available }}/{{ liveStatus.totalPorts }} ports free</div>
      </div>

      <div class="grid">
        <div class="ports-panel">
          <h2>Charger Ports</h2>
          <div v-for="port in liveStatus.ports" :key="port._id" class="port-card" :class="port.availability">
            <div class="port-top">
              <strong>Port {{ port.portNumber || port._id.slice(-4) }}</strong>
              <span class="badge">{{ port.availability }}</span>
            </div>
            <p>{{ port.connectorType }} · {{ port.chargeLevel }} · {{ port.powerKw || '?' }} kW</p>
            <p class="price">
              Rs. {{ port.pricing?.perKwh || port.pricing?.perMinute || 0 }}
              {{ port.pricing?.perKwh ? '/kWh' : '/min' }}
              <span v-if="port.pricing?.sessionFee"> + Rs.{{ port.pricing.sessionFee }} session</span>
            </p>
            <button
              v-if="port.availability === 'available'"
              class="book-btn"
              @click="selectPort(port)"
            >
              Book This Port
            </button>
          </div>
        </div>

        <div class="booking-panel" v-if="selectedPort">
          <h2>Book Charging</h2>
          <p class="selected">Selected: Port {{ selectedPort.portNumber }} ({{ selectedPort.connectorType }})</p>

          <div class="field">
            <label>Start Time</label>
            <input type="datetime-local" v-model="startTime" />
          </div>
          <div class="field">
            <label>End Time</label>
            <input type="datetime-local" v-model="endTime" />
          </div>
          <div class="estimate" v-if="estimatedCost">
            Estimated cost: <strong>Rs. {{ estimatedCost }}</strong>
          </div>

          <div v-if="!isLoggedIn" class="login-prompt">
            <RouterLink to="/user-auth">Login</RouterLink> to book this port
          </div>
          <button v-else class="book-btn full" :disabled="bookingLoading" @click="submitBooking">
            {{ bookingLoading ? 'Creating...' : 'Continue to Payment' }}
          </button>
          <p v-if="bookingError" class="error">{{ bookingError }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchStationLive } from '../services/stations.js'
import { createBooking } from '../services/bookings.js'

const route = useRoute()
const router = useRouter()
const station = ref(null)
const liveStatus = ref({ ports: [], available: 0, totalPorts: 0 })
const loading = ref(true)
const error = ref('')
const selectedPort = ref(null)
const startTime = ref('')
const endTime = ref('')
const bookingLoading = ref(false)
const bookingError = ref('')
let pollTimer = null

const isLoggedIn = computed(() => !!localStorage.getItem('authToken'))

const estimatedCost = computed(() => {
  if (!selectedPort.value || !startTime.value || !endTime.value) return null
  const hours = (new Date(endTime.value) - new Date(startTime.value)) / 3600000
  if (hours <= 0) return null
  const p = selectedPort.value.pricing
  if (p?.perKwh) return Math.round((p.sessionFee || 0) + (selectedPort.value.powerKw || 50) * hours * 0.8 * p.perKwh)
  return Math.round((p?.sessionFee || 0) + hours * 60 * (p?.perMinute || 0))
})

const loadLive = async () => {
  try {
    const data = await fetchStationLive(route.params.id)
    station.value = data.station
    liveStatus.value = data.liveStatus
  } catch (err) {
    error.value = err.response?.data?.message || 'Station not found'
  } finally {
    loading.value = false
  }
}

const selectPort = (port) => {
  selectedPort.value = port
  const now = new Date()
  now.setMinutes(now.getMinutes() + 30 - (now.getMinutes() % 30))
  const end = new Date(now.getTime() + 2 * 60 * 60 * 1000)
  startTime.value = toLocalInput(now)
  endTime.value = toLocalInput(end)
}

const toLocalInput = (d) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const submitBooking = async () => {
  bookingError.value = ''
  if (!startTime.value || !endTime.value) {
    bookingError.value = 'Please select start and end times'
    return
  }
  bookingLoading.value = true
  try {
    const booking = await createBooking({
      stationId: station.value._id,
      portId: selectedPort.value._id,
      startTime: new Date(startTime.value).toISOString(),
      endTime: new Date(endTime.value).toISOString()
    })
    router.push(`/payment/${booking._id}`)
  } catch (err) {
    bookingError.value = err.response?.data?.message || 'Booking failed'
  } finally {
    bookingLoading.value = false
  }
}

onMounted(() => {
  loadLive()
  pollTimer = setInterval(loadLive, 10000)
})

onUnmounted(() => clearInterval(pollTimer))
</script>

<style scoped>
.detail-page { max-width: 1100px; margin: 0 auto; padding: 30px; }
.center { text-align: center; padding: 60px; }
.error { color: #c33; }
.back { color: #00c17c; text-decoration: none; font-weight: 600; }
.header { margin-bottom: 30px; }
.header h1 { font-size: 32px; margin: 10px 0; }
.live-badge { display: inline-flex; align-items: center; gap: 8px; color: #00c17c; font-weight: 600; margin-top: 8px; }
.dot { width: 8px; height: 8px; background: #00c17c; border-radius: 50%; animation: pulse 1.5s infinite; }
@keyframes pulse { 50% { opacity: 0.3; } }
.grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
.ports-panel h2, .booking-panel h2 { margin-bottom: 16px; }
.port-card {
  border: 1px solid #ddd; border-radius: 12px; padding: 16px; margin-bottom: 12px;
  background: white;
}
.port-card.available { border-left: 4px solid #00c17c; }
.port-card.occupied { border-left: 4px solid tomato; opacity: 0.7; }
.port-top { display: flex; justify-content: space-between; align-items: center; }
.badge { font-size: 12px; padding: 4px 10px; border-radius: 12px; background: #eee; text-transform: capitalize; }
.price { color: #555; font-size: 14px; margin: 8px 0; }
.book-btn {
  background: #00c17c; color: white; border: none; padding: 10px 16px;
  border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 8px;
}
.book-btn.full { width: 100%; padding: 14px; }
.book-btn:disabled { background: #999; }
.booking-panel {
  background: #f9fafb; border-radius: 16px; padding: 24px;
  border: 1px solid #e5e7eb; position: sticky; top: 20px; height: fit-content;
}
.field { margin-bottom: 16px; }
.field label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px; }
.field input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; }
.selected { color: #555; margin-bottom: 16px; }
.estimate { background: #e8f8f0; padding: 12px; border-radius: 8px; margin-bottom: 16px; }
.login-prompt a { color: #00c17c; font-weight: 600; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } .booking-panel { position: static; } }
</style>
