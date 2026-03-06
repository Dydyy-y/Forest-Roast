export interface CartProduct {
  id: number | string;
  quantity: number;
  [key: string]: any;
}

export function addProduct(
  cart: CartProduct[],
  product: CartProduct,
): CartProduct[] {
  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.quantity++;
    return [...cart];
  }

  return [...cart, { ...product, quantity: 1 }];
}
