import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { NailOrnament } from "./NailOrnament";

const masters = [
  {
    name: "Ирина Коченкова",
    image: "/images/team/irina-kochenkova-v3.webp",
    achievements: [
      "Эксперт по наращиванию ногтей на верхние формы.",
      "Чемпион в номинации «Наращивание ногтей верхними формами», 2022 год.",
      "Чемпион в номинации «Мужской маникюр», 2022 год.",
      "Эксперт чемпионата «Абилимпикс», 2019–2021 годы.",
    ],
  },
  {
    name: "Наталья Храпова",
    image: "/images/team/natalya-khrapova-v3.webp",
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
      className="team section-pad ornamented"
      aria-labelledby="team-title"
    >
      <NailOrnament motif="file" corner="top-right" />
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
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 950px) calc(50vw - 48px), (max-width: 1199px) calc(50vw - 56px), (max-width: 1351px) calc(50vw - 76px), (min-width: 1600px) 680px, 600px"
                />
                <span className="team-experience">Более 15 лет опыта</span>
              </div>
              <div className="team-info">
                <p className="team-role">ТОП-МАСТЕР</p>
                <h3>{master.name}</h3>
                <p className="team-intro">
                  Эксперт по маникюру и наращиванию ногтей.
                </p>
                <ul role="list">
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
