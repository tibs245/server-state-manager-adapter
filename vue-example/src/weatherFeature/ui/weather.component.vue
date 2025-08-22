<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <strong v-else>{{ temperature }} C°</strong>
  </div>
</template>

<script setup lang="ts">
import { serverStateManager } from '@/networkConfiguration';
import { useServerStateQuery } from '@server-state-manager-adapter/vue-adapter';
import { weatherRequest } from '../requests/weatherRequest';
import {computed, toValue} from "vue";

const CITY_LOCATIONS = {
  NEW_Y0RK: { latitude: 40.7128, longitude: -74.006 },
  LOS_ANGELES: { latitude: 34.0522, longitude: -118.2437 },
  LONDON: { latitude: 51.5074, longitude: -0.1278 },
  PARIS: { latitude: 48.8566, longitude: 2.3522 },
  TOKYO: { latitude: 35.6895, longitude: 139.6917 },
  SHANGHAI: { latitude: 31.2304, longitude: 121.4737 },
  SAO_PAULO: { latitude: -23.5505, longitude: -46.6333 },
  MUMBAI: { latitude: 19.076, longitude: 72.8777 },
  MOSCOW: { latitude: 55.7558, longitude: 37.6176 },
  CAIRO: { latitude: 30.0444, longitude: 31.2357 },
} as const;

export type WeatherComponentProps = {
  city: keyof typeof CITY_LOCATIONS;
}

const props = defineProps<WeatherComponentProps>();

const cityLocations = computed(() => CITY_LOCATIONS[props.city])
const requestParams = computed(() => ({
  serverStateManager,
      request: weatherRequest(() => toValue(cityLocations)),
}))

const { data: temperature, isLoading } = useServerStateQuery(requestParams);
</script>