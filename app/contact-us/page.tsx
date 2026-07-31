import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildStaticMetadata } from "@/lib/metadata";
import { PAGES } from "@/lib/pages";
import { webPageSchema } from "@/lib/schema";

const title = "Contact Us | Bet939 Game Guide";
const description =
  "Contact information for bet939-game.pk will be added by the website owner. This page explains how visitors can reach the independent guide site.";

export const metadata = buildStaticMetadata({
  key: "contact",
  title,
  description,
});

export default function ContactPage() {
  const page = PAGES.contact;
  return (
    <>
      <JsonLd
        data={webPageSchema({
          key: "contact",
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
            <h1>Contact Us</h1>
            <p>
              bet939-game.pk is an independent informational guide and is not the
              official Bet939 operator. This website does not manage Bet939
              accounts, deposits, withdrawals, or customer support for the gaming
              platform.
            </p>
            <p>
              A public contact method for this website has not been published
              yet. When the website owner adds contact details, they will appear
              on this page.
            </p>
            <p>
              For account, payment, OTP, or app-support issues related to Bet939
              itself, use the support options shown inside the Bet939 app or on
              the official platform channels. Never share your password, OTP, or
              wallet PIN with anyone claiming to be support.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
