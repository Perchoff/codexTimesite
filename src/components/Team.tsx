import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const masters = [
  {
    name: "Ирина Коченкова",
    image: "/images/team/irina-kochenkova.webp",
    achievements: [
      "Эксперт по наращиванию ногтей на верхние формы.",
      "Чемпион в номинации «Наращивание ногтей верхними формами», 2022 год.",
      "Чемпион в номинации «Мужской маникюр», 2022 год.",
      "Эксперт чемпионата «Абилимпикс», 2019–2021 годы.",
    ],
  },
  {
    name: "Наталья Храпова",
    image: "/images/team/natalya-khrapova.webp",
    achievements: [
      "Инструктор по маникюру и наращиванию ногтей.",
      "Опыт работы с ногтями любой сложности в маникюре и педикюре.",
      "Победитель в номинации «Наращивание ногтей» в рамках выставки «Интершарм».",
    ],
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="team section-pad"
      aria-labelledby="team-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ЗНАКОМЬТЕСЬ, НАША КОМАНДА</p>
            <h2 id="team-title">
              Мастера <em>своего дела</em>
            </h2>
          </div>
          <p>
            Опыт, внимание и забота —<br />в каждом прикосновении.
          </p>
        </div>
        <div className="team-grid">
          {masters.map((master) => (
            <article className="team-card" key={master.name}>
              <div className="team-portrait">
                <Image
                  src={master.image}
                  alt={master.name}
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 1200px) 45vw, 580px"
                />
                <span className="team-experience">Более 15 лет опыта</span>
              </div>
              <div className="team-info">
                <p className="team-role">ТОП-МАСТЕР</p>
                <h3>{master.name}</h3>
                <p className="team-intro">
                  Эксперт по маникюру и наращиванию ногтей.
                </p>
                <ul>
                  {master.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
                <a href="#contacts" className="text-link">
                  Записаться к мастеру <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
