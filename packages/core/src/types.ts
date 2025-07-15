export type NetworkMode = 'online' | 'always' | 'offlineFirst';

// Retry value can be boolean, number or a function that returns boolean
export type RetryValue<TError> =
  | boolean
  | number
  | ((failureCount: number, error: TError) => boolean);

// RetryDelay value can be number or a function that returns number
export type RetryDelayValue<TError> = number | ((failureCount: number, error: TError) => number);

// Function that performs the mutation operation
export type MutationFunction<TData, TVariables> = (variables: TVariables) => Promise<TData> | TData;
