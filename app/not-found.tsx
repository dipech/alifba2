import Link from 'next/link';

export default function NotFound() {
  return <div className="container inner">
    <h1>Страница не найдена</h1>
    <p>Попробуйте открыть главную или найти товар в каталоге.</p>
    <Link className="button" href="/">На главную</Link>
  </div>;
}
