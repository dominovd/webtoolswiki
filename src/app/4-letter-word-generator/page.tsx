import type { Metadata } from "next";
import FourLetterClient from "./FourLetterClient";

export const metadata: Metadata = {
  title: "4-Letter Word Generator – Random 4-Letter Words",
  description: "Free 4-letter word generator — get random 4-letter words instantly. Great for Wordle practice, Scrabble, word games, and creative writing.",
  keywords: ["4 letter word generator", "random 4 letter words", "four letter words", "word generator"],
  alternates: { canonical: "https://webtoolswiki.com/4-letter-word-generator" },
  openGraph: {
    title: "4-Letter Word Generator – Random 4-Letter Words",
    description: "Free 4-letter word generator — get random 4-letter words instantly. Great for Wordle practice, Scrabble, word games, and creative writing.",
    url: "https://webtoolswiki.com/4-letter-word-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "4-Letter Word Generator",
  url: "https://webtoolswiki.com/4-letter-word-generator",
  description: "Free online random 4-letter word generator for word games, Scrabble, and creative writing.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FourLetterClient />
    </>
  );
}
