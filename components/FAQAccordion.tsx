"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content";
import { cleanDisplayText } from "@/lib/display-text";

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
        const question = cleanDisplayText(item.question);
        const answer = cleanDisplayText(item.answer);
        return (
          <div className="faq-item" key={question}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenIndex(expanded ? null : index)}
            >
              <span>{question}</span>
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
              <p>{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
