import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildStaticMetadata } from "@/lib/metadata";
import { PAGES } from "@/lib/pages";
import { webPageSchema } from "@/lib/schema";

const title = "Privacy Policy | Bet939 Game Guide";
const description =
  "Privacy Policy for bet939-game.pk, an independent informational guide website.";

export const metadata = buildStaticMetadata({
  key: "privacy",
  title,
  description,
});

export default function PrivacyPage() {
  const page = PAGES.privacy;
  return (
    <>
      <JsonLd
        data={webPageSchema({
          key: "privacy",
          title,
          description,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.breadcrumbLabel, path: page.path },
        ]}
      />
      <div className="legal-page">
        <div className="container">
          <article className="card">
            <h1>Privacy Policy</h1>
            <p>
              This Privacy Policy explains how bet939-game.pk handles information
              as an independent informational website. This site is not the
              official Bet939 operator and does not process Bet939 accounts or
              payments.
            </p>
            <h2>Information we collect</h2>
            <p>
              This website is designed as a static informational guide. It does
              not require user accounts and does not intentionally collect names,
              phone numbers, wallet details, passwords, or OTPs through forms on
              this site.
            </p>
            <h2>Local preferences</h2>
            <p>
              The theme toggle may store a light or dark preference in your
              browser&apos;s localStorage so your selection can be remembered on
              the same device. This preference stays in your browser and is not
              sent to an external chatbot or AI service.
            </p>
            <h2>External links</h2>
            <p>
              Download, Login, and Register buttons may send you to an external
              Bet939 destination. Those external sites have their own privacy
              practices. This website does not control how external platforms
              collect or process your data.
            </p>
            <h2>Hosting and logs</h2>
            <p>
              Like most websites, hosting and delivery providers may process
              standard technical request data such as IP address, browser type,
              and requested pages for security, performance, and reliability.
            </p>
            <h2>Contact</h2>
            <p>
              A public contact method for privacy questions about this website
              will be published on the Contact Us page when provided by the
              website owner.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
