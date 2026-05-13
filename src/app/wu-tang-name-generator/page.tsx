import type { Metadata } from "next";
import WuTangClient from "./WuTangClient";

export const metadata: Metadata = {
  title: "Wu-Tang Name Generator – Get Your Wu-Tang Clan Name",
  description:
    "Free Wu-Tang name generator — enter your real name and get your official Wu-Tang Clan name. Based on the Wu-Tang Name Generator formula.",
  keywords: ["wu tang name generator", "wu tang clan name", "wu-tang name", "rap name generator"],
  openGraph: {
    title: "Wu-Tang Name Generator – Get Your Wu-Tang Clan Name",
    description: "Enter your name and get your official Wu-Tang Clan name. Free, instant.",
    url: "https://webtoolswiki.com/wu-tang-name-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/wu-tang-name-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Wu-Tang Name Generator",
  url: "https://webtoolswiki.com/wu-tang-name-generator",
  description: "Free Wu-Tang name generator — enter your real name and get your official Wu-Tang Clan name.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function WuTangPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WuTangClient />
    </>
  );
}
