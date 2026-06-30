<template>
  <div class="about-page">
    
    <!-- Hero Section -->
    <header class="about-hero">
      <div class="hero-content">
        <h1 class="gradient-text">Nepal's First Dedicated EV Charging Network</h1>
        <p class="hero-sub">
          ChargeNP was built to solve a real problem: EV drivers in Nepal had no reliable way 
          to find working chargers before heading out on long trips. We've mapped the entire 
          network so you can drive with confidence.
        </p>
      </div>
      <div class="hero-glow"></div>
    </header>

    <!-- Mission & Vision -->
    <section class="mission-section">
      <div class="section-grid">
        <div class="card glass">
          <h3>Our Mission</h3>
          <p>To eliminate "range anxiety" from every EV journey in Nepal by providing accurate, real-time data on every charging station across the country.</p>
        </div>
        <div class="card glass">
          <h3>Built for Nepal</h3>
          <p>We support all major standards—CCS2, GB/T, and Type 2—covering NEA stations as well as private hubs across major highway arteries.</p>
        </div>
        <div class="card glass">
          <h3>For Owners</h3>
          <p>We provide station owners with the digital tools needed to manage their ports, monitor status, and connect with a growing community of drivers.</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <h2 class="section-title">Everything you need on the road</h2>
      <div class="features-list">
        <div class="feature-item">
          <div class="f-text">
            <h4>Live Status Map</h4>
            <p>Every district covered. Colour-coded pins update every 15 seconds—green means free, red means occupied.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="f-text">
            <h4>Seamless Navigation</h4>
            <p>One-tap handoff to Google Maps for turn-by-turn directions. No copy-pasting coordinates required.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="f-text">
            <h4>Trusted Community</h4>
            <p>Read honest ratings and photos from fellow drivers before you arrive. Know the charger quality upfront.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section">
      <h2 class="section-title">Meet the Team</h2>
      <div class="team-grid">
        <div v-for="m in team" :key="m.name" class="team-card">
          <div class="member-av">{{ m.name[0] }}</div>
          <h4>{{ m.name }}</h4>
          <p>{{ m.role }}</p>
        </div>
      </div>
    </section>

    <footer class="about-footer">
      <div class="footer-inner">
        <div class="footer-logo">ChargeNP</div>
        <p>© 2026. Built for Nepal’s EV drivers.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const team = [
  { name: "Sanjip Niraula", role: "Project Head & Backend" },
  { name: "Aayush Mishra", role: "UI/UX & Frontend" },
  { name: "Rupesh Thakur", role: "Backend Architecture" }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.about-page {
  background: #0a0e1a;
  color: #f1f5f9;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.about-hero {
  position: relative;
  padding: 100px 60px;
  text-align: center;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.hero-content {
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.gradient-text {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #00e59d, #00b4d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-sub {
  font-size: 18px;
  color: #94a3b8;
  line-height: 1.7;
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 229, 157, 0.08) 0%, transparent 70%);
}

.mission-section {
  padding: 80px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card.glass {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 32px;
  border-radius: 24px;
  transition: transform 0.3s;
}

.card.glass:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.05);
  border-color: rgba(0, 229, 157, 0.3);
}

.card-icon { font-size: 40px; margin-bottom: 20px; }
.card h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
.card p { font-size: 15px; color: #64748b; line-height: 1.6; }

.features-section {
  padding: 80px 60px;
  background: rgba(255,255,255,0.01);
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 60px;
}

.features-list {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-item {
  text-align: center;
}

.f-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.f-text h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.f-text p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.team-section {
  padding: 100px 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.team-card {
  background: rgba(255,255,255,0.03);
  padding: 40px 20px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.05);
}

.member-av {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #00e59d;
  border: 2px solid rgba(0, 229, 157, 0.4);
}

.team-card h4 { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.team-card p { font-size: 13px; color: #64748b; }

.about-footer {
  padding: 60px;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
}

.footer-logo {
  font-size: 24px;
  font-weight: 800;
  color: #00e59d;
  margin-bottom: 8px;
}

.footer-inner p {
  color: #334155;
  font-size: 14px;
}

@media (max-width: 900px) {
  .section-grid, .features-list, .team-grid { grid-template-columns: 1fr; }
  .gradient-text { font-size: 38px; }
  .about-hero { padding: 60px 20px; }
}
</style>
