import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../components/cards';
import { events, media } from '../../../lib/shop';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: events.find(event => event.slug === slug)?.name ?? 'Событие' };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find(entry => entry.slug === slug);
  if (!event) notFound();
  return <div className="container inner">
    <Breadcrumbs current={event.name} />
    <article className="reading">
      <span className="card-label">{event.label}</span>
      <h1>{event.name}</h1>
      <div className={`event-image event-detail ${event.imageFit === 'contain' ? 'contain' : ''}`}>
        <Image src={media(event.image)} alt={event.name} fill sizes="(max-width: 760px) 95vw, 740px" priority />
      </div>
      <p>{event.text}</p>
    </article>
  </div>;
}
