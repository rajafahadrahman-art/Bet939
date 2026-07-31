"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export interface ScreenshotItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ScreenshotGallery({
  items,
}: {
  items: ScreenshotItem[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

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

  return (
    <section className="screenshot-section" aria-labelledby="screenshots-heading">
      <h2 id="screenshots-heading">Bet939 App Screenshots</h2>
      <div className="screenshot-grid">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="shot shot-btn"
            onClick={() => setActive(index)}
            aria-label={`Open screenshot: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 220px"
              loading="lazy"
            />
          </button>
        ))}
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
