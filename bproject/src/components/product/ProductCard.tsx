import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { formatPrice, formatDiscount } from '../../utils/formatPrice';
import { useCartContext } from '../../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartContext();

  const handleAddToCart = () => {
    addItem(product, product.variants?.[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const stars = Math.round(product.rating ?? 0);

  return (
    <>
      <article className="product-card">
        <div className="product-card__image-wrap">
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="product-card__img"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="product-card__badges">
            {product.discount && (
              <Badge variant="discount">{formatDiscount(product.discount)}</Badge>
            )}
            {product.isNew && <Badge variant="new">Nouveau</Badge>}
          </div>

          {/* Hover overlay */}
          <div className="product-card__overlay">
            <button
              className="product-card__quickview"
              onClick={() => setQuickViewOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Aperçu rapide
            </button>
          </div>
        </div>

        <div className="product-card__body">
          <Link to={`/product/${product.slug}`} className="product-card__name">
            {product.name}
          </Link>

          {product.rating && (
            <div className="product-card__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="11" height="11"
                  viewBox="0 0 24 24"
                  fill={i < stars ? 'var(--color-blue-light)' : 'none'}
                  stroke="var(--color-blue-light)"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
              <span className="product-card__rating-count">({product.reviews})</span>
            </div>
          )}

          <div className="product-card__price-row">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="product-card__price-old">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
            }
          >
            {added ? 'Ajouté ✓' : 'Ajouter au panier'}
          </Button>
        </div>
      </article>

      {/* Quick view modal */}
      <Modal isOpen={quickViewOpen} onClose={() => setQuickViewOpen(false)} size="lg">
        <div className="product-card__qv">
          <img src={product.image} alt={product.name} className="product-card__qv-img" />
          <div className="product-card__qv-info">
            <h2 className="product-card__qv-title">{product.name}</h2>
            <div className="product-card__price-row" style={{ marginBottom: 12 }}>
              <span className="product-card__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="product-card__price-old">{formatPrice(product.originalPrice)}</span>
              )}
              {product.discount && <Badge variant="discount">{formatDiscount(product.discount)}</Badge>}
            </div>
            <p className="product-card__qv-desc">{product.description}</p>
            {product.variants && product.variants.length > 0 && (
              <div className="product-card__qv-variants">
                <span className="product-card__qv-label">Taille :</span>
                <div className="product-card__qv-sizes">
                  {[...new Set(product.variants.map(v => v.size).filter(Boolean))].map(size => (
                    <span key={size} className="product-card__qv-size">{size}</span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Button onClick={handleAddToCart} fullWidth>
                {added ? 'Ajouté ✓' : 'Ajouter au panier'}
              </Button>
              <Link to={`/product/${product.slug}`} style={{ flex: '0 0 auto' }}>
                <Button variant="outline" onClick={() => setQuickViewOpen(false)}>Voir le produit</Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
