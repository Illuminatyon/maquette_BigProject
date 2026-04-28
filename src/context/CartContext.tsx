import { createContext, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Cart } from '../types/cart';
import type { Product, ProductVariant } from '../types/product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CartContextValue {
  cart: Cart;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number, variantId?: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const buildCart = (items: CartItem[]): Cart => ({
  items,
  total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('bproject-cart', []);

  const addItem = useCallback(
    (product: Product, variant?: ProductVariant, quantity = 1) => {
      const id = `${product.id}-${variant?.id ?? 'default'}`;
      setItems(prev => {
        const existing = prev.find(i => i.id === id);
        if (existing) {
          return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + quantity } : i);
        }
        return [...prev, { id, product, variant, quantity }];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (itemId: string) => setItems(prev => prev.filter(i => i.id !== itemId)),
    [setItems]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) { removeItem(itemId); return; }
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    },
    [setItems, removeItem]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const isInCart = useCallback(
    (productId: number, variantId?: number) =>
      items.some(i => i.product.id === productId && i.variant?.id === variantId),
    [items]
  );

  return (
    <CartContext.Provider value={{ cart: buildCart(items), addItem, removeItem, updateQuantity, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside CartProvider');
  return ctx;
}
