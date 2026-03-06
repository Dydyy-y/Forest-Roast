import { describe, it, expect, vi } from 'vitest';
import { fetchProducts } from '../services/product.service';

describe('fetchProducts', () => {
  it('resolves with data when fetch returns JSON', async () => {
    const fakeData = [{ id: 1, name: 'mock' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeData) } as unknown as Response),
    );

    const result = await fetchProducts();
    expect(result).toEqual(fakeData);
    expect(fetch).toHaveBeenCalledWith('/api/products');
  });
});