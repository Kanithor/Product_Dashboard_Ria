// app/dashboard/hooks/useDashboardData.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDashboardData } from './useDashboardData';

// Mocking the global fetch
global.fetch = jest.fn();

const mockProducts = {
  products: [
    { id: 1, title: 'iPhone', price: 1000, category: 'smartphones', stock: 5 },
    { id: 2, title: 'Laptop', price: 2000, category: 'laptops', stock: 15 },
  ]
};

describe('useDashboardData Hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });
  });

  it('should fetch and provide products', async () => {
    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.products).toHaveLength(2);
  });

  it('should filter by search query', async () => {
    const { result } = renderHook(() => useDashboardData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.filters.setSearchQuery('iPhone');
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].title).toBe('iPhone');
  });

  it('should calculate stats correctly', async () => {
    const { result } = renderHook(() => useDashboardData());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats.total).toBe(2);
    expect(result.current.stats.lowStock).toBe(1); // Only iPhone has stock < 10
  });
});