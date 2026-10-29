"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import { works } from "@/data/works";
import "@/app/works-gallery.css";

const categories = [
  "Все работы",
  "Маникюр с покрытием",
  "Наращивание",
  "Мужской маникюр",
  "Детали",
];

export function WorksGallery() {
  const [category, setCategory] = useState(categories[0]);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const photos =
    category === categories[0]
      ? works
      : works.filter((photo) => photo.category === category);
  const photo = photos[selected] ?? photos[0];
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () =>
      setAtEnd(
        element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      );
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update);
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [category]);

  function move(direction: number) {
    const next = Math.max(0, Math.min(photos.length - 1, active + direction));
    const card = track.current?.children[next] as HTMLElement | undefined;
    if (track.current && card)
      track.current.scrollTo({
        left:
          card.offsetLeft -
          (track.current.children[0] as HTMLElement).offsetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  function close() {
    dialog.current?.close();
  }
  function advance(direction: number) {
    setSelected((value) => (value + direction + photos.length) % photos.length);
  }

  return (
    <section
      id="gallery"
      className="container section-pad works-section"
      aria-labelledby="works-heading"
    >
      <div className="works-heading">
        <div>
          <p className="eyebrow">КРАСОТА В ДЕТАЛЯХ</p>
          <h2 id="works-heading">
            Наши <em>работы</em>
          </h2>
        </div>
        <p>
          От спокойного нюда до яркого дизайна.
          <br />
          Выберите настроение для следующего визита.
        </p>
      </div>
      <div className="works-filters" aria-label="Категории работ">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              setActive(0);
              setSelected(0);
              if (track.current) track.current.scrollLeft = 0;
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        key={category}
        className="works-track"
        ref={track}
        tabIndex={0}
        aria-label="Фотографии работ. Листайте горизонтально"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onScroll={() => {
          const element = track.current;
          if (!element || element.children.length < 2) return;
          const step =
            (element.children[1] as HTMLElement).offsetLeft -
            (element.children[0] as HTMLElement).offsetLeft;
          setActive(Math.round(element.scrollLeft / step));
        }}
      >
        {photos.map((item, index) => (
          <figure className="works-card" key={item.src}>
            <button
              className="works-photo"
              type="button"
              aria-label={`Открыть фото: ${item.alt}`}
              onClick={() => {
                setSelected(index);
                setViewerOpen(true);
                previousOverflow.current = document.body.style.overflow;
                document.body.style.overflow = "hidden";
                dialog.current?.showModal();
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 80vw, (max-width: 1100px) 44vw, 390px"
              />
              <span className="works-expand">
                <Expand size={18} />
              </span>
            </button>
            <figcaption>
              <span>{item.alt}</span>
              <span className="works-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="works-bottom">
        <p>Листайте и нажимайте на фото, чтобы рассмотреть детали</p>
        <div className="works-arrows">
          <button
            type="button"
            aria-label="Предыдущие работы"
            disabled={active === 0}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={21} />
          </button>
          <button
            type="button"
            aria-label="Следующие работы"
            disabled={atEnd}
            onClick={() => move(1)}
          >
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="works-dialog"
        aria-label="Просмотр фотографии работы"
        onClose={() => {
          setViewerOpen(false);
          document.body.style.overflow = previousOverflow.current;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            advance(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <button
          className="works-close"
          type="button"
          aria-label="Закрыть фотографию"
          onClick={close}
          autoFocus
        >
          <X />
        </button>
        <div className="works-large">
          {viewerOpen && (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1000px) 90vw, 960px"
            />
          )}
        </div>
        <div className="works-dialog-footer">
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => advance(-1)}
          >
            <ArrowLeft />
          </button>
          <p aria-live="polite">
            {photo.alt}
            <span>
              {selected + 1} / {photos.length}
            </span>
          </p>
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={() => advance(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </section>
  );
}
