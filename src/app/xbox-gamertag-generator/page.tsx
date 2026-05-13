import type { Metadata } from "next";
import XboxClient from "./XboxClient";

export const metadata: Metadata = {
  title: "Xbox Gamertag Generator – Cool Random Gamertag Ideas",
  description:
    "Generate cool, unique Xbox gamertag ideas instantly. Works for Xbox, PSN, Steam, and Discord. Choose a style and get 5–30 random gamertags in one click. Free.",
  keywords: ["xbox gamertag generator", "gamertag generator", "random gamertag", "cool gamertag ideas", "psn name generator"],
  openGraph: {
    title: "Xbox Gamertag Generator – Cool Random Gamertag Ideas",
    description: "Generate cool gamertag ideas for Xbox, PSN, Steam, and Discord. Free, instant.",
    url: "https://webtoolswiki.com/xbox-gamertag-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/xbox-gamertag-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Xbox Gamertag Generator",
  url: "https://webtoolswiki.com/xbox-gamertag-generator",
  description: "Free random gamertag generator for Xbox, PSN, Steam, and Discord.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Will these gamertags be available on Xbox?", acceptedAnswer: { "@type": "Answer", text: "Availability isn't guaranteed — popular words may already be taken. Check availability in Xbox settings after generating." } },
    { "@type": "Question", name: "Can I use these on PlayStation or Steam?", acceptedAnswer: { "@type": "Answer", text: "Yes — generated names work as usernames on any gaming platform, not just Xbox." } },
    { "@type": "Question", name: "How many characters can an Xbox gamertag be?", acceptedAnswer: { "@type": "Answer", text: "Xbox gamertags can be up to 12 characters. Our generator respects this limit for Classic and Short styles." } },
  ],
};

export default function XboxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <XboxClient />
    </>
  );
}
