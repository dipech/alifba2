import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, UserRound } from 'lucide-react';
import '@fontsource/fira-sans/400.css';
import '@fontsource/fira-sans/500.css';
import '@fontsource/fira-sans/600.css';
import '@fontsource/ubuntu/700.css';
import { CartLink, CartProvider } from '../components/cart';
import { HeaderSearch } from '../components/header';
import { contact, media, socials } from '../lib/shop';
import './styles.css';

export const metadata: Metadata = {
  title: { default: 'Alifba — книги, канцтовары и игрушки', template: '%s | Alifba' },
  description: 'Книги, канцтовары, игрушки и товары для творчества. Интернет-магазин Alifba.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru">
    <body><CartProvider>
      <a href="#main" className="skip-link">К основному содержанию</a>
      <header>
        <div className="utility-bar">
          <div className="container utility-inner">
            <nav aria-label="Информация о магазине">
              <Link href="/stores/"><MapPin size={15} /> Где купить</Link>
              <Link href="/contacts/?topic=wholesale">Опт и скидки</Link>
              <Link href="/contacts/?topic=jobs">Вакансии</Link>
            </nav>
            <a className="utility-phone" href={`tel:${contact.tel}`}><Phone size={15} /> {contact.phone}</a>
            <Link href="/login/" className="utility-login"><UserRound size={16} /> Вход</Link>
          </div>
        </div>
        <div className="container header-main">
          <Link className="brand" href="/" aria-label="Alifba — главная">
            <Image src={media('logo.png')} width={150} height={35} alt="Alifba.ru" priority />
            <span>Оптово-розничная сеть</span>
          </Link>
          <HeaderSearch />
          <CartLink />
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Link href="/" aria-label="Alifba — главная"><Image src={media('logo.png')} width={132} height={31} alt="Alifba.ru" /></Link>
              <p>Книги, канцтовары и игрушки</p>
            </div>
            <nav className="footer-links" aria-label="Справочная информация">
              <Link href="/about/">О нас</Link><Link href="/stores/">Магазины</Link>
              <Link href="/delivery/">Доставка и оплата</Link>
              <Link href="/contacts/?topic=jobs">Вакансии</Link><Link href="/contacts/">Контакты</Link>
            </nav>
            <div className="footer-contacts">
              <div className="footer-contact">
                <span>Позвоните нам</span>
                <a href={`tel:${contact.tel}`}>{contact.phone}</a>
              </div>
              <div className="footer-contact">
                <span>Напишите нам</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
          </div>
          <div className="footer-end">
            <span>© Alifba</span>
            <nav aria-label="Социальные сети">{socials.map(([name, url]) => <a key={name} href={url}>{name}</a>)}</nav>
          </div>
        </div>
      </footer>
    </CartProvider></body>
  </html>;
}
