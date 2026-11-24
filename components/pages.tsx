'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { MapPin } from 'lucide-react';
import { AddToCart } from './cart';
import { CartContents, Checkout } from './order';
import { Feedback } from './feedback';
import { Banners } from './banners';
import { Carousel } from './carousel';
import { Breadcrumbs, EventCard, ProductCard } from './cards';
import { SearchResults } from './search-results';
import { useLocale } from './locale';
import { contact, products, events, stores, media, localizeProduct, localizeEvent, localizeStore, ozonProductLink, sharedOzonUrl, ozonStoreUrl } from '../lib/shop';

export function HomePage() {
  const { t } = useLocale();
  return <div className="container home">
    <Banners />
    <div id="products"><Carousel title={t('Товары')}>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </Carousel></div>
    <Carousel title={t('События')}>{events.map(event => <EventCard key={event.slug} event={event} />)}</Carousel>
  </div>;
}

export function ProductPage({ slug }: { slug: string }) {
  const { locale, t, href, money } = useLocale();
  const product = localizeProduct(products.find(product => product.slug === slug)!, locale);
  const ozon = ozonProductLink(product.ozonUrl) ?? sharedOzonUrl;
  return <div className="container inner">
    <Breadcrumbs current={product.name} />
    <article>
      <div className="product-detail">
        <div className="detail-image">
          <Image src={media(product.image)} alt={product.name} fill priority sizes="(max-width: 700px) 90vw, 480px" />
        </div>
        <div className="detail-copy">
          <h1>{product.name}</h1><p className="muted">{t('Артикул')} {product.id}</p>
          <p className="detail-price">{money(product.price)}</p>
          <p className="price-benefit">{t('На сайте дешевле')}</p>
          <div className="detail-actions">
            <AddToCart id={product.id} />
            <a className="ozon-secondary" href={ozon}>Ozon</a>
          </div>
          <Link className="text-link detail-delivery" href={href('/delivery/')}>{t('Доставка и самовывоз')}</Link>
        </div>
      </div>
      <div className="product-information">
        <section><h2>{t('Описание')}</h2><p>{product.description}</p></section>
        <section><h2>{t('Характеристики')}</h2>
          <dl className="specifications">
            <div><dt>{t('Артикул')}</dt><dd>{product.id}</dd></div>
            {product.characteristics.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </section>
      </div>
    </article>
  </div>;
}

export function EventPage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const event = localizeEvent(events.find(event => event.slug === slug)!, locale);
  return <div className="container inner">
    <Breadcrumbs current={event.name} />
    <article className="reading">
      <span className="card-label">{event.label}</span><h1>{event.name}</h1>
      <div className={`event-image event-detail ${event.imageFit === 'contain' ? 'contain' : ''}`}>
        <Image src={media(event.image)} alt={event.name} fill sizes="(max-width: 760px) 95vw, 740px" priority />
      </div>
      <p>{event.text}</p>
    </article>
  </div>;
}

export function SearchPage() {
  const { t } = useLocale();
  return <div className="container inner">
    <Breadcrumbs current={t('Поиск')} /><h1>{t('Поиск')}</h1>
    <Suspense><SearchResults /></Suspense>
  </div>;
}

export function StoresPage() {
  const { locale, t } = useLocale();
  return <div className="container inner">
    <Breadcrumbs current={t('Где купить')} /><h1>{t('Где купить')}</h1>
    <div className="store-grid">
      {stores.map(original => {
        const store = localizeStore(original, locale);
        return <article className="surface store" key={store.tel}>
          <MapPin size={24} aria-hidden /><h2>{store.name}</h2>
          <p>{store.address}</p><p className="muted">{store.hours}</p>
          <a className="text-link" href={`tel:${store.tel}`}>{store.phone}</a>
        </article>;
      })}
    </div>
    <a href={ozonStoreUrl} className="button store-ozon">{t('Магазин на Ozon')}</a>
  </div>;
}

export function CartPage() {
  const { t } = useLocale();
  return <div className="container inner"><Breadcrumbs current={t('Корзина')} /><h1>{t('Корзина')}</h1><CartContents /></div>;
}

export function CheckoutPage() {
  const { t } = useLocale();
  return <div className="container inner">
    <Breadcrumbs current={t('Оформление заказа')} parent={{ name: t('Корзина'), href: '/cart/' }} />
    <h1>{t('Оформление заказа')}</h1><Checkout />
  </div>;
}

export function ContactsPage() {
  const { t, href } = useLocale();
  return <div className="container inner">
    <Breadcrumbs current={t('Контакты')} /><h1>{t('Контакты')}</h1>
    <p><a className="text-link" href={`tel:${contact.tel}`}>{contact.phone}</a> · <Link className="text-link" href={href('/stores/')}>{t('Адреса магазинов')}</Link></p>
    <section id="feedback" className="reading info-section"><h2>{t('Напишите нам')}</h2><Suspense><Feedback /></Suspense></section>
  </div>;
}

export function AboutPage() {
  const { t, href } = useLocale();
  return <div className="container inner"><Breadcrumbs current={t('О нас')} />
    <div className="reading"><h1>{t('О нас')}</h1>
      <p>{t('Alifba — оптово-розничная сеть в Махачкале. В ассортименте книги, канцелярские товары, игры, игрушки и материалы для творчества.')}</p>
      <Link className="text-link" href={href('/stores/')}>{t('Адреса магазинов')}</Link>
    </div>
  </div>;
}

export function DeliveryPage() {
  const { t, href } = useLocale();
  return <div className="container inner"><Breadcrumbs current={t('Доставка и оплата')} />
    <div className="reading"><h1>{t('Доставка и оплата')}</h1>
      <section className="info-section"><h2>{t('Доставка и самовывоз')}</h2>
        <p>{t('При оформлении можно выбрать доставку или самовывоз из магазина в Махачкале.')}</p>
        <Link className="text-link" href={href('/stores/')}>{t('Адреса и часы работы')}</Link>
      </section>
      <section id="ozon" className="info-section"><h2>{t('Доставка через Ozon')}</h2>
        <p>{t('Ссылка Ozon в карточке товара открывает маркетплейс. Сроки и стоимость доставки показывает Ozon.')}</p>
      </section>
      <section id="payment" className="info-section"><h2>{t('Оплата картой')}</h2>
        <p>{t('Выберите оплату картой при оформлении заказа.')}</p>
      </section>
    </div>
  </div>;
}

export function LoginPage() {
  const { t, href } = useLocale();
  return <div className="container inner"><Breadcrumbs current={t('Вход')} /><h1>{t('Вход')}</h1>
    <div className="surface reading order-step">
      <p>{t('Вход в личный кабинет сейчас недоступен. Вы можете оформить заказ без аккаунта.')}</p>
      <Link className="button" href={href('/#products')}>{t('Перейти к товарам')}</Link>
    </div>
  </div>;
}

export function NotFoundPage() {
  const { t, href } = useLocale();
  return <div className="container inner"><h1>{t('Страница не найдена')}</h1>
    <p>{t('Попробуйте найти товар или вернитесь на главную.')}</p><Link className="button" href={href('/')}>{t('На главную')}</Link>
  </div>;
}
