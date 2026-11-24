'use client';

import Image from 'next/image';
import Link from 'next/link';
import { media, localizeProduct, localizeEvent, type Product, type ShopEvent } from '../lib/shop';
import { AddToCart } from './cart';
import { useLocale } from './locale';

export function ProductCard({ product: original }: { product: Product }) {
  const { locale, href, money } = useLocale();
  const product = localizeProduct(original, locale);
  return <article className="product-card">
    <Link href={href(`/product/${product.slug}/`)} className="product-link" prefetch={false}>
      <div className="product-image">
        <Image src={media(product.image)} alt="" fill sizes="(max-width: 640px) 165px, 260px" />
      </div>
      <div className="product-copy"><h3>{product.name}</h3></div>
    </Link>
    <div className="product-bottom"><strong>{money(product.price)}</strong><AddToCart id={product.id} compact /></div>
  </article>;
}

export function EventCard({ event: original }: { event: ShopEvent }) {
  const { locale, href } = useLocale();
  const event = localizeEvent(original, locale);
  return <article className="event-card">
    <Link href={href(`/events/${event.slug}/`)} prefetch={false}>
      <div className={`event-image${event.imageFit === 'contain' ? ' contain' : ''}`}>
        <Image src={media(event.image)} alt="" fill sizes="(max-width: 640px) 245px, 280px" />
      </div>
      <div className="event-copy"><span className="card-label">{event.label}</span><h3>{event.name}</h3></div>
    </Link>
  </article>;
}

export function Breadcrumbs({ parent, current }: { parent?: { name: string; href: string }; current: string }) {
  const { t, href } = useLocale();
  return <nav aria-label={t('Хлебные крошки')} className="breadcrumbs">
    <Link href={href('/')}>{t('Главная')}</Link>
    {parent && <><span aria-hidden>/</span><Link href={href(parent.href)}>{parent.name}</Link></>}
    <span aria-hidden>/</span><span aria-current="page">{current}</span>
  </nav>;
}
