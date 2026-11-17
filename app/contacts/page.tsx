import Link from 'next/link';
import { Suspense } from 'react';
import { Breadcrumbs } from '../../components/cards';
import { Feedback } from '../../components/feedback';
import { contact } from '../../lib/shop';

export const metadata = { title: 'Контакты' };

export default function Contacts() {
  return <div className="container inner">
    <Breadcrumbs current="Контакты" /><h1>Контакты</h1>
    <p><a className="text-link" href={`tel:${contact.tel}`}>{contact.phone}</a> · <Link className="text-link" href="/stores/">Адреса магазинов</Link></p>
    <section id="feedback" className="reading info-section">
      <h2>Напишите нам</h2>
      <Suspense fallback={<p>Загружается форма…</p>}><Feedback /></Suspense>
    </section>
  </div>;
}
