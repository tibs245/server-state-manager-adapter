import {
  HttpClient,
  HttpClientParams,
  ServerStateConfig,
} from '@server-state-manager-adapter/core';

const fetchJsonResponse = async <TData = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const response = await fetch(input, init);
  return (await response.json()) as TData;
};

export const buildFetchNetworkClient = (
  serverStateConfig: ServerStateConfig,
  { headers, ...additionalDefaultParams }: RequestInit = {}
): HttpClient => {
  const defaultHeaders = { ...serverStateConfig.headers, ...headers };

  return {
    get: <TData = unknown>({ url }: Pick<HttpClientParams, 'url'>) =>
      fetchJsonResponse<TData>(`${serverStateConfig.endpoint}${url}`, {
        ...additionalDefaultParams,
        method: 'get',
        headers: defaultHeaders,
      }),
    post: <TData = unknown, TParams = unknown>({ url, body }: HttpClientParams<TParams>) =>
      fetchJsonResponse<TData>(`${serverStateConfig.endpoint}${url}`, {
        ...additionalDefaultParams,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...defaultHeaders,
      }),
    put: <TData = unknown, TParams = unknown>({ url, body }: HttpClientParams<TParams>) =>
      fetchJsonResponse<TData>(`${serverStateConfig.endpoint}${url}`, {
        ...additionalDefaultParams,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...defaultHeaders,
      }),
    delete: <TData = unknown, TParams = unknown>({ url, body }: HttpClientParams<TParams>) =>
      fetchJsonResponse<TData>(`${serverStateConfig.endpoint}${url}`, {
        ...additionalDefaultParams,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...defaultHeaders,
      }),
    path: <TData = unknown, TParams = unknown>({ url, body }: HttpClientParams<TParams>) =>
      fetchJsonResponse<TData>(`${serverStateConfig.endpoint}${url}`, {
        ...additionalDefaultParams,
        method: 'path',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...defaultHeaders,
      }),
  };
};
