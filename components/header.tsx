'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useLocale } from './locale';

export function HeaderSearch() {
  const router = useRouter();
  const { t, href } = useLocale();

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim().slice(0, 120);
    router.push(href(query ? `/search/?${new URLSearchParams({ q: query })}` : '/search/'));
  }

  return <form className="header-search" role="search" onSubmit={search}>
    <label className="sr-only" htmlFor="shop-search">{t('Поиск товаров и событий')}</label>
    <input id="shop-search" name="q" type="search" placeholder={t('Найти')} maxLength={120} />
    <button type="submit" aria-label={t('Найти')}><Search size={21} /></button>
  </form>;
}
