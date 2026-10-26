import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
export default function sitemap(): MetadataRoute.Sitemap {
  // Не публикуем выдуманный домен. Задайте NEXT_PUBLIC_SITE_URL перед сборкой.
  return siteConfig.url
    ? [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }]
    : [];
}
