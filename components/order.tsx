'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { media, stores, localizeStore } from '../lib/shop';
import { useCart } from './cart';
import { useLocale } from './locale';

function EmptyCart() {
  const { t, href } = useLocale();
  return <div className="surface empty">
    <ShoppingBasket size={36} aria-hidden />
    <h2>{t('Корзина пока пуста')}</h2>
    <Link className="button" href={href("/#products")}>{t('Перейти к товарам')}</Link>
  </div>;
}

export function CartContents() {
  const { t, href, money } = useLocale();
  const { ready, lines, total, setQuantity } = useCart();
  if (!ready) return <p role="status">{t('Загружается корзина…')}</p>;
  if (!lines.length) return <EmptyCart />;

  return <div className="order-layout">
    <ul className="surface cart-lines">
      {lines.map(({ product, quantity }) => <li className="cart-line" key={product.id}>
        <div className="cart-photo"><Image src={media(product.image)} alt="" fill sizes="64px" /></div>
        <div className="cart-product">
          <Link href={href(`/product/${product.slug}/`)}>{product.name}</Link>
          <span className="muted">{money(product.price)} {t('за шт.')}</span>
        </div>
        <div className="quantity">
          <button type="button" aria-label={`${t('Уменьшить количество')}: ${product.name}`} disabled={quantity <= 1} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={15} /></button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" aria-label={`${t('Увеличить количество')}: ${product.name}`} disabled={quantity >= 99} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={15} /></button>
        </div>
        <strong>{money(product.price * quantity)}</strong>
        <button className="icon-button" type="button" aria-label={`${t('Удалить')}: ${product.name}`} onClick={() => setQuantity(product.id, 0)}><Trash2 size={18} /></button>
      </li>)}
    </ul>
    <aside className="surface summary">
      <h2>{t('Ваш заказ')}</h2>
      <div className="total"><span>{t('Итого')}</span><strong>{money(total)}</strong></div>
      <Link href={href("/checkout/")} className="button">{t('Оформить заказ')}</Link>
    </aside>
  </div>;
}

type Step = 'details' | 'payment' | 'cancelled' | 'success';

export function Checkout() {
  const { t, href, money, locale } = useLocale();
  const { ready, lines, total, clear } = useCart();
  const [step, setStep] = useState<Step>('details');
  const [method, setMethod] = useState('pickup');
  const [pickup, setPickup] = useState(stores[0].address);
  const [paidTotal, setPaidTotal] = useState(0);

  if (!ready) return <p role="status">{t('Загружается заказ…')}</p>;
  if (step === 'success') return <section className="surface empty" aria-live="polite">
    <CheckCircle2 size={38} aria-hidden />
    <h2>{t('Оплата прошла')}</h2>
    <p>{t('Сумма заказа')} — {money(paidTotal)}.</p>
    <Link className="button" href={href("/#products")}>{t('Перейти к товарам')}</Link>
  </section>;
  if (!lines.length) return <EmptyCart />;

  return <div className="order-layout">
    <section className="surface order-step">
      {step === 'details' && <>
        <h2>{t('Получение заказа')}</h2>
        <fieldset>
          <legend className="sr-only">{t('Способ получения')}</legend>
          <label className="choice"><input type="radio" name="method" value="pickup" checked={method === 'pickup'} onChange={() => setMethod('pickup')} /> {t('Самовывоз')}</label>
          <label className="choice"><input type="radio" name="method" value="delivery" checked={method === 'delivery'} onChange={() => setMethod('delivery')} /> {t('Доставка')}</label>
        </fieldset>
        {method === 'pickup' && <label className="field">
          {t('Пункт самовывоза')}
          <select value={pickup} onChange={event => setPickup(event.target.value)}>
            {stores.map(store => <option key={store.address} value={store.address}>{localizeStore(store, locale).address}</option>)}
          </select>
        </label>}
        <button className="button" type="button" onClick={() => setStep('payment')}><CreditCard size={19} /> {t('Оплатить картой')}</button>
      </>}
      {step === 'payment' && <>
        <h2>{t('Оплата картой')}</h2>
        <p>{t('К оплате')} {money(total)}</p>
        <div className="detail-actions">
          <button className="button" type="button" onClick={() => {
            setPaidTotal(total);
            setStep('success');
            clear();
          }}>{t('Оплатить')}</button>
          <button className="button button-outline" type="button" onClick={() => setStep('cancelled')}>{t('Отменить оплату')}</button>
        </div>
        <button className="plain-button" type="button" onClick={() => setStep('details')}>{t('Вернуться к оформлению')}</button>
      </>}
      {step === 'cancelled' && <>
        <div role="alert"><h2>{t('Оплата отменена')}</h2></div>
        <button className="button" type="button" onClick={() => setStep('payment')}>{t('Повторить попытку')}</button>
      </>}
    </section>
    <aside className="surface summary">
      <h2>{t('Состав заказа')}</h2>
      <ul>{lines.map(({ product, quantity }) => <li key={product.id}>{product.name} <span>× {quantity}</span></li>)}</ul>
      <div className="total"><span>{t('Итого')}</span><strong>{money(total)}</strong></div>
    </aside>
  </div>;
}
