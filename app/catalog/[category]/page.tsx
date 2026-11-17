import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../components/cards';
import { ProductGrid, SearchResults } from '../../../components/search-results';
import { categories, products } from '../../../lib/shop';

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return { title: categories.find(entry => entry.slug === category)?.name ?? 'Каталог' };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const entry = categories.find(item => item.slug === category);
  if (!entry) notFound();
  return <div className="container inner">
    <Breadcrumbs parent={{ name: 'Каталог', href: '/catalog/' }} current={entry.name} />
    <h1>{entry.name}</h1>
    <Suspense fallback={<ProductGrid products={products.filter(product => product.category === entry.slug)} />}>
      <SearchResults category={entry.slug} />
    </Suspense>
  </div>;
}
