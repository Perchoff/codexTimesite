import { ArrowUpRight } from "lucide-react";
import { contacts } from "@/data/contacts";
import { NailOrnament } from "./NailOrnament";

export function Reviews() {
  return (
    <section
      className="reviews section-pad"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="reviews-grid container">
        <div className="reviews-copy ornamented">
          <NailOrnament motif="polish" corner="bottom-right" />
          <p className="eyebrow">ВПЕЧАТЛЕНИЯ ГОСТЕЙ</p>
          <h2 id="reviews-title">
            Отзывы <em>о студии</em>
          </h2>
          <p className="reviews-intro">
            Почитай, что гости рассказывают о своих визитах на Яндекс Картах.
          </p>
          <a
            className="text-link"
            href={contacts.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Все отзывы на Яндекс Картах
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <iframe
          className="reviews-frame"
          title="Отзывы о студии «Время маникюра» на Яндекс Картах"
          src={contacts.reviewsWidgetUrl}
          loading="lazy"
        />
      </div>
    </section>
  );
}
