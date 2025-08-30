import { ServerStateOptions, ServerStateConfig } from '@server-state-manager-adapter/contracts';
import { buildFetchNetworkClient } from '@server-state-manager-adapter/http-fetch-json-adapter';
import { buildServerStateManager } from '@server-state-manager-adapter/tanstack-query-react-adapter';

const defaultStateOptions: ServerStateOptions = {
  retry: 3,
  cacheTime: 60_000 * 5,
};

const serverStateConfig: ServerStateConfig = {
  endpoint: 'https://api.open-meteo.com',
};

// Create a server state manager with default configuration
export const serverStateManager = buildServerStateManager({
  defaultServerStateOptions: defaultStateOptions,
  networkClient: buildFetchNetworkClient(serverStateConfig),
});
