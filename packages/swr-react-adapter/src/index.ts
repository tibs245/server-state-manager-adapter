import {
  NetworkClientPortAvailable,
  ServerStateManagerPort,
} from '@server-state-manager-adapter/contracts';
import { ServerStateManagerUseQueryFn } from '@server-state-manager-adapter/react-adapter';
import { useQuery } from './useQuery';

export const buildServerStateManager = <TNetworkClient extends NetworkClientPortAvailable>({
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
