import { serverStateManager } from '@/networkConfiguration.ts';
import { useServerStateQuery } from '@server-state-manager-adapter/react-adapter';
import { weatherRequest } from '../requests/weatherRequest.ts';

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

export const WeatherComponent = ({ city }: { city: keyof typeof CITY_LOCATIONS }) => {
  const { data: temperature, isLoading } = useServerStateQuery({
    serverStateManager,
    request: weatherRequest(CITY_LOCATIONS[city]),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <strong>{temperature} C°</strong>;
};
