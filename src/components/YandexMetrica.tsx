"use client";

import { useEffect } from "react";
import { CONSENT_KEY } from "./PrivacyControls";

const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
const validCounterId =
  counterId && /^\d+$/.test(counterId) ? Number(counterId) : null;

type YmFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YmFunction;
    [key: `disableYaCounter${number}`]: boolean | undefined;
  }
}

let scriptReady: Promise<void> | undefined;

function loadMetrica(id: number) {
  if (scriptReady) return scriptReady;
  const ym: YmFunction =
    window.ym ??
    Object.assign(
      (...args: unknown[]) => {
        ym.a = ym.a ?? [];
        ym.a.push(args);
      },
      { l: Date.now() },
    );

  window.ym = ym;
  scriptReady = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "yandex-metrica-script";
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      scriptReady = undefined;
      reject(new Error("Yandex Metrica could not load"));
    };
    document.head.append(script);
  });
  return scriptReady;
}

export function YandexMetrica() {
  useEffect(() => {
    const id = validCounterId;
    if (!id) return;
    let allowed = false;
    let active = false;
    const disableKey = `disableYaCounter${id}` as const;
    const applyConsent = (value: unknown) => {
      allowed = value === "all";
      window[disableKey] = !allowed;
      if (!allowed) {
        if (active) window.ym?.(id, "destruct");
        active = false;
        return;
      }
      void loadMetrica(id)
        .then(() => {
          // Consent may have changed while the script was downloading.
          if (!allowed || active) return;
          window.ym?.(id, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: false,
          });
          active = true;
        })
        .catch(() => {
          // Analytics is optional. The site stays usable if the script is blocked.
        });
    };
    try {
      applyConsent(localStorage.getItem(CONSENT_KEY));
    } catch {
      applyConsent(null);
    }

    const onConsent = (event: Event) =>
      applyConsent((event as CustomEvent).detail);
    const onStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === CONSENT_KEY || event.key === null)
      ) {
        applyConsent(event.newValue);
      }
    };
    window.addEventListener("vm:consent-changed", onConsent);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("vm:consent-changed", onConsent);
      window.removeEventListener("storage", onStorage);
      applyConsent(null);
    };
  }, []);

  return null;
}
