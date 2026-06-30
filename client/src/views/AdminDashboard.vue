<template>
  <div class="admin-dashboard">

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">Admin Panel</div>
      <nav class="nav">
        <button 
          v-for="t in tabs" 
          :key="t.id"
          :class="{ active: activeTab === t.id }"
          @click="activeTab = t.id"
        >
          <span class="icon">{{ t.icon }}</span>
          {{ t.label }}
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <header class="header">
        <h1>{{ tabs.find(t => t.id === activeTab).label }}</h1>
        <div class="header-meta">
          <div class="live-pill"><span class="pulse"></span> Live System</div>
        </div>
      </header>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="tab-pane">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="label">Total Users</div>
            <div class="value">{{ stats.users }}</div>
            <div class="trend">+{{ Math.round(stats.users * 0.05) }} this week</div>
          </div>
          <div class="stat-card">
            <div class="label">Total Stations</div>
            <div class="value">{{ stats.stations }}</div>
            <div class="trend">{{ stats.pendingStations }} pending approval</div>
          </div>
          <div class="stat-card">
            <div class="label">Active Ports</div>
            <div class="value">{{ stats.ports }}</div>
            <div class="trend">Across {{ stats.stations }} locations</div>
          </div>
          <div class="stat-card">
            <div class="label">Community Reviews</div>
            <div class="value">{{ stats.reviews }}</div>
            <div class="trend">Avg. Rating: 4.2</div>
          </div>
        </div>

        <div class="grid-2col mt-8">
          <div class="card">
            <h3>Recent User Registrations</h3>
            <div class="list">
              <div v-for="u in recentUsers" :key="u._id" class="list-item">
                <div class="av">{{ u.name[0] }}</div>
                <div class="info">
                  <strong>{{ u.name }}</strong>
                  <span>{{ u.email }}</span>
                </div>
                <div class="tag" :class="u.role">{{ u.role }}</div>
              </div>
            </div>
          </div>
          <div class="card">
            <h3>System Status</h3>
            <div class="health-list">
              <div class="health-item">
                <span>Database Connectivity</span>
                <span class="status-ok">Connected</span>
              </div>
              <div class="health-item">
                <span>API Response Time</span>
                <span>124ms</span>
              </div>
              <div class="health-item">
                <span>Storage Usage</span>
                <span>12% of 50GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stations Tab -->
      <div v-if="activeTab === 'stations'" class="tab-pane">
        <div class="card">
          <div class="table-header">
            <h3>Manage Stations</h3>
            <input type="text" placeholder="Search stations..." class="search" />
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Station Name</th>
                <th>Owner</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in stations" :key="s._id">
                <td><strong>{{ s.name }}</strong></td>
                <td>{{ s.operator?.name || '—' }}</td>
                <td>{{ s.address?.city }}</td>
                <td><span class="tag" :class="s.status">{{ s.status }}</span></td>
                <td>
                  <button class="action-btn" @click="toggleStationStatus(s)">Toggle Status</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="tab-pane">
        <div class="card">
          <div class="table-header">
            <h3>User Management</h3>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in allUsers" :key="u._id">
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td><span class="tag" :class="u.role">{{ u.role }}</span></td>
                <td>{{ new Date(u.createdAt).toLocaleDateString() }}</td>
                <td>
                  <button class="action-btn danger" @click="deleteUser(u._id)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api.js'

const router = useRouter()
const activeTab = ref('overview')
const stats = ref({ users: 0, stations: 0, ports: 0, reviews: 0, pendingStations: 0 })
const recentUsers = ref([])
const stations = ref([])
const allUsers = ref([])

const tabs = [
  { id: 'overview', label: 'Overview', icon: '' },
  { id: 'stations', label: 'Stations', icon: '' },
  { id: 'users', label: 'Users', icon: '' }
]

const loadData = async () => {
  try {
    const [uRes, sRes, rRes] = await Promise.all([
      api.get('/users'),
      api.get('/stations'),
      api.get('/reviews')
    ])
    
    allUsers.value = uRes.data.data.users
    stations.value = sRes.data.data.stations
    const reviews = rRes.data.data.reviews
    
    stats.value = {
      users: allUsers.value.length,
      stations: stations.value.length,
      ports: stations.value.reduce((a, s) => a + (s.liveSummary?.totalPorts || 0), 0),
      reviews: reviews.length,
      pendingStations: stations.value.filter(s => s.status === 'inactive').length
    }
    
    recentUsers.value = [...allUsers.value].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  } catch (err) {
    console.error('Failed to load admin data:', err)
  }
}

const toggleStationStatus = async (station) => {
  const newStatus = station.status === 'active' ? 'inactive' : 'active'
  try {
    await api.put(`/stations/${station._id}`, { status: newStatus })
    loadData()
  } catch (err) {
    alert('Failed to update station.')
  }
}

const deleteUser = async (id) => {
  if (!confirm('Permanently remove this user?')) return
  try {
    await api.delete(`/users/${id}`)
    loadData()
  } catch (err) {
    alert('Failed to delete user.')
  }
}

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  router.push('/')
}

onMounted(loadData)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.admin-dashboard {
  display: flex;
  min-height: calc(100vh - 65px);
  background: #0a0e1a;
  color: #f1f5f9;
  font-family: 'Inter', sans-serif;
}

.sidebar {
  width: 260px;
  background: #0d1323;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
}

.brand {
  font-size: 22px;
  font-weight: 800;
  color: #fbbf24;
  margin-bottom: 40px;
}

.nav {
  flex: 1;
}

.nav button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.nav button.active {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.nav button:hover:not(.active) {
  background: rgba(255,255,255,0.05);
  color: #f1f5f9;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  border-radius: 12px;
  color: #fca5a5;
  font-weight: 700;
  cursor: pointer;
}

.main {
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header h1 { font-size: 32px; font-weight: 800; }

.live-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 229, 157, 0.1);
  color: #00e59d;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse-a 1.5s infinite;
}

@keyframes pulse-a { 0%,100% {opacity:1} 50% {opacity:0.3} }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  background: #111827;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}

.stat-card .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.stat-card .value { font-size: 32px; font-weight: 800; color: #f1f5f9; margin-bottom: 4px; }
.stat-card .trend { font-size: 11px; color: #00e59d; }

.card {
  background: #111827;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255,255,255,0.05);
}

.mt-8 { margin-top: 32px; }
.grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.list { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
.list-item { display: flex; align-items: center; gap: 16px; }
.av { width: 40px; height: 40px; background: #334155; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.info { flex: 1; display: flex; flex-direction: column; }
.info span { font-size: 12px; color: #64748b; }

.tag { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
.tag.user { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
.tag.station_owner { background: rgba(168, 85, 247, 0.1); color: #c084fc; }
.tag.admin { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
.tag.active { background: rgba(0, 229, 157, 0.1); color: #34d399; }
.tag.inactive { background: rgba(239, 68, 68, 0.1); color: #f87171; }

.health-list { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
.health-item { display: flex; justify-content: space-between; font-size: 14px; color: #94a3b8; }
.status-ok { color: #00e59d; font-weight: 700; }

.table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.search { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 16px; border-radius: 12px; color: #f1f5f9; outline: none; width: 240px; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 12px; font-size: 12px; color: #475569; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
.data-table td { padding: 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }

.action-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f1f5f9; padding: 6px 14px; border-radius: 8px; cursor: pointer; }
.action-btn.danger { color: #fca5a5; border-color: rgba(239, 68, 68, 0.2); }
</style>
