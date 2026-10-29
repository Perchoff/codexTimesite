import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const publicDir = path.resolve("public");
const widths = [64, 128, 256, 384, 640, 828, 1080, 1600];
let count = 0;
for (const file of await fs.readdir(publicDir, { recursive: true })) {
  if (file.startsWith("responsive") || !/\.(webp|png|jpe?g)$/i.test(file))
    continue;
  for (const width of widths) {
    const target = path.join(
      publicDir,
      "responsive",
      file.replace(/\.(webp|png|jpe?g)$/i, `-${width}.webp`),
    );
    await fs.mkdir(path.dirname(target), { recursive: true });
    await sharp(path.join(publicDir, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    count++;
  }
}
console.log(`Generated ${count} responsive images`);
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } },
);
if (result.status !== 0) process.exit(result.status ?? 1);
await fs.writeFile(
  "out/_headers",
  "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n/responsive/*\n  Cache-Control: public, max-age=86400\n/*\n  X-Robots-Tag: noindex\n",
);
// This archive is a test preview and should not be indexed by search engines.
await fs.writeFile("out/robots.txt", "User-agent: *\nDisallow: /\n");
console.log(
  "Static test site ready in out/. Upload its contents to the domain root.",
);
