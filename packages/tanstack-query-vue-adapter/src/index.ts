import {
  NetworkClientPortAvailable,
  ServerStateManagerPort,
} from '@server-state-manager-adapter/contracts';
import { useQuery } from './useQuery';
import { ServerStateManagerUseQueryFn } from '@server-state-manager-adapter/vue-adapter';

export * from './vueTanstackQueryProvider';

export const buildTanstackServerStateManager = <TNetworkClient extends NetworkClientPortAvailable>({
  networkClient,
  defaultServerStateOptions,
}: Pick<
  ServerStateManagerPort<TNetworkClient, ServerStateManagerUseQueryFn<TNetworkClient>>,
  'networkClient' | 'defaultServerStateOptions'
>): ServerStateManagerPort<TNetworkClient, ServerStateManagerUseQueryFn<TNetworkClient>> => {
  return {
    networkClient,
    defaultServerStateOptions,
    useQuery,
  };
};
