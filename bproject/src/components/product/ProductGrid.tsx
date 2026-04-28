import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

export function ProductGrid({ products, columns = 4, emptyMessage = 'Aucun produit trouvé.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`product-grid product-grid--${columns}`}>
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fadeInUp"
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
