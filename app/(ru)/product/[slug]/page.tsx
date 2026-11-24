import { notFound } from 'next/navigation';
import { ProductPage } from '../../../../components/pages';
import { products, localizeProduct } from '../../../../lib/shop';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = products.find(item => item.slug === slug);
  return { title: entry ? localizeProduct(entry, 'ru').name : '' };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!products.some(item => item.slug === slug)) notFound();
  return <ProductPage slug={slug} />;
}
