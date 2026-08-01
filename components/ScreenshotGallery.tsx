"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export interface ScreenshotItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function slidesPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 700) return 2;
  return 1;
}

export default function ScreenshotGallery({
  items,
}: {
  items: ScreenshotItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const sync = () => setPerView(slidesPerView());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slide = track.querySelector<HTMLElement>(".slider-slide");
      if (!slide) return;
      const width = slide.offsetWidth + 16;
      const next = Math.round(track.scrollLeft / width);
      setIndex(Math.max(0, Math.min(items.length - 1, next)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  useEffect(() => {
    if (active === null) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setActive((i) => (i === null ? i : (i + 1) % items.length));
      }
      if (e.key === "ArrowLeft") {
        setActive((i) =>
          i === null ? i : (i - 1 + items.length) % items.length,
        );
      }
      if (e.key === "Tab") {
        const dialog = document.getElementById("screenshot-lightbox");
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [active, items.length]);

  const scrollTo = (target: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(".slider-slide");
    if (!track || !slide) return;
    const width = slide.offsetWidth + 16;
    const maxIndex = Math.max(0, items.length - perView);
    const next = Math.max(0, Math.min(maxIndex, target));
    track.scrollTo({ left: next * width, behavior: "smooth" });
    setIndex(next);
  };

  return (
    <section className="screenshot-section content-section" aria-labelledby="screenshots-heading">
      <div className="section-header">
        <h2 id="screenshots-heading">Bet939 App Screenshots</h2>
      </div>

      <div className="slider-shell">
        <div
          className="slider-track"
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Bet939 app screenshots"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") scrollTo(index + 1);
            if (e.key === "ArrowLeft") scrollTo(index - 1);
          }}
        >
          {items.map((item, itemIndex) => (
            <div className="slider-slide" key={item.src}>
              <button
                type="button"
                className="shot-btn"
                onClick={() => setActive(itemIndex)}
                aria-label={`Open screenshot: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 700px) 80vw, (max-width: 1024px) 40vw, 280px"
                  loading="lazy"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button
            type="button"
            aria-label="Previous screenshots"
            onClick={() => scrollTo(index - 1)}
          >
            ‹
          </button>
          <div className="slider-dots" role="tablist" aria-label="Screenshot pages">
            {items.map((item, dotIndex) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Go to screenshot ${dotIndex + 1}`}
                aria-current={index === dotIndex ? "true" : undefined}
                onClick={() => scrollTo(dotIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next screenshots"
            onClick={() => scrollTo(index + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {active !== null ? (
        <div
          className="lightbox"
          id="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setActive(null)}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <p id={titleId} className="sr-only">
              {items[active].alt}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="lightbox-close"
              aria-label="Close screenshot lightbox"
              onClick={() => setActive(null)}
            >
              Close
            </button>
            <Image
              src={items[active].src}
              alt={items[active].alt}
              width={items[active].width}
              height={items[active].height}
              sizes="90vw"
              priority
            />
            <div className="lightbox-controls">
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() =>
                  setActive((i) =>
                    i === null ? i : (i - 1 + items.length) % items.length,
                  )
                }
              >
                Previous
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() =>
                  setActive((i) => (i === null ? i : (i + 1) % items.length))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
