'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Check, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from './locale';
import { products, localizeProduct } from '../lib/shop';

const storageKey = 'alifba-cart-v1';
const maxQuantity = 99;
type Quantities = Record<string, number>;
type Cart = {
  quantities: Quantities;
  ready: boolean;
  add: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};
const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
      const restored: Quantities = {};
      for (const { id } of products) {
        const quantity = stored?.[id];
        if (Number.isInteger(quantity) && quantity > 0) restored[id] = Math.min(quantity, maxQuantity);
      }
      setQuantities(restored);
    } catch {
      // The cart remains usable in memory when browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(quantities));
    } catch {
      // Private browsing or a storage quota can prevent persistence.
    }
  }, [quantities, ready]);

  function setQuantity(id: string, quantity: number) {
    setQuantities(current => {
      const next = { ...current };
      if (quantity < 1) delete next[id];
      else next[id] = Math.min(quantity, maxQuantity);
      return next;
    });
  }

  function add(id: string) {
    setQuantities(current => ({ ...current, [id]: Math.min((current[id] ?? 0) + 1, maxQuantity) }));
  }

  return <CartContext.Provider value={{ quantities, ready, add, setQuantity, clear: () => setQuantities({}) }}>
    {children}
  </CartContext.Provider>;
}

export function useCart() {
  const { locale } = useLocale();
  const cart = useContext(CartContext);
  if (!cart) throw new Error('CartProvider is missing');
  const lines = products.flatMap(product => {
    const quantity = cart.quantities[product.id] ?? 0;
    return quantity ? [{ product: localizeProduct(product, locale), quantity }] : [];
  });
  const total = lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  return { ...cart, lines, total };
}

export function CartLink() {
  const { t, href } = useLocale();
  const { quantities } = useCart();
  const count = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  return <Link href={href("/cart/")} className="cart-link">
    <span className="cart-icon"><ShoppingBasket size={24} />{count > 0 && <span>{count}</span>}</span>
    <span>{t("Корзина")}</span><span className="sr-only">, {t("товаров")}: {count}</span>
  </Link>;
}

export function AddToCart({ id, compact = false }: { id: string; compact?: boolean }) {
  const { t } = useLocale();
  const { add, ready, quantities } = useCart();
  const quantity = quantities[id] ?? 0;
  return <div className="purchase">
    <button className={compact ? 'button button-outline' : 'button'} type="button"
      onClick={() => add(id)} disabled={!ready || quantity === maxQuantity}>
      {quantity ? <Check size={17} /> : <ShoppingBasket size={17} />}
      {quantity === maxQuantity ? t('В корзине 99 шт.') : compact ? t('В корзину') : t('Купить на сайте')}
    </button>
    <span className="sr-only" role="status">{quantity > 0 && `${t('Добавлено в корзину')}: ${quantity}`}</span>
  </div>;
}
