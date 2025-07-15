import { HttpClientPort, ServerStateQueryOptions } from '@server-state-manager-adapter/contracts';

export type CurrentWeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: 'GMT' | 'UTC';
  timezone_abbreviation: 'GMT' | 'UTC';
  elevation: number;
  current_units: {
    time: 'iso8601';
    interval: 'seconds';
    temperature_2m: '°C' | '°F';
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };
};

export type WeatherRequestParams = {
  longitude: number;
  latitude: number;
};

export const weatherRequest = ({
  latitude,
  longitude,
}: WeatherRequestParams): ServerStateQueryOptions<
  HttpClientPort,
  CurrentWeatherResponse,
  unknown,
  number
> => ({
  queryKey: ['weather', { longitude, latitude }, 'current'],
  queryFn: ({ networkClient }) =>
    networkClient.get({
      url: `/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
    }),
  select: data => data.current.temperature_2m,
  enabled: !!(latitude && longitude),
});
