import { RootLayout } from '../../components/root-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Alifba — книги, канцтовары и игрушки', template: '%s | Alifba' },
  description: 'Книги, канцтовары, игрушки и товары для творчества. Интернет-магазин Alifba.',
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout locale="ru">{children}</RootLayout>;
}
