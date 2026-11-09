"use client";

import { Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contacts } from "@/data/contacts";

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

const socialIcons = { Telegram: Send, WhatsApp: WhatsAppIcon };

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
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </a>
          );
        })}
        <a href={contacts.phoneHref}>
          <span className="floating-contact-label">Позвонить</span>
          <span className="floating-contact-icon">
            <Phone size={21} strokeWidth={1.7} aria-hidden="true" />
          </span>
        </a>
      </nav>
    </div>
  );
}
