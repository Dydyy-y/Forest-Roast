import { describe, test, expect } from 'vitest';
import { filterProducts, Product } from '../utils/search';

describe('filterProducts', () => {
  const products: Product[] = [
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Tea' },
    { id: 3, name: 'Cocoa' },
  ];

  test('simple search returns matching items', () => {
    expect(filterProducts(products, 'cof')).toEqual([{ id: 1, name: 'Coffee' }]);
  });

  test('is case insensitive', () => {
    expect(filterProducts(products, 'TEA')).toEqual([{ id: 2, name: 'Tea' }]);
  });

  test('returns empty for no match', () => {
    expect(filterProducts(products, 'xyz')).toEqual([]);
  });
});