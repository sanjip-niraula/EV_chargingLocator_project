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

    <!-- ================= HERO SECTION ================= -->
    <section class="about-hero">
      <div class="hero-left">
        <span class="tag">
          ⚡ About ChargeNP
        </span>
        <h1>
          Powering Nepal's
          <span>EV Journey</span>
        </h1>
        <p>
          ChargeNP is Nepal's first dedicated platform to help EV drivers
          find reliable charging stations across the country with real-time
          information.
        </p>

        <div class="hero-buttons">
          <button class="primary-btn">
            📍 Explore Stations
          </button>

          <button class="outline-btn">
            ✉ Contact Us
          </button>
        </div>

        <div class="hero-features">
          <div>
            ⚡ Real-time Updates
          </div>

          <div>
            🗺 Google Maps Navigation
          </div>

          <div>
            🇳🇵 Built for Nepal
          </div>

        </div>
      </div>

      <div class="hero-image">
        <img src="" alt="EV Charging Car"/>
      </div>
    </section>

    <!-- ================= STATISTICS ================= -->
    <section class="stats-section">
      <div class="stat-card" v-for="stat in statistics" :key="stat.title" >
        <div class="stat-icon">
          {{stat.icon}}
        </div>
        <h2>
          {{stat.number}}
        </h2>
        <h4>
          {{stat.title}}
        </h4>
        <p>
          {{stat.desc}}
        </p>
      </div>
    </section>

    <!-- ================= OUR STORY ================= -->
    <section class="story-section">
      <div class="story-content">
        <span class="section-label">
          OUR STORY
        </span>

        <h2>
          Built from a need.
          Driven by a mission.
        </h2>

        <p>
          Many EV drivers in Nepal face uncertainty on the road —
          not knowing where the next charging station is, whether it is
          available, or how much it will cost.
        </p>

        <p>
          ChargeNP was created to solve this real problem by building
          a platform that provides accurate, real-time, and easy-to-access
          charging information across Nepal.
        </p>

        <button class="story-btn">
          Made with ❤️ in Nepal for EV drivers
        </button>
      </div>

      <div class="mission-grid">
        <div class="info-card" v-for="item in missions" :key="item.title" >
          <div class="info-icon">
            {{item.icon}}
          </div>

          <h3>
            {{item.title}}
          </h3>

          <p>
            {{item.description}}
          </p>
        </div>
      </div>
    </section>

    <!-- ================= ROAD FEATURES ================= -->
    <section class="road-section">
      <h2>
        What you get on the road
      </h2>

      <div class="road-grid">
        <div class="road-card" v-for="feature in roadFeatures" :key="feature.title" >
          <div class="road-icon">
            {{feature.icon}}
          </div>

          <h3>
            {{feature.title}}
          </h3>

          <p>
            {{feature.desc}}
          </p>
        </div>
      </div>
    </section>

    <!-- ================= WHY CHOOSE + TECHNOLOGY ================= -->
    <section class="choose-section">
      <div class="choose-box">
        <h2>
          Why Choose ChargeNP?
        </h2>

        <ul>
          <li v-for="item in chooseList" :key="item" >
            ✔ {{item}}
          </li>
        </ul>

      </div>

      <div class="technology-box">
        <h2>
          Built with modern technology
        </h2>

        <div class="tech-grid">
          <div class="tech-item" v-for="tech in technologies" :key="tech.name" >
            <img :src="tech.logo" :alt="tech.name" />
            <span>
              {{tech.name}}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= TEAM ================= -->
    <section class="team-section">
      <h2> Meet The Team </h2>
      <div class="team-grid">
        <div class="team-card" v-for="member in team" :key="member.name" >
          <div class="avatar">
            <img :src="member.image" :alt="member.name" />
          </div>

          <h3>
            {{member.name}}
          </h3>

          <span>
            {{member.role}}
          </span>

          <p>
            {{member.desc}}
          </p>

          <div class="social">
            <a href="#"> Github </a>
            <a href="#"> LinkedIn </a>
            <a href="#"> Email </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= ROADMAP ================= -->
    <section class="roadmap-section">
      <h2> Roadmap </h2>
      <div class="roadmap">
        <div v-for="item in roadmap" :key="item.title" class="road-item" >
          <div class="circle"> ✔ </div>
          <h4>
            {{item.title}}
          </h4>

          <p>
            {{item.status}}
          </p>
        </div>
      </div>

    </section>

    <!-- ================= FOOTER ================= -->
    <footer class="footer">
      <div>
        <h2> ⚡ ChargeNP </h2>
        <p>
          Powering Nepal's EV future
          one charge at a time.
        </p>
      </div>
    </section>

    <footer class="about-footer">
      <div class="footer-inner">
        <div class="footer-logo">ChargeNP</div>
        <p>© 2026. Built for Nepal’s EV drivers.</p>
      </div>
    </footer>
      <div>
        <h4> Quick Links </h4>
        <a href="#"> Home </a>
        <a href="#"> Find Stations </a>
        <a href="#"> About </a>
      </div>

      <div>
        <h4> For Users </h4>
        <a href="#"> How it Works </a>
        <a href="#"> FAQs </a>
        <a href="#"> Reviews </a>
      </div>

      <div>
        <h4> Legal </h4>
        <a href="#"> Terms </a>
        <a href="#"> Privacy </a>
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

const statistics = [
{
icon:"🔋",
number:"250+",
title:"Charging Stations",
desc:"And growing every day"
},

{
icon:"🗺",
number:"77",
title:"Districts Covered",
desc:"Across all of Nepal"
},

{
icon:"🔌",
number:"3+",
title:"Connector Types",
desc:"CCS2, GB/T, Type 2"
},

{
icon:"🕒",
number:"",
title:"Real-time Updates",
desc:"Live availability status"
}

]

const missions=[
{
icon:"🎯",
title:"Our Mission",
description:"To eliminate range anxiety by providing accurate real-time information about charging infrastructure in Nepal."
},

{
icon:"👁",
title:"Our Vision",
description:"A future where every EV driver in Nepal can travel with confidence and ease."
},

{
icon:"🇳🇵",
title:"Built for Nepal",
description:"Supporting Nepal's major highways, cities and remote routes."
},

{
icon:"👥",
title:"For Station Owners",
description:"Grow your visibility and manage stations in real time."
}
]

const roadFeatures=[
{
icon:"🗺",
title:"Live Station Map",
desc:"Interactive map with real-time station status."
},

{
icon:"➤",
title:"Google Navigation",
desc:"One tap navigation using Google Maps."
},

{
icon:"⚡",
title:"Real-time Availability",
desc:"Know charger status before you go."
},

{
icon:"⭐",
title:"Ratings & Reviews",
desc:"Check ratings and feedback."
},

{
icon:"🏢",
title:"Owner Dashboard",
desc:"Manage stations easily."
}
]

const chooseList=[
"Accurate real-time data",
"Nationwide coverage",
"Smart search & filters",
"Multiple connector support",
"Fast Google Maps navigation",
"Community reviews",
"Easy responsive UI",
"Free for everyone"
]

const technologies=[
{
name:"Vue.js",
logo:"/images/vue.png"
},

{
name:"Express",
logo:"E"
},

{
name:"MongoDB",
logo:"M Db"
},

{
name:"Google Maps",
logo:"G M"
},

]

const team=[
{
name:"Sanjip Niraula",
role:"Project Head & Backend",
desc:"Leads backend development and system architecture.",
image:"SN"
},

{
name:"Aayush Mishra",
role:"UI/UX & Frontend",
desc:"Designs beautiful interfaces and user experiences.",
image:"AM"
},

{
name:"Rupesh Thakur",
role:"Backend Developer",
desc:"Builds APIs and ensures smooth performance.",
image:"RT"
}
]

const roadmap=[
{
title:"Live Station Map",
status:"Completed"
},

{
title:"Real-time Updates",
status:"Completed"
},

{
title:"Reviews & Ratings",
status:"Completed"
},

{
title:"Owner Dashboard",
status:"Completed"
},

{
title:"Online Booking",
status:"Coming Soon"
},

{
title:"Route Planner",
status:"Coming Soon"
},

{
title:"AI Recommendations",
status:"Coming Soon"
}
]

</script>
<style scoped>


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
/* ================= About ================= */
.about-page{
  background:#ffffff;
  color:#111;
  font-family:Inter,Arial,sans-serif;
}

h1,h2,h3,h4,p{
  margin:0;
}

h2{
  font-size:32px;
  font-weight:700;
  text-align:center;
  color:#111;
}

p{
  color:#555;
  line-height:1.7;
}

/* ================= HERO ================= */
.about-hero{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:80px 8% 60px;
  background:
  linear-gradient(
  90deg,
  #ffffff 0%,
  #f3fbf8 100%
  );
}

.hero-left{
 width:50%;
}

.tag{
display:inline-block;
padding:7px 16px;
border-radius:30px;
background:#e7f8ef;
color:#159447;
font-size:14px;
font-weight:600;
}

.hero-left h1{
font-size:52px;
line-height:1.15;
margin:20px 0;
font-weight:800;
}

.hero-left h1 span{
color:#139447;
}

.hero-left p{
max-width:520px;
font-size:16px;
}

.hero-buttons{
display:flex;
gap:15px;
margin-top:30px;
}

.primary-btn,
.outline-btn{
padding:13px 25px;
border-radius:8px;
cursor:pointer;
font-weight:600;
}

.primary-btn{
background:#0b9b4a;
border:none;
color:white;
}

.outline-btn{
background:white;
border:1px solid #0b9b4a;
color:#0b9b4a;
}

.hero-features{
display:flex;
gap:30px;
margin-top:35px;
font-size:14px;
color:#555;
}

.hero-image{
width:45%;
}

.hero-image img{
width:100%;
object-fit:contain;
}

/* ================= STATS ================= */
.stats-section{
margin:0 7%;
padding:25px;
display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
background:white;
border-radius:18px;
box-shadow:
0 10px 35px rgba(0,0,0,.08);
}

.stat-card{
text-align:center;
}

.stat-icon{
font-size:35px;
margin-bottom:10px;
}

.stat-card h2{
color:#0a9b48;
font-size:34px;
}

.stat-card h4{
margin:8px 0;
}

.stat-card p{
font-size:13px;
}

/* ================= STORY ================= */
.story-section{
padding:80px 8%;
display:grid;
grid-template-columns:1fr 1fr;
gap:50px;
}

.section-label{
color:#079445;
font-size:13px;
font-weight:700;
}

.story-content h2{
text-align:left;
font-size:35px;
margin:20px 0;
}

.story-content p{
margin-bottom:20px;
}

.story-btn{
padding:12px 20px;
border-radius:8px;
background:white;
border:1px solid #0a9b48;
color:#0a9b48;
}

.mission-grid{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;
}

.info-card{
padding:25px;
border-radius:16px;
border:1px solid #eee;
box-shadow:
0 5px 20px rgba(0,0,0,.05);
}

.info-icon{
font-size:30px;
}

.info-card h3{
margin:15px 0;
}

/* ================= ROAD FEATURES ================= */
.road-section{
padding:60px 8%;
background:#fafafa;
}

.road-grid{
margin-top:50px;
display:grid;
grid-template-columns:repeat(5,1fr);
gap:20px;
}

.road-card{
text-align:center;
}

.road-icon{
width:65px;
height:65px;
margin:auto;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
background:#0a9b48;
color:white;
font-size:25px;
}

.road-card h3{
font-size:16px;
margin:15px 0;
}

.road-card p{
font-size:14px;
}

/* ================= CHOOSE ================= */
.choose-section{
padding:70px 8%;
display:grid;
grid-template-columns:1fr 1fr;
gap:30px;
}

.choose-box,
.technology-box{
padding:35px;
background:#fff;
border-radius:18px;
box-shadow:
0 5px 25px rgba(0,0,0,.06);
}

.choose-box h2,
.technology-box h2{
text-align:left;
font-size:25px;
margin-bottom:25px;
}

.choose-box ul{
display:grid;
grid-template-columns:1fr 1fr;
gap:15px;
list-style:none;
padding:0;
}

.choose-box li{
color:#078c43;
}

.tech-grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:25px;
}

.tech-item{
text-align:center;
}

.tech-item img{
width:45px;
height:45px;
object-fit:contain;
}

.tech-item span{
display:block;
font-size:13px;
margin-top:8px;
}

/* ================= TEAM ================= */
.team-section{
padding:70px 8%;
}

.team-grid{
margin-top:40px;
display:grid;
grid-template-columns:repeat(3,1fr);
gap:30px;
}

.team-card{
text-align:center;
padding:30px 20px;
border-radius:18px;
border:1px solid #eee;
}

.avatar{
width:90px;
height:90px;
margin:auto;
border-radius:50%;
overflow:hidden;
border:3px solid #0a9b48;
}

.avatar img{
width:100%;
height:100%;
object-fit:cover;
}

.team-card h3{
margin-top:15px;
}

.team-card span{
color:#0a9b48;
font-size:14px;
}

.team-card p{
font-size:14px;
margin:15px;
}

.social{
display:flex;
justify-content:center;
gap:15px;
}

.social a{
font-size:13px;
color:#111;
}

/* ================= ROADMAP ================= */
.roadmap-section{
padding:60px 5%;
}

.roadmap{
display:flex;
justify-content:space-between;
margin-top:50px;
}

.road-item{
text-align:center;
flex:1;
}

.circle{
margin:auto;
width:35px;
height:35px;
background:#0a9b48;
color:white;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
}

.road-item h4{
margin-top:15px;
font-size:14px;
}

.road-item p{
font-size:13px;
}

/* ================= FOOTER ================= */
.footer{
background:#02251d;
color:white;
padding:50px 8%;
display:grid;
grid-template-columns:2fr 1fr 1fr 1fr;
gap:30px;
}

.footer h2{
color:#0ac15d;
text-align:left;
}

.footer h4{
margin-bottom:15px;
}

.footer a{
display:block;
color:#ddd;
font-size:14px;
margin-bottom:10px;
text-decoration:none;
}

/* ================= RESPONSIVE ================= */
@media(max-width:1000px){
.about-hero{
flex-direction:column;
}

.hero-left,
.hero-image{
width:100%;
}

.stats-section{
grid-template-columns:repeat(2,1fr);
}

.story-section{
grid-template-columns:1fr;
}

.road-grid{
grid-template-columns:repeat(2,1fr);
}

.choose-section{
grid-template-columns:1fr;
}

.team-grid{
grid-template-columns:1fr 1fr;
}

.footer{
grid-template-columns:1fr 1fr;
}
}

@media(max-width:600px){
.hero-left h1{
font-size:38px;
}

.hero-features{
flex-direction:column;
}

.stats-section{
grid-template-columns:1fr;
}

.mission-grid{
grid-template-columns:1fr;
}

.road-grid{
grid-template-columns:1fr;
}

.tech-grid{
grid-template-columns:repeat(2,1fr);
}

.team-grid{
grid-template-columns:1fr;
}

.choose-box ul{
grid-template-columns:1fr;
}

.roadmap{
overflow-x:auto;
}

.footer{
grid-template-columns:1fr;
}
}

</style>
