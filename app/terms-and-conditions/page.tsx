import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildStaticMetadata } from "@/lib/metadata";
import { PAGES } from "@/lib/pages";
import { webPageSchema } from "@/lib/schema";

const title = "Terms and Conditions | Bet939 Game Guide";
const description =
  "Terms and Conditions for using bet939-game.pk as an independent informational guide.";

export const metadata = buildStaticMetadata({
  key: "terms",
  title,
  description,
});

export default function TermsPage() {
  const page = PAGES.terms;
  return (
    <>
      <JsonLd
        data={webPageSchema({
          key: "terms",
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
            <h1>Terms and Conditions</h1>
            <p>
              By using bet939-game.pk, you agree to these Terms and Conditions.
              This website provides independent informational guides only. It is
              not the official Bet939 operator.
            </p>
            <h2>Informational purpose</h2>
            <p>
              Content on this website is for general guidance. App availability,
              payment options, bonuses, limits, and device support can change.
              Always verify important details inside the platform you choose to
              use.
            </p>
            <h2>No guarantees</h2>
            <p>
              This website does not guarantee winnings, income, withdrawals,
              bonuses, or uninterrupted access to any external platform.
              Real-money gaming involves financial risk.
            </p>
            <h2>External platforms</h2>
            <p>
              Links labeled Download Now, Login Now, or Register may open an
              external destination. Your use of that destination is subject to
              its own terms and rules. bet939-game.pk does not process accounts or
              payments for Bet939.
            </p>
            <h2>Responsible use</h2>
            <p>
              Users are responsible for following applicable local laws and for
              protecting their own account credentials. Never share passwords,
              OTPs, or wallet PINs.
            </p>
            <h2>Changes</h2>
            <p>
              These terms may be updated as the website develops. Continued use
              of the site after updates means you accept the revised terms.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
