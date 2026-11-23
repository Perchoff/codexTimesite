import type { NextConfig } from "next";
import { siteConfig } from "./src/data/siteConfig";

if (process.env.SITE_INDEXABLE === "1" && !siteConfig.url) {
  throw new Error(
    "Set NEXT_PUBLIC_SITE_URL to the public HTTPS URL before building for hosting.",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  ...(process.env.STATIC_EXPORT === "1"
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/static-image-loader.ts",
          deviceSizes: [320, 480, 640, 828, 1080, 1600],
          imageSizes: [64, 128, 256, 384],
        },
      }
    : {}),
  reactStrictMode: true,
};
export default nextConfig;
