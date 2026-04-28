import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import { getCategoryBySlug, categories } from '../data/categories';
import './CategoryPage.css';

export function CategoryPage() {
  const { slug = 'tous' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const category = getCategoryBySlug(slug);
  const { products, sort, setSort, search, setSearch } = useProducts(slug);

  // Filter by URL params
  const filter = searchParams.get('filter');
  const displayProducts = filter === 'promo'
    ? products.filter(p => p.discount)
    : filter === 'new'
    ? products.filter(p => p.isNew)
    : products;

  const subCategories = categories.filter(c => c.parentId === category?.id);
  const parentCat = category?.parentId ? categories.find(c => c.id === category.parentId) : null;

  return (
    <div className="category-page page-wrapper">
      <div className="container">
        <Breadcrumb items={[
          ...(parentCat ? [{ label: parentCat.name, href: `/category/${parentCat.slug}` }] : []),
          { label: category?.name ?? slug },
        ]} />

        {/* Header */}
        <div className="category-page__header">
          <div>
            <h1 className="section-title">
              {category?.name ?? slug}
            </h1>
            {subCategories.length > 0 && (
              <div className="category-page__subs">
                {subCategories.map(s => (
                  <Link key={s.id} to={`/category/${s.slug}`} className="category-page__sub-link">
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <ProductFilters
          sort={sort}
          onSortChange={setSort}
          search={search}
          onSearchChange={setSearch}
          count={displayProducts.length}
        />

        <ProductGrid products={displayProducts} columns={4} />
      </div>
    </div>
  );
}
