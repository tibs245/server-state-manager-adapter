import { MutationFunction, RetryDelayValue, RetryValue } from './types';

export type DefaultError = {
  defaultError: Error;
};

export type MutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = {
  mutationFn?: MutationFunction<TData, TVariables>;
  // mutationKey?: MutationKey
  // onMutate?: (
  //   variables: TVariables,
  // ) => Promise<TContext | undefined> | TContext | undefined
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => Promise<unknown> | unknown;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => Promise<unknown> | unknown;
  // onSettled?: (
  //   data: TData | undefined,
  //   error: TError | null,
  //   variables: TVariables,
  //   context: TContext | undefined,
  // ) => Promise<unknown> | unknown
  retry?: RetryValue<TError>;
  retryDelay?: RetryDelayValue<TError>;
  // networkMode?: NetworkMode
  // gcTime?: number
  // _defaulted?: boolean
  // meta?: MutationMeta
  // scope?: MutationScope
};
