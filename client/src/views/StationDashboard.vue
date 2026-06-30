<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarNav from '../components/SidebarNav.vue'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const sidebarOpen = ref(true)
const darkMode = ref(false)

// Mock data for station owner
const stationData = ref({
  stationName: 'City Center EV Charging Hub',
  location: 'Kathmandu, Nepal',
  totalSlots: 10,
  activeSlots: 7,
  revenue: {
    today: 2500,
    month: 45000,
    year: 480000
  },
  bookings: [
    {
      id: 1,
      user: 'John Doe',
      slot: 'Slot 3',
      duration: '2 hours',
      status: 'active',
      amount: 250,
      time: '2:30 PM'
    },
    {
      id: 2,
      user: 'Jane Smith',
      slot: 'Slot 5',
      duration: '1.5 hours',
      status: 'active',
      amount: 180,
      time: '3:00 PM'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      slot: 'Slot 1',
      duration: '3 hours',
      status: 'pending',
      amount: 350,
      time: '4:30 PM'
    }
  ],
  activities: [
    { time: '2:30 PM', action: 'Charging started', slot: 'Slot 3' },
    { time: '1:45 PM', action: 'New booking received', slot: 'Slot 5' },
    { time: '12:15 PM', action: 'Charging completed', slot: 'Slot 2' },
    { time: '11:00 AM', action: 'Maintenance completed', slot: 'Slot 7' }
  ]
})

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('adminAuth')
  localStorage.removeItem('admin')
  router.push('/')
}
</script>

<template>
  <div :class="['dashboard', { 'dark-mode': darkMode }]">
    <!-- Sidebar -->
    <SidebarNav :open="sidebarOpen" active-page="station" />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar -->
      <TopBar
        :dark-mode="darkMode"
        @toggle-dark-mode="darkMode = !darkMode"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @logout="logout"
      />

      <!-- Content -->
      <div class="content">
        <!-- Header -->
        <div class="page-header">
          <h1>Station Dashboard</h1>
          <p>{{ stationData.stationName }}</p>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
              ⚡
            </div>
            <div class="stat-content">
              <p class="stat-label">Active Slots</p>
              <h3>{{ stationData.activeSlots }}/{{ stationData.totalSlots }}</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
              💰
            </div>
            <div class="stat-content">
              <p class="stat-label">Today Revenue</p>
              <h3>Rs. {{ stationData.revenue.today }}</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
              📊
            </div>
            <div class="stat-content">
              <p class="stat-label">Monthly Revenue</p>
              <h3>Rs. {{ stationData.revenue.month }}</h3>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
              📈
            </div>
            <div class="stat-content">
              <p class="stat-label">Yearly Revenue</p>
              <h3>Rs. {{ stationData.revenue.year }}</h3>
            </div>
          </div>
        </div>

        <!-- Main Section -->
        <div class="main-grid">
          <!-- Active Sessions -->
          <div class="card">
            <div class="card-header">
              <h2>🔋 Active Charging Sessions</h2>
              <span class="badge">{{ stationData.bookings.filter(b => b.status === 'active').length }}</span>
            </div>
            <div class="sessions-list">
              <div v-for="booking in stationData.bookings.filter(b => b.status === 'active')" :key="booking.id" class="session-item">
                <div class="session-info">
                  <h4>{{ booking.user }}</h4>
                  <p>{{ booking.slot }} • {{ booking.duration }}</p>
                </div>
                <div class="session-time">{{ booking.time }}</div>
                <div class="session-amount">Rs. {{ booking.amount }}</div>
              </div>
            </div>
          </div>

          <!-- Pending Bookings -->
          <div class="card">
            <div class="card-header">
              <h2>📋 Pending Bookings</h2>
              <span class="badge warning">{{ stationData.bookings.filter(b => b.status === 'pending').length }}</span>
            </div>
            <div class="bookings-list">
              <div v-for="booking in stationData.bookings.filter(b => b.status === 'pending')" :key="booking.id" class="booking-item">
                <div class="booking-info">
                  <h4>{{ booking.user }}</h4>
                  <p>{{ booking.slot }}</p>
                </div>
                <div class="booking-actions">
                  <button class="btn-accept">✓ Accept</button>
                  <button class="btn-reject">✕ Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="bottom-grid">
          <!-- Revenue Chart -->
          <div class="card">
            <div class="card-header">
              <h2>💹 Revenue Trend</h2>
            </div>
            <div class="chart-placeholder">
              <div class="chart-bar" style="height: 40%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
              <div class="chart-bar" style="height: 60%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></div>
              <div class="chart-bar" style="height: 50%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"></div>
              <div class="chart-bar" style="height: 75%; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"></div>
              <div class="chart-bar" style="height: 65%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
              <div class="chart-bar" style="height: 80%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></div>
              <div class="chart-bar" style="height: 70%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"></div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="card-header">
              <h2>📝 Recent Activity</h2>
            </div>
            <div class="activity-list">
              <div v-for="(activity, index) in stationData.activities" :key="index" class="activity-item">
                <div class="activity-dot"></div>
                <div class="activity-content">
                  <p class="activity-action">{{ activity.action }}</p>
                  <p class="activity-slot">{{ activity.slot }}</p>
                </div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="action-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            ⚙️ Manage Station
          </button>
          <button class="action-btn" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            💰 Pricing Settings
          </button>
          <button class="action-btn" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            📊 View Reports
          </button>
          <button class="action-btn" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            🔧 Maintenance
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #f8f9fa;
  transition: background 0.3s ease;
}

.dashboard.dark-mode {
  background: #1a1a1a;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 5px;
}

.dark-mode .page-header h1 {
  color: #fff;
}

.page-header p {
  color: #999;
  font-size: 14px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark-mode .stat-card {
  background: #2a2a2a;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.dark-mode .stat-content h3 {
  color: #fff;
}

.stat-label {
  color: #999;
  font-size: 12px;
  margin: 0 0 5px 0;
  text-transform: uppercase;
  font-weight: 600;
}

/* Cards */
.card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.dark-mode .card {
  background: #2a2a2a;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.dark-mode .card-header {
  border-bottom-color: #3a3a3a;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.dark-mode .card-header h2 {
  color: #fff;
}

.badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge.warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Sessions List */
.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.dark-mode .session-item {
  background: #3a3a3a;
}

.session-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.dark-mode .session-info h4 {
  color: #fff;
}

.session-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.session-time {
  font-size: 12px;
  color: #999;
}

.session-amount {
  font-weight: 600;
  color: #43e97b;
  font-size: 14px;
}

/* Bookings List */
.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #f5576c;
}

.dark-mode .booking-item {
  background: #3a3a3a;
}

.booking-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.dark-mode .booking-info h4 {
  color: #fff;
}

.booking-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.booking-actions {
  display: flex;
  gap: 8px;
}

.btn-accept, .btn-reject {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-accept {
  background: #43e97b;
  color: white;
}

.btn-accept:hover {
  background: #2ac662;
  transform: translateY(-2px);
}

.btn-reject {
  background: #f5576c;
  color: white;
}

.btn-reject:hover {
  background: #e03d54;
  transform: translateY(-2px);
}

/* Grids */
.main-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* Chart */
.chart-placeholder {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: 10px;
  padding: 20px 0;
}

.chart-bar {
  flex: 1;
  border-radius: 8px 8px 0 0;
  min-height: 20px;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 0;
}

.activity-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-top: 2px;
}

.activity-content {
  flex: 1;
}

.activity-action {
  margin: 0 0 3px 0;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
}

.dark-mode .activity-action {
  color: #fff;
}

.activity-slot {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.activity-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-btn {
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    padding: 15px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .main-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .session-item,
  .booking-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .booking-actions {
    width: 100%;
  }
}
</style>
