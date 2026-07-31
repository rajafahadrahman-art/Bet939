"use client";

import { useEffect, useId, useState } from "react";
import type { TocItem } from "@/lib/content";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const sync = () => setOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!items.length) return null;

  return (
    <aside className="toc" data-open={open ? "true" : "false"}>
      <div className="toc-header">
        <strong id={`${panelId}-label`}>Table of Contents</strong>
        <button
          type="button"
          className="toc-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      <nav id={panelId} aria-labelledby={`${panelId}-label`}>
        <ul>
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "toc-h3" : undefined}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
