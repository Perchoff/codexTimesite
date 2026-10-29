"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { contacts } from "@/data/contacts";

const links = [
  { href: "/#about", label: "О студии" },
  { href: "/#services", label: "Услуги" },
  { href: "/#gallery", label: "Работы" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${link.href}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="button button-small header-booking"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${contacts.bookingUrl}`}
        >
          Записаться <ArrowUpRight size={15} />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Мобильная навигация"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${link.href}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${contacts.bookingUrl}`}
            onClick={() => setOpen(false)}
          >
            Записаться <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}
