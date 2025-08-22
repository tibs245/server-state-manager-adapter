import { MaybeRefOrGetter, Ref } from 'vue';
import {
  HttpClientPort,
  QueryKey,
  ServerStateQueryOptionsPrepared,
} from '@server-state-manager-adapter/contracts';

export type ServerStateQueryResult<TData = unknown, TError = Error> = {
  data: Ref<TData>;
  dataUpdatedAt: Ref<number>;
  error: Ref<TError> | null;
  errorUpdatedAt: Ref<number>;
  failureCount: Ref<number>;
  isError: Ref<boolean>;
  isFetched: Ref<boolean>;
  isFetching: Ref<boolean>;
  isLoading: Ref<boolean>;
  isPending: Ref<boolean>;
  isSuccess: Ref<boolean>;
  isEnabled: Ref<boolean>;
  status: Ref<'pending' | 'error' | 'success'>;
};

export type ServerStateManagerUseQueryFn<TNetworkClient extends HttpClientPort> = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends Readonly<QueryKey> = Readonly<QueryKey>,
>(
  params: ServerStateQueryOptionsPrepared<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>
) => ServerStateQueryResult<TData, TError>;
