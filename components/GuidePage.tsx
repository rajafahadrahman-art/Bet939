import ArticleContent from "@/components/ArticleContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getContent } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";
import { PAGES, type ContentPageKey } from "@/lib/pages";
import { articleSchema, faqSchema, webPageSchema } from "@/lib/schema";

export function guideMetadata(key: ContentPageKey) {
  return buildContentMetadata(key);
}

export default function GuidePage({ pageKey }: { pageKey: ContentPageKey }) {
  const content = getContent(pageKey);
  const page = PAGES[pageKey];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            key: pageKey,
            title: content.frontMatter.meta_title.trim(),
            description: content.frontMatter.meta_description.trim(),
          }),
          articleSchema(content),
          faqSchema(content.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.breadcrumbLabel, path: page.path },
        ]}
      />
      <ArticleContent content={content} />
    </>
  );
}
