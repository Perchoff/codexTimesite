"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, PaintbrushVertical } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { ManicureIcon, PedicureIcon } from "./ServiceIcons";

const categoryIcons = [ManicureIcon, PaintbrushVertical, PedicureIcon];

export function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = serviceCategories[active];
  const CategoryIcon = categoryIcons[active];
  return (
    <section
      id="services"
      className="services section-pad container"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">ТВОЙ РИТУАЛ КРАСОТЫ</p>
          <h2 id="services-title">
            Детали, которые <em>решают</em>
          </h2>
        </div>
        <p>
          Лаконичный нюд или смелый акцент?
          <br />
          Выбор всегда за тобой.
        </p>
      </div>
      <div className="service-tabs" role="tablist" aria-label="Категории услуг">
        {serviceCategories.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={index === active}
            aria-controls={`panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let target = index;
              if (event.key === "ArrowRight")
                target = (index + 1) % serviceCategories.length;
              else if (event.key === "ArrowLeft")
                target =
                  (index + serviceCategories.length - 1) %
                  serviceCategories.length;
              else if (event.key === "Home") target = 0;
              else if (event.key === "End")
                target = serviceCategories.length - 1;
              else return;
              event.preventDefault();
              setActive(target);
              tabs.current[target]?.focus();
            }}
          >
            {item.name}
            <ArrowUpRight size={19} />
          </button>
        ))}
      </div>
      <div
        key={category.id}
        className="service-panel"
        role="tabpanel"
        id={`panel-${category.id}`}
        aria-labelledby={`tab-${category.id}`}
        tabIndex={0}
      >
        <div className="service-intro">
          <CategoryIcon size={39} strokeWidth={1.2} aria-hidden="true" />
          <h3>{category.name}</h3>
          <p>{category.intro}</p>
          <a href="#contacts" className="text-link">
            Записаться <ArrowUpRight size={16} />
          </a>
        </div>
        <ul className="service-list">
          {category.services.map((service, index) => (
            <li key={service.name}>
              <span className="service-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span>{service.name}</span>
                {service.detail && <p>{service.detail}</p>}
              </div>
            </li>
          ))}
        </ul>
        {category.note && <p className="service-additions">{category.note}</p>}
      </div>
      <div className="services-note">
        <span className="tiny-line" />
        <p>
          Поможем выбрать подходящий уход. Детали процедуры и доступное время
          можно уточнить по телефону.
        </p>
        <a href="#contacts" className="text-link">
          Обсудить с нами <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
