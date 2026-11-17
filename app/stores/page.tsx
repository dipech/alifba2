import { MapPin } from 'lucide-react';
import { Breadcrumbs } from '../../components/cards';
import { stores } from '../../lib/shop';

export const metadata = { title: 'Наши магазины' };

export default function Stores() {
  return <div className="container inner">
    <Breadcrumbs current="Наши магазины" /><h1>Наши магазины</h1>
    <div className="store-grid">
      {stores.map(store => <article className="surface store" key={store.address}>
        <MapPin size={24} aria-hidden /><h2>{store.name}</h2>
        <p>{store.address}</p><p className="muted">{store.hours}</p>
        <a className="text-link" href={`tel:${store.tel}`}>{store.phone}</a>
      </article>)}
    </div>
  </div>;
}
