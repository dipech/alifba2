'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, UserRound } from 'lucide-react';
import { CartLink } from './cart';
import { HeaderSearch } from './header';
import { LanguageSwitch, useLocale } from './locale';
import { contact, media, socials } from '../lib/shop';

export function Header() {
  const { t, href } = useLocale();
  return <header>
    <div className="utility-bar">
      <div className="container utility-inner">
        <nav aria-label={t('Информация о магазине')}>
          <Link href={href('/stores/')}><MapPin size={15} /> {t('Где купить')}</Link>
          <Link href={href('/contacts/?topic=wholesale')}>{t('Опт и скидки')}</Link>
          <Link href={href('/contacts/?topic=jobs')}>{t('Вакансии')}</Link>
        </nav>
        <a className="utility-phone" href={`tel:${contact.tel}`}><Phone size={15} /> {contact.phone}</a>
        <Suspense><LanguageSwitch /></Suspense>
        <Link href={href('/login/')} className="utility-login"><UserRound size={16} /> {t('Вход')}</Link>
      </div>
    </div>
    <div className="container header-main">
      <Link className="brand" href={href('/')} aria-label={`Alifba — ${t('Главная')}`}>
        <Image src={media('logo.png')} width={150} height={35} alt="Alifba.ru" priority />
        <span>{t('Оптово-розничная сеть')}</span>
      </Link>
      <HeaderSearch />
      <CartLink />
    </div>
  </header>;
}

export function Footer() {
  const { t, href } = useLocale();
  return <footer className="footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand">
        <Link href={href('/')} aria-label={`Alifba — ${t('Главная')}`}><Image src={media('logo.png')} width={132} height={31} alt="Alifba.ru" /></Link>
        <p>{t('Книги, канцтовары и игрушки')}</p>
      </div>
      <nav className="footer-links" aria-label={t('Справочная информация')}>
        <Link href={href('/about/')}>{t('О нас')}</Link>
        <Link href={href('/stores/')}>{t('Магазины')}</Link>
        <Link href={href('/delivery/')}>{t('Доставка и оплата')}</Link>
        <Link href={href('/contacts/?topic=jobs')}>{t('Вакансии')}</Link>
        <Link href={href('/contacts/')}>{t('Контакты')}</Link>
      </nav>
      <div className="footer-contacts">
        <div className="footer-contact"><span>{t('Позвоните нам')}</span><a href={`tel:${contact.tel}`}>{contact.phone}</a></div>
        <div className="footer-contact"><span>{t('Напишите нам')}</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
      </div>
    </div>
    <div className="footer-end">
      <span>© Alifba</span>
      <nav aria-label={t('Социальные сети')}>{socials.map(([name, url]) => <a key={name} href={url}>{name === 'ВКонтакте' ? t('ВКонтакте') : name}</a>)}</nav>
    </div>
  </div></footer>;
}

export function SkipLink() {
  const { t } = useLocale();
  return <a href="#main" className="skip-link">{t('К основному содержанию')}</a>;
}
