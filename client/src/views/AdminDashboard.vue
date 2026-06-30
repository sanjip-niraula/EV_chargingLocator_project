<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarNav from '../components/SidebarNav.vue'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const sidebarOpen = ref(true)
const darkMode = ref(false)

// Mock data for admin
const adminData = ref({
  totalUsers: 1247,
  totalStations: 84,
  totalRevenue: 2450000,
  activeBookings: 156,
  stats: {
    users: { today: 34, growth: '+12%' },
    bookings: { today: 89, growth: '+8%' },
    revenue: { today: 45000, growth: '+15%' },
    stations: { total: 84, active: 78 }
  },
  recentUsers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2 hours ago', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '5 hours ago', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joined: '1 day ago', status: 'inactive' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', joined: '2 days ago', status: 'active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', joined: '3 days ago', status: 'active' }
  ],
  recentTransactions: [
    { id: 1, user: 'John Doe', amount: 500, station: 'City Center', time: '2:30 PM', status: 'completed' },
    { id: 2, user: 'Jane Smith', amount: 350, station: 'Airport Hub', time: '1:45 PM', status: 'completed' },
    { id: 3, user: 'Mike Johnson', amount: 600, station: 'Mall Station', time: '12:15 PM', status: 'pending' },
    { id: 4, user: 'Sarah Williams', amount: 450, station: 'City Center', time: '11:00 AM', status: 'completed' },
    { id: 5, user: 'Tom Brown', amount: 700, station: 'Downtown', time: '9:30 AM', status: 'completed' }
  ],
  systemHealth: {
    uptime: '99.9%',
    responseTime: '120ms',
    errorRate: '0.1%',
    activeConnections: 456
  }
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
    <SidebarNav :open="sidebarOpen" active-page="admin" />

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
          <h1>Admin Dashboard</h1>
          <p>System Overview & Management</p>
        </div>

        <!-- Main Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
              👥
            </div>
            <div class="stat-content">
              <p class="stat-label">Total Users</p>
              <h3>{{ adminData.totalUsers }}</h3>
              <span class="stat-growth">{{ adminData.stats.users.growth }}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
              🔌
            </div>
            <div class="stat-content">
              <p class="stat-label">Charging Stations</p>
              <h3>{{ adminData.totalStations }}</h3>
              <span class="stat-growth">{{ adminData.stats.stations.active }} Active</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
              💰
            </div>
            <div class="stat-content">
              <p class="stat-label">Total Revenue</p>
              <h3>Rs. {{ (adminData.totalRevenue / 100000).toFixed(1) }}L</h3>
              <span class="stat-growth">{{ adminData.stats.revenue.growth }}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
              🎫
            </div>
            <div class="stat-content">
              <p class="stat-label">Active Bookings</p>
              <h3>{{ adminData.activeBookings }}</h3>
              <span class="stat-growth">{{ adminData.stats.bookings.growth }}</span>
            </div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="main-grid">
          <!-- Recent Users -->
          <div class="card">
            <div class="card-header">
              <h2>👥 Recent Users</h2>
              <a href="#" class="view-all">View All →</a>
            </div>
            <div class="table-responsive">
              <table class="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in adminData.recentUsers" :key="user.id">
                    <td>
                      <div class="user-name">
                        <div class="avatar">{{ user.name.charAt(0) }}</div>
                        {{ user.name }}
                      </div>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.joined }}</td>
                    <td>
                      <span :class="['status-badge', user.status]">{{ user.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recent Transactions -->
          <div class="card">
            <div class="card-header">
              <h2>💳 Recent Transactions</h2>
              <a href="#" class="view-all">View All →</a>
            </div>
            <div class="transactions-list">
              <div v-for="transaction in adminData.recentTransactions" :key="transaction.id" class="transaction-item">
                <div class="transaction-info">
                  <h4>{{ transaction.user }}</h4>
                  <p>{{ transaction.station }}</p>
                </div>
                <div class="transaction-amount">Rs. {{ transaction.amount }}</div>
                <div :class="['transaction-status', transaction.status]">{{ transaction.status }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics & System Health -->
        <div class="bottom-grid">
          <!-- Booking Analytics -->
          <div class="card">
            <div class="card-header">
              <h2>📊 Booking Analytics</h2>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <div class="chart-bar" style="height: 45%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
                <div class="chart-bar" style="height: 65%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></div>
                <div class="chart-bar" style="height: 55%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"></div>
                <div class="chart-bar" style="height: 75%; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"></div>
                <div class="chart-bar" style="height: 60%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
                <div class="chart-bar" style="height: 85%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></div>
                <div class="chart-bar" style="height: 70%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"></div>
              </div>
              <div class="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          <!-- System Health -->
          <div class="card">
            <div class="card-header">
              <h2>⚙️ System Health</h2>
            </div>
            <div class="health-metrics">
              <div class="health-item">
                <div class="health-label">Uptime</div>
                <div class="health-value">{{ adminData.systemHealth.uptime }}</div>
                <div class="health-bar">
                  <div class="health-fill" style="width: 99.9%"></div>
                </div>
              </div>
              <div class="health-item">
                <div class="health-label">Response Time</div>
                <div class="health-value">{{ adminData.systemHealth.responseTime }}</div>
                <div class="health-bar">
                  <div class="health-fill" style="width: 85%"></div>
                </div>
              </div>
              <div class="health-item">
                <div class="health-label">Error Rate</div>
                <div class="health-value">{{ adminData.systemHealth.errorRate }}</div>
                <div class="health-bar">
                  <div class="health-fill" style="width: 5%; background: #43e97b"></div>
                </div>
              </div>
              <div class="health-item">
                <div class="health-label">Active Connections</div>
                <div class="health-value">{{ adminData.systemHealth.activeConnections }}</div>
                <div class="health-bar">
                  <div class="health-fill" style="width: 75%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Management Actions -->
        <div class="management-section">
          <h3>Management Actions</h3>
          <div class="action-buttons">
            <button class="action-btn primary">👥 Manage Users</button>
            <button class="action-btn primary">🔌 Manage Stations</button>
            <button class="action-btn primary">📊 View Reports</button>
            <button class="action-btn primary">⚙️ System Settings</button>
            <button class="action-btn danger">🔒 Backup Database</button>
            <button class="action-btn danger">📋 View Logs</button>
          </div>
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
  align-items: flex-start;
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
  font-size: 28px;
  flex-shrink: 0;
}

.stat-content h3 {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 5px 0;
}

.dark-mode .stat-content h3 {
  color: #fff;
}

.stat-label {
  color: #999;
  font-size: 12px;
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
}

.stat-growth {
  color: #43e97b;
  font-size: 12px;
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

.view-all {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #764ba2;
}

/* Tables */
.table-responsive {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table thead tr {
  border-bottom: 2px solid #f0f0f0;
}

.dark-mode .users-table thead tr {
  border-bottom-color: #3a3a3a;
}

.users-table th {
  text-align: left;
  padding: 12px 0;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
}

.users-table td {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.dark-mode .users-table td {
  border-bottom-color: #3a3a3a;
  color: #ccc;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #1a1a1a;
}

.dark-mode .user-name {
  color: #fff;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  background: #e6f7f1;
  color: #43e97b;
}

.status-badge.inactive {
  background: #ffe6e6;
  color: #f5576c;
}

/* Transactions */
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.dark-mode .transaction-item {
  background: #3a3a3a;
}

.transaction-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.dark-mode .transaction-info h4 {
  color: #fff;
}

.transaction-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.transaction-amount {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
}

.dark-mode .transaction-amount {
  color: #fff;
}

.transaction-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}

.transaction-status.completed {
  background: #e6f7f1;
  color: #43e97b;
}

.transaction-status.pending {
  background: #fff3e0;
  color: #ff9800;
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

/* Charts */
.chart-container {
  padding: 20px 0;
}

.chart-placeholder {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: 8px;
  margin-bottom: 15px;
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

.chart-labels {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  color: #999;
}

/* System Health */
.health-metrics {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.health-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.dark-mode .health-item {
  background: #3a3a3a;
}

.health-label {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 5px;
}

.health-value {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.dark-mode .health-value {
  color: #fff;
}

.health-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.dark-mode .health-bar {
  background: #4a4a4a;
}

.health-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

/* Management Section */
.management-section {
  margin-top: 30px;
}

.management-section h3 {
  color: #1a1a1a;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
}

.dark-mode .management-section h3 {
  color: #fff;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.action-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.danger {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
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

  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .main-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .action-buttons {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
