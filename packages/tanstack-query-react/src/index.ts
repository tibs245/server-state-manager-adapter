import {
  NetworkClientAvailable,
  ServerStateManager,
  ServerStateQueryOptions,
  ServerStateQueryOptionsPrepared,
  ServerStateQueryResult,
} from '@server-state-manager-adapter/core';
import { useQuery } from '@tanstack/react-query';

export * from './reactTanstackQueryProvider';

export const buildTanstackServerStateManager = <TNetworkClient extends NetworkClientAvailable>({
  networkClient,
  defaultServerStateOptions,
}: Pick<
  ServerStateManager<TNetworkClient>,
  'networkClient' | 'defaultServerStateOptions'
>): ServerStateManager<TNetworkClient> => {
  return {
    networkClient,
    defaultServerStateOptions,
    useQuery,
  };
};
