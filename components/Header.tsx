"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { getNavPages } from "@/lib/pages";
import { LOGO_ALT, LOGO_PATH, LOGO_TITLE } from "@/lib/site";
import ExternalActionButton from "./ExternalActionButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const navPages = getNavPages();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <span>Bet939</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {navPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              aria-current={isCurrent(page.path) ? "page" : undefined}
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <span className="header-cta-desktop">
            <ExternalActionButton
              label="Download"
              ariaLabel="Download Bet939 externally"
              size="sm"
            />
            <ExternalActionButton
              label="Login"
              ariaLabel="Login to Bet939 externally"
              size="sm"
              variant="outline"
            />
          </span>
          <span className="header-cta-mobile">
            <ExternalActionButton
              label="Download"
              ariaLabel="Download Bet939 externally"
              size="sm"
            />
          </span>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
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
                ✕
              </button>
            </div>
            <nav aria-label="Mobile primary">
              {navPages.map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  aria-current={isCurrent(page.path) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {page.navLabel}
                </Link>
              ))}
            </nav>
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
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
