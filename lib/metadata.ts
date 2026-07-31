import type { Metadata } from "next";
import { getContent } from "./content";
import { absoluteUrl, PAGES, type ContentPageKey, type PageKey } from "./pages";
import { SITE_NAME, SITE_URL } from "./site";

function robotsFromDirective(directive: string): Metadata["robots"] {
  const normalized = directive.toLowerCase();
  return {
    index: normalized.includes("index") && !normalized.includes("noindex"),
    follow: normalized.includes("follow") && !normalized.includes("nofollow"),
    googleBot: {
      index: normalized.includes("index") && !normalized.includes("noindex"),
      follow: normalized.includes("follow") && !normalized.includes("nofollow"),
    },
  };
}

export function buildContentMetadata(key: ContentPageKey): Metadata {
  const page = PAGES[key];
  const content = getContent(key);
  const title = content.frontMatter.meta_title.trim();
  const description = content.frontMatter.meta_description.trim();
  const canonical = content.frontMatter.canonical_url || absoluteUrl(page.path);
  const ogImage = page.ogImage || "/images/bet939-homepage-banner.webp";
  const robots = robotsFromDirective(
    content.frontMatter.indexing || page.robots,
  );

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_PK",
      type: key === "home" ? "website" : "article",
      images: [{ url: ogImage, alt: page.banner?.alt || SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildStaticMetadata(options: {
  key: PageKey;
  title: string;
  description: string;
}): Metadata {
  const page = PAGES[options.key];
  const canonical = absoluteUrl(page.path);
  const ogImage = page.ogImage || "/images/bet939-homepage-banner.webp";

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical },
    robots: robotsFromDirective(page.robots),
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_PK",
      type: "website",
      images: [{ url: ogImage, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [ogImage],
    },
  };
}

export { SITE_URL };
