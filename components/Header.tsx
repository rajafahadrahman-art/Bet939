"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { PAGES } from "@/lib/pages";
import {
  EXTERNAL_ACTION_URL,
  EXTERNAL_LINK_REL,
  LOGO_ALT,
  LOGO_PATH,
  LOGO_TITLE,
} from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", path: PAGES.home.path },
  { label: "Download", path: PAGES.download.path },
  { label: "Login", path: PAGES.login.path },
  { label: "Deposit", path: PAGES.deposit.path },
  { label: "Withdrawal", path: PAGES.withdrawal.path },
  { label: "iOS", path: PAGES.ios.path },
  { label: "PC", path: PAGES.pc.path },
  { label: "About", path: PAGES.about.path },
  { label: "Contact", path: PAGES.contact.path },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Bet939 Game home">
          <Image
            src={LOGO_PATH}
            alt={LOGO_ALT}
            title={LOGO_TITLE}
            width={40}
            height={40}
            priority
          />
          <span>
            Bet939
            <small>Game Pakistan</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isCurrent(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <span className="header-cta-desktop">
            <a
              href={EXTERNAL_ACTION_URL}
              target="_blank"
              rel={EXTERNAL_LINK_REL}
              className="btn btn-gold btn-sm"
              aria-label="Download Bet939 Game"
            >
              Download
            </a>
          </span>
          <span className="header-cta-mobile">
            <a
              href={EXTERNAL_ACTION_URL}
              target="_blank"
              rel={EXTERNAL_LINK_REL}
              className="btn btn-gold btn-sm"
              aria-label="Download Bet939 Game"
            >
              Download
            </a>
          </span>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <div
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={() => setOpen(false)}
        >
          <div
            id={panelId}
            className="mobile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-top">
              <strong>Menu</strong>
              <button
                type="button"
                className="menu-toggle"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
            <nav aria-label="Mobile primary">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isCurrent(item.path) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="cta-row">
              <Link
                href={PAGES.download.path}
                className="btn btn-gold"
                onClick={() => setOpen(false)}
              >
                Download Guide
              </Link>
              <Link
                href={PAGES.login.path}
                className="btn btn-outline"
                onClick={() => setOpen(false)}
              >
                Login Guide
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
