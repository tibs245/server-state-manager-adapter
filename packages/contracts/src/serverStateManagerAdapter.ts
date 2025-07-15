import { NetworkClientPortAvailable } from './ports';
import { ServerStateQueryOptionsPrepared, ServerStateQueryResult } from './serviceQueryOptions';

/**
 * core
 *
 * This module provides an adapter for managing server state.
 */

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

export type ServerStateManager<TNetworkClient extends NetworkClientPortAvailable> = {
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
