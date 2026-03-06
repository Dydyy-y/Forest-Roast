import { describe, test, expect } from 'vitest';
import { addProduct, CartProduct } from '../utils/cartActions';

describe('addProduct', () => {
  test('adds a product when cart is empty', () => {
    const initial: CartProduct[] = [];
    const result = addProduct(initial, { id: 1, quantity: 1 });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 1, quantity: 1 });
  });
});