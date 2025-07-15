export type HttpClientParams<TParams = unknown> = { url: string; body: TParams };

export type HttpClient = {
  get: <TData = unknown>(params: Pick<HttpClientParams, 'url'>) => Promise<TData>;
  post: <TData = unknown, TParams = unknown>(params: HttpClientParams<TParams>) => Promise<TData>;
  put: <TData = unknown, TParams = unknown>(params: HttpClientParams<TParams>) => Promise<TData>;
  delete: <TData = unknown, TParams = unknown>(params: HttpClientParams<TParams>) => Promise<TData>;
  path: <TData = unknown, TParams = unknown>(params: HttpClientParams<TParams>) => Promise<TData>;
};
