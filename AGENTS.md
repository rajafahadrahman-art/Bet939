# AGENTS.md — Bet939 Website Project Rules

## Project Overview

Build a complete production-ready informational website for **Bet939**.

- Domain: `https://bet939-game.pk`
- Framework: Next.js
- Router: App Router
- Language: TypeScript
- Hosting: Vercel
- Package manager: npm
- Default appearance: Light mode
- Dark mode: Available through a working toggle
- External Download/Login/Register URL: `https://www.bet939.bet/?dl=2brwfp`

This repository currently contains approved content and images only. The Next.js application may not yet be initialized.

## Repository State and Preservation Rules

The existing approved folders are:

- `/content-pages/`
- `/public/images/`

These folders and their files are the source material for the website.

Never:

- Delete, rename, move, or overwrite approved Markdown files.
- Delete, rename, move, or overwrite uploaded images.
- Replace approved content with newly generated content.
- Run a command that clears or recreates the repository.
- Replace the existing `public` folder with a new scaffolded one.
- Commit `node_modules`.

If Next.js is not initialized, safely create a new Next.js App Router project in this same repository while preserving all existing files. If direct scaffolding is unsafe because the repository is not empty, scaffold in a temporary directory and copy only the required project files into the repository root.

## Required Technology

Use:

- Latest stable Next.js
- App Router
- TypeScript
- ESLint
- Server Components by default
- Plain CSS or CSS Modules
- CSS variables for themes
- npm
- Lightweight dependencies only

Do not use:

- Tailwind CSS
- Heavy UI frameworks
- Heavy slider or lightbox libraries
- Animation libraries
- External AI services
- Unnecessary third-party scripts
- External font services unless already required

## Content Source of Truth

Read every Markdown file inside `/content-pages/` before building pages.

Determine each page from:

- Filename
- YAML front matter
- Page name
- Focus keyword
- Meta title
- Meta description
- H1
- URL or permalink
- Internal-linking instructions
- Article purpose

One confirmed file is:

- `/content-pages/bet939-game-download.md`

Other filenames may differ. Never assume a file is missing until every Markdown file has been inspected.

Use approved content exactly as uploaded.

Do not:

- Rewrite paragraphs
- Shorten articles
- Summarize sections
- Remove approved wording
- Add keyword stuffing
- Invent app information
- Invent payment limits
- Invent bonus percentages
- Invent withdrawal times
- Invent reviews or ratings
- Invent names, cities, dates, contact details, licences, or legal claims
- Merge separate page content into the homepage
- Duplicate full page instructions across multiple pages

Allowed changes:

- Fix an obvious formatting issue
- Fix an obvious spelling error only when necessary
- Convert approved anchor text into working links
- Render tables, lists, cards, accordions, screenshots, reviews, and FAQs
- Add section IDs
- Add accessibility labels
- Add small interface labels outside the article text

Maintain exactly one H1 per page.

## Markdown Rendering

Keep `/content-pages/` as the permanent content source.

Build a reusable server-side Markdown system that supports:

- YAML front matter
- GitHub-flavoured Markdown
- Headings
- Paragraphs
- Lists
- Tables
- Blockquotes
- Links
- FAQ sections
- Stable H2 and H3 IDs
- Dynamic table of contents

Use lightweight packages only when required, such as:

- `gray-matter`
- `react-markdown`
- `remark-gfm`
- `rehype-slug`
- `rehype-sanitize`

Rendered content must be server-rendered, crawlable, and sanitized.

## Page and Permalink Rules

Canonical domain:

`https://bet939-game.pk`

Homepage route:

`/`

For every internal page:

1. Use the exact URL from front matter when provided.
2. Otherwise derive the slug from the exact focus keyword.
3. Convert it to lowercase.
4. Replace spaces with hyphens.
5. Remove unnecessary punctuation.
6. Do not use a generic route when a focus keyword exists.
7. Do not use the Markdown filename unless it matches the focus keyword.

Example:

- Focus keyword: `Bet939 Game Download`
- Route: `/bet939-game-download/`

Use consistent trailing slashes and configure `trailingSlash: true` when compatible.

## Required Main Pages

Build every approved content page, including:

- Homepage
- Bet939 Game Download
- Bet939 Login
- Deposit guide
- Withdrawal guide
- iOS guide
- PC guide

Do not create a detailed Available Games article unless its own approved content file exists.

The homepage Available Games section must remain a concise overview. A separate detailed games article will be added later.

## Legal and Trust Pages

Create:

- About Us
- Contact Us
- Privacy Policy
- Terms and Conditions
- Disclaimer

Indexing:

- Homepage: `index, follow`
- Main content pages: `index, follow`
- About Us: `index, follow`
- Contact Us: `index, follow`
- Privacy Policy: `noindex, nofollow`
- Terms and Conditions: `noindex, nofollow`
- Disclaimer: `noindex, nofollow`

Exclude noindex legal pages from the XML sitemap.

Add `rel="nofollow"` to footer links for:

- Privacy Policy
- Terms and Conditions
- Disclaimer

The website must clearly state that `bet939-game.pk` is an independent informational guide and is not the official Bet939 operator.

Do not invent a contact email, phone number, physical address, company registration, author identity, or licence.

## Metadata and SEO

Use the exact meta title and meta description from each Markdown file.

Implement on every relevant page:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- Correct robots directives
- Semantic HTML
- One H1
- Correct heading hierarchy
- Breadcrumbs on internal pages
- Contextual internal links

Set:

- `metadataBase` to `https://bet939-game.pk`
- Document language to `en-PK`

Never add claims such as:

- Official website
- 100% safe
- Completely legal
- Guaranteed income
- Guaranteed winnings
- Guaranteed withdrawals
- Risk-free
- Licensed platform

## Keyword Ownership and Cannibalization

Homepage owns broad keywords such as:

- Bet939
- Bet939 Game App
- Bet 939 Game
- Bet939 App
- Bet939 Pakistan
- Bet939 Online

Download page owns its approved download keywords, including:

- Bet939 Game Download
- Bet939 Download
- Bet939 APK
- Bet939 Game APK
- Bet939 Latest Version

Login page owns:

- Bet939 Login
- Bet939 Game Login

Deposit, withdrawal, iOS, and PC pages are supporting guides.

Do not place:

- Full APK installation instructions on the homepage
- Full login troubleshooting on the homepage
- Full deposit troubleshooting on the homepage
- Full withdrawal troubleshooting on the homepage
- Android APK instructions on the iOS page
- Full PC instructions on the homepage
- A complete Available Games article on the homepage

## Internal Linking

Follow the internal-linking hints already written in the Markdown files.

Homepage should link to:

- Download page
- Login page
- Deposit guide
- Withdrawal guide
- iOS guide
- PC guide

Suitable anchors include:

- Bet939 game download
- Bet939 Game Download guide
- Bet939 Login guide
- Bet939 Game Login
- Bet939 deposit guide
- Bet939 withdrawal guide
- Bet939 for iPhone
- Bet939 for PC

Supporting pages should link back to the homepage using broad anchors such as:

- Bet939
- Bet939 Game App
- Bet 939 Game

Logical flow:

- Download → Login
- Login → Download
- Login → Deposit
- Deposit → Withdrawal
- Withdrawal → Deposit
- iOS → Login
- PC → Login
- Every supporting page → Homepage

Use Next.js `Link` for internal links.

Do not link every keyword occurrence or repeat exact-match anchors excessively.

## External Action Links

Use this exact URL for all direct Download, Login, and Register buttons:

`https://www.bet939.bet/?dl=2brwfp`

Every external action link must include:

- `target="_blank"`
- `rel="nofollow sponsored noopener noreferrer"`

Distinguish clearly between:

- External action button: Download Now, Login Now, Register
- Internal guide link: Read Download Guide, Read Login Guide

## Design System

Default mode: Light

Dark mode: Toggle available, but not default

Suggested light theme:

- Background: `#F7FAF6`
- Surface: `#FFFFFF`
- Primary text: `#16251A`
- Secondary text: `#526257`
- Main green: `#236B45`
- Light green: `#DDF2E3`
- Gold: `#C89524`
- Gold hover: `#A97713`
- Border: `#DDE8DF`

Suggested dark theme:

- Background: `#0F1712`
- Surface: `#17211A`
- Primary text: `#F2F6F3`
- Secondary text: `#B7C2BA`
- Main green: `#78C896`
- Light green surface: `#1D3225`
- Gold: `#E0B64F`
- Border: `#2B3B30`

Design requirements:

- Mobile-first
- Centered content
- Maximum width around 1100–1150px
- Comfortable paragraph width
- Clean cards
- Rounded corners
- Soft borders
- Moderate shadows
- Golden CTA buttons
- Light green highlights
- System fonts
- No visual clutter
- No excessive gradients
- No oversized mobile headings
- No horizontal scrolling

Theme toggle requirements:

- Light mode for new visitors
- Save selection in `localStorage`
- Avoid theme flash
- Keyboard accessible
- Correct ARIA label
- Good contrast in both themes

## Header and Navigation

Desktop navigation should include:

- Logo
- Home
- Download
- Login
- Deposit Guide
- Withdrawal Guide
- iOS
- PC
- About Us
- Contact Us
- Theme toggle
- External Download button
- External Login button

Mobile:

- Compact logo
- Small Download button
- Accessible menu button
- Drawer or dropdown navigation
- No overflow
- No oversized CTA buttons

## Logo, Favicon, and Site Icon

Main logo:

`/public/images/bet939-logo.webp`

Public path:

`/images/bet939-logo.webp`

Use the same logo artwork for:

- Header
- Footer
- Favicon
- Site icon
- Apple touch icon
- Manifest icons

Exact attributes:

- ALT: `Bet939 game`
- Title: `bet 939 game`

Do not redesign or replace the logo.

## Homepage Banner

Expected path:

`/images/bet939-homepage-banner.webp`

Exact attributes:

- ALT: `Bet939`
- Title: `Bet 939`

Use Next.js Image and preserve the original aspect ratio.

Do not stretch or crop important content.

## Download Page Banner

Expected path:

`/images/bet939-download-banner.webp`

Exact attributes:

- ALT: `Bet939 game download`
- Title: `bet939 download`

Use it near the beginning of the download page.

## Homepage Screenshots

Five real screenshots are uploaded in `/public/images/`.

Expected paths:

- `/images/bet939-app-screenshot-1.webp`
- `/images/bet939-app-screenshot-2.webp`
- `/images/bet939-app-screenshot-3.webp`
- `/images/bet939-app-screenshot-4.webp`
- `/images/bet939-app-screenshot-5.webp`

Confirm actual filenames before use.

Screenshot 1 ALT:

`bet939 games`

For screenshots 2–5, inspect the image and write a short accurate ALT. When uncertain, use:

- Bet939 app screenshot 2
- Bet939 app screenshot 3
- Bet939 app screenshot 4
- Bet939 app screenshot 5

Place the gallery after Features and before Available Games unless the approved content specifies another position.

Gallery requirements:

- Desktop: 3 images, then 2
- Tablet: 2 columns
- Mobile: 1 column or lightweight horizontal swipe
- Preserve original ratios
- No cropping
- No stretching
- Lazy-load below-the-fold images
- Rounded corners
- Soft border and shadow
- Accessible lightbox
- Escape closes
- Backdrop closes
- Previous and next controls
- Keyboard navigation
- Focus trapping
- Restore focus after closing
- Prevent background scrolling

## User Reviews

The approved homepage content contains the review section.

Render existing reviews as responsive cards.

Do not invent:

- Reviews
- Names
- Cities
- Dates
- Ratings
- Profile images
- Verified labels
- Overall score

Do not add `Review` or `AggregateRating` schema unless genuine reviews and a real calculated rating are present.

## App Details

Read app details from the uploaded content.

Do not invent or replace:

- Version
- File size
- Update date
- Android requirement
- Developer
- Language
- Payment methods
- File type

Render them in a responsive table or details card without mobile overflow.

## Table of Contents

Add a collapsible TOC to long pages.

Requirements:

- Generated from visible H2 and useful H3 headings
- Do not include H1
- Stable anchor IDs
- Accessible toggle
- Open on desktop
- Collapsed on mobile
- Respect reduced motion
- Avoid duplicate manual and generated TOCs

## FAQ Accordions

Render visible FAQs as accessible accordions without changing wording.

Requirements:

- Questions visible
- Answers remain in the DOM
- Keyboard accessible
- `aria-expanded`
- `aria-controls`
- Lightweight animation
- FAQ schema matches visible content exactly
- No duplicate FAQ section

## Breadcrumbs

Add visible breadcrumbs to all internal pages, not the homepage.

Use:

- Next.js Link
- Canonical URLs
- BreadcrumbList JSON-LD
- Mobile-friendly layout

## Structured Data

Use valid JSON-LD only where supported by visible content.

Possible schema:

- WebSite
- Organization or publisher
- SoftwareApplication
- WebPage or Article
- FAQPage
- BreadcrumbList

Rules:

- Do not invent ratings
- Do not invent review counts
- Do not add AggregateRating
- Do not add fake Review schema
- Do not invent app details
- Do not duplicate schema
- Use canonical URLs
- FAQ schema must exactly match visible FAQs

## Mobile Sticky Action Bar

Add a mobile-only bottom action bar with:

- Download
- Login

Both use the external URL.

Requirements:

- Compact
- Safe-area support
- Does not cover content
- Accessible
- Correct external link attributes
- Reposition or hide when chatbot is open

## Chatbot

Create a lightweight local guide chatbot without an API or external service.

Identity:

`bet939-game.pk website guide assistant`

It must not pretend to be official Bet939 support.

Preset topics:

- Download
- Login
- Deposit
- Withdrawal
- iPhone
- PC
- Available games

Rules:

- Use only approved site information
- Never promise winnings
- Never confirm payment status
- Never request passwords, OTPs, wallet PINs, or personal financial data
- No user data storage
- No external service
- No heavy library

## Back-to-Top Button

Add an accessible back-to-top button that:

- Appears after scrolling
- Supports keyboard use
- Respects reduced motion
- Does not overlap chatbot or sticky mobile buttons

## Footer

Include:

- Uploaded logo
- Independent-site description
- Main page links
- About Us
- Contact Us
- Privacy Policy
- Terms and Conditions
- Disclaimer
- Current year
- Responsible-use notice

Footer disclaimer must state:

- `bet939-game.pk` is an independent informational guide
- It is not the official Bet939 operator
- Real-money gaming involves financial risk
- Users should follow applicable local rules
- No winnings are guaranteed

Use `rel="nofollow"` for Privacy Policy, Terms and Conditions, and Disclaimer links.

## Sitemap, Robots, and Manifest

Create:

- `app/sitemap.ts`
- `app/robots.ts`
- `app/manifest.ts`

Sitemap includes:

- Homepage
- All indexable content pages
- About Us
- Contact Us

Sitemap excludes:

- Privacy Policy
- Terms and Conditions
- Disclaimer
- Draft or placeholder pages
- API routes

robots.txt must:

- Allow normal crawling
- Reference `https://bet939-game.pk/sitemap.xml`
- Not block CSS, JavaScript, or images
- Not block noindex legal pages from being crawled

Manifest:

- Name: Bet939 Game
- Short name: Bet939
- Start URL: `/`
- Display: standalone
- Use uploaded logo
- Match the light theme

## Performance

Prioritize Core Web Vitals.

Use:

- Next.js Image
- Real image dimensions
- Responsive `sizes`
- Lazy loading below the fold
- Server Components by default
- Minimal client JavaScript
- Minimal dependencies
- Semantic HTML

Avoid:

- Large libraries
- External fonts
- Third-party scripts
- Autoplay media
- Unnecessary animations
- Duplicate JavaScript
- Layout shift
- Horizontal overflow

The site must work at 320px width.

## Accessibility

Implement:

- Skip-to-content link
- Visible focus styles
- Semantic landmarks
- Correct heading hierarchy
- Accessible mobile menu
- Accessible theme toggle
- Accessible TOC
- Accessible FAQ accordions
- Accessible lightbox
- Accessible chatbot
- Accessible back-to-top button
- Descriptive ALT text
- Proper labels
- Strong contrast
- Reduced-motion support

## Validation Before Completion

Before finishing:

1. Run `npm run lint`.
2. Run TypeScript checking.
3. Run `npm run build`.
4. Fix all build errors.
5. Fix all TypeScript errors.
6. Fix production-relevant lint errors.
7. Confirm all routes load.
8. Confirm all Markdown files are mapped.
9. Confirm all images load.
10. Confirm one H1 per page.
11. Confirm unique metadata.
12. Confirm canonical URLs use `https://bet939-game.pk`.
13. Confirm direct action buttons use `https://www.bet939.bet/?dl=2brwfp`.
14. Confirm external CTA attributes.
15. Confirm logo is used for favicon and site icon.
16. Confirm light mode is default.
17. Confirm dark mode works.
18. Confirm legal indexing rules.
19. Confirm noindex pages are excluded from sitemap.
20. Confirm internal linking follows approved instructions.
21. Confirm there are no fake reviews, ratings, or AggregateRating schema.
22. Confirm no unsupported claims were added.
23. Confirm no horizontal overflow.
24. Confirm readiness for Vercel.

Never claim a successful build unless the production build was actually run successfully.

## Required Agent Workflow

Follow this order:

1. Inspect the repository.
2. Read `AGENTS.md`.
3. Read all Markdown content.
4. Inspect all images.
5. Build a page and asset map.
6. Safely initialize Next.js when missing.
7. Implement shared layout and content system.
8. Build routes.
9. Apply design and responsive behavior.
10. Add SEO, schema, sitemap, robots, and manifest.
11. Add interactive features.
12. Validate internal links and indexing.
13. Run lint, type checking, and production build.
14. Fix errors.
15. Provide a concise implementation report.

Do not stop after planning. Complete the implementation.
