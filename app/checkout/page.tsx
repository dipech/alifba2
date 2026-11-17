import { Breadcrumbs } from '../../components/cards';
import { Checkout } from '../../components/order';

export const metadata = { title: 'Оформление заказа' };

export default function CheckoutPage() {
  return <div className="container inner">
    <Breadcrumbs current="Оформление заказа" parent={{ name: 'Корзина', href: '/cart/' }} />
    <h1>Оформление заказа</h1>
    <Checkout />
  </div>;
}
