export interface CartItem {
  price: number;
  quantity: number;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
