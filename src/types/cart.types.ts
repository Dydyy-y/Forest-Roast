import type { Product } from './product.types';

export interface Cart {
  id: number;         
  expirationDate: string; 
  total: number; //calculé par l'API (float, en euros)
  Products: Product[];  
  createdAt: string;
  updatedAt: string;
}
