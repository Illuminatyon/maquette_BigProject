import { useState, useRef, useEffect } from 'react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { products } from '../data/products';
import './ChatbotPage.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de B-Project, une boutique en ligne française.
Tu aides les clients à trouver des produits, répondre à leurs questions sur les commandes, la livraison, et les retours.

Voici notre catalogue actuel :
${products.map(p => `- ${p.name} (${p.price}€) — catégorie: ${p.categorySlug}`).join('\n')}

Politiques :
- Livraison gratuite à partir de 50€, sinon 4,90€
- Retours gratuits sous 30 jours
- Paiement sécurisé par CB, PayPal
- Délai de livraison : 2-4 jours ouvrés

Sois chaleureux, concis et utile. Réponds toujours en français.`;

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Bonjour ! 👋 Je suis l\'assistant B-Project. Comment puis-je vous aider aujourd\'hui ? Je peux vous conseiller sur nos produits, répondre à vos questions sur les livraisons, ou vous aider à trouver le cadeau parfait.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.id !== '0')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history.length > 0 ? history : [{ role: 'user', content: text }],
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text ?? 'Désolé, je n\'ai pas pu répondre. Veuillez réessayer.';

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Une erreur est survenue. Veuillez réessayer ou nous contacter par e-mail.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const SUGGESTIONS = ['Quels produits recommandez-vous ?', 'Comment retourner un article ?', 'Délai de livraison ?', 'Avez-vous des promos ?'];

  return (
    <div className="chatbot-page page-wrapper">
      <div className="container chatbot-page__inner">
        <Breadcrumb items={[{ label: 'Chatbot' }]} />

        <div className="chatbot-layout">
          {/* Sidebar */}
          <aside className="chatbot-sidebar">
            <div className="chatbot-sidebar__header">
              <div className="chatbot-sidebar__avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <div>
                <div className="chatbot-sidebar__name">Assistant B-Project</div>
                <div className="chatbot-sidebar__status">
                  <span className="chatbot-sidebar__dot" />
                  En ligne
                </div>
              </div>
            </div>

            <div className="chatbot-sidebar__section">
              <p className="chatbot-sidebar__label">Questions fréquentes</p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  className="chatbot-suggestion"
                  onClick={() => { setInput(s); }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="chatbot-sidebar__section">
              <p className="chatbot-sidebar__label">Support humain</p>
              <p className="chatbot-sidebar__info">Notre équipe est disponible<br />du lundi au vendredi, 9h–18h.</p>
              <a href="/contact" className="chatbot-sidebar__contact-link">
                Nous contacter →
              </a>
            </div>
          </aside>

          {/* Chat */}
          <div className="chatbot-window">
            <div className="chatbot-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.role} animate-fadeInUp`}>
                  {msg.role === 'assistant' && (
                    <div className="chatbot-msg__avatar">B</div>
                  )}
                  <div className="chatbot-msg__bubble">
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chatbot-msg chatbot-msg--assistant animate-fadeIn">
                  <div className="chatbot-msg__avatar">B</div>
                  <div className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="chatbot-input-bar">
              <textarea
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Posez votre question… (Entrée pour envoyer)"
                rows={1}
                disabled={loading}
              />
              <Button onClick={sendMessage} disabled={!input.trim() || loading} loading={loading}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                }
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
