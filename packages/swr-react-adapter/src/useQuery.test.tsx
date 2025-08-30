import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useQuery } from './useQuery';
import useSWR from 'swr';

// Mock SWR
vi.mock('swr');

const mockedUseSWR = vi.mocked(useSWR);

describe('useQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const defaultQueryKey = ['test-key'];
  const defaultQueryFn = vi.fn().mockResolvedValue({ data: 'test-data' });

  it('should return correct structure with successful data', async () => {
    const mockData = { data: 'test-data' };
    
    mockedUseSWR.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        enabled: true,
      })
    );

    expect(result.current).toMatchObject({
      data: mockData,
      error: null,
      isError: false,
      isFetched: true,
      isFetching: false,
      isLoading: false,
      isPending: false,
      isSuccess: true,
      isEnabled: true,
      status: 'success',
    });

    expect(typeof result.current.dataUpdatedAt).toBe('number');
    expect(result.current.errorUpdatedAt).toBe(0);
    expect(result.current.failureCount).toBe(0);
  });

  it('should return correct structure with error', async () => {
    const mockError = new Error('Test error');
    
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        enabled: true,
      })
    );

    expect(result.current).toMatchObject({
      data: undefined,
      error: mockError,
      isError: true,
      isFetched: true,
      isFetching: false,
      isLoading: false,
      isPending: false,
      isSuccess: false,
      isEnabled: true,
      status: 'error',
    });

    expect(typeof result.current.errorUpdatedAt).toBe('number');
    expect(result.current.errorUpdatedAt).toBeGreaterThan(0);
  });

  it('should return correct loading state', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        enabled: true,
      })
    );

    expect(result.current).toMatchObject({
      data: undefined,
      error: null,
      isError: false,
      isFetched: false,
      isFetching: true,
      isLoading: true,
      isPending: true,
      isSuccess: false,
      isEnabled: true,
      status: 'pending',
    });
  });

  it('should handle select function correctly', () => {
    const mockData = { value: 'test-data' };
    const selectFn = vi.fn((data: typeof mockData) => data.value);
    
    mockedUseSWR.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        select: selectFn,
        enabled: true,
      })
    );

    expect(selectFn).toHaveBeenCalledWith(mockData);
    expect(result.current.data).toBe('test-data');
    expect(result.current.isSuccess).toBe(true);
  });

  it('should not apply select function when data is undefined', () => {
    const selectFn = vi.fn();
    
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        select: selectFn,
        enabled: true,
      })
    );

    expect(selectFn).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it('should handle enabled=false correctly', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        enabled: false,
      })
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      null, // Key should be null when disabled
      expect.any(Function),
      expect.any(Object)
    );

    expect(result.current.isEnabled).toBe(false);
  });

  it('should pass correct options to SWR', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const options = {
      queryKey: defaultQueryKey,
      queryFn: defaultQueryFn,
      enabled: true,
      refetchInterval: 5000,
      initialData: { initial: 'data' },
      retry: 5,
      refetchOnMount: true,
    };

    renderHook(() => useQuery(options));

    expect(mockedUseSWR).toHaveBeenCalledWith(
      defaultQueryKey,
      expect.any(Function),
      {
        refreshInterval: 5000,
        fallbackData: { initial: 'data' },
        errorRetryCount: 5,
        revalidateOnMount: true,
      }
    );
  });

  it('should handle retry as boolean false', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        retry: false,
      })
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      defaultQueryKey,
      expect.any(Function),
      expect.objectContaining({
        errorRetryCount: 0,
      })
    );
  });

  it('should handle retry as boolean true (default to 3)', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        retry: true,
      })
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      defaultQueryKey,
      expect.any(Function),
      expect.objectContaining({
        errorRetryCount: 3,
      })
    );
  });

  it('should handle refetchOnMount="always"', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        refetchOnMount: 'always',
      })
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      defaultQueryKey,
      expect.any(Function),
      expect.objectContaining({
        revalidateOnMount: true,
      })
    );
  });

  it('should call queryFn correctly through fetcher', async () => {
    const mockQueryFn = vi.fn().mockResolvedValue({ data: 'test' });
    let capturedFetcher: (() => Promise<any>) | undefined;

    mockedUseSWR.mockImplementation((key, fetcher, options) => {
      capturedFetcher = fetcher as () => Promise<any>;
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
        isValidating: false,
        mutate: vi.fn(),
      };
    });

    renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(capturedFetcher).toBeDefined();
    
    if (capturedFetcher) {
      await capturedFetcher();
      expect(mockQueryFn).toHaveBeenCalled();
    }
  });

  it('should handle isValidating state correctly', () => {
    mockedUseSWR.mockReturnValue({
      data: { data: 'test' },
      error: undefined,
      isLoading: false,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
      })
    );

    expect(result.current.isFetching).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle both isLoading and isValidating', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
      })
    );

    expect(result.current.isFetching).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isPending).toBe(true);
  });

  it('should set correct default values', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() =>
      useQuery({
        queryKey: defaultQueryKey,
        queryFn: defaultQueryFn,
        // Test defaults
      })
    );

    expect(result.current.isEnabled).toBe(true); // enabled defaults to true
    expect(result.current.failureCount).toBe(0); // Always 0 for SWR
    
    // Verify SWR was called with default retry of 3
    expect(mockedUseSWR).toHaveBeenCalledWith(
      defaultQueryKey,
      expect.any(Function),
      expect.objectContaining({
        errorRetryCount: 3,
      })
    );
  });
});