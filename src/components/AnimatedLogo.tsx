"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Moscow",
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// Keep SSR and browser output identical across JavaScript engines.
const coordinate = (value: number) => value.toFixed(3);

export function AnimatedLogo() {
  const dial = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const update = () => {
      const parts = clockFormatter.formatToParts(new Date());
      const value = (type: string) =>
        Number(parts.find((part) => part.type === type)?.value ?? 0);
      const hours = value("hour"),
        minutes = value("minute"),
        seconds = value("second");
      const element = dial.current;
      if (!element) return;
      element.style.setProperty(
        "--hour-angle",
        `${(hours % 12) * 30 + minutes / 2 + seconds / 120}deg`,
      );
      element.style.setProperty(
        "--minute-angle",
        `${minutes * 6 + seconds / 10}deg`,
      );
      element.style.setProperty("--second-angle", `${seconds * 6}deg`);
      element.setAttribute(
        "aria-label",
        `Московское время: ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="animated-logo">
      <Image
        className="hero-logo"
        src="/logo/brand-mark.webp"
        alt="Логотип «Время маникюра»: рука с часами"
        width={912}
        height={912}
        preload
        sizes="(max-width: 767px) 75vw, 450px"
      />
      <svg
        ref={dial}
        className="clock-face"
        viewBox="0 0 912 912"
        role="img"
        aria-label="Часы с московским временем"
      >
        {/* Coordinates match the original artwork. The hand and bronze bezel remain intact. */}
        <defs>
          <radialGradient id="clock-paper">
            <stop stopColor="#fffef0" />
            <stop offset="1" stopColor="#ece6cc" />
          </radialGradient>
        </defs>
        <circle
          cx="489"
          cy="376"
          r="63"
          fill="url(#clock-paper)"
          stroke="#b6a67a"
          strokeWidth="1"
        />
        {Array.from({ length: 60 }, (_, index) => {
          const angle = (index * Math.PI) / 30,
            major = index % 5 === 0;
          return (
            <line
              key={index}
              x1={coordinate(489 + Math.sin(angle) * (major ? 56 : 58))}
              y1={coordinate(376 - Math.cos(angle) * (major ? 56 : 58))}
              x2={coordinate(489 + Math.sin(angle) * 60)}
              y2={coordinate(376 - Math.cos(angle) * 60)}
              stroke="#8e8364"
              strokeWidth={major ? 0.8 : 0.4}
            />
          );
        })}
        {Array.from({ length: 12 }, (_, index) => {
          const number = index + 1,
            angle = (number * Math.PI) / 6;
          return (
            <text
              key={number}
              x={coordinate(489 + Math.sin(angle) * 47)}
              y={coordinate(376 - Math.cos(angle) * 47)}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, sans-serif"
              fontSize="13"
              fill="#4e493d"
            >
              {number}
            </text>
          );
        })}
        <g className="clock-hand clock-hour">
          <line
            x1="489"
            y1="382"
            x2="489"
            y2="343"
            stroke="#494337"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
        <g className="clock-hand clock-minute">
          <line
            x1="489"
            y1="384"
            x2="489"
            y2="331"
            stroke="#494337"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
        <g className="clock-hand clock-second">
          <line
            x1="489"
            y1="387"
            x2="489"
            y2="324"
            stroke="#9b744b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <circle cx="489" cy="376" r="3.4" fill="#685138" />
        <circle cx="489" cy="376" r="1.3" fill="#d2ba82" />
      </svg>
    </div>
  );
}
