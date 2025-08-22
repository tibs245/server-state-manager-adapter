import {
  HttpClientPort,
  ServerStateQueryOptionsPrepared,
} from '@server-state-manager-adapter/contracts';

export type ServerStateQueryResult<TData = unknown, TError = Error> = {
  data: TData;
  dataUpdatedAt: number;
  error: TError | null;
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

export type ServerStateManagerUseQueryFn<TNetworkClient extends HttpClientPort> = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
>(
  params: ServerStateQueryOptionsPrepared<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>
) => ServerStateQueryResult<TData, TError>;
