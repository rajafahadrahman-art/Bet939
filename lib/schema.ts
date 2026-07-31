import type { FaqItem, ParsedContent } from "./content";
import { absoluteUrl, PAGES, type PageKey } from "./pages";
import { LOGO_PATH, SITE_NAME, SITE_URL } from "./site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Independent informational guide for Bet939 Game App users in Pakistan.",
    inLanguage: "en-PK",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl(LOGO_PATH),
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    description:
      "bet939-game.pk is an independent informational guide and is not the official Bet939 operator.",
  };
}

export function softwareApplicationSchema(content: ParsedContent) {
  // Only include fields clearly visible in approved content; no invented ratings.
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bet939",
    applicationCategory: "GameApplication",
    operatingSystem: "Android, iOS, Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
    url: absoluteUrl(PAGES.home.path),
    description: content.frontMatter.meta_description.trim(),
  };
}

export function webPageSchema(options: {
  key: PageKey;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.title,
    description: options.description,
    url: absoluteUrl(PAGES[options.key].path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-PK",
  };
}

export function articleSchema(content: ParsedContent) {
  const page = PAGES[content.key];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    description: content.frontMatter.meta_description.trim(),
    mainEntityOfPage: absoluteUrl(page.path),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_PATH),
      },
    },
  };
}

export function faqSchema(faqs: FaqItem[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
