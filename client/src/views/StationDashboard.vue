<template>
  <div class="owner-dashboard">
    <header class="top">
      <div>
        <h1>Station Owner Dashboard</h1>
        <p>{{ user?.businessName || user?.name }}</p>
      </div>
      <button class="logout" @click="logout">Logout</button>
    </header>

    <div class="stats">
      <div class="stat"><span>{{ stats.stations }}</span><label>Stations</label></div>
      <div class="stat"><span>{{ stats.available }}/{{ stats.ports }}</span><label>Ports Available</label></div>
      <div class="stat"><span>Rs. {{ stats.revenue }}</span><label>Revenue</label></div>
      <div class="stat"><span>{{ stats.pendingBookings }}</span><label>Pending Bookings</label></div>
    </div>

    <div class="panels">
      <section class="panel">
        <div class="panel-head">
          <h2>My Stations</h2>
          <button class="btn" @click="showAddStation = true">+ Add Station</button>
        </div>
        <div v-if="stations.length === 0" class="empty">No stations yet. Add your first charging station.</div>
        <div v-for="s in stations" :key="s._id" class="station-item">
          <div>
            <strong>{{ s.name }}</strong>
            <p>{{ s.address?.city }} · {{ s.liveStatus?.available }}/{{ s.liveStatus?.totalPorts }} ports free</p>
          </div>
          <div class="item-actions">
            <button @click="openAddPort(s)">+ Port</button>
            <button @click="loadBookings(s._id)">Bookings</button>
          </div>
        </div>
      </section>

      <section class="panel">
        <h2>Live Port Status</h2>
        <div v-for="port in allPorts" :key="port._id" class="port-row">
          <span>{{ port.stationName }} · Port {{ port.portNumber }}</span>
          <select :value="port.availability" @change="updateStatus(port._id, $event.target.value)">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </section>

      <section class="panel" v-if="bookings.length">
        <h2>Bookings {{ selectedStationName ? `— ${selectedStationName}` : '' }}</h2>
        <div v-for="b in bookings" :key="b._id" class="booking-row">
          <div>
            <strong>{{ b.user?.name }}</strong>
            <p>Port {{ b.port?.portNumber }} · {{ b.status }} · Rs.{{ b.totalCost }}</p>
          </div>
          <div class="booking-actions">
            <button v-if="b.status === 'confirmed'" @click="start(b._id)">Start</button>
            <button v-if="b.status === 'active'" @click="complete(b._id)">Complete</button>
          </div>
        </div>
      </section>
    </div>

    <div v-if="showAddStation" class="modal" @click.self="showAddStation = false">
      <div class="modal-box">
        <h3>Add Charging Station</h3>
        <input v-model="newStation.name" placeholder="Station name" />
        <input v-model="newStation.street" placeholder="Street address" />
        <input v-model="newStation.city" placeholder="City" />
        <input v-model.number="newStation.lat" type="number" step="any" placeholder="Latitude" />
        <input v-model.number="newStation.lon" type="number" step="any" placeholder="Longitude" />
        <textarea v-model="newStation.description" placeholder="Description"></textarea>
        <div class="modal-actions">
          <button @click="showAddStation = false">Cancel</button>
          <button class="btn" :disabled="saving" @click="addStation">{{ saving ? 'Saving...' : 'Create Station' }}</button>
        </div>
      </div>
    </div>

    <div v-if="showAddPortModal" class="modal" @click.self="showAddPortModal = false">
      <div class="modal-box">
        <h3>Add Charger Port — {{ portStation?.name }}</h3>
        <input v-model="newPort.portNumber" placeholder="Port number (e.g. A1)" />
        <select v-model="newPort.connectorType">
          <option value="CCS">CCS</option>
          <option value="Type2">Type2</option>
          <option value="GBT">GBT</option>
          <option value="CHAdeMO">CHAdeMO</option>
        </select>
        <select v-model="newPort.chargeLevel">
          <option value="DC_Fast">DC Fast</option>
          <option value="Level2">Level 2</option>
          <option value="Level1">Level 1</option>
        </select>
        <input v-model.number="newPort.powerKw" type="number" placeholder="Power (kW)" />
        <input v-model.number="newPort.perKwh" type="number" placeholder="Price per kWh (NPR)" />
        <div class="modal-actions">
          <button @click="showAddPortModal = false">Cancel</button>
          <button class="btn" :disabled="saving" @click="addPort">{{ saving ? 'Saving...' : 'Add Port' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  fetchMyStations, createStation, createCharger, updatePortStatus, fetchOwnerTransactions
} from '../services/stations.js'
import { fetchStationBookings, startCharging, completeCharging } from '../services/bookings.js'

const router = useRouter()
const stations = ref([])
const bookings = ref([])
const transactions = ref({ totalRevenue: 0 })
const selectedStationName = ref('')
const showAddStation = ref(false)
const showAddPortModal = ref(false)
const portStation = ref(null)
const saving = ref(false)

const newStation = ref({ name: '', street: '', city: '', lat: 27.7, lon: 85.3, description: '' })
const newPort = ref({ portNumber: '', connectorType: 'CCS', chargeLevel: 'DC_Fast', powerKw: 50, perKwh: 25 })

const user = computed(() => {
  try { return JSON.parse(localStorage.getItem('user') || '{}') } catch { return {} }
})

const allPorts = computed(() =>
  stations.value.flatMap((s) =>
    (s.liveStatus?.ports || []).map((p) => ({ ...p, stationName: s.name }))
  )
)

const stats = computed(() => ({
  stations: stations.value.length,
  ports: allPorts.value.length,
  available: allPorts.value.filter((p) => p.availability === 'available').length,
  revenue: transactions.value.totalRevenue || 0,
  pendingBookings: bookings.value.filter((b) => b.status === 'pending' || b.status === 'confirmed').length
}))

const load = async () => {
  stations.value = await fetchMyStations()
  transactions.value = await fetchOwnerTransactions()
  if (stations.value.length) loadBookings(stations.value[0]._id)
}

const addStation = async () => {
  saving.value = true
  try {
    await createStation({
      name: newStation.value.name,
      description: newStation.value.description,
      address: { street: newStation.value.street, city: newStation.value.city, country: 'Nepal' },
      location: { coordinates: [newStation.value.lon, newStation.value.lat] }
    })
    showAddStation.value = false
    newStation.value = { name: '', street: '', city: '', lat: 27.7, lon: 85.3, description: '' }
    await load()
  } finally {
    saving.value = false
  }
}

const openAddPort = (station) => {
  portStation.value = station
  showAddPortModal.value = true
}

const addPort = async () => {
  saving.value = true
  try {
    await createCharger({
      stationId: portStation.value._id,
      portNumber: newPort.value.portNumber,
      connectorType: newPort.value.connectorType,
      chargeLevel: newPort.value.chargeLevel,
      powerKw: newPort.value.powerKw,
      pricing: { perKwh: newPort.value.perKwh, sessionFee: 50, currency: 'NPR' }
    })
    showAddPortModal.value = false
    await load()
  } finally {
    saving.value = false
  }
}

const updateStatus = async (portId, availability) => {
  await updatePortStatus(portId, availability)
  await load()
}

const loadBookings = async (stationId) => {
  const s = stations.value.find((x) => x._id === stationId)
  selectedStationName.value = s?.name || ''
  bookings.value = await fetchStationBookings(stationId)
}

const start = async (id) => { await startCharging(id); await load() }
const complete = async (id) => { await completeCharging(id, 15); await load() }

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  router.push('/station-login')
}

onMounted(load)
</script>

<style scoped>
.owner-dashboard { max-width: 1100px; margin: 0 auto; padding: 24px; }
.top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.logout { padding: 10px 18px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat { background: white; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.stat span { display: block; font-size: 28px; font-weight: 700; color: #00c17c; }
.stat label { font-size: 13px; color: #666; }
.panels { display: flex; flex-direction: column; gap: 20px; }
.panel { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.btn { background: #00c17c; color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.station-item, .port-row, .booking-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-bottom: 1px solid #f0f0f0;
}
.item-actions button, .booking-actions button {
  margin-left: 8px; padding: 6px 12px; border: 1px solid #00c17c; background: white;
  color: #00c17c; border-radius: 6px; cursor: pointer; font-size: 13px;
}
.empty { color: #888; padding: 20px 0; }
.modal {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex;
  align-items: center; justify-content: center; z-index: 100;
}
.modal-box {
  background: white; border-radius: 16px; padding: 28px; width: 90%; max-width: 440px;
  display: flex; flex-direction: column; gap: 12px;
}
.modal-box input, .modal-box select, .modal-box textarea {
  padding: 12px; border: 1px solid #ddd; border-radius: 8px;
}
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
@media (max-width: 700px) { .stats { grid-template-columns: repeat(2, 1fr); } }
</style>
