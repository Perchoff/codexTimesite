const city = "Москва";
const street = "Таганская ул., 1/2с2";
const details = "этаж 2, кабинет 4";

export const contacts = {
  phone: "+7 (926) 994-25-52",
  phoneHref: "tel:+79269942552",
  phoneRaw: "+79269942552",
  city,
  street,
  details,
  address: `${city}, ${street}, ${details}`,
  mapUrl:
    "https://yandex.ru/maps/213/moscow/house/taganskaya_ulitsa_1_2s2/Z04YcAJnSkQDQFtvfXt1cHhgYA==/",
  reviewsUrl:
    "https://yandex.ru/maps/org/vremya_manikyura/216353023162/reviews/",
  reviewsWidgetUrl:
    "https://yandex.ru/maps-reviews-widget/216353023162?comments",
  socials: [
    { label: "Telegram", href: "https://t.me/+79269942552" },
    { label: "WhatsApp", href: "https://wa.me/79269942552" },
  ] as const,
  bookingUrl: "#contacts",
  onlineBookingUrl: "https://b2667243.yclients.ru/",
};
