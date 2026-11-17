import archivedProducts from './products.json';

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
  description?: string;
  ozonUrl?: string;
}

export const products: Product[] = archivedProducts.map(product => {
  const category = categories.find(entry => entry.slug === product.category);
  if (!category) throw new Error(`Unknown category for ${product.slug}`);
  return { ...product, category: category.slug };
});

const featuredSlugs = ['six-of-crows', 'bullet-journal', 'memo', 'acrylic-white', '1984', 'palette', 'magnetic-home', 'atomic-habits'];
export const featured = featuredSlugs.flatMap(slug => products.filter(product => product.slug === slug));

export const events = [
  {
    slug: 'dagestanskiy-nindzya', name: 'Дагестанский ниндзя', image: 'archived-book.webp',
    label: 'Книги', imageFit: 'contain', text: 'Книга Магомеда Нуцалханова о бойце Забите Магомедшарипове.',
  },
  {
    slug: 'imam-shamil', name: 'Биография имама Шамиля', image: 'archived-biography.webp',
    label: 'Книги', imageFit: 'contain', text: 'Издание о жизни имама Шамиля и его роли в истории Кавказа.',
  },
  {
    slug: 'chitatelskiy-klub', name: 'Встреча читательского клуба', image: 'reading-club.webp',
    label: 'Читательский клуб', text: 'На встрече читательского клуба участники делятся впечатлениями о прочитанном и выбирают следующую книгу.',
  },
  {
    slug: 'akvarelnaya-studiya', name: 'Знакомство с акварелью', image: 'watercolor.webp',
    label: 'Творчество', text: 'Занятие для начинающих. Участники знакомятся с материалами и пробуют простые техники рисования акварелью.',
  },
];

export const contact = { phone: '+7 (8722) 56-87-37', tel: '+78722568737', email: 'info@alifba.me' };

export const stores = [
  { name: 'Оптово-розничный склад', address: 'Махачкала, ул. Ирчи-Казака, 10 ряд', hours: '10:00–18:00. Выходной — последняя пятница месяца.', ...contact },
  { name: 'Магазин на пр. Имама Шамиля', address: 'Махачкала, пр. Имама Шамиля, 1г', hours: '09:00–20:00, ежедневно', phone: '+7 (8722) 55-87-37', tel: '+78722558737' },
  { name: 'Магазин на ул. Белинского', address: 'Махачкала, ул. Белинского, 11в', hours: '09:00–18:00. Выходной — воскресенье.', phone: '+7 (8722) 67-87-37', tel: '+78722678737' },
];

export const socials = [
  ['ВКонтакте', 'https://vk.com/alifba_ru'],
  ['Instagram', 'https://www.instagram.com/alifba_ru/'],
  ['Facebook', 'https://www.facebook.com/Alifbaru-298483847290010/'],
  ['YouTube', 'https://www.youtube.com/channel/UCYTjDiug2kJ9yfI4lGgKHBw'],
  ['TikTok', 'https://vm.tiktok.com/qSTAPY'],
];

const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 2,
});
export const money = (kopecks: number) => rubles.format(kopecks / 100);
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
