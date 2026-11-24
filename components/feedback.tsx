'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { useLocale } from './locale';
import type { Text } from '../lib/i18n';

const topics = { general: 'Общий вопрос', wholesale: 'Опт и скидки', jobs: 'Вакансии' } as const;

export function Feedback() {
  const requestedTopic = useSearchParams().get('topic');
  const topic = requestedTopic === 'wholesale' || requestedTopic === 'jobs' ? requestedTopic : 'general';
  return <FeedbackForm key={topic} topic={topic} />;
}

function FeedbackForm({ topic }: { topic: keyof typeof topics }) {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', Text>>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = 'Заполните это поле.';
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    if (!email || emailInput.validity.typeMismatch) nextErrors.email = 'Введите корректную электронную почту.';
    if (message.length < 5) nextErrors.message = 'Введите не меньше пяти символов.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    form.reset();
    setSent(true);
  }

  return <form className="surface feedback" onSubmit={submit} noValidate onInput={() => setSent(false)}>
    <label className="field">{t('Тема')}
      <select name="topic" defaultValue={topic}>
        {Object.entries(topics).map(([value, label]) => <option key={value} value={value}>{t(label)}</option>)}
      </select>
    </label>
    <label className="field">{t('Имя')}
      <input name="name" required maxLength={80} placeholder={locale === 'en' ? 'Alex' : 'Иван'} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
    </label>
    {errors.name && <p id="name-error" className="field-error">{t(errors.name)}</p>}
    <label className="field">{t('Электронная почта')}
      <input name="email" type="email" required maxLength={150} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
    </label>
    {errors.email && <p id="email-error" className="field-error">{t(errors.email)}</p>}
    <label className="field">{t('Сообщение')}
      <textarea name="message" rows={5} required minLength={5} maxLength={1200} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
    </label>
    {errors.message && <p id="message-error" className="field-error">{t(errors.message)}</p>}
    <button className="button" type="submit">{t('Отправить')}</button>
    <div aria-live="polite">{sent && <p className="success-note">{t('Спасибо за обращение!')}</p>}</div>
  </form>;
}
