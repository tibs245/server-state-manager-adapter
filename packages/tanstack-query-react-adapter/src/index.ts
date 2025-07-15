import {
  NetworkClientPortAvailable,
  ServerStateManagerPort,
} from '@server-state-manager-adapter/contracts';
import { useQuery } from '@tanstack/react-query';

export * from './reactTanstackQueryProvider';

export const buildTanstackServerStateManager = <TNetworkClient extends NetworkClientPortAvailable>({
  networkClient,
  defaultServerStateOptions,
}: Pick<
  ServerStateManagerPort<TNetworkClient>,
  'networkClient' | 'defaultServerStateOptions'
>): ServerStateManagerPort<TNetworkClient> => {
  return {
    networkClient,
    defaultServerStateOptions,
    useQuery,
  };
};
