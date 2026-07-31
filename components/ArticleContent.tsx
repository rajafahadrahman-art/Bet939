import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentSection, ParsedContent } from "@/lib/content";
import { PAGES } from "@/lib/pages";
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

function SectionHeading({ section }: { section: ContentSection }) {
  if (section.level === 2) {
    return <h2 id={section.id}>{section.title}</h2>;
  }
  return <h3 id={section.id}>{section.title}</h3>;
}

function PageCtas({ pageKey }: { pageKey: ParsedContent["key"] }) {
  if (pageKey === "download") {
    return (
      <div className="cta-row">
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
      <div className="cta-row">
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
      <div className="cta-row">
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
  if (pageKey === "home") {
    return (
      <div className="cta-row">
        <ExternalActionButton
          label="Download Now"
          ariaLabel="Download Bet939 externally"
        />
        <ExternalActionButton
          label="Login Now"
          ariaLabel="Login to Bet939 externally"
          variant="outline"
        />
        <Link className="btn btn-outline" href={PAGES.download.path}>
          Read Download Guide
        </Link>
      </div>
    );
  }
  return (
    <div className="cta-row">
      <ExternalActionButton
        label="Open Bet939"
        ariaLabel="Open Bet939 externally"
      />
    </div>
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
  const tocItems = content.toc.filter(
    (item) => item.text !== "Frequently Asked Questions" || content.faqs.length,
  );

  // Inject TOC item and screenshots heading into TOC for homepage
  const homeToc =
    content.key === "home"
      ? [
          { id: "table-of-contents", text: "Table of Contents", level: 2 as const },
          ...tocItems.filter((t) => t.text !== "App Overview"),
          {
            id: "screenshots-heading",
            text: "Bet939 App Screenshots",
            level: 2 as const,
          },
        ].filter((item, index, arr) => {
          // Keep screenshots after features conceptually by sorting later in render; TOC order: keep natural with inject after features
          return arr.findIndex((x) => x.id === item.id) === index;
        })
      : tocItems;

  // Rebuild homepage TOC in better order
  let displayToc = homeToc;
  if (content.key === "home") {
    const featureIdx = tocItems.findIndex((t) => t.text === "Main Features of Game");
    const availableIdx = tocItems.findIndex((t) => t.text === "Available Games");
    const before = tocItems.slice(0, availableIdx >= 0 ? availableIdx : featureIdx + 1);
    const after = tocItems.slice(availableIdx >= 0 ? availableIdx : featureIdx + 1);
    displayToc = [
      { id: "table-of-contents", text: "Table of Contents", level: 2 },
      ...before.filter((t) => t.text !== "App Overview"),
      {
        id: "screenshots-heading",
        text: "Bet939 App Screenshots",
        level: 2,
      },
      ...after,
    ];
  }

  const renderSection = (section: ContentSection) => {
    if (section.title === "Frequently Asked Questions") {
      return (
        <section key={section.id} aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <FAQAccordion items={section.faqs || content.faqs} />
        </section>
      );
    }

    if (section.title === "User Reviews") {
      return (
        <section key={section.id} aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
          />
          <ReviewCards reviews={section.reviews || content.reviews} />
        </section>
      );
    }

    if (section.title === "Bonuses and Rewards") {
      // Collect following bonus H3s rendered as cards by caller grouping
      return (
        <section key={section.id} aria-labelledby={section.id}>
          <SectionHeading section={section} />
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
          />
        </section>
      );
    }

    if (BONUS_TITLES.has(section.title) && content.key === "home") {
      return (
        <article className="bonus-card" key={section.id}>
          <h3 id={section.id}>{section.title}</h3>
          <ContentBlocks
            blocks={section.blocks}
            disableHrefs={disableHrefs}
            linked={linked}
          />
        </article>
      );
    }

    return (
      <section key={section.id} aria-labelledby={section.id}>
        <SectionHeading section={section} />
        <ContentBlocks
          blocks={section.blocks}
          disableHrefs={disableHrefs}
          linked={linked}
        />
      </section>
    );
  };

  const sections = content.sections;
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < sections.length) {
    const section = sections[i];

    if (
      content.key === "home" &&
      section.title === "What Is Bet939 Game APP?"
    ) {
      nodes.push(
        <div key="toc-anchor" id="table-of-contents">
          <h2 className="sr-only">Table of Contents</h2>
          <div className="mobile-toc-wrap">
            <TableOfContents items={displayToc} />
          </div>
        </div>,
      );
    }

    if (content.key === "home" && section.title === "Available Games") {
      nodes.push(<ScreenshotGallery key="screenshots" items={SCREENSHOTS} />);
    }

    if (section.title === "Bonuses and Rewards") {
      nodes.push(renderSection(section));
      i += 1;
      const cards: ReactNode[] = [];
      while (i < sections.length && BONUS_TITLES.has(sections[i].title)) {
        cards.push(renderSection(sections[i]));
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

    nodes.push(renderSection(section));
    i += 1;
  }

  return (
    <article className={`article ${displayToc.length ? "has-toc" : ""}`}>
      <div className="container">
        <div className="article-body-col">
          {page.banner ? (
            <div className="page-hero">
              <PageBanner {...page.banner} priority />
            </div>
          ) : null}

          <h1>{content.h1}</h1>
          <PageCtas pageKey={content.key} />
          <p className="notice">
            bet939-game.pk is an independent informational guide and is not the
            official Bet939 operator. Real-money gaming involves risk and no
            winnings are guaranteed.
          </p>

          <ContentBlocks
            blocks={content.intro}
            disableHrefs={disableHrefs}
            linked={linked}
          />

          {content.key !== "home" && displayToc.length ? (
            <div className="mobile-toc-wrap">
              <TableOfContents items={displayToc} />
            </div>
          ) : null}

          {nodes}
        </div>

        {displayToc.length ? (
          <div className="article-toc-col desktop-toc-wrap" id={content.key === "home" ? undefined : "table-of-contents"}>
            <TableOfContents items={displayToc} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
