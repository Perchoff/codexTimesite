import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="container about-grid">
        <figure className="about-visual">
          <div className="about-image">
            <Image
              src="/images/brand-concept.webp"
              alt="Предоставленная заказчиком концепция вывески студии с фирменным логотипом"
              fill
              sizes="(max-width: 767px) 90vw, 50vw"
            />
          </div>
          <figcaption>
            <span>01 / НАСТРОЕНИЕ ПРОСТРАНСТВА</span>
          </figcaption>
        </figure>
        <div className="about-copy">
          <p className="eyebrow">НЕМНОГО О НАС</p>
          <h2>
            Время <em>для себя</em>
          </h2>
          <p className="lead">
            Красота начинается
            <br />с внимания к себе.
          </p>
          <p>
            «Время маникюра» — уютное пространство, где красота встречается с
            заботой о деталях. Здесь можно отвлечься от повседневных дел и
            посвятить время себе.
          </p>
          <p>
            Натуральные оттенки дерева, светлый кирпич и тёплые акценты — таким
            мы видим место для твоего маленького ритуала красоты.
          </p>
          <a className="text-link" href="#services">
            Найти свой ритуал <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
