<template>
  <div class="home">
    <h1>Welcome to EV Charging Locator</h1>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.feature {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.feature h3 {
  color: #0066cc;
  margin-bottom: 10px;
}

.feature p {
  color: #666;
}
</style>
