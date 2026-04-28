import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { useCartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import './CartPage.css';

export function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCartContext();

  if (cart.items.length === 0) {
    return (
      <div className="cart-page page-wrapper">
        <div className="container">
          <Breadcrumb items={[{ label: 'Panier' }]} />
          <div className="cart-empty">
            <div className="cart-empty__icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 className="cart-empty__title">Votre panier est vide</h2>
            <p className="cart-empty__sub">Ajoutez des produits pour commencer vos achats.</p>
            <Link to="/category/tous">
              <Button size="lg">Découvrir la boutique</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[{ label: 'Panier' }]} />
        <h1 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>
          Mon <span>panier</span>
        </h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            <div className="cart-items__header">
              <span>Produit</span>
              <span>Prix</span>
              <span>Quantité</span>
              <span>Total</span>
              <span></span>
            </div>

            {cart.items.map(item => (
              <div key={item.id} className="cart-item animate-fadeIn">
                <div className="cart-item__product">
                  <Link to={`/product/${item.product.slug}`}>
                    <img src={item.product.image} alt={item.product.name} className="cart-item__img" />
                  </Link>
                  <div className="cart-item__meta">
                    <Link to={`/product/${item.product.slug}`} className="cart-item__name">
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <div className="cart-item__variant">
                        {item.variant.size && <span>Taille : {item.variant.size}</span>}
                        {item.variant.color && <span>Couleur : {item.variant.color}</span>}
                      </div>
                    )}
                  </div>
                </div>

                <span className="cart-item__price">{formatPrice(item.product.price)}</span>

                <div className="cart-item__qty">
                  <button className="cart-item__qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button className="cart-item__qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <span className="cart-item__total">{formatPrice(item.product.price * item.quantity)}</span>

                <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                </button>
              </div>
            ))}

            <div className="cart-items__footer">
              <button className="cart-items__clear" onClick={clearCart}>
                Vider le panier
              </button>
              <Link to="/category/tous">
                <Button variant="ghost">← Continuer les achats</Button>
              </Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="cart-summary">
            <h2 className="cart-summary__title">Récapitulatif</h2>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Sous-total ({cart.itemCount} article{cart.itemCount > 1 ? 's' : ''})</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Livraison</span>
                <span className="cart-summary__free">Gratuite</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            <Button size="lg" fullWidth>
              Passer commande
            </Button>
            <p className="cart-summary__secure">🔒 Paiement sécurisé SSL + 3D Secure</p>

            <div className="cart-summary__promo">
              <label className="cart-summary__promo-label">Code promo</label>
              <div className="cart-summary__promo-row">
                <input type="text" className="cart-summary__promo-input" placeholder="ex : BIENVENUE10" />
                <Button variant="outline" size="sm">Appliquer</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
