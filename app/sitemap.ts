import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { siteUrl } from "@/data/station";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "monthly"],
    ["/programmes", 0.9, "monthly"],
    ["/station", 0.9, "monthly"],
    ["/equipements", 0.8, "monthly"],
    ["/comment-ca-marche", 0.8, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/conseils", 0.7, "weekly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified: now, changeFrequency, priority })),
    ...articles.map((a) => ({
      url: `${siteUrl}/conseils/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
