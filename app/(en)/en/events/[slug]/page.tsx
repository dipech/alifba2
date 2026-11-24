import { notFound } from 'next/navigation';
import { EventPage } from '../../../../../components/pages';
import { events, localizeEvent } from '../../../../../lib/shop';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return events.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = events.find(item => item.slug === slug);
  return { title: entry ? localizeEvent(entry, 'en').name : '' };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!events.some(item => item.slug === slug)) notFound();
  return <EventPage slug={slug} />;
}
