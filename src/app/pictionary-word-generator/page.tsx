import type { Metadata } from "next";
import PictionaryClient from "./PictionaryClient";

export const metadata: Metadata = {
  title: "Pictionary Word Generator – Random Words for Drawing Games",
  description: "Free Pictionary word generator — get random easy, medium, or hard words for Pictionary, drawing games, and charades.",
  keywords: ["pictionary word generator", "random pictionary words", "drawing game words", "pictionary ideas"],
  alternates: { canonical: "https://webtoolswiki.com/pictionary-word-generator" },
  openGraph: {
    title: "Pictionary Word Generator – Random Words for Drawing Games",
    description: "Free Pictionary word generator — get random easy, medium, or hard words for Pictionary, drawing games, and charades.",
    url: "https://webtoolswiki.com/pictionary-word-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pictionary Word Generator",
  url: "https://webtoolswiki.com/pictionary-word-generator",
  description: "Free online Pictionary word generator with easy, medium, and hard difficulty categories.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PictionaryClient />
    </>
  );
}
