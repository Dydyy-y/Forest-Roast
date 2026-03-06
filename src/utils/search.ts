export interface Product {
  id: number | string;
  name: string;
}

export function filterProducts(products: Product[], query: string): Product[] {
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
}
