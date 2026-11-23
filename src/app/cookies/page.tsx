import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legal } from "@/data/legal";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Cookie и Яндекс Метрика",
  robots: { index: false, follow: true },
  alternates: siteConfig.indexable
    ? { canonical: `${siteConfig.url}/cookies/` }
    : undefined,
};

export default function CookiesPage() {
  return (
    <main id="main" className="privacy-page container">
      <Link className="text-link" href="/">
        <ArrowLeft size={16} /> На главную
      </Link>
      <p className="eyebrow">ПРИМЕЧАНИЕ О COOKIE</p>
      <h1>
        Cookie и
        <br />
        <em>Яндекс Метрика</em>
      </h1>
      <article className="privacy-content">
        <p className="legal-date">Актуально на {legal.effectiveDate}</p>
        <section>
          <h2>1. Что такое cookie</h2>
          <p>
            Cookie — небольшие файлы, которые браузер сохраняет на устройстве.
            Они помогают запомнить выбор пользователя и могут использоваться для
            анализа посещаемости сайта.
          </p>
        </section>
        <section>
          <h2>2. Необходимые данные</h2>
          <p>
            Сайт сохраняет только ваш выбор в окне cookie в локальном хранилище
            браузера под ключом <code>vm_cookie_consent_v3</code>. Значение не
            отправляется владельцу сайта и хранится, пока вы не измените выбор
            или не очистите данные сайта в браузере.
          </p>
        </section>
        <section>
          <h2>3. Аналитика</h2>
          {legal.metrica.id ? (
            <p>
              После нажатия «Принять все» сайт подключает Яндекс Метрику. Она
              может обрабатывать cookie, IP-адрес, сведения об устройстве,
              браузере, страницах и действиях на сайте, источнике перехода и
              времени посещения для статистики и улучшения сайта. Запись
              действий в Webvisor на этом сайте отключена.
            </p>
          ) : (
            <p>
              Счётчик Яндекс Метрики пока не настроен, поэтому аналитический
              скрипт не загружается. После добавления идентификатора счётчика он
              будет запускаться только после нажатия «Принять все».
            </p>
          )}
          <p>
            Яндекс обрабатывает технические данные в рамках условий сервиса и
            своей политики конфиденциальности. Их можно прочитать на{" "}
            <a
              href="https://yandex.ru/legal/metrica_termsofuse/ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              сайте Яндекса
            </a>
            .
          </p>
        </section>
        <section>
          <h2>4. Как изменить решение</h2>
          <p>
            Нажмите «Настройки cookie» внизу любой страницы и выберите «Только
            необходимые». Счётчик сайта остановится, а на следующих страницах не
            будет запускаться. Ранее сохранённые cookie можно удалить в
            настройках браузера.
          </p>
          <p>
            Подробнее об обработке персональных данных — в{" "}
            <Link href="/privacy">Политике обработки персональных данных</Link>.
          </p>
        </section>
      </article>
    </main>
  );
}
