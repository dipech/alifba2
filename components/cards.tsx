import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, events, media, money, type Product } from '../lib/shop';
import { AddToCart } from './cart';

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find(entry => entry.slug === product.category);
  return <article className="product-card">
    <Link href={`/product/${product.slug}/`} className="product-link" prefetch={false}>
      <div className="product-image">
        <Image src={media(product.image)} alt="" fill sizes="(max-width: 640px) 165px, 260px" />
      </div>
      <div className="product-copy">
        <span className="card-label">{category?.name}</span>
        <h3>{product.name}</h3>
      </div>
    </Link>
    <div className="product-bottom">
      <strong>{money(product.price)}</strong>
      <AddToCart id={product.id} compact />
    </div>
  </article>;
}

export function EventCard({ event }: { event: typeof events[number] }) {
  return <article className="event-card">
    <Link href={`/events/${event.slug}/`} prefetch={false}>
      <div className={`event-image${event.imageFit === 'contain' ? ' contain' : ''}`}>
        <Image src={media(event.image)} alt="" fill sizes="(max-width: 640px) 245px, 280px" />
      </div>
      <div className="event-copy">
        <span className="card-label">{event.label}</span>
        <div><h3>{event.name}</h3><ArrowUpRight size={18} aria-hidden /></div>
      </div>
    </Link>
  </article>;
}

export function Breadcrumbs({ parent, current }: { parent?: { name: string; href: string }; current: string }) {
  return <nav aria-label="Хлебные крошки" className="breadcrumbs">
    <Link href="/">Главная</Link>
    {parent && <><span aria-hidden>/</span><Link href={parent.href}>{parent.name}</Link></>}
    <span aria-hidden>/</span><span aria-current="page">{current}</span>
  </nav>;
}
