<template>
  <div class="app">
    <header class="app-header">
      <h1>Server State Manager Adapter Examples</h1>
      <p>
        This playground demonstrates how to use the ServerStateManagerAdapter library for
        managing server state in Vue applications.
      </p>
    </header>

    <main class="examples-container" aria-labelledby="main-title">
      <h1 id="main-title">Hello, what is the temperature in {{ selectedCity.replace('_', ' ') }} ?</h1>
      <div role="radiogroup" aria-label="Select a city" class="city-selection">
        <div v-for="city in CITIES" :key="city" class="radio-item">
          <input
              type="radio"
              :id="city"
              name="city"
              :value="city"
              v-model="selectedCity"
          />
          <label :for="city">{{ city.replace('_', ' ') }}</label>
        </div>
      </div>
      <WeatherComponent :city="selectedCity" />
    </main>

    <footer class="app-footer">
      <p>
        For more information, check out the
        <a
          href="https://github.com/tibs245/ServerStateAdapter"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WeatherComponent from '@/weatherFeature/ui/weather.component.vue';

type City = typeof CITIES[number];
const CITIES = ['PARIS', 'NEW_Y0RK', 'LOS_ANGELES', 'LONDON', 'TOKYO'] as const;

const selectedCity = ref<City>('PARIS');
</script>

<style src="./App.css"></style>