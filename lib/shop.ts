import archivedProducts from './products.json';
import type { Locale, Text } from './i18n';

export const categories = [
  { slug: 'books', name: 'Книги', color: 'rose' },
  { slug: 'stationery', name: 'Канцтовары', color: 'sky' },
  { slug: 'toys', name: 'Игры и игрушки', color: 'gold' },
  { slug: 'creative', name: 'Творчество и хобби', color: 'lilac' },
] as const;

export type Category = typeof categories[number]['slug'];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  characteristics: { name: string; value: string }[];
  en: { name: string; description: string; characteristics: { name: string; value: string }[] };
  ozonUrl?: string;
}

export const products: Product[] = archivedProducts.map(product => {
  const category = categories.find(entry => entry.slug === product.category);
  if (!category) throw new Error(`Unknown category for ${product.slug}`);
  return { ...product, category: category.slug };
});

export const events = [
  {
    slug: 'dagestanskiy-nindzya', name: 'Дагестанский ниндзя', image: 'archived-book.webp',
    label: 'Книги', imageFit: 'contain', text: 'Книга Магомеда Нуцалханова о бойце Забите Магомедшарипове.',
    en: { name: 'Dagestani Ninja', label: 'Books', text: 'A book by Magomed Nutsalkhanov about fighter Zabit Magomedsharipov.' },
  },
  {
    slug: 'imam-shamil', name: 'Биография имама Шамиля', image: 'archived-biography.webp',
    label: 'Книги', imageFit: 'contain', text: 'Издание о жизни имама Шамиля и его роли в истории Кавказа.',
    en: { name: 'The Biography of Imam Shamil', label: 'Books', text: 'A publication about the life of Imam Shamil and his role in the history of the Caucasus.' },
  },
  {
    slug: 'chitatelskiy-klub', name: 'Встреча читательского клуба', image: 'reading-club.webp',
    label: 'Читательский клуб', text: 'На встрече читательского клуба участники делятся впечатлениями о прочитанном и выбирают следующую книгу.',
    en: { name: 'Book Club Meeting', label: 'Book club', text: 'At the book club meeting, readers share their thoughts on what they have read and choose their next book.' },
  },
  {
    slug: 'akvarelnaya-studiya', name: 'Знакомство с акварелью', image: 'watercolor.webp',
    label: 'Творчество', text: 'Занятие для начинающих. Участники знакомятся с материалами и пробуют простые техники рисования акварелью.',
    en: { name: 'An Introduction to Watercolour', label: 'Arts and crafts', text: 'A session for beginners. Participants explore materials and try simple watercolour painting techniques.' },
  },
];

export const contact = { phone: '+7 (8722) 56-87-37', tel: '+78722568737', email: 'info@alifba.me' };

export const stores = [
  { name: 'Оптово-розничный склад', address: 'Махачкала, ул. Ирчи-Казака, 10 ряд', hours: '10:00–18:00. Выходной — последняя пятница месяца.', ...contact, en: { name: 'Wholesale and retail warehouse', address: 'Makhachkala, Irchi-Kazaka St., row 10', hours: '10:00–18:00. Closed on the last Friday of each month.' } },
  { name: 'Магазин на пр. Имама Шамиля', address: 'Махачкала, пр. Имама Шамиля, 1г', hours: '09:00–20:00, ежедневно', phone: '+7 (8722) 55-87-37', tel: '+78722558737', en: { name: 'Imam Shamil Avenue store', address: 'Makhachkala, 1g Imam Shamil Ave.', hours: '09:00–20:00, every day' } },
  { name: 'Магазин на ул. Белинского', address: 'Махачкала, ул. Белинского, 11в', hours: '09:00–18:00. Выходной — воскресенье.', phone: '+7 (8722) 67-87-37', tel: '+78722678737', en: { name: 'Belinsky Street store', address: 'Makhachkala, 11v Belinskogo St.', hours: '09:00–18:00. Closed on Sundays.' } },
];

export const socials = [
  ['ВКонтакте', 'https://vk.com/alifba_ru'],
  ['Telegram', 'https://t.me/alifba_ru'],
  ['TikTok', 'https://vm.tiktok.com/qSTAPY'],
];

export const media = (name: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/media/${name}`;

export const sharedOzonUrl = 'https://www.ozon.ru/product/shturm-i-burya-bardugo-li-630584267/';

export function ozonProductLink(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && ['ozon.ru', 'www.ozon.ru'].includes(url.hostname) &&
        !url.username && !url.password && /^\/product\/[^/]+\/?$/.test(url.pathname)) {
      return url.href;
    }
  } catch {
    return undefined;
  }
}

export type ShopEvent = typeof events[number];
export const localizeProduct = (product: Product, locale: Locale) =>
  locale === 'en' ? { ...product, ...product.en } : product;
export const localizeEvent = (event: ShopEvent, locale: Locale) =>
  locale === 'en' ? { ...event, ...event.en } : event;
export const localizeStore = (store: typeof stores[number], locale: Locale) =>
  locale === 'en' ? { ...store, ...store.en } : store;
export const ozonStoreUrl = 'https://ozon.ru/s/alifba';
export const assortmentSlides: { id: string; title: Text; kicker: Text; text: Text; images: string[] }[] = [{
  id: 'regular-range',
  title: 'Всё для любимых занятий',
  kicker: '30 000 наименований постоянного ассортимента',
  text: 'Книги, канцтовары, игрушки, творчество и хобби',
  images: ['six-of-crows.webp', 'bullet-journal.webp', 'memo.webp'],
}];
export const newsBannerSlug = 'chitatelskiy-klub';
