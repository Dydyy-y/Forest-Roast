import { describe, test, expect } from 'vitest';
import { calculateCartTotal, CartItem } from '../utils/cart';

describe('calculateCartTotal', () => {
  test('returns 0 for empty cart', () => {
    const items: CartItem[] = [];
    expect(calculateCartTotal(items)).toBe(0);
  });
});