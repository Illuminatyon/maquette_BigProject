export interface ProductVariant {
  id: number;
  size?: string;
  color?: string;
  colorHex?: string;
  stock: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  categoryId: number;
  categorySlug: string;
  variants?: ProductVariant[];
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviews?: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  parentId?: number;
  image?: string;
  productCount?: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'name';
