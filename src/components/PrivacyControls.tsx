"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";

type Consent = "all" | "necessary";
export const CONSENT_KEY = "vm_cookie_consent";
export function CookieSettingsButton() {
  return (
    <button
      className="footer-link"
      onClick={() => window.dispatchEvent(new Event("vm:open-cookie-settings"))}
    >
      Настройки cookie
    </button>
  );
}

export function PrivacyControls() {
  const [visible, setVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopOverFooter, setBackToTopOverFooter] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLAnchorElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reopened = useRef(false);
  useEffect(() => {
    const update = () => setShowBackToTop(window.scrollY > 400);
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  useEffect(() => {
    const button = backToTopRef.current;
    const footer = document.querySelector(".footer");
    if (!button || !footer) return;
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const buttonRect = button.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        setBackToTopOverFooter(
          buttonRect.bottom > footerRect.top &&
            buttonRect.top < footerRect.bottom,
        );
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(footer);
    observer.observe(button);
    if (bannerRef.current) observer.observe(bannerRef.current);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showBackToTop, visible]);
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* Choice remains available without storage. */
    }
    // Use an event for initialization to avoid reading browser storage during SSR.
    const initial = window.setTimeout(
      () => setVisible(stored !== "all" && stored !== "necessary"),
      0,
    );
    const open = () => {
      previousFocus.current = document.activeElement as HTMLElement;
      reopened.current = true;
      setVisible(true);
    };
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null)
        setVisible(event.newValue !== "all" && event.newValue !== "necessary");
    };
    window.addEventListener("vm:open-cookie-settings", open);
    window.addEventListener("storage", sync);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("vm:open-cookie-settings", open);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useEffect(() => {
    if (!visible || !bannerRef.current) {
      document.documentElement.style.setProperty("--cookie-height", "0px");
      return;
    }
    if (reopened.current) acceptRef.current?.focus();
    const observer = new ResizeObserver((entries) =>
      document.documentElement.style.setProperty(
        "--cookie-height",
        `${entries[0].borderBoxSize[0].blockSize + 24}px`,
      ),
    );
    observer.observe(bannerRef.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty("--cookie-height", "0px");
    };
  }, [visible]);
  function choose(value: Consent) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
    // Consumers can subscribe here when real analytics is added. No analytics is installed.
    window.dispatchEvent(
      new CustomEvent("vm:consent-changed", { detail: value }),
    );
    setVisible(false);
    if (reopened.current) previousFocus.current?.focus();
    reopened.current = false;
  }
  return (
    <>
      <a
        href={contacts.phoneHref}
        className="floating-action floating-call"
        aria-label="Позвонить в студию Время маникюра"
      >
        <Phone size={22} strokeWidth={1.7} />
      </a>
      {showBackToTop && (
        <a
          ref={backToTopRef}
          href="#main"
          className={`floating-action floating-top${backToTopOverFooter ? " is-over-footer" : ""}`}
          aria-label="Вернуться наверх"
          title="Наверх"
        >
          <ArrowUp size={20} strokeWidth={1.7} aria-hidden="true" />
        </a>
      )}
      {visible && (
        <section
          ref={bannerRef}
          className="cookie-banner"
          aria-label="Настройки cookie"
          aria-describedby="cookie-description"
        >
          <div className="cookie-copy">
            <h2>Мы используем cookie-файлы</h2>
            <p id="cookie-description">
              Мы используем необходимые cookie для работы сайта. С вашего
              согласия можем использовать дополнительные cookie для аналитики и
              улучшения сайта. Подробнее — в{" "}
              <Link href="/privacy">политике конфиденциальности</Link>.
            </p>
            {storageFailed && (
              <p role="status">
                Браузер не сохранил выбор. При следующем посещении настройки
                появятся снова.
              </p>
            )}
          </div>
          <div className="cookie-actions">
            <button
              ref={acceptRef}
              className="button button-small"
              onClick={() => choose("all")}
            >
              Принять все
            </button>
            <button
              className="cookie-necessary"
              onClick={() => choose("necessary")}
            >
              Только необходимые
            </button>
          </div>
        </section>
      )}
    </>
  );
}
