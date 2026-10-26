import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">404 / СТРАНИЦА НЕ НАЙДЕНА</p>
      <h1>
        Вернёмся
        <br />
        <em>к прекрасному?</em>
      </h1>
      <Link className="button" href="/">
        На главную
      </Link>
    </main>
  );
}
