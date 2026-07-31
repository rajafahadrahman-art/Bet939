"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const expanded = openIndex === index;
        return (
          <div className="faq-item" key={item.question}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenIndex(expanded ? null : index)}
            >
              <span>{item.question}</span>
              <span className="icon" aria-hidden="true">
                {expanded ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              hidden={!expanded}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
