import Link from "next/link";
import type { ReactNode } from "react";
import { PAGES } from "./pages";

interface LinkRule {
  pattern: RegExp;
  href: string;
  once?: boolean;
}

/** Contextual internal link rules. Longer phrases first. Applied once per destination by default. */
const RULES: LinkRule[] = [
  {
    pattern: /\bBet939 Game Download guide\b/,
    href: PAGES.download.path,
  },
  {
    pattern: /\bcomplete Bet939 Game Download guide\b/i,
    href: PAGES.download.path,
  },
  {
    pattern: /\bBet939 game download page\b/i,
    href: PAGES.download.path,
  },
  {
    pattern: /\bBet939 Game Download\b/,
    href: PAGES.download.path,
  },
  {
    pattern: /\bBet939 Download guide\b/,
    href: PAGES.download.path,
  },
  {
    pattern: /\bdedicated download page\b/i,
    href: PAGES.download.path,
  },
  {
    pattern: /\bseparate download page\b/i,
    href: PAGES.download.path,
  },
  {
    pattern: /\bBet939 Game Login guide\b/,
    href: PAGES.login.path,
  },
  {
    pattern: /\bcomplete Bet939 Game Login guide\b/i,
    href: PAGES.login.path,
  },
  {
    pattern: /\bBet939 Login guide\b/,
    href: PAGES.login.path,
  },
  {
    pattern: /\bBet939 Game Login\b/,
    href: PAGES.login.path,
  },
  {
    pattern: /\bcomplete deposit guide\b/i,
    href: PAGES.deposit.path,
  },
  {
    pattern: /\bBet939 deposit guide\b/i,
    href: PAGES.deposit.path,
  },
  {
    pattern: /\bgeneral deposit guide\b/i,
    href: PAGES.deposit.path,
  },
  {
    pattern: /\bdeposit guide\b/i,
    href: PAGES.deposit.path,
  },
  {
    pattern: /\bdetailed withdrawal guide\b/i,
    href: PAGES.withdrawal.path,
  },
  {
    pattern: /\bBet939 withdrawal guide\b/i,
    href: PAGES.withdrawal.path,
  },
  {
    pattern: /\bwithdrawal guide\b/i,
    href: PAGES.withdrawal.path,
  },
  {
    pattern: /\bBet939 for iOS guide\b/,
    href: PAGES.ios.path,
  },
  {
    pattern: /\bcomplete Bet939 for iOS guide\b/i,
    href: PAGES.ios.path,
  },
  {
    pattern: /\bBet939 for iOS\b/,
    href: PAGES.ios.path,
  },
  {
    pattern: /\bBet939 iOS page\b/,
    href: PAGES.ios.path,
  },
  {
    pattern: /\biOS guide\b/,
    href: PAGES.ios.path,
  },
  {
    pattern: /\bBet939 for PC guide\b/,
    href: PAGES.pc.path,
  },
  {
    pattern: /\bBet939 for PC\b/,
    href: PAGES.pc.path,
  },
  {
    pattern: /\bPC guide\b/,
    href: PAGES.pc.path,
  },
  {
    pattern: /\bBet939 homepage\b/i,
    href: PAGES.home.path,
  },
  {
    pattern: /\bBet939 Game App\b/,
    href: PAGES.home.path,
  },
  {
    pattern: /\bBet 939 Game\b/,
    href: PAGES.home.path,
  },
];

export function linkifyText(
  text: string,
  options: { disableHrefs?: Set<string>; alreadyLinked?: Set<string> } = {},
): ReactNode[] {
  const disable = options.disableHrefs || new Set();
  const linked = options.alreadyLinked || new Set();
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length) {
    let earliest: { index: number; length: number; href: string; match: string } | null = null;

    for (const rule of RULES) {
      if (disable.has(rule.href)) continue;
      if (linked.has(rule.href)) continue;
      const match = rule.pattern.exec(remaining);
      if (!match || match.index === undefined) continue;
      if (
        !earliest ||
        match.index < earliest.index ||
        (match.index === earliest.index && match[0].length > earliest.length)
      ) {
        earliest = {
          index: match.index,
          length: match[0].length,
          href: rule.href,
          match: match[0],
        };
      }
    }

    if (!earliest) {
      nodes.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      nodes.push(remaining.slice(0, earliest.index));
    }

    nodes.push(
      <Link key={`il-${key++}`} href={earliest.href} className="internal-link">
        {earliest.match}
      </Link>,
    );
    linked.add(earliest.href);
    remaining = remaining.slice(earliest.index + earliest.length);
  }

  return nodes;
}
