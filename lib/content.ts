import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CONTENT_PAGE_KEYS, PAGES, type ContentPageKey } from "./pages";
import { PAGE_HEADINGS } from "./headings";
import { slugify, uniqueSlug } from "./slugify";

const CONTENT_DIR = path.join(process.cwd(), "content-pages");

export interface ContentFrontMatter {
  page_name?: string;
  page_type?: string;
  url?: string;
  focus_keyword?: string;
  secondary_keywords?: string[];
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
  indexing?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  rating: number;
  ratingLabel: string;
  quote: string;
  name: string;
  city: string;
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: [string, string][] }
  | { type: "blockquote"; text: string };

export interface ContentSection {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: Block[];
  faqs?: FaqItem[];
  reviews?: ReviewItem[];
  isAppInfo?: boolean;
  isTocAnchor?: boolean;
}

export interface ParsedContent {
  key: ContentPageKey;
  frontMatter: ContentFrontMatter;
  h1: string;
  intro: Block[];
  sections: ContentSection[];
  toc: TocItem[];
  faqs: FaqItem[];
  reviews: ReviewItem[];
  rawBody: string;
}

function readContentFile(filename: string): string {
  const filePath = path.join(CONTENT_DIR, filename);
  return fs.readFileSync(filePath, "utf8");
}

function isLikelyListItem(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^[-*•]\s+/.test(trimmed)) return true;
  if (/^\d+\.\s+/.test(trimmed)) return true;
  if (trimmed.length > 120) return false;
  if (/[.!?]$/.test(trimmed) && trimmed.length > 80) return false;
  return true;
}

function stripListMarker(line: string): string {
  return line.replace(/^[-*•]\s+/, "").replace(/^\d+\.\s+/, "").trim();
}

function parseReviewBlock(lines: string[]): ReviewItem[] {
  const reviews: ReviewItem[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    const starMatch = line.match(/^([★☆]+)\s*(\d)\/5$/);
    if (starMatch) {
      const rating = Number(starMatch[2]);
      const ratingLabel = line;
      let quote = "";
      let name = "";
      let city = "";
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("—") && !lines[i].trim().startsWith("★")) {
        if (lines[i].trim()) {
          quote = (quote ? `${quote} ` : "") + lines[i].trim();
        }
        i += 1;
      }
      if (i < lines.length && lines[i].trim().startsWith("—")) {
        const meta = lines[i].trim().replace(/^—\s*/, "");
        const parts = meta.split(",").map((p) => p.trim());
        name = parts[0] || "";
        city = parts.slice(1).join(", ");
        i += 1;
      }
      reviews.push({ rating, ratingLabel, quote, name, city });
      continue;
    }
    i += 1;
  }
  return reviews;
}

function parseFaqBlock(lines: string[]): FaqItem[] {
  const faqs: FaqItem[] = [];
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  let i = 0;
  while (i < nonEmpty.length) {
    const question = nonEmpty[i];
    const answerParts: string[] = [];
    i += 1;
    while (i < nonEmpty.length) {
      const next = nonEmpty[i];
      const looksLikeQuestion =
        next.endsWith("?") ||
        /^(what|how|why|where|when|can|does|do|is|are|will|should)\b/i.test(next);
      if (looksLikeQuestion && answerParts.length > 0) break;
      answerParts.push(next);
      i += 1;
    }
    if (question && answerParts.length) {
      faqs.push({ question, answer: answerParts.join(" ") });
    }
  }
  return faqs;
}

function parseAppInfoRows(lines: string[]): [string, string][] {
  const rows: [string, string][] = [];
  const labels = new Set([
    "Details",
    "Information",
    "App Name",
    "Category",
    "Current Version",
    "App Size",
    "Country",
    "Latest Update",
    "Payment Methods",
    "Language",
    "App Price",
    "Supported Devices",
    "Last Checked",
    "File Type",
    "File Size",
    "Android requirement",
    "Price",
    "Platform",
    "Installation Method",
    "Last Tested",
  ]);

  const cleaned = lines.map((l) => l.trim()).filter(Boolean);
  // Skip header-like first rows
  let i = 0;
  while (i < cleaned.length && (cleaned[i] === "Details" || cleaned[i] === "Information" || cleaned[i] === "App Details")) {
    i += 1;
  }

  while (i < cleaned.length) {
    const key = cleaned[i];
    const value = cleaned[i + 1];
    if (labels.has(key) && value && !labels.has(value)) {
      rows.push([key, value]);
      i += 2;
    } else if (labels.has(key) && !value) {
      i += 1;
    } else {
      // unpaired leftover line – skip
      i += 1;
    }
  }
  return rows;
}

function collectBlocks(
  lines: string[],
  options: { forceList?: boolean; isAppInfo?: boolean } = {},
): Block[] {
  if (options.isAppInfo) {
    const rows = parseAppInfoRows(lines);
    if (rows.length) return [{ type: "table", rows }];
  }

  const blocks: Block[] = [];
  let buffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!buffer.length) return;
    const text = buffer.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    buffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push({
      type: "list",
      ordered: false,
      items: listBuffer.map(stripListMarker),
    });
    listBuffer = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      flushParagraph();
      continue;
    }

    const explicitList = /^[-*•]\s+/.test(line) || /^\d+\.\s+/.test(line);
    const shortStep = line.length <= 110 && !line.includes(". ");
    const continueList = listBuffer.length > 0 && shortStep;
    const startListHint =
      options.forceList ||
      /:$/.test(buffer[buffer.length - 1] || "") ||
      /include:|following:|steps:|check:|ready:|because:|fixes:|tips|solutions:/i.test(
        buffer.join(" "),
      );

    if (
      explicitList ||
      (options.forceList && shortStep) ||
      (listBuffer.length && continueList) ||
      (startListHint && isLikelyListItem(line) && line.length < 90)
    ) {
      flushParagraph();
      listBuffer.push(line);
      continue;
    }

    if (listBuffer.length) flushList();
    buffer.push(line);
  }

  flushList();
  flushParagraph();
  return blocks;
}

function headingMap(key: ContentPageKey): Map<string, 2 | 3> {
  const map = new Map<string, 2 | 3>();
  for (const h of PAGE_HEADINGS[key]) {
    map.set(h.text, h.level);
  }
  return map;
}

function sanitizeFrontMatterSource(raw: string): string {
  // Tolerate minor YAML formatting issues in approved front matter without rewriting files.
  return raw
    .replace(/^(secondary_keywords:)\s*\n\[\]/m, "$1 []")
    .replace(/^(secondary_keywords:)\s*\n(\s*-\s+)/m, "$1\n$2");
}

export function parseContent(key: ContentPageKey): ParsedContent {
  const page = PAGES[key];
  if (!page.contentFile) {
    throw new Error(`No content file for page ${key}`);
  }

  const raw = sanitizeFrontMatterSource(readContentFile(page.contentFile));
  const { data, content } = matter(raw);
  const frontMatter = data as ContentFrontMatter;
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  let h1 = "";
  const bodyLines: string[] = [];
  for (const line of lines) {
    if (!h1 && line.trim().startsWith("# ")) {
      h1 = line.trim().replace(/^#\s+/, "");
      continue;
    }
    bodyLines.push(line);
  }

  const headings = headingMap(key);
  const usedSlugs = new Set<string>();
  const sections: ContentSection[] = [];
  const introLines: string[] = [];
  let current: { title: string; level: 2 | 3; lines: string[] } | null = null;

  const pushCurrent = () => {
    if (!current) return;
    const id = uniqueSlug(slugify(current.title), usedSlugs);
    const isFaq = current.title === "Frequently Asked Questions";
    const isReviews = current.title === "User Reviews";
    const isAppInfo =
      current.title === "App Information" ||
      current.title === "APK Information" ||
      current.title === "iOS App Information" ||
      current.title === "App Details" ||
      current.title === "App Overview";

    if (isFaq) {
      const faqs = parseFaqBlock(current.lines);
      sections.push({
        id,
        title: current.title,
        level: current.level,
        blocks: [],
        faqs,
      });
    } else if (isReviews) {
      // Keep non-review intro lines as blocks, then parse reviews
      const reviewStart = current.lines.findIndex((l) => l.trim().startsWith("★"));
      const preface =
        reviewStart > 0 ? current.lines.slice(0, reviewStart) : reviewStart === -1 ? current.lines : [];
      const reviewLines = reviewStart >= 0 ? current.lines.slice(reviewStart) : [];
      // Stop reviews before Overall User Rating style content if nested elsewhere
      const reviews = parseReviewBlock(reviewLines);
      sections.push({
        id,
        title: current.title,
        level: current.level,
        blocks: collectBlocks(preface),
        reviews,
      });
    } else {
      const forceList = shouldForceList(current.title);
      sections.push({
        id,
        title: current.title,
        level: current.level,
        blocks: collectBlocks(current.lines, { isAppInfo, forceList }),
        isAppInfo,
      });
    }
    current = null;
  };

  for (const line of bodyLines) {
    const trimmed = line.trim();
    const level = headings.get(trimmed);
    if (level) {
      if (!current && introLines.length === 0 && sections.length === 0) {
        // still in intro
      }
      pushCurrent();
      current = { title: trimmed, level, lines: [] };
      continue;
    }
    if (!current) {
      introLines.push(line);
    } else {
      current.lines.push(line);
    }
  }
  pushCurrent();

  // Merge App Overview + App Information table if Overview has table-like content
  const overviewIdx = sections.findIndex((s) => s.title === "App Overview");
  if (overviewIdx >= 0) {
    const overview = sections[overviewIdx];
    const next = sections[overviewIdx + 1];
    if (next?.title === "App Information") {
      const combinedLines = [
        ...overview.blocks.flatMap((b) =>
          b.type === "paragraph" ? [b.text] : b.type === "list" ? b.items : [],
        ),
        // Reconstruct from next section by re-reading isn't needed; merge tables
      ];
      void combinedLines;
      const table =
        next.blocks.find((b) => b.type === "table") ||
        overview.blocks.find((b) => b.type === "table");
      // Rebuild app overview as table from original content
      const appSection = parseAppInfoFromRaw(bodyLines);
      if (appSection.length) {
        sections[overviewIdx] = {
          ...overview,
          blocks: [{ type: "table", rows: appSection }],
          isAppInfo: true,
        };
        sections.splice(overviewIdx + 1, 1);
      } else if (table) {
        sections[overviewIdx] = {
          ...overview,
          blocks: [table],
          isAppInfo: true,
        };
        sections.splice(overviewIdx + 1, 1);
      }
    }
  }

  const toc: TocItem[] = sections
    .filter((s) => s.level === 2 || usefulH3(s.title, key))
    .map((s) => ({ id: s.id, text: s.title, level: s.level }));

  const faqs = sections.flatMap((s) => s.faqs || []);
  const reviews = sections.flatMap((s) => s.reviews || []);

  return {
    key,
    frontMatter,
    h1,
    intro: collectBlocks(introLines),
    sections,
    toc,
    faqs,
    reviews,
    rawBody: content,
  };
}

const FORCE_LIST_TITLES = new Set([
  "Bet939 Game Download Requirements",
  "How to Download Bet939 Game APK",
  "How to Install APK",
  "How to Enable Unknown App Installation",
  "How to Update Apk to the Latest Version",
  "APK Permissions",
  "Safety Tips",
  "How to Create an Account",
  "Bet939 Game Login Steps",
  "Password Forgotten",
  "OTP Not Received",
  "Security Tips",
  "What You Need Before Making a Deposit",
  "How to Deposit Money",
  "Deposit Safety Tips",
  "What You Need Before Withdrawal",
  "How to Withdraw Money from Bet939",
  "Withdrawal Safety Tips",
  "Requirements for iOS",
  "How to Download Bet939 for iOS",
  "How to Trust the Developer Profile",
  "How to Update App on iPhone",
  "iOS Safety Tips",
  "Method 1: Online Access on Browser",
  "How to Install Through an Emulator",
  "PC Security Tips",
  "Registration",
  "Login Process",
  "Benefits",
  "Possible Limitations",
  "Responsible Gaming Tips",
  "APK Not Installing",
  "“App Not Installed” Error",
  '"App Not Installed" Error',
  "Bet939 Download Is Slow",
  "App Icon Is Not Appearing",
  "App Is Not Installing",
  "Unable to Verify App Error",
  "App Opens and Closes Immediately",
]);

function shouldForceList(title: string): boolean {
  return FORCE_LIST_TITLES.has(title);
}

function usefulH3(title: string, key: ContentPageKey): boolean {
  if (key === "home") {
    return [
      "Hot Games",
      "Slots",
      "Mini Games",
      "Fishing Games",
      "Live Games",
      "Card Games",
      "Sports",
      "Android",
      "iPhone and iPad",
      "Windows PC and Laptop",
      "Registration",
      "Login Process",
      "How to Deposit Money",
      "How to Withdraw Money",
    ].includes(title);
  }
  return true;
}

function parseAppInfoFromRaw(bodyLines: string[]): [string, string][] {
  const start = bodyLines.findIndex((l) => l.trim() === "App Information" || l.trim() === "App Overview");
  if (start < 0) return [];
  const endCandidates = [
    "What Is Bet939 Game APP?",
    "Bet939 Game Download Requirements",
    "Can I Download Bet939 Game for Iphone?",
  ];
  let end = bodyLines.length;
  for (let i = start + 1; i < bodyLines.length; i += 1) {
    if (endCandidates.includes(bodyLines[i].trim())) {
      end = i;
      break;
    }
  }
  return parseAppInfoRows(bodyLines.slice(start, end));
}

const contentCache = new Map<ContentPageKey, ParsedContent>();

export function getContent(key: ContentPageKey): ParsedContent {
  const cached = contentCache.get(key);
  if (cached) return cached;
  const parsed = parseContent(key);
  contentCache.set(key, parsed);
  return parsed;
}

export function getAllContent(): ParsedContent[] {
  return CONTENT_PAGE_KEYS.map((key) => getContent(key));
}

export function listContentFiles(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
}
