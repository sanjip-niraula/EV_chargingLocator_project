<template>
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
</script>


<style scoped>
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