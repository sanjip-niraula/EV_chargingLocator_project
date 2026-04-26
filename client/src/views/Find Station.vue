<template>
  <div class="find">
    
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
.find {
  background: whitesmoke;
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