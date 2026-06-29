<template>
  <div class="station-page">

    <!-- Header -->
    <div class="page-header">
      <h1>Stations</h1>
      <p>Filter by connector type, power, availability and distance radius.</p>
    </div>

    <div class="station-container">

      <!-- Filter Section -->
      <div class="filter-panel">
        <h3>Search Filters</h3>

        <div class="form-group">
          <label>Search (city/station)</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search station..."
          />
        </div>

        <div class="form-group">
          <label>Connector Type</label>
          <select v-model="connectorType">
            <option value="">All</option>
            <option value="CCS2">CCS2</option>
            <option value="Type2">Type2</option>
            <option value="GB/T">GB/T</option>
          </select>
        </div>

        <div class="form-group">
          <label>Minimum Power (kW)</label>
          <input
            v-model.number="minPower"
            type="number"
            placeholder="0"
          />
        </div>

        <div class="form-group">
          <label>Availability</label>
          <select v-model="availability">
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
          </select>
        </div>

        <button class="filter-btn">
          Apply Filters
        </button>
      </div>

      <!-- Station List -->
      <div class="station-list">

        <div
          v-for="station in filteredStations"
          :key="station.id"
          class="station-card"
        >
          <span
            class="status"
            :class="station.status.toLowerCase()"
          >
            {{ station.status }}
          </span>

          <h2>{{ station.name }}</h2>
          <p class="location">{{ station.location }}</p>

          <div class="info-tags">
            <span>
              Connectors:
              {{ station.connectors.join(', ') }}
            </span>

            <span>
              Power:
              {{ station.power }} kW
            </span>

            <span>
              Price:
              Rs. {{ station.price }}/unit
            </span>
          </div>

          <div class="actions">
            <button class="details-btn">
              View Details
            </button>

            <button class="direction-btn">
              Get Directions
            </button>
          </div>
        </div>

        <div
          v-if="filteredStations.length === 0"
          class="no-result"
        >
          No stations found.
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const connectorType = ref("");
const minPower = ref(0);
const availability = ref("");

const stations = ref([
  {
    id: 1,
    name: "NEA EV Station - Sundhara",
    location: "Sundhara, Kathmandu",
    connectors: ["CCS2", "GB/T"],
    power: 60,
    price: 27,
    status: "Available",
  },
  {
    id: 2,
    name: "Charging Hub - Boudha",
    location: "Boudha, Kathmandu",
    connectors: ["CCS2", "Type2"],
    power: 90,
    price: 18,
    status: "Available",
  },
  {
    id: 3,
    name: "Pokhara EV Center",
    location: "Pokhara",
    connectors: ["Type2"],
    power: 45,
    price: 20,
    status: "Busy",
  },
]);

const filteredStations = computed(() => {
  return stations.value.filter((station) => {
    const matchesSearch =
      station.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      station.location
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesConnector =
      !connectorType.value ||
      station.connectors.includes(connectorType.value);

    const matchesPower =
      station.power >= minPower.value;

    const matchesAvailability =
      !availability.value ||
      station.status === availability.value;

    return (
      matchesSearch &&
      matchesConnector &&
      matchesPower &&
      matchesAvailability
    );
  });
});
</script>

<style scoped>
.station-page {
  min-height: 100vh;
  background: whitesmoke;
  color: white;
  padding: 40px;
  
}

.page-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
   color: Black;
}

.page-header p {
  color: Black;
}

.station-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 25px;
  margin-top: 30px;
}

.filter-panel {
  background: #063c33;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid white;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #0f6454;
  border-radius: 8px;
  background: #08493e;
  color: white;
}

.filter-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #18d39e;
  color: #00231d;
  font-weight: 700;
  cursor: pointer;
}

.station-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.station-card {
  position: relative;
  background: #063c33;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid #0f6454;
}

.station-card h2 {
  margin-bottom: 8px;
}

.location {
  color: #b8ccc7;
  margin-bottom: 15px;
}

.info-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.info-tags span {
  background: #08493e;
  padding: 8px 12px;
  border-radius: 8px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.details-btn {
  background: #18d39e;
  color: #00231d;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.direction-btn {
  background: transparent;
  color: white;
  border: 1px solid #18d39e;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.status {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.available {
  background: rgba(24, 211, 158, 0.2);
  color: #18d39e;
}

.busy {
  background: rgba(255, 99, 71, 0.2);
  color: tomato;
}

.no-result {
  text-align: center;
  padding: 30px;
  background: #063c33;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .station-container {
    grid-template-columns: 1fr;
  }
}
</style>