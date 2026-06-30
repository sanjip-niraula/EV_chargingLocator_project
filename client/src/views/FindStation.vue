<template>
  <div class="station-page">
    <div class="page-header">
      <h1>Find Charging Stations</h1>
      <p>Live availability updated every 15 seconds</p>
    </div>

    <div v-if="loading" class="loading">Loading stations...</div>
    <div v-else-if="error" class="error-msg">{{ error }}</div>

    <div v-else class="station-container">
      <div class="filter-panel">
        <h3>Search Filters</h3>
        <div class="form-group">
          <label>Search (city/station)</label>
          <input v-model="searchQuery" type="text" placeholder="Search station..." />
        </div>
        <div class="form-group">
          <label>Connector Type</label>
          <select v-model="connectorType">
            <option value="">All</option>
            <option value="CCS">CCS</option>
            <option value="Type2">Type2</option>
            <option value="GBT">GBT</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
        </div>
        <div class="form-group">
          <label>Minimum Power (kW)</label>
          <input v-model.number="minPower" type="number" placeholder="0" />
        </div>
        <div class="form-group">
          <label>Availability</label>
          <select v-model="availability">
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
        </div>
        <button class="filter-btn" @click="loadStations">Refresh Live Status</button>
      </div>

      <div class="station-list">
        <div v-for="station in filteredStations" :key="station._id" class="station-card">
          <span class="status" :class="station.liveSummary?.status || 'offline'">
            {{ statusLabel(station.liveSummary?.status) }}
          </span>
          <h2>{{ station.name }}</h2>
          <p class="location">{{ station.address?.formatted || station.address?.city }}</p>
          <div class="info-tags">
            <span>Ports: {{ station.liveSummary?.available || 0 }}/{{ station.liveSummary?.totalPorts || 0 }} free</span>
            <span v-if="station.liveSummary?.connectors?.length">
              {{ station.liveSummary.connectors.join(', ') }}
            </span>
            <span v-if="station.liveSummary?.maxPower">Up to {{ station.liveSummary.maxPower }} kW</span>
            <span v-if="station.liveSummary?.minPrice">From Rs. {{ station.liveSummary.minPrice }}/kWh</span>
          </div>
          <div class="live-indicator">
            <span class="pulse"></span> Live
          </div>
          <div class="actions">
            <RouterLink :to="`/stations/${station._id}`" class="details-btn">View & Book</RouterLink>
            <button class="direction-btn" @click="openDirections(station)">Get Directions</button>
          </div>
        </div>
        <div v-if="filteredStations.length === 0" class="no-result">No stations found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchStations } from '../services/stations.js'

const stations = ref([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const connectorType = ref('')
const minPower = ref(0)
const availability = ref('')
let pollTimer = null

const loadStations = async () => {
  try {
    error.value = ''
    const data = await fetchStations({ limit: 50, status: 'active' })
    stations.value = data.stations || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load stations'
  } finally {
    loading.value = false
  }
}

const statusLabel = (s) => {
  if (s === 'available') return 'Available'
  if (s === 'busy') return 'Busy'
  return 'Offline'
}

const filteredStations = computed(() =>
  stations.value.filter((s) => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.address?.city?.toLowerCase().includes(q)
    const matchesConnector =
      !connectorType.value || s.liveSummary?.connectors?.includes(connectorType.value)
    const matchesPower = (s.liveSummary?.maxPower || 0) >= minPower.value
    const matchesAvail =
      !availability.value || s.liveSummary?.status === availability.value
    return matchesSearch && matchesConnector && matchesPower && matchesAvail
  })
)

const openDirections = (station) => {
  const [lon, lat] = station.location?.coordinates || []
  if (lat && lon) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank')
  }
}

onMounted(() => {
  loadStations()
  pollTimer = setInterval(loadStations, 15000)
})

onUnmounted(() => clearInterval(pollTimer))
</script>

<style scoped>
.station-page { min-height: 100vh; background: whitesmoke; padding: 40px; }
.page-header h1 { font-size: 36px; margin-bottom: 10px; color: #111; }
.page-header p { color: #555; }
.loading, .error-msg { padding: 40px; text-align: center; color: #333; }
.error-msg { color: #c33; }
.station-container { display: grid; grid-template-columns: 300px 1fr; gap: 25px; margin-top: 30px; }
.filter-panel { background: #063c33; padding: 25px; border-radius: 16px; color: white; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; margin-bottom: 8px; font-size: 14px; }
.form-group input, .form-group select {
  width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #0f6454;
  background: #08493e; color: white;
}
.filter-btn {
  width: 100%; padding: 14px; border: none; border-radius: 10px;
  background: #18d39e; color: #00231d; font-weight: 700; cursor: pointer;
}
.station-list { display: flex; flex-direction: column; gap: 20px; }
.station-card {
  position: relative; background: #063c33; padding: 25px; border-radius: 16px;
  border: 1px solid #0f6454; color: white;
}
.location { color: #b8ccc7; margin-bottom: 15px; }
.info-tags { display: flex; gap: 10px; flex-wrap: wrap; }
.info-tags span { background: #08493e; padding: 8px 12px; border-radius: 8px; font-size: 13px; }
.live-indicator { display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 13px; color: #18d39e; }
.pulse {
  width: 8px; height: 8px; border-radius: 50%; background: #18d39e;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.actions { margin-top: 20px; display: flex; gap: 12px; }
.details-btn {
  background: #18d39e; color: #00231d; padding: 12px 18px; border-radius: 8px;
  font-weight: bold; text-decoration: none; display: inline-block;
}
.direction-btn {
  background: transparent; color: white; border: 1px solid #18d39e;
  padding: 12px 18px; border-radius: 8px; cursor: pointer;
}
.status {
  position: absolute; top: 20px; right: 20px; padding: 6px 14px;
  border-radius: 20px; font-size: 13px; font-weight: 600;
}
.available { background: rgba(24,211,158,0.2); color: #18d39e; }
.busy { background: rgba(255,99,71,0.2); color: tomato; }
.offline { background: rgba(150,150,150,0.2); color: #aaa; }
.no-result { text-align: center; padding: 30px; background: #063c33; border-radius: 12px; color: white; }
@media (max-width: 768px) { .station-container { grid-template-columns: 1fr; } }
</style>
