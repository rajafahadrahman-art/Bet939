import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildStaticMetadata } from "@/lib/metadata";
import { PAGES } from "@/lib/pages";
import { webPageSchema } from "@/lib/schema";

const title = "Disclaimer | Bet939 Game Guide";
const description =
  "Disclaimer for bet939-game.pk explaining independence, risk, and limits of this informational guide.";

export const metadata = buildStaticMetadata({
  key: "disclaimer",
  title,
  description,
});

export default function DisclaimerPage() {
  const page = PAGES.disclaimer;
  return (
    <>
      <JsonLd
        data={webPageSchema({
          key: "disclaimer",
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
            <h1>Disclaimer</h1>
            <p>
              bet939-game.pk is an independent informational guide. It is not the
              official Bet939 operator and is not affiliated with Bet939 as an
              owner, manager, or payment processor.
            </p>
            <p>
              Information on this website may become outdated when apps, payment
              methods, bonuses, or device requirements change. Readers should
              confirm current details before downloading, registering, depositing,
              or withdrawing.
            </p>
            <p>
              Real-money gaming involves financial risk. Users can lose money.
              No strategy, bonus, or guide on this website guarantees profit or
              successful withdrawals.
            </p>
            <p>
              Users are responsible for checking whether online gaming activity
              is allowed under the rules that apply to them. This website does
              not provide legal, financial, or gambling advice.
            </p>
            <p>
              External Download, Login, and Register destinations are outside the
              control of bet939-game.pk. Use those destinations at your own risk
              and never share passwords, OTPs, or wallet PINs with anyone.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
