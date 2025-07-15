# Server State Manager Adapter Example

This is a React example application demonstrating how to use the ServerStateManagerAdapter library for managing server state in React applications.

## Examples Included

1. **Basic Usage**: Simple data fetching with default configuration
2. **Configuration Options**: Customizing the adapter with different settings
3. **Custom Fetch Implementation**: More complex data fetching scenarios combining multiple API calls

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Example

```bash
# Start the development server
npm run dev
```

The application will be available at http://localhost:3000

## How It Works

The example application demonstrates different ways to use the ServerStateManagerAdapter:

### Basic Usage

Shows how to create a simple server state manager and use it to fetch data from a REST API.

#### Configuration step

`ServerQueryConfiguration.tsx`

```tsx
import { ServerConfig, ServerStateOptions } from '@ServerStateAdapter/core';
import { buildFetchClient } from '@ServerStateAdapter/fetchClient';
import { ReactTanstackQuery } from '@ServerStateAdapter/reactTanstackQuery';

const serverConfig: ServerConfig = {
  endpoints: 'http://localhost:8080',
};

const defaultStateOptions: ServerStateOptions = {
  retry: 3,
  cacheTime: 60_000 * 5,
};

// Create a server state manager with default configuration
export const serverStateManager = createServerStateManager({
  defaultStateOptions,
  networkClient: buildFetchClient(serverConfig),
  stateManager: ReactTanstackQuery,
});
```

#### FrontEnd Module Configuration

`App.tsx`

```tsx
import { ReactTanstackQueryProvider } from '@ServerStateAdapter/reactTanstackQuery';
import { serverStateManager } from '@/configuration/ServerQueryConfiguration.tsx';

return (
  <ReactTanstackQueryProvider configuration={serverStateManager}>
    <App />
  </ReactTanstackQueryProvider>
);
```

#### Request declaration

`request/exemple.tsx`

```tsx
import { ServerStateQueryOptions, HttpClient } from '@ServerStateAdapter/core';

export const exampleRequest: ServerStateQueryOptions<HttpClient> = {
  queryKey: ['example'],
  queryFn: ({ networkClient: httpClient }) => httpClient.get('/test'),
};
```

#### UI use case

`request/exemple.tsx`

```tsx
import { useServerStateQuery } from '@ServerStateAdapter/react';
import { serverStateManager } from '@/configuration/ServerQueryConfiguration.tsx';
import { exampleRequest } from 'request/exemple.tsx';

export const MyComponent = () => {
  const { data } = useServerStateQuery({ serverStateManager, request: exampleRequest });

  return <code>{JSON.stringify(data)}</code>;
};
```

## Concrete use case explained

- We create universal request via adapter. This contains options of request from main module Adapter `RequestConfig` Interface
- We create ServerConfig for URL / Port / headers (Authentification) via `ServerStateConfig`
- We import the `NetworkClientModule` (Here `fetch` module) who take ServerConfig to provide ServerClient
- We import a `StateManager` here `React/Tanstack` module adapter.
  - This module allow give Provider
  - This modules give hooks to use commons params with useQuery

## API Documentation

For more detailed information about the ServerStateManagerAdapter API, please refer to the main [README.md](../README.md) in the project root.
