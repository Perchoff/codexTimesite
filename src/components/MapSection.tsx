"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function MapSection() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="map-section">
      <div className="map-card" aria-busy={!loaded && !failed}>
        {(!loaded || failed) && (
          <div className="map-placeholder">
            <span className="map-pin">
              <MapPin size={25} strokeWidth={1.5} />
            </span>
            <p className="map-brand">Время маникюра</p>
            <p>Москва, Таганская улица, 1/2, стр. 2</p>
            <span className="map-hint" role="status">
              {failed
                ? "Не удалось загрузить карту. Нажми «Построить маршрут», чтобы открыть её отдельно."
                : "Загружаем Яндекс Карту…"}
            </span>
          </div>
        )}
        {!failed && (
          <iframe
            className={loaded ? "map-frame is-loaded" : "map-frame"}
            src={siteConfig.mapEmbedUrl}
            title="Расположение студии Время маникюра на Яндекс Картах"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
