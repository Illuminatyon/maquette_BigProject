import type { Category } from '../types/product';

export const categories: Category[] = [
  { id: 2,  slug: 'tous',        name: 'Tous les produits',       productCount: 14 },
  { id: 3,  slug: 'vetements',   name: 'Vêtements',               productCount: 5  },
  { id: 4,  slug: 'hommes',      name: 'Hommes',   parentId: 3,   productCount: 3  },
  { id: 5,  slug: 'femmes',      name: 'Femmes',   parentId: 3,   productCount: 2  },
  { id: 6,  slug: 'accessoires', name: 'Accessoires',             productCount: 6  },
  { id: 7,  slug: 'papeterie',   name: 'Papeterie', parentId: 6,  productCount: 2  },
  { id: 8,  slug: 'tech',        name: 'Tech & Setup', parentId: 6, productCount: 3 },
  { id: 9,  slug: 'art',         name: 'Art',                     productCount: 3  },
];

export const mainCategories   = categories.filter(c => !c.parentId && c.slug !== 'tous');
export const getSubCategories = (parentId: number) => categories.filter(c => c.parentId === parentId);
export const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
