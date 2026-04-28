import type { SortOption } from '../../types/product';
import './ProductFilters.css';

interface ProductFiltersProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  search: string;
  onSearchChange: (search: string) => void;
  count: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured',   label: 'Pertinence' },
  { value: 'price-asc',  label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest',     label: 'Nouveautés' },
  { value: 'name',       label: 'Nom A-Z' },
];

export function ProductFilters({ sort, onSortChange, search, onSearchChange, count }: ProductFiltersProps) {
  return (
    <div className="pf">
      <p className="pf__count">{count} produit{count !== 1 ? 's' : ''}</p>
      <div className="pf__controls">
        <div className="pf__search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="pf__search"
            placeholder="Rechercher..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
          {search && (
            <button className="pf__clear" onClick={() => onSearchChange('')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        <div className="pf__sort-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M7 12h10M11 18h2"/>
          </svg>
          <select
            className="pf__sort"
            value={sort}
            onChange={e => onSortChange(e.target.value as SortOption)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
