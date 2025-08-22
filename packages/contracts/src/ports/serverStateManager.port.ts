import { HttpClientPort } from './httpClient.port';
import { ServerStateQueryOptionsPrepared } from '../serviceQueryOptions';

/**
 * Type for server state configuration
 */
export type ServerStateConfig = {
  endpoint?: string;
  headers?: Record<string, string>;
  timeout?: number;
};

/**
 * Interface for server state options
 */
export type ServerStateOptions = {
  cacheTime?: number;
  staleTime?: number;
  retry?: number | boolean;
};

export type ServerStateManagerPort<
  TNetworkClient extends HttpClientPort,
  TUseQueryFn extends Function,
> = {
  networkClient: TNetworkClient;
  defaultServerStateOptions?: ServerStateOptions;
  useQuery: TUseQueryFn;
};
