export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.indexable ? [{ url: `${siteConfig.url}/` }] : [];
}
