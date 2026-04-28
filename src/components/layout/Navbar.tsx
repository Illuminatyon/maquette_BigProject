import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { mainCategories, getSubCategories } from '../../data/categories';
import './Navbar.css';

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/tous?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <span className="navbar__logo-b">B</span>
          </div>
          <span className="navbar__logo-text">B-Project</span>
        </Link>

        {/* Nav links (desktop) */}
        <ul className="navbar__links">
          {mainCategories.map(cat => {
            const subs = getSubCategories(cat.id);
            return (
              <li key={cat.id} className="navbar__item">
                <NavLink
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {cat.name}
                  {subs.length > 0 && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </NavLink>
                {subs.length > 0 && (
                  <div className="navbar__dropdown">
                    {subs.map(sub => (
                      <Link key={sub.id} to={`/category/${sub.slug}`} className="navbar__dropdown-item">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
          <li className="navbar__item">
            <NavLink to="/chatbot" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              Chatbot
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/about" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              À propos
            </NavLink>
          </li>
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          {searchOpen ? (
            <form className="navbar__search-form animate-fadeIn" onSubmit={handleSearch}>
              <input
                ref={searchRef}
                type="text"
                className="navbar__search-input"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="button" className="navbar__search-close" onClick={() => setSearchOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </form>
          ) : (
            <button className="navbar__icon-btn" onClick={() => setSearchOpen(true)} aria-label="Rechercher">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          )}

          {/* Hamburger (mobile) */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`navbar__ham-bar ${mobileOpen ? 'navbar__ham-bar--open1' : ''}`} />
            <span className={`navbar__ham-bar ${mobileOpen ? 'navbar__ham-bar--open2' : ''}`} />
            <span className={`navbar__ham-bar ${mobileOpen ? 'navbar__ham-bar--open3' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile animate-fadeInDown">
          <div className="container">
            {mainCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="navbar__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/chatbot" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>Chatbot</Link>
            <Link to="/about"   className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>À propos</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
