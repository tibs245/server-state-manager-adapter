import { HttpClient, ServerStateQueryOptions } from '@server-state-manager-adapter/core';

export type YesOrNoResponse = { answer: 'yes' | 'no'; forced: boolean; image: string };

export const yesOrNoRequest: ServerStateQueryOptions<
  HttpClient,
  YesOrNoResponse,
  unknown,
  boolean
> = {
  queryKey: ['yesOrNo'],
  queryFn: ({ networkClient }) => networkClient.get({ url: '/api' }),
  select: data => data.answer === 'yes',
};
