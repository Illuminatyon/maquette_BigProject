import { Link } from 'react-router-dom';
import './Breadcrumb.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link to="/" className="breadcrumb__link">Accueil</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="breadcrumb__item">
            <span className="breadcrumb__sep">›</span>
            {item.href && i < items.length - 1 ? (
              <Link to={item.href} className="breadcrumb__link">{item.label}</Link>
            ) : (
              <span className="breadcrumb__current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
