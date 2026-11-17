import Link from 'next/link';
import { Breadcrumbs } from '../../components/cards';

export const metadata = { title: 'Доставка и оплата' };

export default function Delivery() {
  return <div className="container inner">
    <Breadcrumbs current="Доставка и оплата" />
    <div className="reading">
      <h1>Доставка и оплата</h1>
      <section className="info-section">
        <h2>Доставка и самовывоз</h2>
        <p>При оформлении можно выбрать доставку или самовывоз из магазина в Махачкале.</p>
        <Link className="text-link" href="/stores/">Адреса и часы работы</Link>
      </section>
      <section id="ozon" className="info-section">
        <h2>Доставка через Ozon</h2>
        <p>У товаров, доступных на маркетплейсе, ссылка «Купить на Ozon» открывает карточку товара. Сроки и стоимость доставки показывает Ozon.</p>
      </section>
      <section id="payment" className="info-section">
        <h2>Оплата картой</h2>
        <p>Выберите оплату картой при оформлении заказа.</p>
      </section>
    </div>
  </div>;
}
