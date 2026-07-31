import type { Metadata, Viewport } from "next";
import BackToTop from "@/components/BackToTop";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import ThemeScript from "@/components/ThemeScript";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
  description:
    "Independent informational guide for Bet939 Game App users in Pakistan.",
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7FAF6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <Header />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </div>
        <MobileStickyCTA />
        <Chatbot />
        <BackToTop />
      </body>
    </html>
  );
}
