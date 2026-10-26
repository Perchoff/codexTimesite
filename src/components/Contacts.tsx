import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";
import { MapSection } from "./MapSection";

export function Contacts() {
  return (
    <section id="contacts" className="contacts section-pad container">
      <div className="contacts-copy">
        <p className="eyebrow">ДО ВСТРЕЧИ НА ТАГАНСКОЙ</p>
        <h2>
          Ждём тебя <em>в гости</em>
        </h2>
        <p className="contacts-intro">
          Оставь немного времени для себя.
          <br />А мы позаботимся о деталях.
        </p>
        <div className="contact-row">
          <MapPin size={21} strokeWidth={1.4} />
          <div>
            <span className="contact-label">АДРЕС СТУДИИ</span>
            <p>
              {contacts.city},<br />
              {contacts.street}
            </p>
            <span className="contact-detail">{contacts.details}</span>
          </div>
        </div>
        <div className="contact-row">
          <Phone size={20} strokeWidth={1.4} />
          <div>
            <span className="contact-label">ЗАПИСЬ ПО ТЕЛЕФОНУ</span>
            <a className="contact-phone" href={contacts.phoneHref}>
              {contacts.phone}
            </a>
          </div>
        </div>
        <div className="contact-actions">
          <a className="button" href={contacts.phoneHref}>
            Позвонить <Phone size={16} />
          </a>
          <a
            className="text-link"
            href={contacts.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Построить маршрут <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <MapSection />
    </section>
  );
}
