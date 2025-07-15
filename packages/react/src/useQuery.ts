import {
  NetworkClientAvailable,
  ServerStateManager,
  ServerStateQueryOptions,
} from '@server-state-manager-adapter/core';

////Exemple :
//// ```tsx
//// import { useServerStateQuery } from '@ServerStateAdapter/react'
//// import { serverStateManager } from '@/configuration/ServerQueryConfiguration.tsx'
//// import { exampleRequest } from 'request/exemple.tsx';
////
//// export const MyComponent = () =>  {
////     const { data } = useServerStateQuery({ serverStateManager, request: exampleRequest })
////
////     return <code>{JSON.stringify(data)}</code>
//// }
//// ```

export type ServerStateUseQueryParams<
  TNetworkClient extends NetworkClientAvailable,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
> = {
  serverStateManager: ServerStateManager<TNetworkClient>;
  request: ServerStateQueryOptions<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>;
};

export const useServerStateQuery = <
  TNetworkClient extends NetworkClientAvailable,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
>({
  serverStateManager,
  request,
}: ServerStateUseQueryParams<TNetworkClient, TQueryFnData, TError, TData, TQueryKey>) => {
  const { queryFn, ...restRequest } = request;
  return serverStateManager.useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...(serverStateManager.defaultServerStateOptions ?? {}),
    ...restRequest,
    queryFn: () => queryFn({ networkClient: serverStateManager.networkClient }),
  });
};
