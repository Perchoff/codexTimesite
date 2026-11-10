"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import { works } from "@/data/works";
import "@/app/works-gallery.css";
import { NailOrnament } from "./NailOrnament";

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
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: number;
    x: number;
    left: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  } | null>(null);
  const settleFrame = useRef(0);
  const dragged = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const filteredPhotos =
    category === categories[0]
      ? works
      : works.filter((photo) => photo.category === category);
  const photos = expanded ? filteredPhotos : filteredPhotos.slice(0, 12);
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
      cancelAnimationFrame(settleFrame.current);
      delete element.dataset.settling;
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [category, photos.length]);

  function move(direction: number) {
    const next = Math.max(0, Math.min(photos.length - 1, active + direction));
    const card = track.current?.children[next] as HTMLElement | undefined;
    if (track.current && card) {
      stopSettling(track.current);
      track.current.scrollTo({
        left:
          card.offsetLeft -
          (track.current.children[0] as HTMLElement).offsetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }
  function stopSettling(element: HTMLDivElement) {
    cancelAnimationFrame(settleFrame.current);
    delete element.dataset.settling;
  }
  function settle(element: HTMLDivElement, velocity: number) {
    const first = element.children[0] as HTMLElement | undefined;
    const second = element.children[1] as HTMLElement | undefined;
    if (!first || !second) return;

    const step = second.offsetLeft - first.offsetLeft;
    if (step <= 0) return;
    const from = element.scrollLeft;
    const max = element.scrollWidth - element.clientWidth;
    const momentum = Math.max(
      -step * 0.55,
      Math.min(step * 0.55, velocity * 140),
    );
    const projected = Math.max(0, Math.min(max, from + momentum));
    const snapped = Math.min(max, Math.round(projected / step) * step);
    const to = max - projected < Math.abs(snapped - projected) ? max : snapped;

    if (
      Math.abs(to - from) < 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.scrollLeft = to;
      delete element.dataset.settling;
      return;
    }

    element.dataset.settling = "true";
    const duration = Math.min(420, 210 + Math.abs(to - from) * 0.35);
    const started = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - started) / duration);
      element.scrollLeft = from + (to - from) * (1 - (1 - progress) ** 3);
      if (progress < 1) settleFrame.current = requestAnimationFrame(tick);
      else delete element.dataset.settling;
    }
    settleFrame.current = requestAnimationFrame(tick);
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    dragged.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    cancelAnimationFrame(settleFrame.current);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      left: event.currentTarget.scrollLeft,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    };
  }
  function dragTrack(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    const element = event.currentTarget;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = event.clientX - gesture.x;
    if (!dragged.current) {
      if (Math.abs(distance) < 7 || element.scrollWidth <= element.clientWidth)
        return;
      dragged.current = true;
      element.setPointerCapture(event.pointerId);
      element.dataset.dragging = "true";
    }
    element.scrollLeft = gesture.left - distance;
    const elapsed = event.timeStamp - gesture.lastTime;
    if (elapsed > 0) {
      gesture.velocity = (gesture.lastX - event.clientX) / elapsed;
      gesture.lastX = event.clientX;
      gesture.lastTime = event.timeStamp;
    }
  }
  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (gesture?.id !== event.pointerId) return;
    const element = event.currentTarget;
    drag.current = null;
    const wasSettling = element.dataset.settling === "true";
    if (dragged.current || wasSettling) {
      const velocity =
        event.type === "pointerup" && event.timeStamp - gesture.lastTime < 90
          ? gesture.velocity
          : 0;
      settle(element, velocity);
    }
    delete element.dataset.dragging;
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
      className="container section-pad works-section ornamented"
      aria-labelledby="works-heading"
    >
      <NailOrnament motif="tips" corner="top-left" />
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
              setExpanded(false);
              setActive(0);
              setSelected(0);
              if (track.current) {
                stopSettling(track.current);
                track.current.scrollLeft = 0;
              }
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
        onPointerDown={startDrag}
        onPointerMove={dragTrack}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onWheel={(event) => stopSettling(event.currentTarget)}
        onLostPointerCapture={finishDrag}
        onPointerLeave={(event) => {
          if (!dragged.current) finishDrag(event);
        }}
        onClickCapture={(event) => {
          if (dragged.current && event.detail > 0) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
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
                draggable={false}
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
      {!expanded && filteredPhotos.length > 12 && (
        <div className="works-more">
          <p>
            В подборке {photos.length} из {filteredPhotos.length} работ
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => setExpanded(true)}
          >
            Показать все работы ({filteredPhotos.length})
          </button>
        </div>
      )}
      <div className="works-bottom">
        <p>
          Листайте свайпом или перетаскивайте мышью. Нажмите на фото, чтобы
          увеличить.
        </p>
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
