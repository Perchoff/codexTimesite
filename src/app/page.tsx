import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Advantages } from "@/components/Advantages";
import { InteriorGallery } from "@/components/InteriorGallery";
import { DiscountCardSection } from "@/components/DiscountCardSection";
import { Contacts } from "@/components/Contacts";
import { contacts } from "@/data/contacts";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  alternates: siteConfig.url ? { canonical: siteConfig.url } : undefined,
};
export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: contacts.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contacts.street}, ${contacts.details}`,
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    hasMap: contacts.mapUrl,
    ...(siteConfig.url
      ? { url: siteConfig.url, image: `${siteConfig.url}/images/og-cover.jpg` }
      : {}),
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Services />
      <Advantages />
      <InteriorGallery />
      <DiscountCardSection />
      <Contacts />
    </main>
  );
}
