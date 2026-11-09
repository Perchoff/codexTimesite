"use client";

import { Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contacts } from "@/data/contacts";

function TelegramIcon() {
  return (
    <svg width="26" height="26" viewBox="19 27 80 80" aria-hidden="true">
      {/* White plane from https://telegram.org/img/t_logo.svg */}
      <path
        fill="#fff"
        d="M28.97 63.32C47.63 55.2 60.07 49.84 66.29 47.25 84.07 39.86 87.76 38.57 90.17 38.53 90.7 38.52 91.88 38.65 92.65 39.27 93.29 39.8 93.47 40.51 93.56 41.01 93.64 41.5 93.75 42.64 93.67 43.53 92.7 53.65 88.53 78.2 86.41 89.54 85.52 94.33 83.75 95.94 82.04 96.1 78.32 96.44 75.5 93.64 71.9 91.28 66.27 87.59 63.09 85.29 57.62 81.69 51.3 77.53 55.4 75.24 59 71.5 59.94 70.52 76.32 55.62 76.63 54.27 76.67 54.1 76.71 53.47 76.33 53.14 75.96 52.81 75.41 52.92 75.01 53.01 74.44 53.14 65.45 59.09 48.01 70.86 45.46 72.61 43.15 73.46 41.07 73.42 38.79 73.37 34.39 72.13 31.12 71.06 27.12 69.76 23.93 69.07 24.21 66.86 24.35 65.71 25.94 64.53 28.97 63.32Z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.8a9 9 0 0 1-13.6 7.8L3 21l1.4-4.4A9 9 0 1 1 21 11.8Z" />
      <Phone x={7} y={7} width={10} height={10} strokeWidth={2.5} />
    </svg>
  );
}

const socialIcons = { Telegram: TelegramIcon, WhatsApp: WhatsAppIcon };

export function FloatingContacts() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!widgetRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismissWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setOpen(false);
      if (widgetRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissWithEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissWithEscape);
    };
  }, [open]);

  return (
    <div className="floating-contacts" ref={widgetRef}>
      <button
        ref={triggerRef}
        type="button"
        className="floating-action floating-call"
        aria-label={open ? "Закрыть меню связи" : "Связаться со студией"}
        aria-expanded={open}
        aria-controls="floating-contact-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X size={22} strokeWidth={1.7} aria-hidden="true" />
        ) : (
          <Phone size={22} strokeWidth={1.7} aria-hidden="true" />
        )}
      </button>
      <nav
        id="floating-contact-links"
        className="floating-contact-links"
        aria-label="Способы связи со студией"
        hidden={!open}
      >
        {contacts.socials.map(({ label, href }) => {
          const Icon = socialIcons[label];
          return (
            <a
              key={label}
              href={href}
              className={`floating-contact-${label.toLowerCase()}`}
              aria-label={`Написать в ${label}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="floating-contact-label">Написать в {label}</span>
              <span className="floating-contact-icon">
                <Icon />
              </span>
            </a>
          );
        })}
        <a
          className="floating-contact-phone"
          href={contacts.phoneHref}
          aria-label="Позвонить"
        >
          <span className="floating-contact-icon">
            <Phone size={21} strokeWidth={1.7} aria-hidden="true" />
          </span>
        </a>
      </nav>
    </div>
  );
}
