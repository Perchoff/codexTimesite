export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.indexable
      ? { sitemap: `${siteConfig.url}/sitemap.xml` }
      : {}),
  };
}
