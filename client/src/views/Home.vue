<template>
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Live Station Data Across Nepal
        </div>
        <h1 class="hero-title">
          Find EV Chargers.<br />
          <span class="gradient-text">Anywhere in Nepal.</span>
        </h1>
        <p class="hero-sub">
          Real-time charger availability, connector type filters, and one-tap
          Google Maps navigation — built for Nepali EV drivers.
        </p>
        <div class="hero-actions">
          <RouterLink to="/find" class="btn-primary">
            Find Stations Now
          </RouterLink>
          <RouterLink to="/station-login" class="btn-outline">
            Add Your Station
          </RouterLink>
        </div>
        <div class="hero-stats">
          <div class="stat-pill">
            <strong>{{ stats.stations }}+</strong>
            <span>Stations</span>
          </div>
          <div class="stat-pill">
            <strong>{{ stats.ports }}+</strong>
            <span>Charging Ports</span>
          </div>
          <div class="stat-pill">
            <strong>{{ stats.cities }}+</strong>
            <span>Cities Covered</span>
          </div>
          <div class="stat-pill">
            <strong>3</strong>
            <span>Connector Types</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="map-glow"></div>
        <div class="map-card">
          <div class="map-header">
            <span class="map-title">Live Station Map</span>
            <span class="live-badge"><span class="pulse-dot"></span> Live</span>
          </div>
          <div class="fake-map">
            <div class="map-pin pin-1" title="Kathmandu - 4/5 free">
              <div class="pin-icon available">A</div>
              <div class="pin-label">Kathmandu</div>
            </div>
            <div class="map-pin pin-2" title="Pokhara - 2/3 free">
              <div class="pin-icon busy">B</div>
              <div class="pin-label">Pokhara</div>
            </div>
            <div class="map-pin pin-3" title="Lalitpur - 3/3 free">
              <div class="pin-icon available">A</div>
              <div class="pin-label">Lalitpur</div>
            </div>
            <div class="map-pin pin-4" title="Bhaktapur - offline">
              <div class="pin-icon offline">O</div>
              <div class="pin-label">Bhaktapur</div>
            </div>
            <div class="map-pin pin-5" title="Chitwan - 1/2 free">
              <div class="pin-icon available">A</div>
              <div class="pin-label">Chitwan</div>
            </div>
            <div class="map-roads"></div>
          </div>
          <div class="map-legend">
            <span class="legend-item"><span class="dot available"></span> Available</span>
            <span class="legend-item"><span class="dot busy"></span> Busy</span>
            <span class="legend-item"><span class="dot offline"></span> Offline</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-label">Why ChargeNP?</div>
      <h2 class="section-title">Everything an EV driver needs</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Real-Time Map</h3>
          <p>See all nearby charging stations on an interactive map with live availability status updated every 15 seconds.</p>
        </div>
        <div class="feature-card">
          <h3>Live Availability</h3>
          <p>Know exactly which ports are free before you leave. Filter by connector type (CCS, Type2, GBT, CHAdeMO) and charge speed.</p>
        </div>
        <div class="feature-card">
          <h3>Transparent Pricing</h3>
          <p>View per-kWh and per-minute pricing upfront. Compare stations and find the best rates near you.</p>
        </div>
        <div class="feature-card">
          <h3>One-Tap Navigation</h3>
          <p>Get turn-by-turn directions via Google Maps directly from the station listing. Never get lost again.</p>
        </div>
        <div class="feature-card">
          <h3>User Reviews</h3>
          <p>Read honest ratings and reviews from the EV community. Share your own experience to help fellow drivers.</p>
        </div>
        <div class="feature-card">
          <h3>Station Management</h3>
          <p>Station owners get a powerful dashboard to manage ports, update live status, add pricing, and respond to reviews.</p>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="how-it-works">
      <div class="section-label">Simple Process</div>
      <h2 class="section-title">How ChargeNP works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">01</div>
          <h3>Find a Station</h3>
          <p>Search by location or browse the map to find the nearest available EV charging station.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">02</div>
          <h3>Check Live Status</h3>
          <p>View real-time port availability, connector types, pricing and operating hours.</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">03</div>
          <h3>Navigate & Charge</h3>
          <p>Tap "Get Directions" to open Google Maps navigation and head to the station to charge.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-card">
        <div class="cta-glow"></div>
        <h2>Own an EV Charging Station?</h2>
        <p>Join ChargeNP and get your station listed in minutes. Manage ports, monitor live status, and connect with EV drivers across Nepal.</p>
        <div class="cta-actions">
          <RouterLink to="/station-login" class="btn-primary">
            List Your Station — It's Free
          </RouterLink>
          <RouterLink to="/find" class="btn-ghost">
            Browse Stations →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-brand">
        <div class="footer-logo">ChargeNP</div>
        <p>Built for Nepal's growing EV community.</p>
      </div>
      <div class="footer-links">
        <RouterLink to="/find">Find Stations</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/station-login">Station Owner</RouterLink>
      </div>
      <div class="footer-copy">© 2026 ChargeNP. All rights reserved.</div>
    </footer>

  </div>
    <div class="page">
                <!-- HERO -->
        <section class="hero">
            <div class="left">
                <div class="badge"> 
                    ⚡ Powering Nepal's EV Future
                </div>
                <h1> Find EV Chargers. <br> Anywhere in
                    <span> Nepal </span>
                </h1>
                <p>
                    Real-time availability, connector type filters, and one-tap
                    navigation — built for Nepali EV drivers.
                </p>
                <div class="search">
                    <div class="input">🔍
                        <span> Search location (e.g. Kathmandu) </span>
                    </div>
                    <button> ➤ Find Chargers </button>
                </div>
                
                <!-- CARDS -->
                 <div class="cards">
                    <div class="card">
                        <div class="icon green"> ▥ </div>
                        <div>
                            <strong> Live Data </strong><br>
                            <small> Real-time station availability </small>
                        </div>
                    </div>

                    <div class="card">
                        <div class="icon yellow"> 🔋 </div>
                        <div>
                            <strong> 20+ </strong><br>
                            <small> Charging Points </small>
                        </div>
                    </div>

                    <div class="card">
                        <div class="icon green"> 📍 </div>
                        <div>
                            <strong> 10+ </strong><br>
                            <small> Districts Covered </small>
                        </div>
                    </div>

                    <div class="card">
                        <div class="icon blue">🔌</div>
                        <div>
                            <strong> 3 </strong><br>
                            <small> Connector Types </small>
                        </div>
                    </div>
                </div>

                <div class="made">
                    🌱 Free to use. Always will be.<span></span> 
                    Made with ❤️ in Nepal 🇳🇵
                </div>
            </div>


            <!-- RIGHT MAP -->
             <div class="right">
                <div class="map-card"> </div>
            </div>
        </section>
        
        
        <!-- FEATURES -->
        <section class="features">
            <div>
                <div class="feature-icon"> 🧭 </div>
                <div>
                    <b>One-tap Navigation </b>
                    <p> Open in Google Maps </p>
                </div>
            </div>
            
            <div>
                <div class="feature-icon"> 🔧 </div>
                <div>
                    <b> Smart Filters</b>
                    <p> Connector type & availability </p>
                </div>
            </div>
            
            <div>
                <div class="feature-icon"> 🛡️ </div>
                <div>
                    <b> Trusted & Open </b>
                    <p> OpenStreetMap data you can trust </p>
                </div>
            </div>
        </section>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { fetchStations } from '../services/stations.js'

const stats = ref({ stations: 0, ports: 0, cities: 0 })

onMounted(async () => {
  try {
    const data = await fetchStations({ limit: 100, status: 'active' })
    const stations = data.stations || []
    const cities = new Set(stations.map(s => s.address?.city).filter(Boolean))
    const ports = stations.reduce((sum, s) => sum + (s.liveSummary?.totalPorts || 0), 0)
    stats.value = {
      stations: stations.length || 20,
      ports: ports || 60,
      cities: cities.size || 10
    }
  } catch {
    stats.value = { stations: 20, ports: 60, cities: 10 }
  }
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.home {
  font-family: 'Inter', sans-serif;
  background: #0a0e1a;
  color: #f1f5f9;
  min-height: 100vh;
}

/* ── Hero ── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 80px 80px 100px;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 229, 157, 0.12);
  border: 1px solid rgba(0, 229, 157, 0.3);
  color: #00e59d;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 28px;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00e59d;
  animation: pulse-badge 2s infinite;
}

@keyframes pulse-badge {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-title {
  font-size: 58px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
}

.gradient-text {
  background: linear-gradient(135deg, #00e59d, #00b4d8, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #00e59d, #00b4a0);
  color: #0a1a0e;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 8px 32px rgba(0, 229, 157, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 229, 157, 0.45);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #e2e8f0;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.btn-outline:hover {
  border-color: #00e59d;
  color: #00e59d;
}

.hero-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 20px;
  text-align: center;
}

.stat-pill strong {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: #00e59d;
}

.stat-pill span {
  font-size: 12px;
  color: #64748b;
}

/* Map Visual */
.hero-visual {
  position: relative;
}

.map-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(ellipse at center, rgba(0, 229, 157, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.map-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 20px;
  backdrop-filter: blur(12px);
  position: relative;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.map-title {
  font-weight: 700;
  font-size: 15px;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 229, 157, 0.15);
  color: #00e59d;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00e59d;
  animation: pulse-badge 1.5s infinite;
}

.fake-map {
  position: relative;
  height: 320px;
  background: linear-gradient(160deg, #0f1a2e 0%, #0d2142 50%, #0a1620 100%);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
}

.map-roads {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.05) 50%, transparent 52%),
    linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.05) 50%, transparent 52%),
    linear-gradient(135deg, transparent 48%, rgba(255,255,255,0.03) 50%, transparent 52%);
}

.map-pin {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  animation: float 3s ease-in-out infinite;
}

.pin-1 { top: 30%; left: 45%; animation-delay: 0s; }
.pin-2 { top: 55%; left: 20%; animation-delay: 0.5s; }
.pin-3 { top: 40%; left: 60%; animation-delay: 1s; }
.pin-4 { top: 20%; left: 65%; animation-delay: 1.5s; }
.pin-5 { top: 70%; left: 55%; animation-delay: 2s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.pin-icon {
  width: 36px;
  height: 36px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.3s;
}

.pin-icon span { transform: rotate(45deg); }

.pin-icon.available {
  background: rgba(0, 229, 157, 0.9);
  box-shadow: 0 0 20px rgba(0, 229, 157, 0.5);
}

.pin-icon.busy {
  background: rgba(239, 68, 68, 0.9);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.pin-icon.offline {
  background: rgba(100, 116, 139, 0.9);
}

.pin-label {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

.map-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.available { background: #00e59d; }
.dot.busy { background: #ef4444; }
.dot.offline { background: #64748b; }

/* ── Features ── */
.features {
  padding: 100px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  color: #00e59d;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-title {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 56px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(0, 229, 157, 0.3);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.feature-card p {
  color: #64748b;
  line-height: 1.7;
  font-size: 14px;
}

/* ── How It Works ── */
.how-it-works {
  padding: 80px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.how-it-works .section-label,
.how-it-works .section-title {
  text-align: center;
}

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.step {
  text-align: center;
  flex: 1;
}

.step-number {
  font-size: 11px;
  font-weight: 800;
  color: #00e59d;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.step-icon {
  font-size: 44px;
  margin-bottom: 16px;
}

.step h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.step p {
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.step-arrow {
  font-size: 28px;
  color: #334155;
  flex-shrink: 0;
  margin-top: -20px;
}

/* ── CTA ── */
.cta-section {
  padding: 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.cta-card {
  position: relative;
  background: linear-gradient(135deg, #0f2a1e, #0a1f2e);
  border: 1px solid rgba(0, 229, 157, 0.2);
  border-radius: 28px;
  padding: 64px;
  text-align: center;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(0, 229, 157, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-card h2 {
  font-size: 38px;
  font-weight: 800;
  margin-bottom: 16px;
  position: relative;
}

.cta-card p {
  color: #94a3b8;
  font-size: 17px;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto 36px;
  position: relative;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  color: #94a3b8;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s;
}

.btn-ghost:hover { color: #00e59d; }

/* ── Footer ── */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 40px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-logo {
  font-size: 22px;
  font-weight: 800;
  color: #00e59d;
  margin-bottom: 6px;
}

.footer-brand p {
  color: #475569;
  font-size: 13px;
}

.footer-links {
  display: flex;
  gap: 28px;
}

.footer-links a {
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-links a:hover { color: #00e59d; }

.footer-copy {
  color: #334155;
  font-size: 13px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 60px 40px;
  }
  .hero-title { font-size: 42px; }
  .features { padding: 60px 40px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .how-it-works { padding: 60px 40px; }
  .cta-section { padding: 60px 40px; }
  .footer { padding: 40px; }
}

@media (max-width: 640px) {
  .hero { padding: 40px 20px; }
  .hero-title { font-size: 34px; }
  .features { padding: 40px 20px; }
  .features-grid { grid-template-columns: 1fr; }
  .steps { flex-direction: column; }
  .step-arrow { transform: rotate(90deg); margin: 0; }
  .how-it-works { padding: 40px 20px; }
  .cta-section { padding: 40px 20px; }
  .cta-card { padding: 40px 24px; }
  .cta-card h2 { font-size: 26px; }
  .footer { flex-direction: column; text-align: center; padding: 30px 20px; }
}
</style>
*{
box-sizing:border-box;
}

.page{
min-height:100vh;
font-family:
Inter,
Arial,
sans-serif;
background:
radial-gradient(
circle at right bottom,
#e9fff0,
transparent 35%
),
white;
color:#101828;
}

/* HERO */
.hero{
display:grid;
grid-template-columns:
1fr 1fr;
gap:55px;
padding:55px 65px;
}

.badge{
display:inline-block;
padding:10px 18px;
border-radius:25px;
border:1px solid #d8ecd9;
color:#079447;
background:#f7fff8;
}

h1{
font-size:72px;
line-height:1.15;
letter-spacing:-2px;
margin:25px 0;
color: black;
}

h1 span{
color:#29aa4c;
position:relative;
}

h1 span:after{
content:"";
position:absolute;
left:0;
bottom:-8px;
width:100%;
height:5px;
background:#29aa4c;
border-radius:50%;
}

.left p{
font-size:20px;
color:#718096;
max-width:650px;
line-height:1.6;
}

/* SEARCH */
.search{
height:80px;
background:white;
border-radius:18px;
display:flex;
padding:10px;
box-shadow:
0 10px 30px rgba(0,0,0,.08);
margin:30px 0;
}

.input{
flex:1;
display:flex;
align-items:center;
gap:15px;
padding-left:20px;
color:#8993a4;
font-size:17px;
}

.search button{
width:210px;
border:none;
border-radius:15px;
background:#23a847;
color:white;
font-size:17px;
}

/* CARDS */
.cards{
display:grid;
grid-template-columns:
repeat(4,1fr);
gap:12px;
}

.card{
background:white;
border-radius:18px;
padding:18px;
display:flex;
gap:12px;
box-shadow:
0 5px 20px rgba(0,0,0,.07);
}

.card small{
display:block;
color:#718096;
margin-top:8px;
}

.icon{
width:42px;
height:42px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
}

.green{
background:#ddffe8;
}

.yellow{
background:#fff2ce;
}

.blue{
background:#dceeff;
}

.made{
margin-top:25px;
padding:20px;
border:1px solid #c9e9ce;
border-radius:15px;
text-align:center;
color:#0b9147;
}

.made span{
margin:0 20px;
border-left:1px solid #aaa;
}

/* MAP */
.map-card{
height:560px;
border-radius:35px;
overflow:hidden;
position:relative;
background:#dff7e8;
box-shadow:
0 20px 50px rgba(0,0,0,.1);
}

.map-card img{
width:100%;
height:100%;
object-fit:cover;
}

.marker{
position:absolute;
height:48px;
width:48px;
border-radius:50%;
background:#13a653;
color:white;
display:flex;
align-items:center;
justify-content:center;
border:5px solid white;
}

.status{
position:absolute;
bottom:20px;
left:20px;
right:20px;
background:white;
padding:18px;
border-radius:15px;
}

.status span{
color:#079447;
}

.status label{
float:right;
color:#555;
}

/* FEATURES */
.features{
display:flex;
justify-content:space-around;
padding:35px 65px;
background:white;
}

.features>div{
display:flex;
gap:15px;
align-items:center;
}

.feature-icon{
width:45px;
height:45px;
border-radius:50%;
background:#eaffef;
display:flex;
align-items:center;
justify-content:center;

}

.features p{
margin:5px 0;
color:#718096;
}

@media(max-width:1000px){
.hero{
grid-template-columns:1fr;
}

.cards{
grid-template-columns:
repeat(2,1fr);
}

.header nav{
display:none;
}

}

</style>
