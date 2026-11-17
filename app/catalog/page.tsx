import { Suspense } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '../../components/cards';
import { SearchResults } from '../../components/search-results';
import { categories } from '../../lib/shop';

export const metadata = { title: 'Каталог' };

export default function Catalog() {
  return <div className="container inner">
    <Breadcrumbs current="Каталог" />
    <h1>Каталог</h1>
    <nav className="category-links" aria-label="Категории">
      {categories.map(category => <Link key={category.slug} href={`/catalog/${category.slug}/`}>{category.name}</Link>)}
    </nav>
    <Suspense fallback={<p>Загружается каталог…</p>}><SearchResults /></Suspense>
  </div>;
}
