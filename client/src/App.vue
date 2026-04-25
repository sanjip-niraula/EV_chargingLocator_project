<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/find">Find station</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

a {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

a:hover {
  color: #0052a3;
}
</style>
