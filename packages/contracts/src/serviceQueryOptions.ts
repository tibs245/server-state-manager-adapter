import { HttpClientPort } from './ports';
import { NetworkClientPortAvailable } from './ports';
import { QueryKey } from './types';

export type QueryFnParams<TNetworkClient extends NetworkClientPortAvailable> = {
  networkClient: TNetworkClient;
};

/**
 * Generic type parameters:
 * NetworkClient - Type of network client
 * TQueryFnData - Type of the data returned by the query function
 * TError - Type of error that can occur
 * TData - Type of the transformed data (after select)
 * TQueryKey - Type of the query key
 */
export type ServerStateQueryOptions<
  NetworkClient extends NetworkClientPortAvailable = HttpClientPort,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends Readonly<QueryKey> = Readonly<QueryKey>,
> = {
  queryKey: TQueryKey;
  queryFn: (queryFnParams: QueryFnParams<NetworkClient>) => Promise<TQueryFnData>;
  select?: (data: TQueryFnData) => TData;
  cacheTime?: number;
  refetchOnMount?: boolean | 'always';
  refetchInterval?: number | false;
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((retryAttempt: number, error: TError) => number);
  initialData?: TData;
  enabled?: boolean;
  networkMode?: 'online' | 'always' | 'offlineFirst';
};

export type ServerStateQueryOptionsPrepared<
  RequestClient extends NetworkClientPortAvailable = HttpClientPort,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends Readonly<QueryKey> = Readonly<QueryKey>,
> = {
  // The query function that fetches the data
  queryFn: () => Promise<TQueryFnData>;
} & Omit<ServerStateQueryOptions<RequestClient, TQueryFnData, TError, TData, TQueryKey>, 'queryFn'>;
