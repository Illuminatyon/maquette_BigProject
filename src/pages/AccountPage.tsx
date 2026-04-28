import { useState } from 'react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import './AccountPage.css';

function LoginForm() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const ok = await login({ email, password });
    setLoading(false);
    if (!ok) setError('Email ou mot de passe incorrect.');
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__field">
        <label>Adresse e-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vous@exemple.fr" />
      </div>
      <div className="auth-form__field">
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
      </div>
      {error && <p className="auth-form__error">{error}</p>}
      <Button type="submit" fullWidth loading={loading}>Se connecter</Button>
      <p className="auth-form__hint">
        <a href="#">Mot de passe oublié ?</a>
      </p>
    </form>
  );
}

function RegisterForm() {
  const { register } = useAuthContext();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const ok = await register(form);
    setLoading(false);
    if (!ok) setError('Impossible de créer le compte.');
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__row">
        <div className="auth-form__field">
          <label>Prénom</label>
          <input type="text" value={form.firstName} onChange={set('firstName')} required placeholder="Arthur" />
        </div>
        <div className="auth-form__field">
          <label>Nom</label>
          <input type="text" value={form.lastName} onChange={set('lastName')} required placeholder="Dupont" />
        </div>
      </div>
      <div className="auth-form__field">
        <label>Adresse e-mail</label>
        <input type="email" value={form.email} onChange={set('email')} required placeholder="vous@exemple.fr" />
      </div>
      <div className="auth-form__field">
        <label>Mot de passe</label>
        <input type="password" value={form.password} onChange={set('password')} required placeholder="Min. 4 caractères" />
      </div>
      {error && <p className="auth-form__error">{error}</p>}
      <Button type="submit" fullWidth loading={loading}>Créer un compte</Button>
    </form>
  );
}

function AccountDashboard() {
  const { user, logout } = useAuthContext();
  return (
    <div className="account-dashboard">
      <div className="account-dashboard__welcome">
        <div className="account-dashboard__avatar">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </div>
        <div>
          <h2 className="account-dashboard__name">{user?.firstName} {user?.lastName}</h2>
          <p className="account-dashboard__email">{user?.email}</p>
        </div>
      </div>
      <div className="account-dashboard__cards">
        {[
          { icon: '📦', title: 'Mes commandes', desc: 'Suivre vos commandes' },
          { icon: '📍', title: 'Mes adresses', desc: 'Gérer vos adresses' },
          { icon: '👤', title: 'Mon profil', desc: 'Modifier vos infos' },
          { icon: '❤️', title: 'Ma liste d\'envies', desc: 'Vos produits favoris' },
        ].map(c => (
          <div key={c.title} className="account-card">
            <span className="account-card__icon">{c.icon}</span>
            <div>
              <div className="account-card__title">{c.title}</div>
              <div className="account-card__desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="ghost" onClick={logout}>Se déconnecter</Button>
    </div>
  );
}

export function AccountPage() {
  const { isAuthenticated } = useAuthContext();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="account-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[{ label: 'Mon compte' }]} />
        <h1 className="section-title" style={{ marginBottom: 'var(--space-8)' }}>
          Mon <span>compte</span>
        </h1>

        {isAuthenticated ? (
          <AccountDashboard />
        ) : (
          <div className="auth-wrapper">
            <div className="auth-tabs">
              <button className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`} onClick={() => setTab('login')}>
                Connexion
              </button>
              <button className={`auth-tab ${tab === 'register' ? 'auth-tab--active' : ''}`} onClick={() => setTab('register')}>
                Créer un compte
              </button>
            </div>
            <div className="auth-panel">
              {tab === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
