'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

export function HeaderSearch() {
  const router = useRouter();

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    router.push(query ? `/catalog/?${new URLSearchParams({ q: query })}` : '/catalog/');
  }

  return <form className="header-search" role="search" onSubmit={search}>
    <label className="sr-only" htmlFor="shop-search">Поиск по каталогу</label>
    <input id="shop-search" name="q" type="search" placeholder="Найти в каталоге" maxLength={120} />
    <button type="submit" aria-label="Найти"><Search size={21} /></button>
  </form>;
}
