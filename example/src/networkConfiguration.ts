import { ServerStateOptions, ServerStateConfig } from '@server-state-manager-adapter/core';
import { buildFetchNetworkClient } from '@server-state-manager-adapter/http-fetch-json';
import { buildTanstackServerStateManager } from '@server-state-manager-adapter/tanstack-query-react';

const defaultStateOptions: ServerStateOptions = {
  retry: 3,
  cacheTime: 60_000 * 5,
};

const serverStateConfig: ServerStateConfig = {
  endpoint: 'https://yesno.wtf/api',
};

// Create a server state manager with default configuration
export const serverStateManager = buildTanstackServerStateManager({
  defaultServerStateOptions: defaultStateOptions,
  networkClient: buildFetchNetworkClient(serverStateConfig),
});
