<template>
  <div class="user-dashboard">
    <div class="header">
      <h1>My Dashboard</h1>
      <p>Welcome, {{ user?.name }}</p>
      <div class="actions-top">
        <RouterLink to="/find" class="btn primary">Find Stations</RouterLink>
        <button class="btn outline" @click="logout">Logout</button>
      </div>
    </div>

    <div class="tabs">
      <button :class="{ active: tab === 'upcoming' }" @click="tab = 'upcoming'">Upcoming</button>
      <button :class="{ active: tab === 'active' }" @click="tab = 'active'">Active</button>
      <button :class="{ active: tab === 'history' }" @click="tab = 'history'">History</button>
    </div>

    <div v-if="loading" class="loading">Loading bookings...</div>
    <div v-else-if="filteredBookings.length === 0" class="empty">
      <p>No bookings yet.</p>
      <RouterLink to="/find" class="btn primary">Book a charging slot</RouterLink>
    </div>

    <div v-else class="booking-list">
      <div v-for="b in filteredBookings" :key="b._id" class="booking-card">
        <div class="card-top">
          <h3>{{ b.station?.name }}</h3>
          <span class="status" :class="b.status">{{ b.status }}</span>
        </div>
        <p>Port {{ b.port?.portNumber }} · {{ b.port?.connectorType }}</p>
        <p>{{ formatTime(b.startTime) }} – {{ formatTime(b.endTime) }}</p>
        <p class="cost">Rs. {{ b.totalCost || '—' }} · {{ b.paymentStatus }}</p>
        <div v-if="b.checkInCode" class="code">Check-in: <strong>{{ b.checkInCode }}</strong></div>
        <div class="card-actions">
          <RouterLink v-if="b.paymentStatus === 'unpaid' && b.status === 'pending'" :to="`/payment/${b._id}`" class="btn primary sm">
            Pay Now
          </RouterLink>
          <button
            v-if="['pending','confirmed'].includes(b.status)"
            class="btn outline sm"
            @click="cancel(b._id)"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchMyBookings, cancelBooking } from '../services/bookings.js'

const router = useRouter()
const bookings = ref([])
const loading = ref(true)
const tab = ref('upcoming')

const user = computed(() => {
  try { return JSON.parse(localStorage.getItem('user') || '{}') } catch { return {} }
})

const filteredBookings = computed(() => {
  if (tab.value === 'active') return bookings.value.filter((b) => ['confirmed', 'active'].includes(b.status))
  if (tab.value === 'history') return bookings.value.filter((b) => ['completed', 'cancelled'].includes(b.status))
  return bookings.value.filter((b) => ['pending', 'confirmed'].includes(b.status))
})

const formatTime = (t) => new Date(t).toLocaleString()

const load = async () => {
  loading.value = true
  try {
    bookings.value = await fetchMyBookings()
  } finally {
    loading.value = false
  }
}

const cancel = async (id) => {
  if (!confirm('Cancel this booking?')) return
  await cancelBooking(id)
  await load()
}

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  router.push('/user-auth')
}

onMounted(load)
</script>

<style scoped>
.user-dashboard { max-width: 900px; margin: 0 auto; padding: 30px; }
.header { margin-bottom: 24px; }
.actions-top { display: flex; gap: 12px; margin-top: 12px; }
.tabs { display: flex; gap: 8px; margin-bottom: 24px; }
.tabs button {
  padding: 10px 20px; border: none; background: #f3f4f6; border-radius: 8px; cursor: pointer; font-weight: 600;
}
.tabs button.active { background: #00c17c; color: white; }
.btn {
  padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; border: none;
}
.btn.primary { background: #00c17c; color: white; }
.btn.outline { background: white; border: 1px solid #ddd; color: #333; }
.btn.sm { padding: 8px 14px; font-size: 13px; }
.loading, .empty { text-align: center; padding: 40px; color: #666; }
.booking-list { display: flex; flex-direction: column; gap: 16px; }
.booking-card {
  background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.card-top { display: flex; justify-content: space-between; align-items: center; }
.status { font-size: 12px; padding: 4px 10px; border-radius: 12px; background: #eee; text-transform: capitalize; }
.status.confirmed { background: #d1fae5; color: #065f46; }
.status.pending { background: #fef3c7; color: #92400e; }
.status.active { background: #dbeafe; color: #1e40af; }
.cost { font-weight: 600; margin-top: 8px; }
.code { margin-top: 8px; color: #00c17c; }
.card-actions { margin-top: 12px; display: flex; gap: 8px; }
</style>
