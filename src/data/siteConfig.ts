function productionOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

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
    "Маникюр, педикюр, укрепление и наращивание ногтей в студии «Время маникюра». Москва, Таганская улица, 1/2, стр. 2. Запись по телефону.",
  url: productionOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  // Organization ID and coordinates verified from the customer's Yandex share link.
  mapEmbedUrl:
    mapEmbedUrl(process.env.NEXT_PUBLIC_YANDEX_MAP_EMBED_URL) ??
    "https://yandex.ru/map-widget/v1/?ll=37.657299%2C55.741408&z=17&mode=search&oid=216353023162&ol=biz",
};
