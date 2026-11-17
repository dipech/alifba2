'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';

const topics = { general: 'Общий вопрос', wholesale: 'Опт и скидки', jobs: 'Вакансии' };

export function Feedback() {
  const requestedTopic = useSearchParams().get('topic');
  const topic = requestedTopic === 'wholesale' || requestedTopic === 'jobs' ? requestedTopic : 'general';
  return <FeedbackForm key={topic} topic={topic} />;
}

function FeedbackForm({ topic }: { topic: keyof typeof topics }) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setSent(true);
  }

  return <form className="surface feedback" onSubmit={submit} onInput={() => setSent(false)}>
    <label className="field">Тема
      <select name="topic" defaultValue={topic}>
        {Object.entries(topics).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
    <label className="field">Имя
      <input name="name" required maxLength={80} pattern=".*\S.*" placeholder="Иван" />
    </label>
    <label className="field">Электронная почта
      <input name="email" type="email" required maxLength={150} />
    </label>
    <label className="field">Сообщение
      <textarea name="message" rows={5} required minLength={5} maxLength={1200}
        onInput={event => {
          const input = event.currentTarget;
          input.setCustomValidity(input.value && input.value.trim().length < 5 ? 'Введите не меньше пяти символов.' : '');
        }} />
    </label>
    <button className="button" type="submit">Отправить</button>
    <div aria-live="polite">{sent && <p className="success-note">Спасибо за обращение!</p>}</div>
  </form>;
}
