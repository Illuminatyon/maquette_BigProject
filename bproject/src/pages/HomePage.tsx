import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { products, getDiscountedProducts } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import './HomePage.css';

const SLIDES = [
  {
    id: 1,
    title: 'La collection Signature',
    subtitle: 'Hoodies oversize, bombers premium, pièces intemporelles. Fabriqué pour durer.',
    cta: 'Voir les vêtements',
    ctaLink: '/category/vetements',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1400&q=80',
    accent: 'Nouveauté 2026',
  },
  {
    id: 2,
    title: 'Setup. Style. Signature.',
    subtitle: 'Desk mats, coques iPhone, mugs thermos — votre univers à vos couleurs.',
    cta: 'Voir les accessoires',
    ctaLink: '/category/accessoires',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1400&q=80',
    accent: 'Tech & Setup',
  },
  {
    id: 3,
    title: 'Art en édition limitée',
    subtitle: 'Prints numérotés, sérigraphies uniques — chaque œuvre raconte l\'histoire B-Project.',
    cta: 'Explorer l\'art',
    ctaLink: '/category/art',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1400&q=80',
    accent: 'Tirage limité',
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="hero">
      <div className="hero__slides">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content animate-fadeInUp">
        <span className="hero__accent">{slide.accent}</span>
        <h1 className="hero__title">{slide.title}</h1>
        <p className="hero__subtitle">{slide.subtitle}</p>
        <div className="hero__actions">
          <Link to={slide.ctaLink}>
            <Button size="lg">{slide.cta}</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">En savoir plus</Button>
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        className="hero__arrow hero__arrow--prev"
        onClick={() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Précédent"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        className="hero__arrow hero__arrow--next"
        onClick={() => setCurrent(c => (c + 1) % SLIDES.length)}
        aria-label="Suivant"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </section>
  );
}

function CategoryCards() {
  const cats = [
    { slug: 'vetements',   label: 'Vêtements',    icon: '🧥', desc: '5 pièces' },
    { slug: 'accessoires', label: 'Accessoires',   icon: '🎒', desc: '6 produits' },
    { slug: 'art',         label: 'Art limité',    icon: '🎨', desc: '3 éditions' },
  ];
  return (
    <section className="home-cats container">
      <h2 className="section-title">Nos <span>catégories</span></h2>
      <div className="home-cats__grid">
        {cats.map(c => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="home-cat-card">
            <div className="home-cat-card__icon">{c.icon}</div>
            <div>
              <div className="home-cat-card__label">{c.label}</div>
              <div className="home-cat-card__desc">{c.desc}</div>
            </div>
            <svg className="home-cat-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PromoBanner() {
  const promos = getDiscountedProducts();
  return (
    <section className="promo-banner">
      <div className="container promo-banner__inner">
        <div className="promo-banner__text">
          <span className="promo-banner__label">Offres limitées</span>
          <h2 className="promo-banner__title">T-shirt Grid à <span>-17%</span> cette semaine</h2>
          <p className="promo-banner__sub">Sérigraphie faite main, coton peigné 200g/m². Stock limité — ne ratez pas cette offre.</p>
          <Link to="/category/tous?filter=promo">
            <Button>Voir les promotions</Button>
          </Link>
        </div>
        <div className="promo-banner__products">
          {promos.slice(0, 2).map(p => (
            <Link key={p.id} to={`/product/${p.slug}`} className="promo-banner__item">
              <img src={p.image} alt={p.name} />
              <div className="promo-banner__item-info">
                <span className="promo-banner__item-name">{p.name}</span>
                <span className="promo-banner__item-price">
                  <s>{formatPrice(p.originalPrice!)}</s>
                  {' '}{formatPrice(p.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const featured = products.filter(p => p.isFeatured);

  return (
    <div className="homepage">
      <HeroSlider />
      <CategoryCards />

      {/* Featured products */}
      <section className="container home-products">
        <div className="home-products__header">
          <h2 className="section-title">Produits <span>populaires</span></h2>
          <Link to="/category/tous">
            <Button variant="outline">Voir tout</Button>
          </Link>
        </div>
        <ProductGrid products={featured} columns={4} />
      </section>

      <PromoBanner />

      {/* All products */}
      <section className="container home-products">
        <div className="home-products__header">
          <h2 className="section-title">Toute la <span>boutique</span></h2>
          <Link to="/category/tous">
            <Button variant="ghost">Tous les produits →</Button>
          </Link>
        </div>
        <ProductGrid products={products} columns={4} />
      </section>

      {/* Info banner */}
      <section className="home-trust">
        <div className="container home-trust__grid">
          {[
            { icon: '🚚', title: 'Livraison rapide', desc: 'Expédition sous 24-48h' },
            { icon: '🔒', title: 'Paiement sécurisé', desc: 'SSL + 3D Secure' },
            { icon: '↩️', title: 'Retours gratuits', desc: 'Sous 30 jours' },
            { icon: '💬', title: 'Support client', desc: 'Disponible 7j/7' },
          ].map(item => (
            <div key={item.title} className="home-trust__item">
              <span className="home-trust__icon">{item.icon}</span>
              <div>
                <div className="home-trust__title">{item.title}</div>
                <div className="home-trust__desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
