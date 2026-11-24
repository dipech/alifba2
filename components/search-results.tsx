'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProductCard, EventCard } from './cards';
import { products, events } from '../lib/shop';
import { useLocale } from './locale';

const pageSize = 20;
function normalize(value: string) {
  return value.toLocaleLowerCase('ru').replaceAll('ё', 'е');
}

export function SearchResults() {
  const { t, href } = useLocale();
  const params = useSearchParams();
  const query = (params.get('q') ?? '').trim().slice(0, 120);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return <p>{t('Введите название товара или заголовок события.')}</p>;

  const matches = (ru: string, en: string) => terms.every(term => normalize(ru + ' ' + en).includes(term));
  const results = products.filter(product => matches(product.name, product.en.name));
  const eventResults = events.filter(event => matches(event.name, event.en.name));
  const pageCount = Math.ceil(results.length / pageSize);
  const requestedPage = params.get('page') ?? '';
  const page = /^[1-9]\d*$/.test(requestedPage)
    ? Math.min(Number(requestedPage), Math.max(1, pageCount)) : 1;
  const visible = results.slice((page - 1) * pageSize, page * pageSize);

  function pageLink(number: number) {
    const next = new URLSearchParams({ q: query });
    if (number > 1) next.set('page', String(number));
    return href(`/search/?${next}#search-results`);
  }

  return <div id="search-results">
    <p className="muted">{t('По запросу')} «{query}» · {t('Найдено')}: {results.length + eventResults.length}</p>
    {results.length > 0 && <section className="search-section">
      <h2>{t('Товары')} · {results.length}</h2>
      <div className="product-grid">{visible.map(product => <ProductCard key={product.id} product={product} />)}</div>
      {pageCount > 1 && <nav className="pagination" aria-label={t('Страницы результатов')}>
        {page > 1 && <Link href={pageLink(page - 1)}>{t('Назад')}</Link>}
        {Array.from({ length: pageCount }, (_, index) => {
          const number = index + 1;
          return number === page
            ? <span key={number} aria-current="page" aria-label={`${t('Страница')} ${number}`}>{number}</span>
            : <Link key={number} href={pageLink(number)} aria-label={`${t('Страница')} ${number}`}>{number}</Link>;
        })}
        {page < pageCount && <Link href={pageLink(page + 1)}>{t('Далее')}</Link>}
      </nav>}
    </section>}
    {eventResults.length > 0 && <section className="search-section">
      <h2>{t('События')} · {eventResults.length}</h2>
      <div className="event-grid">{eventResults.map(event => <EventCard key={event.slug} event={event} />)}</div>
    </section>}
    {!results.length && !eventResults.length && <div className="surface empty">
      <h2>{t('Ничего не найдено')}</h2><p>{t('Попробуйте другое название.')}</p>
      <Link className="button button-outline" href={href('/#products')}>{t('Перейти к товарам')}</Link>
    </div>}
  </div>;
}
