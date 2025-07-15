import { HttpClientPort } from './httpClient.port';
import { ServerStateQueryOptionsPrepared, ServerStateQueryResult } from '../serviceQueryOptions';

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

export type ServerStateManagerPort<TNetworkClient extends HttpClientPort> = {
  networkClient: TNetworkClient;
  defaultServerStateOptions?: ServerStateOptions;
  useQuery: <
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends readonly unknown[] = unknown[],
  >(
    params: ServerStateQueryOptionsPrepared<TQueryFnData, TError, TData, TQueryKey>
  ) => ServerStateQueryResult<TData, TError>;
};
