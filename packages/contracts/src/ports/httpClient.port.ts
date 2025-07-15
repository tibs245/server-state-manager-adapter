export type HttpClientPortParams<TParams = unknown> = { url: string; body: TParams };

export type HttpClientPort = {
  get: <TData = unknown>(params: Pick<HttpClientPortParams, 'url'>) => Promise<TData>;
  post: <TData = unknown, TParams = unknown>(
    params: HttpClientPortParams<TParams>
  ) => Promise<TData>;
  put: <TData = unknown, TParams = unknown>(
    params: HttpClientPortParams<TParams>
  ) => Promise<TData>;
  delete: <TData = unknown, TParams = unknown>(
    params: HttpClientPortParams<TParams>
  ) => Promise<TData>;
  path: <TData = unknown, TParams = unknown>(
    params: HttpClientPortParams<TParams>
  ) => Promise<TData>;
};

export type NetworkClientPortAvailable = HttpClientPort;
