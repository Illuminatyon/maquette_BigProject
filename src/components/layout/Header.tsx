import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useAuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatPrice';
import './Header.css';

export function Header() {
  const { cart } = useCartContext();
  const { user, isAuthenticated } = useAuthContext();

  return (
    <header className="header">
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar__inner">
          <Link to="/contact" className="topbar__link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contactez-nous
          </Link>
          <div className="topbar__right">
            <Link to="/account" className="topbar__link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
              </svg>
              {isAuthenticated ? user?.firstName : 'Connexion'}
            </Link>
            <Link to="/cart" className="topbar__cart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              Panier
              {cart.itemCount > 0 && (
                <span className="topbar__cart-badge">{cart.itemCount}</span>
              )}
              {cart.itemCount > 0 && (
                <span className="topbar__cart-total">{formatPrice(cart.total)}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
