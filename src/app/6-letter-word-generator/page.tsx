import type { Metadata } from "next";
import SixLetterClient from "./SixLetterClient";

export const metadata: Metadata = {
  title: "6-Letter Word Generator – Random 6-Letter Words",
  description: "Free 6-letter word generator — get random 6-letter words for Scrabble, word games, creative writing, and puzzles.",
  keywords: ["6 letter word generator", "random 6 letter words", "six letter words"],
  alternates: { canonical: "https://webtoolswiki.com/6-letter-word-generator" },
  openGraph: {
    title: "6-Letter Word Generator – Random 6-Letter Words",
    description: "Free 6-letter word generator — get random 6-letter words for Scrabble, word games, creative writing, and puzzles.",
    url: "https://webtoolswiki.com/6-letter-word-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "6-Letter Word Generator",
  url: "https://webtoolswiki.com/6-letter-word-generator",
  description: "Free online random 6-letter word generator for Scrabble, word games, and creative writing.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SixLetterClient />
    </>
  );
}
