import { Clock3, Flower2, Hand, Sparkles } from "lucide-react";

const items = [
  {
    icon: Hand,
    title: "Внимание к деталям",
    text: "Аккуратность в каждом движении.",
  },
  {
    icon: Flower2,
    title: "Уютная атмосфера",
    text: "Пространство, в котором приятно провести время.",
  },
  {
    icon: Sparkles,
    title: "Разнообразие услуг",
    text: "Маникюр, педикюр, укрепление и наращивание.",
  },
  {
    icon: Clock3,
    title: "Время для себя",
    text: "Маленький ритуал красоты и отдыха.",
  },
];
export function Advantages() {
  return (
    <section
      className="advantages section-pad"
      aria-labelledby="advantages-title"
    >
      <div className="container">
        <p className="eyebrow">ТО, ЧТО ИМЕЕТ ЗНАЧЕНИЕ</p>
        <h2 id="advantages-title">
          Больше, чем <em>маникюр</em>
        </h2>
        <div className="advantages-grid">
          {items.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <div className="advantage-icon">
                <Icon size={28} strokeWidth={1.2} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
