import type { Product, ProductVariant } from './product';

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
