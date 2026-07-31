import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/lib/pages";
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
            <span>
              Bet939
              <small>Game Pakistan</small>
            </span>
          </Link>
          <p>
            bet939-game.pk is an independent informational guide for Bet939
            users. It is not the official Bet939 operator and does not process
            accounts or payments.
          </p>
        </div>

        <div className="footer-col">
          <h4>Guides</h4>
          <nav className="footer-links" aria-label="Footer guides">
            <Link href={PAGES.download.path}>Download</Link>
            <Link href={PAGES.login.path}>Login</Link>
            <Link href={PAGES.deposit.path}>Deposit Guide</Link>
            <Link href={PAGES.withdrawal.path}>Withdrawal Guide</Link>
            <Link href={PAGES.ios.path}>iOS Guide</Link>
            <Link href={PAGES.pc.path}>PC Guide</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <nav className="footer-links" aria-label="Footer company">
            <Link href={PAGES.home.path}>Home</Link>
            <Link href={PAGES.about.path}>About Us</Link>
            <Link href={PAGES.contact.path}>Contact Us</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <nav className="footer-links" aria-label="Footer legal">
            <Link href={PAGES.privacy.path} rel="nofollow">
              Privacy Policy
            </Link>
            <Link href={PAGES.terms.path} rel="nofollow">
              Terms and Conditions
            </Link>
            <Link href={PAGES.disclaimer.path} rel="nofollow">
              Disclaimer
            </Link>
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
