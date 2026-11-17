import { Breadcrumbs } from '../../components/cards';
import { CartContents } from '../../components/order';

export const metadata = { title: 'Корзина' };

export default function CartPage() {
  return <div className="container inner">
    <Breadcrumbs current="Корзина" /><h1>Корзина</h1>
    <CartContents />
  </div>;
}
