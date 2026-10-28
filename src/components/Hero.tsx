import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" /> СТУДИЯ МАНИКЮРА · МОСКВА
        </p>
        <h1 id="hero-title">
          Время
          <br />
          маникюра<span className="title-dot">.</span>
        </h1>
        <p className="hero-tagline">Твой идеальный момент</p>
        <p className="hero-description">
          Маникюр, педикюр и наращивание ногтей в уютной атмосфере, где время
          принадлежит только тебе.
        </p>
        <div className="hero-actions">
          <a className="button" href="#contacts">
            Записаться <ArrowUpRight size={18} />
          </a>
          <a className="text-link" href="#services">
            Выбрать услугу <ArrowUpRight size={17} />
          </a>
        </div>
        <a href="#contacts" className="hero-location">
          <MapPin size={16} strokeWidth={1.5} /> Москва, Таганская улица, 1/2,
          стр. 2
        </a>
      </div>
      <div
        className="hero-art"
        aria-label="Фирменный знак студии — рука с часами"
      >
        <div className="art-stage">
          <span className="art-topline">
            УХОД &nbsp; / &nbsp; СТИЛЬ &nbsp; / &nbsp; ГАРМОНИЯ
          </span>
          <div className="logo-plinth">
            <AnimatedLogo />
          </div>
          <span className="art-bottomline">КРАСОТА В ДЕТАЛЯХ</span>
        </div>
        <div className="art-note">
          <Sparkles size={19} strokeWidth={1} />
          <span>
            Побудь собой.
            <br />
            <em>Побудь в моменте.</em>
          </span>
        </div>
        <span className="art-caption">ТВОЁ ВРЕМЯ НАЧИНАЕТСЯ ЗДЕСЬ</span>
      </div>
      <div className="hero-foot">
        <a href="#about">
          <ArrowDown size={16} /> ЗАМЕДЛИСЬ. ТЫ УЖЕ ЗДЕСЬ.
        </a>
        <span>С заботой о тебе и твоей красоте</span>
      </div>
    </section>
  );
}
