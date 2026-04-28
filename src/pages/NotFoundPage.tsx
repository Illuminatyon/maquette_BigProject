import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 104px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '40px 24px',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 15vw, 10rem)',
        fontWeight: 900,
        fontStyle: 'italic',
        lineHeight: 1,
        background: 'linear-gradient(135deg, var(--color-blue-dark), var(--color-blue-light))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px',
      }}>404</div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        fontWeight: 900, fontStyle: 'italic',
        textTransform: 'uppercase', marginBottom: '12px',
      }}>Page introuvable</h1>

      <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/"><Button size="lg">Retour à l'accueil</Button></Link>
        <Link to="/category/tous"><Button variant="outline" size="lg">Voir la boutique</Button></Link>
      </div>
    </div>
  );
}
