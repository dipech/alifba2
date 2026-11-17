import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Brush, Pencil, Puzzle, PackageCheck } from 'lucide-react';
import { EventCard, ProductCard } from '../components/cards';
import { Carousel } from '../components/carousel';
import { categories, events, featured } from '../lib/shop';

const categoryIcons = { books: BookOpen, stationery: Pencil, toys: Puzzle, creative: Brush };

export default function Home() {
  return <div className="container home">
    <div className="hero">
      <section className="catalog-panel" aria-labelledby="catalog-title">
        <div className="panel-head">
          <h1 id="catalog-title">Каталог товаров</h1>
          <Link href="/catalog/" className="text-link">Весь каталог <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map(category => {
            const Icon = categoryIcons[category.slug];
            return <Link key={category.slug} href={`/catalog/${category.slug}/`} className={`category-tile ${category.color}`}>
              <span className="category-icon"><Icon size={27} strokeWidth={1.75} /></span>
              <span>{category.name}</span><ArrowUpRight className="category-arrow" size={16} />
            </Link>;
          })}
        </div>
      </section>
      <section className="ozon-panel" aria-label="Доставка Ozon">
        <PackageCheck className="ozon-decoration" size={165} strokeWidth={0.85} aria-hidden />
        <p>Доставка через маркетплейс</p>
        <h2>OZON</h2>
        <Link href="/delivery/#ozon" className="button ozon-button">Подробнее <ArrowRight size={16} /></Link>
      </section>
    </div>
    <Carousel title="Акции">
      {featured.map(product => <ProductCard key={product.id} product={product} />)}
    </Carousel>
    <Carousel title="События">
      {events.map(event => <EventCard key={event.slug} event={event} />)}
    </Carousel>
  </div>;
}
