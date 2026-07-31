export type PageKey =
  | "home"
  | "download"
  | "login"
  | "deposit"
  | "withdrawal"
  | "ios"
  | "pc"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer";

export type ContentPageKey =
  | "home"
  | "download"
  | "login"
  | "deposit"
  | "withdrawal"
  | "ios"
  | "pc";

export interface PageDefinition {
  key: PageKey;
  title: string;
  navLabel: string;
  path: string;
  contentFile?: string;
  robots: "index, follow" | "noindex, follow" | "noindex, nofollow";
  inSitemap: boolean;
  inNav: boolean;
  inFooter: boolean;
  footerNofollow?: boolean;
  breadcrumbLabel: string;
  banner?: {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
  };
  ogImage?: string;
}

export const PAGES: Record<PageKey, PageDefinition> = {
  home: {
    key: "home",
    title: "Home",
    navLabel: "Home",
    path: "/",
    contentFile: "bet939-homepage.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Home",
    banner: {
      src: "/images/bet939-homepage-banner.webp",
      alt: "Bet939",
      title: "Bet 939",
      width: 1464,
      height: 1074,
    },
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  download: {
    key: "download",
    title: "Bet939 Game Download",
    navLabel: "Download",
    path: "/bet939-game-download/",
    contentFile: "bet939-game-download.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Bet939 Game Download",
    banner: {
      src: "/images/bet939-download-banner.webp",
      alt: "Bet939 game download",
      title: "bet939 download",
      width: 1536,
      height: 1024,
    },
    ogImage: "/images/bet939-download-banner.webp",
  },
  login: {
    key: "login",
    title: "Bet939 Login",
    navLabel: "Login",
    path: "/bet939-login/",
    contentFile: "bet939-login.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Bet939 Login",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  deposit: {
    key: "deposit",
    title: "Deposit Guide",
    navLabel: "Deposit Guide",
    path: "/deposit-guide/",
    contentFile: "bet939-deposit-guide.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Deposit Guide",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  withdrawal: {
    key: "withdrawal",
    title: "Withdrawal Guide",
    navLabel: "Withdrawal Guide",
    path: "/withdrawal-guide/",
    contentFile: "bet939-withdrawal-guide.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Withdrawal Guide",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  ios: {
    key: "ios",
    title: "Bet939 for iOS",
    navLabel: "iOS",
    path: "/bet939-for-ios/",
    contentFile: "bet939-ios.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Bet939 for iOS",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  pc: {
    key: "pc",
    title: "Bet939 for PC",
    navLabel: "PC",
    path: "/bet939-for-pc/",
    contentFile: "bet939-pc.md",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Bet939 for PC",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  about: {
    key: "about",
    title: "About Us",
    navLabel: "About Us",
    path: "/about-us/",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "About Us",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  contact: {
    key: "contact",
    title: "Contact Us",
    navLabel: "Contact Us",
    path: "/contact-us/",
    robots: "index, follow",
    inSitemap: true,
    inNav: true,
    inFooter: true,
    breadcrumbLabel: "Contact Us",
    ogImage: "/images/bet939-homepage-banner.webp",
  },
  privacy: {
    key: "privacy",
    title: "Privacy Policy",
    navLabel: "Privacy Policy",
    path: "/privacy-policy/",
    robots: "noindex, nofollow",
    inSitemap: false,
    inNav: false,
    inFooter: true,
    footerNofollow: true,
    breadcrumbLabel: "Privacy Policy",
  },
  terms: {
    key: "terms",
    title: "Terms and Conditions",
    navLabel: "Terms and Conditions",
    path: "/terms-and-conditions/",
    robots: "noindex, nofollow",
    inSitemap: false,
    inNav: false,
    inFooter: true,
    footerNofollow: true,
    breadcrumbLabel: "Terms and Conditions",
  },
  disclaimer: {
    key: "disclaimer",
    title: "Disclaimer",
    navLabel: "Disclaimer",
    path: "/disclaimer/",
    robots: "noindex, nofollow",
    inSitemap: false,
    inNav: false,
    inFooter: true,
    footerNofollow: true,
    breadcrumbLabel: "Disclaimer",
  },
};

export const NAV_ORDER: PageKey[] = [
  "home",
  "download",
  "login",
  "deposit",
  "withdrawal",
  "ios",
  "pc",
  "about",
  "contact",
];

export const FOOTER_MAIN_ORDER: PageKey[] = [
  "home",
  "download",
  "login",
  "deposit",
  "withdrawal",
  "ios",
  "pc",
  "about",
  "contact",
];

export const FOOTER_LEGAL_ORDER: PageKey[] = ["privacy", "terms", "disclaimer"];

export const CONTENT_PAGE_KEYS: ContentPageKey[] = [
  "home",
  "download",
  "login",
  "deposit",
  "withdrawal",
  "ios",
  "pc",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `https://bet939-game.pk${normalized}`;
}

export function getNavPages(): PageDefinition[] {
  return NAV_ORDER.map((key) => PAGES[key]);
}

export function getSitemapPages(): PageDefinition[] {
  return Object.values(PAGES).filter((page) => page.inSitemap);
}
