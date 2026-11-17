import Link from 'next/link';
import { Breadcrumbs } from '../../components/cards';

export const metadata = { title: 'Вход' };

export default function Login() {
  return <div className="container inner">
    <Breadcrumbs current="Вход" /><h1>Вход</h1>
    <div className="surface reading order-step">
      <p>Вход в личный кабинет сейчас недоступен. Вы можете оформить заказ без аккаунта.</p>
      <Link className="button" href="/catalog/">Перейти в каталог</Link>
    </div>
  </div>;
}
