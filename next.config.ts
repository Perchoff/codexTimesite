import type { NextConfig } from "next";

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
          deviceSizes: [640, 828, 1080, 1600],
          imageSizes: [64, 128, 256, 384],
        },
      }
    : {}),
  reactStrictMode: true,
};
export default nextConfig;
