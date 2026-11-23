import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const publicDir = path.resolve("public");
const widths = [64, 128, 256, 320, 384, 480, 640, 828, 1080, 1600];
const production = process.argv.includes("--production");
let count = 0;
for (const file of await fs.readdir(publicDir, { recursive: true })) {
  const assetPath = file.split(path.sep).join("/");
  if (
    assetPath.startsWith("responsive/") ||
    assetPath.startsWith("images/works-full/") ||
    assetPath === "images/og-cover.jpg" ||
    !/\.(webp|png|jpe?g)$/i.test(file)
  )
    continue;
  for (const width of widths) {
    let quality = 75;
    if (assetPath.startsWith("images/team/")) {
      quality = width >= 1080 ? 90 : width >= 828 ? 87 : 83;
    } else if (assetPath.startsWith("images/works/")) {
      quality = width >= 1080 ? 88 : width >= 828 ? 84 : width >= 640 ? 79 : 75;
    }
    const target = path.join(
      publicDir,
      "responsive",
      file.replace(/\.(webp|png|jpe?g)$/i, `-${width}.webp`),
    );
    await fs.mkdir(path.dirname(target), { recursive: true });
    await sharp(path.join(publicDir, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(target);
    count++;
  }
}
console.log(`Generated ${count} responsive images`);
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      SITE_INDEXABLE: production ? "1" : "0",
    },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
await fs.writeFile(
  "out/_headers",
  [
    "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n",
    "/responsive/*\n  Cache-Control: public, max-age=86400\n",
    production ? "" : "/*\n  X-Robots-Tag: noindex\n",
  ].join(""),
);
console.log(
  production
    ? "Hosting build ready in out/."
    : "Preview build ready in out/ (noindex).",
);
