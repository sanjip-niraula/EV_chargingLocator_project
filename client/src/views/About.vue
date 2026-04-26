<template>
  <div class="About">
  
      <!-- Heading -->
      <p class="section-tag">About ChargeNP</p>
      <h2>Nepal's first dedicated EV charging locator</h2>

      <p class="description">
        ChargeNP was built to solve a real problem: EV drivers in Nepal had no reliable way 
        to find working chargers before heading out on long trips. We mapped Nepal's entire 
        charging network so you don't have to guess.
      </p>

      <!-- Cards -->
      <div class="cards">
        <div class="card">
          <h4>Our mission</h4>
          <p>
            To remove range anxiety from every EV journey in Nepal by giving drivers accurate,
            real-time information about charging infrastructure across the country.
          </p>
        </div>

        <div class="card">
          <h4>Built for Nepal</h4>
          <p>
            We support Nepal's  major connector standards — CCS2, GB/T, and Type 2 and
            cover NEA stations as well as private hubs across all major highways.
          </p>
        </div>

        <div class="card">
          <h4>Technology</h4>
          <p>
            
          </p>
        </div>

        <div class="card">
          <h4>For station owners</h4>
          <p>
            Register your charging station, manage charger status in real time, and get discovered
            by thousands of EV drivers searching daily.
          </p>
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
.About {
  background: whitesmoke;
  color: white;
  padding: 50px 20px;
}

.container {
  max-width: 1100px;
  margin: auto;
}

.section-tag {
  color: green;
  font-size: 30px;
  margin-bottom: 5px;
}

h2 {
  font-size: 32px;
  margin-bottom: 15px;
  color: black;
}

.description {
  color: black;
  max-width: 700px;
  margin-bottom: 30px;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  background: rgba(0, 0, 0, 0.6);
}

.card h4 {
  margin-bottom: 10px;
}

.card p {
  font-size: 14px;
  color: white;
}


/* Responsive */
@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }

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
}

</style>
