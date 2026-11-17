import Link from 'next/link';
import { Breadcrumbs } from '../../components/cards';

export const metadata = { title: 'О нас' };

export default function About() {
  return <div className="container inner">
    <Breadcrumbs current="О нас" />
    <div className="reading"><h1>О нас</h1>
      <p>Alifba — оптово-розничная сеть в Махачкале. В ассортименте книги, канцелярские товары, игры, игрушки и материалы для творчества.</p>
      <Link className="text-link" href="/stores/">Посмотреть адреса магазинов</Link>
    </div>
  </div>;
}
