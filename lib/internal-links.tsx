import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentPageKey } from "./pages";
import { PAGES } from "./pages";

interface AnchorRule {
  pattern: RegExp;
  href: string;
  anchor: string;
  /** When true (default), link this destination only once on the page. */
  once?: boolean;
}

const DOMAIN_RULE: AnchorRule = {
  pattern: /bet939-game\.pk/,
  href: PAGES.home.path,
  anchor: "bet939-game.pk",
  once: false,
};

const PAGE_RULES: Record<ContentPageKey, AnchorRule[]> = {
  home: [
    {
      pattern: /bet939 game download page/i,
      href: PAGES.download.path,
      anchor: "bet939 game download page",
    },
    {
      pattern: /bet939 for ios guide/i,
      href: PAGES.ios.path,
      anchor: "bet939 for ios guide",
    },
    {
      pattern: /bet939 for pc guide/i,
      href: PAGES.pc.path,
      anchor: "bet939 for pc guide",
    },
    {
      pattern: /complete bet939 game login(?=\s+guide\b)/i,
      href: PAGES.login.path,
      anchor: "complete bet939 game login",
    },
  ],
  download: [
    {
      pattern: /^Bet939 Game(?=\s+Download\b)/,
      href: PAGES.home.path,
      anchor: "Bet939 Game",
    },
    {
      pattern: /Bet939 for iOS(?=\s+guide\b)|Bet939 for iOS/i,
      href: PAGES.ios.path,
      anchor: "Bet939 for iOS",
    },
    {
      pattern: /Bet939 for PC(?=\s+guide\b)|Bet939 for PC/i,
      href: PAGES.pc.path,
      anchor: "bet939 for Pc",
    },
    {
      pattern: /Bet939 Game Login(?=\s+guide\b)|Bet939 Game Login/i,
      href: PAGES.login.path,
      anchor: "bet939 game login",
    },
    {
      pattern: /Bet939(?=\s+homepage\b)/,
      href: PAGES.home.path,
      anchor: "Bet939",
    },
  ],
  login: [
    {
      pattern: /\bBet939(?=\s+Login\b)/,
      href: PAGES.home.path,
      anchor: "Bet939",
    },
    {
      // Render "bet939 game" + keep " homepage" outside the link.
      pattern: /Bet939(?=\s+homepage\b)/i,
      href: PAGES.home.path,
      anchor: "bet939 game",
      once: false,
    },
    {
      pattern: /(?:complete\s+)?Bet939 Game Download(?=\s+guide\b)|(?:complete\s+)?Bet939 Game Download/i,
      href: PAGES.download.path,
      anchor: "bet939 game download",
    },
  ],
  deposit: [
    {
      pattern: /Bet939 Game Download(?=\s+guide\b)|Bet939 Game Download/i,
      href: PAGES.download.path,
      anchor: "bet939 game download",
    },
    {
      pattern: /Bet939 Game Login(?=\s+guide\b)|Bet939 Game Login/i,
      href: PAGES.login.path,
      anchor: "bet939 game login",
    },
    {
      pattern: /\bBet939\b|\bbet939\b/,
      href: PAGES.home.path,
      anchor: "bet939",
    },
  ],
  withdrawal: [
    {
      pattern: /Bet939 Game Login(?=\s+guide\b)|Bet939 Game Login/i,
      href: PAGES.login.path,
      anchor: "Bet939 Game Login",
    },
    {
      pattern: /Bet939 Game Download(?=\s+guide\b)|Bet939 Game Download/i,
      href: PAGES.download.path,
      anchor: "Bet939 Game download",
    },
    {
      pattern: /Bet939 Game(?=\s+account\b)/,
      href: PAGES.home.path,
      anchor: "Bet939 Game",
    },
    {
      pattern: /\bbet939\b/i,
      href: PAGES.home.path,
      anchor: "bet939",
      once: false,
    },
  ],
  ios: [
    {
      pattern: /\bBet939\b/,
      href: PAGES.home.path,
      anchor: "Bet939",
    },
  ],
  pc: [
    {
      pattern: /\bBet939 Game\b/,
      href: PAGES.home.path,
      anchor: "Bet939 Game",
      once: false,
    },
    {
      pattern: /\bbet939\b/i,
      href: PAGES.home.path,
      anchor: "bet939",
    },
  ],
};

function rulesFor(pageKey?: ContentPageKey): AnchorRule[] {
  const pageRules = pageKey ? PAGE_RULES[pageKey] : [];
  return [...pageRules, DOMAIN_RULE];
}

export function linkifyText(
  text: string,
  options: {
    disableHrefs?: Set<string>;
    alreadyLinked?: Set<string>;
    pageKey?: ContentPageKey;
  } = {},
): ReactNode[] {
  const disable = options.disableHrefs || new Set();
  const linked = options.alreadyLinked || new Set();
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;
  const rules = rulesFor(options.pageKey);

  while (remaining.length) {
    let earliest: {
      index: number;
      length: number;
      href: string;
      anchor: string;
      once: boolean;
      key: string;
    } | null = null;

    for (const rule of rules) {
      if (disable.has(rule.href)) continue;
      const once = rule.once !== false;
      const linkKey = `${rule.href}::${rule.anchor}`;
      if (once && linked.has(linkKey)) continue;

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
          anchor: rule.anchor,
          once,
          key: linkKey,
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
        {earliest.anchor}
      </Link>,
    );

    if (earliest.once) {
      linked.add(earliest.key);
    }
    remaining = remaining.slice(earliest.index + earliest.length);
  }

  return nodes;
}
