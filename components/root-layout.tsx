import type { ReactNode } from 'react';
import '@fontsource/fira-sans/400.css';
import '@fontsource/fira-sans/500.css';
import '@fontsource/fira-sans/600.css';
import '@fontsource/ubuntu/700.css';
import { CartProvider } from './cart';
import { LocaleProvider } from './locale';
import { Footer, Header, SkipLink } from './shell';
import type { Locale } from '../lib/i18n';
import '../app/styles.css';

export function RootLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <html lang={locale}><body>
    <LocaleProvider locale={locale}><CartProvider>
      <SkipLink /><Header /><main id="main">{children}</main><Footer />
    </CartProvider></LocaleProvider>
  </body></html>;
}
