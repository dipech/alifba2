import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { AddToCart } from '../../../components/cart';
import { Breadcrumbs } from '../../../components/cards';
import { categories, media, money, ozonProductLink, products, sharedOzonUrl } from '../../../lib/shop';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: products.find(product => product.slug === slug)?.name ?? 'Товар' };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find(entry => entry.slug === slug);
  if (!product) notFound();
  const category = categories.find(entry => entry.slug === product.category);
  const ozon = ozonProductLink(product.ozonUrl) ?? sharedOzonUrl;
  return <div className="container inner">
    <Breadcrumbs current={product.name} parent={{ name: 'Каталог', href: '/catalog/' }} />
    <article className="product-detail">
      <div className="detail-image"><Image src={media(product.image)} alt={product.name} fill priority sizes="(max-width: 700px) 90vw, 480px" /></div>
      <div className="detail-copy">
        <Link className="text-link" href={`/catalog/${product.category}/`}>{category?.name}</Link>
        <h1>{product.name}</h1>
        <p className="muted">Артикул {product.id}</p>
        {product.description && <p>{product.description}</p>}
        <p className="detail-price">{money(product.price)}</p>
        <div className="detail-actions">
          <AddToCart id={product.id} />
          <a className="button button-ozon" href={ozon}>Купить на Озон <ArrowUpRight size={17} aria-hidden /></a>
        </div>
        <Link className="text-link detail-delivery" href="/delivery/">Доставка и самовывоз</Link>
      </div>
    </article>
  </div>;
}
