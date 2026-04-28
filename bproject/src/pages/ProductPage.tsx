import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProductGrid } from '../components/product/ProductGrid';
import { getProductBySlug, products } from '../data/products';
import { getCategoryBySlug } from '../data/categories';
import { formatPrice, formatDiscount } from '../utils/formatPrice';
import { useCartContext } from '../context/CartContext';
import type { ProductVariant } from '../types/product';
import './ProductPage.css';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCartContext();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-wrapper container" style={{ textAlign: 'center', paddingTop: 80 }}>
        <h1 className="section-title">Produit <span>introuvable</span></h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 24px' }}>Ce produit n'existe pas ou a été retiré.</p>
        <Link to="/category/tous"><Button>Retour à la boutique</Button></Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const sizes = [...new Set(product.variants?.map(v => v.size).filter(Boolean))];
  const colors = [...new Set(product.variants?.map(v => v.color).filter(Boolean))];

  const handleAddToCart = () => {
    addItem(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, qty);
    navigate('/cart');
  };

  const stars = Math.round(product.rating ?? 0);

  return (
    <div className="product-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[
          { label: category?.name ?? product.categorySlug, href: `/category/${product.categorySlug}` },
          { label: product.name },
        ]} />

        <div className="product-page__layout">
          {/* Gallery */}
          <div className="product-page__gallery">
            <div className="product-page__main-img-wrap">
              <img
                src={product.images[selectedImage] ?? product.image}
                alt={product.name}
                className="product-page__main-img"
              />
              {product.discount && (
                <div className="product-page__badge-wrap">
                  <Badge variant="discount">{formatDiscount(product.discount)}</Badge>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="product-page__thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-page__thumb ${i === selectedImage ? 'product-page__thumb--active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`Vue ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-page__info">
            <h1 className="product-page__title">{product.name}</h1>

            {product.rating && (
              <div className="product-page__rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                    fill={i < stars ? 'var(--color-blue-light)' : 'none'}
                    stroke="var(--color-blue-light)" strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
                <span className="product-page__rating-text">{product.rating}/5 ({product.reviews} avis)</span>
              </div>
            )}

            <div className="product-page__price-block">
              <span className="product-page__price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="product-page__price-old">{formatPrice(product.originalPrice)}</span>
              )}
              {product.discount && (
                <Badge variant="discount">{formatDiscount(product.discount)}</Badge>
              )}
            </div>

            <p className="product-page__desc">{product.description}</p>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="product-page__option">
                <label className="product-page__option-label">
                  Couleur : <strong>{selectedVariant?.color ?? colors[0]}</strong>
                </label>
                <div className="product-page__colors">
                  {product.variants?.filter((v, i, arr) =>
                    arr.findIndex(x => x.color === v.color) === i
                  ).map(v => (
                    <button
                      key={v.id}
                      className={`product-page__color-btn ${selectedVariant?.color === v.color ? 'product-page__color-btn--active' : ''}`}
                      style={{ background: v.colorHex ?? '#888' }}
                      onClick={() => setSelectedVariant(v)}
                      title={v.color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="product-page__option">
                <label className="product-page__option-label">
                  Taille : <strong>{selectedVariant?.size ?? sizes[0]}</strong>
                </label>
                <div className="product-page__sizes">
                  {product.variants?.filter((v, i, arr) =>
                    arr.findIndex(x => x.size === v.size) === i
                  ).map(v => (
                    <button
                      key={v.id}
                      className={`product-page__size-btn ${selectedVariant?.size === v.size ? 'product-page__size-btn--active' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock === 0}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="product-page__qty">
              <label className="product-page__option-label">Quantité</label>
              <div className="product-page__qty-ctrl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="product-page__qty-btn">−</button>
                <span className="product-page__qty-val">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="product-page__qty-btn">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-page__actions">
              <Button size="lg" onClick={handleAddToCart} fullWidth
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>}
              >
                {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
              </Button>
              <Button variant="outline" size="lg" onClick={handleBuyNow} fullWidth>
                Acheter maintenant
              </Button>
            </div>

            {/* Trust */}
            <div className="product-page__trust">
              <span>🔒 Paiement sécurisé</span>
              <span>🚚 Livraison rapide</span>
              <span>↩️ Retours 30j</span>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="product-page__related">
            <h2 className="section-title">Produits <span>similaires</span></h2>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
