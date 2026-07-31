import type { MetadataRoute } from "next";
import { absoluteUrl, getSitemapPages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getSitemapPages().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.key === "home" ? "weekly" : "monthly",
    priority: page.key === "home" ? 1 : 0.8,
  }));
}
