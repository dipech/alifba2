import { RootLayout } from '../../../components/root-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Alifba — books, stationery and toys', template: '%s | Alifba' },
  description: 'Books, stationery, toys and art supplies. The Alifba online store.',
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout locale="en">{children}</RootLayout>;
}
