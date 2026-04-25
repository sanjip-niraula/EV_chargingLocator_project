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
          <span>Live station data</span><br>
          <span>20+ Charging points</span><br>
          <span>10+Districts covered </span><br>
          <span>3 Connector types </span><br>
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
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Base */
.home {
  background: hsl(0, 0%, 100%);
  color: white;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: rgba(0, 20, 40, 0.7);
  backdrop-filter: blur(10px);
}

.logo {
  font-weight: bold;
  font-size: 20px;
  color: #00e5ff;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 25px;
  align-items: center;
}

.nav-links li {
  cursor: pointer;
  opacity: 0.8;
}

.nav-links li.active {
  color: #00e5ff;
}

.nav-links .register {
  border: 1px solid #00e5ff;
  padding: 6px 14px;
  border-radius: 20px;
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

</style>
