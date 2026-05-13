import type { Metadata } from "next";
import DisneyCharacterClient from "./DisneyCharacterClient";

export const metadata: Metadata = {
  title: "Disney Character Generator – Random Disney Characters",
  description:
    "Free Disney character generator — discover random classic Disney characters for trivia, games, and fun. Which Disney character are you?",
  keywords: ["disney character generator", "random disney character", "disney characters", "which disney character are you"],
  openGraph: {
    title: "Disney Character Generator – Random Disney Characters",
    description: "Discover random Disney characters for trivia, games, and fun. Which Disney character are you?",
    url: "https://webtoolswiki.com/disney-character-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/disney-character-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Disney Character Generator",
  url: "https://webtoolswiki.com/disney-character-generator",
  description: "Free Disney character generator — discover random classic Disney characters for trivia, games, and fun.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function DisneyCharacterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DisneyCharacterClient />
    </>
  );
}
