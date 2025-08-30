import {
  ServerStateManagerUseQueryFn,
  ServerStateQueryResult,
} from '@server-state-manager-adapter/react-adapter';
import {
  NetworkClientPortAvailable,
  QueryKey,
  ServerStateQueryOptionsPrepared,
} from '@server-state-manager-adapter/contracts';
import useSWR from 'swr';

export const useQuery: ServerStateManagerUseQueryFn<NetworkClientPortAvailable> = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
  select,
  enabled = true,
  refetchInterval,
  initialData,
  retry = 3,
  ...restOptions
}: ServerStateQueryOptionsPrepared<
  NetworkClientPortAvailable,
  TQueryFnData,
  TError,
  TData,
  TQueryKey
>): ServerStateQueryResult<TData, TError> => {
  // Create a fetcher function that matches SWR's expected signature
  const fetcher = async () => {
    return await queryFn();
  };

  const swrResult = useSWR<TQueryFnData, TError>(
    enabled ? queryKey : null, // SWR key - null disables the query
    fetcher,
    {
      refreshInterval: refetchInterval || undefined,
      fallbackData: initialData as TQueryFnData,
      errorRetryCount: typeof retry === 'number' ? retry : retry === false ? 0 : 3,
      revalidateOnMount:
        restOptions.refetchOnMount === 'always' ? true : restOptions.refetchOnMount,
    }
  );

  // Transform the data using select function if provided
  const transformedData =
    swrResult.data !== undefined && select ? select(swrResult.data) : swrResult.data;

  // Adapt SWR result to ServerStateQueryResult interface
  return {
    data: transformedData as TData,
    dataUpdatedAt: Date.now(), // SWR doesn't provide this, using current timestamp
    error: swrResult.error || null,
    errorUpdatedAt: swrResult.error ? Date.now() : 0,
    failureCount: 0, // SWR doesn't expose this directly
    isError: !!swrResult.error,
    isFetched: swrResult.data !== undefined || !!swrResult.error,
    isFetching: swrResult.isLoading || swrResult.isValidating,
    isLoading: swrResult.isLoading,
    isPending: swrResult.isLoading,
    isSuccess: swrResult.data !== undefined && !swrResult.error,
    isEnabled: enabled,
    status: swrResult.error ? 'error' : swrResult.data !== undefined ? 'success' : 'pending',
  };
};
