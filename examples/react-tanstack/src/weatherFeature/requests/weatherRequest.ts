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

// To export in contracts
export type MaybeDataOrGetter<TData> = TData | (() => TData);

export const toRequestValue = <TData>(dataOrGetter: MaybeDataOrGetter<TData>): TData => {
  if (typeof dataOrGetter === 'function') {
    try {
      return (dataOrGetter as () => TData)();
    } catch (error) {
      throw new Error(
        `Failed to execute getter function: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
  return dataOrGetter;
};
// END To export in contracts

export const weatherRequest = (
  weatherDataGetter: MaybeDataOrGetter<WeatherRequestParams>
): ServerStateQueryOptions<HttpClientPort, CurrentWeatherResponse, unknown, number> => {
  return {
    queryKey: ['weather', weatherDataGetter, 'current'],
    queryFn: ({ networkClient }) =>
      networkClient.get({
        url: `/v1/forecast?latitude=${toRequestValue(weatherDataGetter).latitude}&longitude=${toRequestValue(weatherDataGetter).longitude}&current=temperature_2m`,
      }),
    select: data => data.current.temperature_2m,
    enabled: !!(
      toRequestValue(weatherDataGetter).latitude && toRequestValue(weatherDataGetter).longitude
    ),
  };
};
