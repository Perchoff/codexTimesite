import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrivacyControls } from "@/components/PrivacyControls";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: { default: siteConfig.title, template: "%s | Время маникюра" },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    ...(siteConfig.url
      ? {
          url: siteConfig.url,
          images: [
            {
              url: `${siteConfig.url}/images/og-cover.jpg`,
              width: 1200,
              height: 630,
              alt: "Время маникюра — твой идеальный момент",
            },
          ],
        }
      : {}),
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>
        <Header />
        {children}
        <Footer />
        <PrivacyControls />
      </body>
    </html>
  );
}
