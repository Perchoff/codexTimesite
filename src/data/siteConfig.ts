function publicSiteUrl(value: string | undefined, basePath: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const pathname = url.pathname.replace(/\/$/, "");
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      (pathname && pathname !== basePath)
    )
      return undefined;
    return `${url.origin}${basePath}`;
  } catch {
    return undefined;
  }
}

const url = publicSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NEXT_PUBLIC_BASE_PATH || "",
);

function mapEmbedUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["yandex.ru", "yandex.com"].includes(url.hostname) &&
      url.pathname.startsWith("/map-widget/")
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export const siteConfig = {
  name: "Время маникюра",
  title: "Время маникюра — маникюр, педикюр и наращивание на Таганской",
  description:
    "Студия «Время маникюра» на Таганской в Москве. Маникюр, педикюр, укрепление и наращивание ногтей. Посмотрите работы мастеров и запишитесь онлайн.",
  url,
  indexable: !!url && process.env.SITE_INDEXABLE === "1",
  // Organization ID and coordinates verified from the customer's Yandex share link.
  mapEmbedUrl:
    mapEmbedUrl(process.env.NEXT_PUBLIC_YANDEX_MAP_EMBED_URL) ??
    "https://yandex.ru/map-widget/v1/?ll=37.657299%2C55.741408&z=17&mode=search&oid=216353023162&ol=biz",
};
