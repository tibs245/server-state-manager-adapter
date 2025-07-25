import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useServerStateQuery } from './useQuery';
import { ServerStateManager, ServerStateQueryOptions } from '@server-state-manager-adapter/core';

describe('useServerStateQuery', () => {
  it('should call serverStateManager.useQuery with the correct parameters', () => {
    // Create a mock for the serverStateManager
    const mockUseQuery = vi.fn().mockReturnValue({
      data: 'test-data',
      isLoading: false,
      isError: false,
      error: null,
      status: 'success',
      isFetching: false,
      isFetched: true,
      isPending: false,
      isSuccess: true,
      isEnabled: true,
      dataUpdatedAt: new Date(),
      errorUpdatedAt: new Date(),
      failureCount: 0,
    });

    const mockNetworkClient = {} as any;

    const mockServerStateManager = {
      networkClient: mockNetworkClient,
      useQuery: mockUseQuery,
    } as unknown as ServerStateManager<any>;

    // Create mock request options
    const mockQueryFn = vi.fn().mockResolvedValue('test-data');
    const mockRequest: ServerStateQueryOptions<any> = {
      queryKey: ['test-key'],
      queryFn: mockQueryFn,
    };

    // Render the hook with our mocks
    renderHook(() =>
      useServerStateQuery({
        serverStateManager: mockServerStateManager,
        request: mockRequest,
      })
    );

    // Verify that serverStateManager.useQuery was called
    expect(mockUseQuery).toHaveBeenCalledTimes(1);

    // Verify that the parameters were correctly transformed
    const callArgs = mockUseQuery.mock.calls[0][0];
    expect(callArgs).toHaveProperty('queryKey', ['test-key']);

    // Verify that queryFn was wrapped correctly
    expect(typeof callArgs.queryFn).toBe('function');

    // Call the wrapped queryFn and verify it calls the original with the network client
    callArgs.queryFn();
    expect(mockQueryFn).toHaveBeenCalledWith({ networkClient: mockNetworkClient });
  });
});
