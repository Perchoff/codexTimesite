import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { contacts } from "@/data/contacts";
import { legal, legalValue } from "@/data/legal";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false, follow: true },
  alternates: siteConfig.indexable
    ? { canonical: `${siteConfig.url}/booking-consent/` }
    : undefined,
};

export default function BookingConsentPage() {
  const operatorName = legalValue(
    legal.operator.legalName,
    "полное наименование оператора будет указано после заполнения реквизитов",
  );
  const contact = legalValue(
    legal.operator.privacyEmail,
    "контакт для отзыва согласия будет указан после заполнения реквизитов",
  );

  return (
    <main id="main" className="privacy-page container">
      <Link className="text-link" href="/">
        <ArrowLeft size={16} /> На главную
      </Link>
      <p className="eyebrow">ОНЛАЙН-ЗАПИСЬ</p>
      <h1>
        Согласие на
        <br />
        <em>обработку данных</em>
      </h1>
      <article className="privacy-content">
        <p className="legal-date">Редакция от {legal.effectiveDate}</p>
        <section>
          <h2>Текст согласия</h2>
          <p>
            Проставляя отдельную отметку в форме онлайн-записи YCLIENTS, я
            подтверждаю, что ознакомлен(а) с{" "}
            <Link href="/privacy">Политикой обработки персональных данных</Link>{" "}
            и даю {operatorName}
            {legal.operator.inn && ` (ИНН ${legal.operator.inn})`} согласие на
            обработку моих персональных данных: имени, номера телефона, адреса
            электронной почты (если указан), сведений о выбранной услуге, дате и
            времени записи, комментария к записи.
          </p>
          <p>
            Цели обработки: создание, подтверждение, изменение или отмена
            записи; связь по вопросам записи; оказание услуги; ведение истории
            взаимодействия с клиентом; исполнение требований законодательства.
          </p>
          <p>
            Разрешённые действия: сбор, запись, систематизация, накопление,
            хранение, уточнение, извлечение, использование, передача лицу,
            обрабатывающему данные по поручению оператора, блокирование,
            удаление и уничтожение. Для технической организации онлайн-записи
            оператор использует сервис YCLIENTS.
          </p>
          <p>
            Согласие действует до достижения указанных целей либо до его отзыва,
            если дальнейшее хранение не требуется по закону. Отозвать согласие
            можно, направив обращение на{" "}
            {legal.operator.privacyEmail ? (
              <a href={`mailto:${legal.operator.privacyEmail}`}>{contact}</a>
            ) : (
              contact
            )}{" "}
            или по адресу оператора, указанному в Политике. Отказ или отзыв
            согласия может сделать невозможными создание и сопровождение записи.
          </p>
        </section>
        <section>
          <h2>Важно</h2>
          <p>
            Эта страница публикует текст документа. Юридически значимое согласие
            должно собираться отдельным, не отмеченным заранее чекбоксом в
            YCLIENTS. Согласие на рекламные сообщения не входит в этот текст и
            должно оформляться отдельной необязательной отметкой.
          </p>
          <p>
            Для записи без использования сайта доступен телефон студии:{" "}
            <a href={contacts.phoneHref}>{contacts.phone}</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
