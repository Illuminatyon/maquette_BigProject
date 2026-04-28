import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import './Footer.css';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><span>B</span></div>
              <span className="footer__logo-text">B-Project</span>
            </div>
            <p className="footer__desc">
              Votre boutique en ligne française. Des produits soigneusement sélectionnés,
              livrés directement chez vous.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Produits */}
          <div className="footer__col">
            <h4 className="footer__heading">Produits</h4>
            <ul className="footer__links">
              <li><Link to="/category/tous?filter=promo">Promotions</Link></li>
              <li><Link to="/category/tous?filter=new">Nouveaux produits</Link></li>
              <li><Link to="/category/tous?sort=featured">Meilleures ventes</Link></li>
              <li><Link to="/category/vetements">Vêtements</Link></li>
              <li><Link to="/category/accessoires">Accessoires</Link></li>
              <li><Link to="/category/art">Art</Link></li>
            </ul>
          </div>

          {/* Notre société */}
          <div className="footer__col">
            <h4 className="footer__heading">Notre société</h4>
            <ul className="footer__links">
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/contact">Contactez-nous</Link></li>
              <li><Link to="/livraison">Livraison</Link></li>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/cgu">Conditions d'utilisation</Link></li>
              <li><Link to="/paiement-securise">Paiement sécurisé</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__heading">Newsletter</h4>
            <p className="footer__newsletter-desc">
              Recevez nos offres spéciales et bénéficiez de <strong>-10%</strong> sur votre première commande.
            </p>
            {subscribed ? (
              <p className="footer__subscribed">
                ✓ Merci pour votre inscription !
              </p>
            ) : (
              <form className="footer__newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="sm" fullWidth>S'inscrire</Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">© {new Date().getFullYear()} B-Project — Boutique en ligne</p>
          <div className="footer__payment-icons">
            <span className="footer__pay-badge">VISA</span>
            <span className="footer__pay-badge">MC</span>
            <span className="footer__pay-badge">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
