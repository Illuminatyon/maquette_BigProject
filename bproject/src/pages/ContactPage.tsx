import { useState } from 'react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import './ContactPage.css';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="contact-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[{ label: 'Contact' }]} />

        <div className="contact-layout">
          <div>
            <h1 className="section-title">Nous <span>contacter</span></h1>
            <p className="contact-intro">
              Une question sur une commande, un produit ou une livraison ? Notre équipe vous répond sous 24h.
            </p>

            <div className="contact-infos">
              {[
                { icon: '📧', title: 'E-mail', value: 'contact@bproject.fr' },
                { icon: '🕐', title: 'Horaires', value: 'Lun–Ven, 9h–18h' },
                { icon: '📍', title: 'Adresse', value: 'France, Paris' },
              ].map(info => (
                <div key={info.title} className="contact-info-item">
                  <span className="contact-info-item__icon">{info.icon}</span>
                  <div>
                    <div className="contact-info-item__title">{info.title}</div>
                    <div className="contact-info-item__value">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-panel">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>Message envoyé !</h3>
                <p>Nous vous répondrons dans les meilleurs délais.</p>
                <Button variant="outline" onClick={() => setSent(false)}>Nouveau message</Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form__title">Envoyer un message</h2>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label>Votre nom</label>
                    <input type="text" value={form.name} onChange={set('name')} required placeholder="Arthur Dupont" />
                  </div>
                  <div className="contact-form__field">
                    <label>Adresse e-mail</label>
                    <input type="email" value={form.email} onChange={set('email')} required placeholder="vous@exemple.fr" />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label>Sujet</label>
                  <select value={form.subject} onChange={set('subject')} required>
                    <option value="">-- Sélectionnez --</option>
                    <option>Commande / Livraison</option>
                    <option>Retour / Remboursement</option>
                    <option>Produit / Stock</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div className="contact-form__field">
                  <label>Message</label>
                  <textarea value={form.message} onChange={set('message')} required placeholder="Décrivez votre demande..." rows={5} />
                </div>
                <Button type="submit" fullWidth loading={loading}>Envoyer le message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
