import { useState, useMemo } from 'react';
import { products, getProductsByCategory } from '../data/products';
import type { Product, SortOption } from '../types/product';

export function useProducts(categorySlug?: string) {
  const [sort, setSort] = useState<SortOption>('featured');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list: Product[] = categorySlug && categorySlug !== 'tous'
      ? getProductsByCategory(categorySlug)
      : products;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tags?.some(t => t.includes(q))
      );
    }

    switch (sort) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'newest':     return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'name':       return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [categorySlug, sort, search]);

  return { products: filtered, sort, setSort, search, setSearch };
}
