import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildStaticMetadata } from "@/lib/metadata";
import { PAGES } from "@/lib/pages";
import { webPageSchema } from "@/lib/schema";

const title = "About Us | Bet939 Game Guide";
const description =
  "Learn about bet939-game.pk, an independent informational guide for Bet939 users in Pakistan.";

export const metadata = buildStaticMetadata({
  key: "about",
  title,
  description,
});

export default function AboutPage() {
  const page = PAGES.about;
  return (
    <>
      <JsonLd
        data={webPageSchema({
          key: "about",
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
            <h1>About Us</h1>
            <p>
              bet939-game.pk is an independent informational website created to
              help users understand Bet939-related topics such as download,
              login, deposits, withdrawals, iPhone access, and PC use.
            </p>
            <p>
              This website is not the official Bet939 operator. It does not own,
              control, or process Bet939 accounts, wallets, bonuses, or payments.
              Any download, login, register, or gameplay actions happen on
              external platforms that are outside this website.
            </p>
            <p>
              Our goal is to present clear guides based on the approved content
              published on this site, with practical navigation, safety reminders,
              and responsible-use notices for readers in Pakistan.
            </p>
            <p>
              Real-money gaming involves financial risk. No winnings are
              guaranteed, and users should follow applicable local rules before
              using any gaming platform.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
