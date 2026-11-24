import { Suspense } from 'react';
import { LegacyCatalog } from '../../../../components/legacy-catalog';
import { categories } from '../../../../lib/shop';
export function generateStaticParams() { return categories.map(({ slug }) => ({ category: slug })); }
export default function Page() { return <Suspense><LegacyCatalog /></Suspense>; }
