'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from './locale';

export function LegacyCatalog() {
  const { t, href } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const query = (params.get('q') ?? '').trim().slice(0, 120);
  const next = new URLSearchParams();
  if (query) {
    next.set('q', query);
    const page = params.get('page');
    if (page) next.set('page', page);
  }
  const target = href(query ? `/search/?${next}` : '/#products');
  useEffect(() => { router.replace(target); }, [target, router]);
  return <div className="container inner"><p>{t('Товары доступны на главной странице.')}</p>
    <Link className="button" href={target}>{query ? t('Поиск') : t('Перейти к товарам')}</Link>
  </div>;
}
