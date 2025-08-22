import {
  HttpClientPort,
  NetworkClientPortAvailable,
  QueryKey,
  ServerStateManagerPort,
  ServerStateOptions,
  ServerStateQueryOptions,
} from '@server-state-manager-adapter/contracts';
import { MaybeRefOrGetter, toValue } from 'vue';
import { ServerStateManagerUseQueryFn } from './types';

export type ServerStateManagerRefPort<TNetworkClient extends HttpClientPort> = {
  networkClient: TNetworkClient;
  defaultServerStateOptions?: ServerStateOptions;
  useQuery: ServerStateManagerUseQueryFn<TNetworkClient>;
};

export type ServerStateUseQueryParams<
  TNetworkClient extends NetworkClientPortAvailable,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends Readonly<QueryKey> = Readonly<QueryKey>,
> = {
  serverStateManager: ServerStateManagerPort<
    TNetworkClient,
    ServerStateManagerUseQueryFn<TNetworkClient>
  >;
  request: ServerStateQueryOptions<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>;
};

export const useServerStateQuery = <
  TNetworkClient extends NetworkClientPortAvailable,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends Readonly<QueryKey> = Readonly<QueryKey>,
>(
  params: MaybeRefOrGetter<
    ServerStateUseQueryParams<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>
  >
) => {
  const { queryFn, queryKey, ...restRequest } = toValue(params).request;
  return toValue(params).serverStateManager.useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...(toValue(params).serverStateManager.defaultServerStateOptions ?? {}),
    ...restRequest,
    queryKey: toValue(params).request.queryKey,
    queryFn: () => queryFn({ networkClient: toValue(params).serverStateManager.networkClient }),
  });
};
