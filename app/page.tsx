import ArticleContent from "@/components/ArticleContent";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import {
  faqSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/schema";

export function generateMetadata() {
  return buildContentMetadata("home");
}

export default function HomePage() {
  const content = getContent("home");

  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          organizationSchema(),
          softwareApplicationSchema(content),
          faqSchema(content.faqs),
        ]}
      />
      <ArticleContent content={content} />
    </>
  );
}
