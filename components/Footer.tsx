import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_LEGAL_ORDER,
  FOOTER_MAIN_ORDER,
  PAGES,
} from "@/lib/pages";
import { LOGO_ALT, LOGO_PATH, LOGO_TITLE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Bet939 Game home">
            <Image
              src={LOGO_PATH}
              alt={LOGO_ALT}
              title={LOGO_TITLE}
              width={44}
              height={44}
            />
            <span>Bet939</span>
          </Link>
          <p>
            bet939-game.pk is an independent informational guide for Bet939
            users. It is not the official Bet939 operator and does not process
            accounts or payments.
          </p>
        </div>

        <div>
          <h2 className="sr-only">Main links</h2>
          <nav className="footer-links" aria-label="Footer main">
            {FOOTER_MAIN_ORDER.map((key) => (
              <Link key={key} href={PAGES[key].path}>
                {PAGES[key].navLabel}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="sr-only">Legal links</h2>
          <nav className="footer-links" aria-label="Footer legal">
            {FOOTER_LEGAL_ORDER.map((key) => (
              <Link
                key={key}
                href={PAGES[key].path}
                rel={PAGES[key].footerNofollow ? "nofollow" : undefined}
              >
                {PAGES[key].navLabel}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="container footer-legal">
        <p>
          © {year} bet939-game.pk. This website is an independent informational
          guide and is not the official Bet939 operator. Real-money gaming
          involves financial risk. Users should follow applicable local rules.
          No winnings are guaranteed.
        </p>
        <p>
          Play responsibly. Never use money needed for essential expenses, and
          never share passwords, OTPs, or wallet PINs.
        </p>
      </div>
    </footer>
  );
}
