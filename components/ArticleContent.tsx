import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, ContentSection, ParsedContent } from "@/lib/content";
import { cleanDisplayText } from "@/lib/display-text";
import { PAGES } from "@/lib/pages";
import AppInfoTable from "./AppInfoTable";
import ContentBlocks from "./ContentBlocks";
import ExternalActionButton from "./ExternalActionButton";
import FAQAccordion from "./FAQAccordion";
import PageBanner from "./PageBanner";
import ReviewCards from "./ReviewCards";
import ScreenshotGallery from "./ScreenshotGallery";
import TableOfContents from "./TableOfContents";

const SCREENSHOTS = [
  {
    src: "/images/bet939-app-screenshot-1.webp",
    alt: "bet939 games",
    width: 1050,
    height: 1860,
  },
  {
    src: "/images/bet939-app-screenshot-2.webp",
    alt: "Bet939 app screenshot 2",
    width: 1050,
    height: 1860,
  },
  {
    src: "/images/bet939-app-screenshot-3.webp",
    alt: "Bet939 app screenshot 3",
    width: 1050,
    height: 1860,
  },
  {
    src: "/images/bet939-app-screenshot-4.webp",
    alt: "Bet939 app screenshot 4",
    width: 1050,
    height: 1860,
  },
  {
    src: "/images/bet939-app-screenshot-5.webp",
    alt: "Bet939 app screenshot 5",
    width: 1050,
    height: 1860,
  },
];

const FEATURE_ICONS: Record<string, string> = {
  "Simple Mobile Dashboard": "📱",
  "Multiple Game Categories": "🎮",
  "Account and Wallet System": "💳",
  "Live Gaming Options": "📹",
  "Mobile-Friendly Performance": "⚡",
  "Transaction History": "🧾",
  "Login Security": "🔒",
  "Promotion Section": "🎁",
  "Customer Support Access": "💬",
  "Regular Updates": "🔄",
};

const GAME_ICONS: Record<string, string> = {
  "Hot Games": "🔥",
  Slots: "🎰",
  "Mini Games": "🎯",
  "Fishing Games": "🎣",
  "Live Games": "📹",
  "Card Games": "🃏",
  Sports: "🏆",
};

const BONUS_TITLES = new Set([
  "New-User Reward",
  "First-Deposit Bonus",
  "Recharge or Repeat-Deposit Offer",
  "Daily Login Reward",
  "Referral Reward",
  "Cashback",
  "VIP and Activity Rewards",
  "Event Promotions",
]);

const FEATURE_TITLES = new Set(Object.keys(FEATURE_ICONS));
const GAME_TITLES = new Set(Object.keys(GAME_ICONS));

function SectionHeading({
  section,
  subtitle,
}: {
  section: ContentSection;
  subtitle?: string;
}) {
  if (section.level === 2) {
    return (
      <div className="section-header" style={{ textAlign: "left" }}>
        <h2 id={section.id}>{section.title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
    );
  }
  return <h3 id={section.id}>{section.title}</h3>;
}

function PageCtas({ pageKey }: { pageKey: ParsedContent["key"] }) {
  if (pageKey === "home") {
    return (
      <div className="btn-group">
        <Link className="btn btn-gold" href={PAGES.download.path}>
          Download Now
        </Link>
        <Link className="btn btn-outline" href={PAGES.login.path}>
          Login
        </Link>
      </div>
    );
  }
  if (pageKey === "download") {
    return (
      <div className="btn-group">
        <ExternalActionButton
          label="Download Now"
          ariaLabel="Download Bet939 externally"
        />
        <Link className="btn btn-outline" href={PAGES.login.path}>
          Read Login Guide
        </Link>
      </div>
    );
  }
  if (pageKey === "login") {
    return (
      <div className="btn-group">
        <ExternalActionButton
          label="Login Now"
          ariaLabel="Login to Bet939 externally"
        />
        <Link className="btn btn-outline" href={PAGES.download.path}>
          Read Download Guide
        </Link>
      </div>
    );
  }
  if (pageKey === "ios" || pageKey === "pc") {
    return (
      <div className="btn-group">
        <ExternalActionButton
          label="Open Bet939"
          ariaLabel="Open Bet939 externally"
        />
        <Link className="btn btn-outline" href={PAGES.login.path}>
          Read Login Guide
        </Link>
      </div>
    );
  }
  return (
    <div className="btn-group">
      <ExternalActionButton
        label="Open Bet939"
        ariaLabel="Open Bet939 externally"
      />
    </div>
  );
}

function GuideCards() {
  const cards = [
    {
      title: "Download Guide",
      text: "Android APK steps, installation help, and update guidance.",
      href: PAGES.download.path,
      label: "Read Download Guide",
    },
    {
      title: "Login Guide",
      text: "Registration, login steps, OTP help, and account recovery.",
      href: PAGES.login.path,
      label: "Read Login Guide",
    },
    {
      title: "Deposit Guide",
      text: "JazzCash, Easypaisa, bank transfer, and pending payment help.",
      href: PAGES.deposit.path,
      label: "Read Deposit Guide",
    },
    {
      title: "Withdrawal Guide",
      text: "Cash-out steps, limits, verification, and common issues.",
      href: PAGES.withdrawal.path,
      label: "Read Withdrawal Guide",
    },
    {
      title: "iOS Guide",
      text: "Safari installation and developer trust steps for iPhone.",
      href: PAGES.ios.path,
      label: "Read iOS Guide",
    },
    {
      title: "PC Guide",
      text: "Browser access and Android emulator guidance for Windows.",
      href: PAGES.pc.path,
      label: "Read PC Guide",
    },
  ];

  return (
    <section className="content-section" aria-labelledby="quick-guides">
      <div className="section-header">
        <h2 id="quick-guides">Quick Access Guides</h2>
        <p className="section-subtitle">
          Jump to the supporting Bet939 pages when you need detailed steps
        </p>
      </div>
      <div className="guide-grid">
        {cards.map((card) => (
          <article className="guide-card" key={card.href}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <div className="cta-row">
              <Link className="btn btn-outline btn-sm" href={card.href}>
                {card.label}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function blocksToPlain(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "list") return block.items.join(" ");
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

function CardArticle({
  section,
  icon,
  className,
  linked,
  disableHrefs,
  pageKey,
}: {
  section: ContentSection;
  icon?: string;
  className: string;
  linked: Set<string>;
  disableHrefs: Set<string>;
  pageKey: ParsedContent["key"];
}) {
  return (
    <article className={className} key={section.id}>
      {icon ? (
        <div className="card-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 id={section.id}>{section.title}</h3>
      <ContentBlocks
        blocks={section.blocks}
        disableHrefs={disableHrefs}
        linked={linked}
        pageKey={pageKey}
      />
    </article>
  );
}

export default function ArticleContent({
  content,
}: {
  content: ParsedContent;
}) {
  const page = PAGES[content.key];
  const linked = new Set<string>();
  const disableHrefs = new Set<string>([page.path]);
  const isHome = content.key === "home";

  const tocItems = content.toc.filter(
    (item) => item.text !== "App Overview" && item.text !== "App Information",
  );

  const displayToc =
    isHome
      ? [
          {
            id: "table-of-contents",
            text: "Table of Contents",
            level: 2 as const,
          },
          ...tocItems,
          {
            id: "screenshots-heading",
            text: "Bet939 App Screenshots",
            level: 2 as const,
          },
          {
            id: "quick-guides",
            text: "Quick Access Guides",
            level: 2 as const,
          },
        ]
      : tocItems;

  const overviewSection = content.sections.find(
    (section) =>
      section.isAppInfo ||
      section.title === "App Overview" ||
      section.title === "APK Information" ||
      section.title === "iOS App Information",
  );
  const overviewTable = overviewSection?.blocks.find(
    (block): block is Extract<Block, { type: "table" }> =>
      block.type === "table",
  );
  const overviewRows = overviewTable?.rows ?? [];

  const sections = content.sections.filter((section) => {
    if (!overviewSection) return true;
    if (section.id === overviewSection.id) return false;
    if (section.title === "App Information" || section.title === "App Details") {
      return false;
    }
    return true;
  });

  const nodes: ReactNode[] = [];
  let i = 0;

  while (i < sections.length) {
    const section = sections[i];

    if (isHome && section.title === "Available Games") {
      nodes.push(<ScreenshotGallery key="screenshots" items={SCREENSHOTS} />);
    }

    if (section.title === "Frequently Asked Questions") {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading
            section={section}
            subtitle="Common questions answered with the same approved wording"
          />
          <FAQAccordion items={section.faqs || content.faqs} />
        </section>,
      );
      i += 1;
      continue;
    }

    if (section.title === "User Reviews") {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading
            section={section}
            subtitle="Reviews shared in the approved homepage content"
          />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
          
            pageKey={content.key}
          />
          <ReviewCards reviews={section.reviews || content.reviews} />
        </section>,
      );
      i += 1;
      continue;
    }

    if (
      section.title === "Main Features of Bet939 Game" ||
      section.title === "Main Features of Game"
    ) {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
            pageKey={content.key}
          />
        </section>,
      );
      i += 1;
      const cards: ReactNode[] = [];
      while (i < sections.length && FEATURE_TITLES.has(sections[i].title)) {
        cards.push(
          <CardArticle
            key={sections[i].id}
            section={sections[i]}
            icon={FEATURE_ICONS[sections[i].title]}
            className="feature-card"
            linked={linked}
            disableHrefs={disableHrefs}
            pageKey={content.key}
          />,
        );
        i += 1;
      }
      if (cards.length) {
        nodes.push(
          <div className="feature-grid" key="feature-grid">
            {cards}
          </div>,
        );
      }
      continue;
    }

    if (section.title === "Available Games") {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
            pageKey={content.key}
          />
        </section>,
      );
      i += 1;
      const cards: ReactNode[] = [];
      while (i < sections.length && GAME_TITLES.has(sections[i].title)) {
        const gameSection = sections[i];
        const summary = cleanDisplayText(blocksToPlain(gameSection.blocks)).slice(
          0,
          220,
        );
        cards.push(
          <article className="category-card" key={gameSection.id}>
            <div className="card-icon" aria-hidden="true">
              {GAME_ICONS[gameSection.title]}
            </div>
            <h3 id={gameSection.id}>{gameSection.title}</h3>
            <ContentBlocks
              blocks={gameSection.blocks}
              disableHrefs={disableHrefs}
              linked={linked}
              pageKey={content.key}
            />
            <span className="sr-only">{summary}</span>
          </article>,
        );
        i += 1;
      }
      if (cards.length) {
        nodes.push(
          <div className="category-grid" key="category-grid">
            {cards}
          </div>,
        );
      }
      continue;
    }

    if (section.title === "Bonuses and Rewards") {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading
            section={section}
            subtitle="Promotion types described in the approved content"
          />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
          
            pageKey={content.key}
          />
        </section>,
      );
      i += 1;
      const cards: ReactNode[] = [];
      while (i < sections.length && BONUS_TITLES.has(sections[i].title)) {
        cards.push(
          <CardArticle
            key={sections[i].id}
            section={sections[i]}
            className="bonus-card"
            linked={linked}
            disableHrefs={disableHrefs}
            pageKey={content.key}
          />,
        );
        i += 1;
      }
      if (cards.length) {
        nodes.push(
          <div className="bonus-grid" key="bonus-grid">
            {cards}
          </div>,
        );
      }
      continue;
    }

    if (
      section.title === "Benefits" ||
      section.title === "Possible Limitations" ||
      section.title === "Responsible Gaming Tips" ||
      section.title === "Safety Tips" ||
      section.title === "Deposit Safety Tips" ||
      section.title === "Withdrawal Safety Tips" ||
      section.title === "iOS Safety Tips" ||
      section.title === "PC Security Tips" ||
      section.title === "Security Tips"
    ) {
      nodes.push(
        <section key={section.id} className="content-section" aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <div className="info-box">
            <ContentBlocks
              blocks={section.blocks}
              disableHrefs={disableHrefs}
              linked={linked}
              pageKey={content.key}
            />
          </div>
        </section>,
      );
      i += 1;
      continue;
    }

    nodes.push(
      <section key={section.id} className="content-section" aria-labelledby={section.id}>
        <SectionHeading section={section} />
        <ContentBlocks
          blocks={section.blocks}
          disableHrefs={disableHrefs}
          linked={linked}
          pageKey={content.key}
        />
      </section>,
    );
    i += 1;
  }

  if (isHome) {
    nodes.push(<GuideCards key="guides" />);
  }

  const cleanedIntro = content.intro.map((block) => {
    if (block.type === "paragraph") {
      return { ...block, text: cleanDisplayText(block.text) };
    }
    if (block.type === "list") {
      return {
        ...block,
        items: block.items.map((item) => cleanDisplayText(item)),
      };
    }
    return block;
  });

  let heroIntro = cleanedIntro;
  let restIntro = [] as typeof cleanedIntro;
  if (isHome) {
    const firstParagraph = cleanedIntro.find((block) => block.type === "paragraph");
    if (firstParagraph && firstParagraph.type === "paragraph") {
      const sentences = firstParagraph.text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [
        firstParagraph.text,
      ];
      const lead = sentences.slice(0, 2).join(" ").trim();
      const remainder = sentences.slice(2).join(" ").trim();
      heroIntro = [{ type: "paragraph", text: lead }];
      restIntro = [
        ...(remainder ? [{ type: "paragraph" as const, text: remainder }] : []),
        ...cleanedIntro.filter((block) => block !== firstParagraph),
      ];
    } else {
      heroIntro = cleanedIntro.slice(0, 1);
      restIntro = cleanedIntro.slice(1);
    }
  }

  return (
    <article className="article">
      <div className="article-shell">
        <div className="page-hero">
          <h1>{cleanDisplayText(content.h1)}</h1>
          {isHome ? (
            <div className="hero-intro">
              <ContentBlocks
                blocks={heroIntro}
                disableHrefs={disableHrefs}
                linked={linked}
                pageKey={content.key}
              />
            </div>
          ) : (
            <ContentBlocks
              blocks={cleanedIntro}
              disableHrefs={disableHrefs}
              linked={linked}
              pageKey={content.key}
            />
          )}
          <PageCtas pageKey={content.key} />
        </div>

        {page.banner ? <PageBanner {...page.banner} priority={isHome} /> : null}

        {overviewRows.length ? (
          <AppInfoTable
            rows={overviewRows}
            title={
              content.key === "download"
                ? "APK Information"
                : content.key === "ios"
                  ? "iOS App Information"
                  : "App Overview"
            }
          />
        ) : null}

        {displayToc.length ? (
          <div id="table-of-contents">
            <TableOfContents items={displayToc.filter((t) => t.id !== "table-of-contents")} />
          </div>
        ) : null}

        {isHome ? (
          <ContentBlocks
            blocks={restIntro}
            disableHrefs={disableHrefs}
            linked={linked}
            pageKey={content.key}
          />
        ) : null}

        {nodes}
      </div>
    </article>
  );
}
