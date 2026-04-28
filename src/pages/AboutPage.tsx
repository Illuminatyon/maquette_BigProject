import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import './AboutPage.css';

export function AboutPage() {
  return (
    <div className="about-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[{ label: 'À propos' }]} />

        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero__content">
            <span className="about-hero__label">Notre histoire</span>
            <h1 className="section-title">À propos de <span>B-Project</span></h1>
            <p className="about-hero__text">
              B-Project est une boutique en ligne française fondée avec une vision simple :
              proposer des produits de qualité, sélectionnés avec soin, livrés directement chez vous.
              Vêtements, accessoires, art — nous rassemblons ce qui a du style et du sens.
            </p>
          </div>
          <div className="about-hero__visual">
            <div className="about-hero__blocks">
              {['#0f4c8a','#1a7fd4','#0a0a0f','#29b6f6','#1255a4','#111827'].map((c, i) => (
                <div key={i} className="about-hero__block" style={{ background: c }} />
              ))}
            </div>
            <span className="about-hero__logo-text">B-Project</span>
          </div>
        </section>

        {/* Values */}
        <section className="about-values">
          <h2 className="section-title">Nos <span>valeurs</span></h2>
          <div className="about-values__grid">
            {[
              { icon: '🎯', title: 'Sélection rigoureuse', desc: 'Chaque produit est choisi pour sa qualité, son design et sa durabilité. Rien n\'est laissé au hasard.' },
              { icon: '🌍', title: 'Fabrication responsable', desc: 'Nous favorisons les producteurs engagés dans des pratiques respectueuses de l\'environnement.' },
              { icon: '💬', title: 'Service client humain', desc: 'Une vraie équipe derrière chaque message. Nous répondons à toutes vos questions sous 24h.' },
              { icon: '🔄', title: 'Retours faciles', desc: 'Pas satisfait ? Retours gratuits sous 30 jours, sans questions posées.' },
            ].map(v => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-card__icon">{v.icon}</span>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          {[
            { value: '2 000+', label: 'Clients satisfaits' },
            { value: '8',      label: 'Produits disponibles' },
            { value: '48h',    label: 'Délai de livraison' },
            { value: '4.7★',   label: 'Note moyenne' },
          ].map(s => (
            <div key={s.label} className="about-stat">
              <div className="about-stat__value">{s.value}</div>
              <div className="about-stat__label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2 className="about-cta__title">Prêt à découvrir la boutique ?</h2>
          <p className="about-cta__sub">Explorez notre sélection de vêtements, accessoires et œuvres d'art.</p>
          <div className="about-cta__actions">
            <Link to="/category/tous"><Button size="lg">Visiter la boutique</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Nous contacter</Button></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
