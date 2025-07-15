import { HttpClientPort } from './ports';
import { NetworkClientPortAvailable } from './ports';

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
  TQueryKey extends readonly unknown[] = readonly unknown[],
> = {
  // Query key for caching and deduplication
  queryKey: TQueryKey;

  // The query function that fetches the data
  queryFn: (queryFnParams: QueryFnParams<NetworkClient>) => Promise<TQueryFnData>;

  // Optional data transformer
  select?: (data: TQueryFnData) => TData;

  // Refetching options
  // staleTime?: number;
  cacheTime?: number;
  refetchOnMount?: boolean | 'always';
  // refetchOnWindowFocus?: boolean | "always";
  // refetchOnReconnect?: boolean | "always";
  refetchInterval?: number | false;
  // refetchIntervalInBackground?: boolean;

  // Retry options
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((retryAttempt: number, error: TError) => number);

  // Initial data
  initialData?: TData;
  // initialDataUpdatedAt?: number;

  // Placeholder data
  // placeholderData?: TQueryFnData | (() => TQueryFnData);

  // Behavior flags
  enabled?: boolean;
  // suspense?: boolean;

  // Network mode
  networkMode?: 'online' | 'always' | 'offlineFirst';
};

export type ServerStateQueryOptionsPrepared<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
> = {
  // The query function that fetches the data
  queryFn: () => Promise<TQueryFnData>;
} & Omit<
  ServerStateQueryOptions<HttpClientPort, TQueryFnData, TError, TData, TQueryKey>,
  'queryFn'
>;

export type ServerStateQueryResult<TData = unknown, TError = Error> = {
  data: TData;
  dataUpdatedAt: number;
  error: TError;
  errorUpdatedAt: number;
  failureCount: number;
  isError: boolean;
  isFetched: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isEnabled: boolean;
  status: 'pending' | 'error' | 'success';
};
