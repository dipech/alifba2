'use client';

import Image from 'next/image';
import Link from 'next/link';
import { assortmentSlides, events, localizeEvent, media, newsBannerSlug } from '../lib/shop';
import { useLocale } from './locale';
import { Carousel } from './carousel';

function AssortmentSlide({ slide }: { slide: typeof assortmentSlides[number] }) {
  const { t } = useLocale();
  return <div className="assortment-slide">
    <div className="assortment-copy">
      <p className="assortment-kicker">{t(slide.kicker)}</p>
      <h1>{t(slide.title)}</h1>
      <p>{t(slide.text)}</p>
    </div>
    <div className="assortment-images" aria-hidden>
      {slide.images.map((image, index) => <div key={image} className={`assortment-object object-${index}`}>
        <Image src={media(image)} alt="" fill sizes="(max-width: 760px) 100px, 150px" priority />
      </div>)}
    </div>
  </div>;
}

export function Banners() {
  const { locale, t, href } = useLocale();
  const news = localizeEvent(events.find(event => event.slug === newsBannerSlug)!, locale);
  return <div className="hero">
    <section className="assortment-banner">
      {assortmentSlides.length > 1 ? <Carousel title={t('Книги, канцтовары и игрушки')}>
        {assortmentSlides.map(slide => <AssortmentSlide key={slide.id} slide={slide} />)}
      </Carousel> : <AssortmentSlide slide={assortmentSlides[0]} />}
    </section>
    <Link className="news-banner" href={href(`/events/${news.slug}/`)}>
      <Image src={media(news.image)} alt="" fill sizes="(max-width: 760px) 100vw, 300px" priority />
      <div className="news-banner-copy"><span>{t('Новости')}</span><h2>{news.name}</h2></div>
    </Link>
  </div>;
}
