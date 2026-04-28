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

      <!--Features Section-->
      <p class="section-tag">About ChargeNP</p>
      <h2>Nepal's first dedicated EV charging locator</h2>
        <p class="descriptions">
          Built for EV drivers who can’t afford surprises — especially on Nepal’s long highway stretches.
        </p>


        <!--Team Member-->
        <h2 class="title">Team</h2>
        <div class="team-container">
          <div class="team-card" v-for="member in team" :key="member.name">
        
            <div class="avatar">
                <img :src="member.image" :alt="member.name" />
                </div>

                <h3 class="name">{{ member.name }}</h3>
                <p class="role">{{ member.role }}</p>
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
const team = [
  {
    name: "Sanjip Niraula",
    role: "Project Head & Backend",
    image: ""
  },
  {
    name: "Aayush Mishra",
    role: "UI/UX & Frontent",
    image: ""
  },
  {
    name: "Rupesh Thakur",
    role: "Backend",
    image: ""
  }
]

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
p{
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


/* Responsive Card*/
@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }

}

.features{

}

 /**Team */
.title {
  font-size: 18px;
  margin-bottom: 20px;
}

.team-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.team-card {
  background: #05231d;
  border: 1px solid #0f3b32;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  transition: 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: #1f8f75;
}

.avatar {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #00d09c;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 16px;
  margin-bottom: 5px;
}

.role {
  font-size: 13px;
  color: #8bd3c7;
}

/* Responsive Team*/
@media (max-width: 900px) {
  .team-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .team-container {
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

/* ResponsiveFooter */
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}

</style>
