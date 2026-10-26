import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
await Promise.all(
  ["public/logo", "public/images"].map((path) =>
    mkdir(resolve(root, path), { recursive: true }),
  ),
);
// Preserve the customer's raster artwork; crop messaging UI and white corners only.
const mark = await sharp(resolve(root, "Content/photo_2026-10-24_13-42-31.jpg"))
  .extract({ left: 39, top: 32, width: 912, height: 912 })
  .resize(912, 912)
  .composite([
    {
      input: Buffer.from(
        '<svg width="912" height="912"><circle cx="456" cy="456" r="450" fill="white"/></svg>',
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();
await sharp(mark)
  .webp({ quality: 90 })
  .toFile(resolve(root, "public/logo/brand-mark.webp"));
await sharp(mark)
  .resize(64, 64)
  .png()
  .toFile(resolve(root, "src/app/icon.png"));
await sharp(mark)
  .resize(180, 180)
  .png()
  .toFile(resolve(root, "src/app/apple-icon.png"));
await sharp(resolve(root, "Content/photo_2026-10-24_13-42-31 (2).jpg"))
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(resolve(root, "public/images/brand-concept.webp"));
const background = Buffer.from(
  '<svg width="1200" height="630"><rect width="1200" height="630" fill="#f7f3ed"/><rect x="730" y="55" width="410" height="520" rx="205" fill="#e6d8c5"/><path d="M65 535H680" stroke="#c7a77d"/><text x="65" y="120" fill="#8b633f" font-family="sans-serif" font-size="15" letter-spacing="4">СТУДИЯ НА ТАГАНСКОЙ</text><text x="65" y="270" fill="#332a24" font-family="Georgia,serif" font-size="90">Время</text><text x="65" y="365" fill="#332a24" font-family="Georgia,serif" font-size="90">маникюра</text><text x="65" y="445" fill="#8b633f" font-family="Georgia,serif" font-size="33" font-style="italic">Твой идеальный момент</text><text x="65" y="574" fill="#75685d" font-family="sans-serif" font-size="18">Москва · Таганская улица, 1/2, стр. 2</text></svg>',
);
await sharp(background)
  .composite([
    {
      input: await sharp(mark).resize(350, 350).toBuffer(),
      left: 760,
      top: 145,
    },
  ])
  .jpeg({ quality: 90 })
  .toFile(resolve(root, "public/images/og-cover.jpg"));
console.log("Brand artwork, favicon and social image prepared.");
