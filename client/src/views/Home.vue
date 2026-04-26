<template>
  <div class="home">
  
    <!-- Hero Section -->
    <div class="hero">

      <!-- Left Content -->
      <div class="hero-text">

        <h1>
          Find EV Chargers.<br />Anywhere in Nepal.
        </h1>

        <p>
          Real-time availability, connector type filters, and one-tap Google
            Maps navigation — built for Nepali EV drivers.
        </p>

        <div class="buttons">
          <button class="primary">Open the Locator</button>
          <button class="secondary">About us</button>
        </div>

        <div class="tags">
          <span>Live station data</span>
          <span>20+ Charging points</span>
          <span>10+Districts covered </span>
          <span>3 Connector types </span>
          <span>Free to use</span>
        </div>
      </div>

      <!-- Map Section -->
      <div class="map-card">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html"
          frameborder="0"
        ></iframe>
      </div>
    </div>


    <!-- CTA Section -->
    <div class="cta">
      <h2>Never range-anxiety again.</h2>
      <p>
        Join EV drivers across Nepal who plan smarter, drive further,
        and charge with confidence.
      </p>

      <div class="buttons">
        <button class="primary">Start locating stations</button>
        <button class="secondary">Add your station</button>
      </div>
    </div>
    <!-- Footer -->
      <div class="footer-center">
        © 2026 ChargeNP. Built for Nepal’s EV drivers.
      </div>

      <div class="footer-right">
        <a href="#">Terms</a>
        <a href="find">Add station</a>
        <a href="About">About</a>
      </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
/* Base */
.home {
  background: whitesmoke;
  color: white;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}


/* Hero */
.hero{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px;
  gap: 40px;
  border-radius: 10px;
}

/* Text Section */
.hero-text {
  max-width: 600px;
}

.badge {
  background: rgba(0, 229, 255, 0.1);
  color: #00e5ff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}

h1 {
  color: black;
  font-size: 60px;
  line-height: 1.1;
  margin: 5px;
  margin-left: 2px;
}

p {
  color: hsl(0, 0%, 0%);
  margin-bottom: 25px;
}

/* Buttons */
.buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.primary {
  background: #00e5ff;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  color: black;
  font-weight: bold;
  cursor: pointer;
}

.secondary {
  background: transparent;
  border: 1px solid #00e5ff;
  padding: 12px 20px;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  cursor: pointer;
}

/* Tags */
.tags{
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.tags span {
  margin-right: 10px;
  font-size: 20px;
  background: rgba(66, 64, 64, 0.959);
  padding: 5px 20px;
  border-radius: 12px;
}

/* Map Card */
.map-card {
  position: relative;
  width: 550px;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
  background: #111;
}

.map-card iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.cta-footer {
  background: linear-gradient(180deg, #021a12, #01110c);
  color: Black;
}

/* CTA */
.cta {
  text-align: center;
  padding: 80px 20px 60px;
}

.cta h2 {
  color: green;
  font-size: 28px;
  margin-bottom: 10px;
}

.cta p {
  color: black;
  font-size: 14px;
  margin-bottom: 25px;
}

/* Buttons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.primary {
  background: #10b981;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  color: Black;
  cursor: pointer;
  font-weight: 500;
}

.secondary {
  background: transparent;
  border: 1px solid #10b981;
  padding: 12px 22px;
  border-radius: 8px;
  color: Black;
  cursor: pointer;
}

/* Footer */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

/* Center */
.footer-center {
  color: black;
}

/* Right */
.footer-right a {
  margin-left: 15px;
  color: Black;
  text-decoration: none;
}

.footer-right a:hover {
  color: Green;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  .hero{
     flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}

</style>
