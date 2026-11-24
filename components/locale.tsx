'use client';

import { createContext, useContext, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatMoney, localizedPath, translate, type Locale, type Text } from '../lib/i18n';

const LocaleContext = createContext<Locale>('ru');

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: (text: Text) => translate(locale, text),
    href: (path: string) => localizedPath(locale, path),
    money: (kopecks: number) => formatMoney(kopecks, locale),
  };
}

export function LanguageSwitch() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const params = useSearchParams();
  const [hash, setHash] = useState('');
  useEffect(() => {
    function update() { setHash(window.location.hash); }
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
    };
  }, [pathname]);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const path = basePath && pathname.startsWith(basePath + '/') ? pathname.slice(basePath.length) : pathname;
  const search = params.toString();
  const suffix = (search ? `?${search}` : '') + hash;
  const neutral = path.replace(/^\/en(?=\/|$)/, '') || '/';

  return <nav className="language-switch" aria-label={t('Язык')}>
    {(['ru', 'en'] as const).map(language =>
      language === locale
        ? <span key={language} aria-current="true">{language.toUpperCase()}</span>
        : <Link key={language} prefetch={false} href={localizedPath(language, neutral) + suffix}>{language.toUpperCase()}</Link>
    )}
  </nav>;
}
