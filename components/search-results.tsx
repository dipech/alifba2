'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from './cards';
import { products, type Category, type Product } from '../lib/shop';

const pageSize = 20;

function normalize(value: string) {
  return value.toLocaleLowerCase('ru').replaceAll('ё', 'е');
}

export function SearchResults({ category }: { category?: Category }) {
  const params = useSearchParams();
  const query = (params.get('q') ?? '').trim().slice(0, 120);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const results = products.filter(product =>
    (!category || product.category === category) &&
    terms.every(term => normalize(product.name).includes(term)),
  );
  const path = category ? `/catalog/${category}/` : '/catalog/';
  const pageCount = Math.ceil(results.length / pageSize);
  const requestedPage = params.get('page') ?? '';
  const page = /^[1-9]\d*$/.test(requestedPage)
    ? Math.min(Number(requestedPage), Math.max(1, pageCount))
    : 1;

  function pageLink(number: number) {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (number > 1) next.set('page', String(number));
    const search = next.toString();
    return `${path}${search ? `?${search}` : ''}#catalog-results`;
  }

  return <div id="catalog-results">
    {query && <p className="muted">Поиск по запросу «{query}» · Найдено: {results.length}</p>}
    {results.length ? <ProductGrid products={results} page={page} /> : <div className="surface empty">
      <h2>Товары не найдены</h2>
      <p>Попробуйте другое название или откройте весь каталог.</p>
      <Link className="button button-outline" href="/catalog/">Весь каталог</Link>
    </div>}
    {pageCount > 1 && <nav className="pagination" aria-label="Страницы каталога">
      {page > 1 && <Link href={pageLink(page - 1)}>Назад</Link>}
      {Array.from({ length: pageCount }, (_, index) => {
        const number = index + 1;
        return number === page
          ? <span key={number} aria-current="page" aria-label={`Страница ${number}`}>{number}</span>
          : <Link key={number} href={pageLink(number)} aria-label={`Страница ${number}`}>{number}</Link>;
      })}
      {page < pageCount && <Link href={pageLink(page + 1)}>Далее</Link>}
    </nav>}
  </div>;
}

export function ProductGrid({ products, page = 1 }: { products: Product[]; page?: number }) {
  const start = (page - 1) * pageSize;
  return <div className="product-grid">
    {products.slice(start, start + pageSize).map(product => <ProductCard key={product.id} product={product} />)}
  </div>;
}
