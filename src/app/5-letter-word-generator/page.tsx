import type { Metadata } from "next";
import FiveLetterClient from "./FiveLetterClient";

export const metadata: Metadata = {
  title: "5-Letter Word Generator – Random 5-Letter Words",
  description: "Free 5-letter word generator — get random 5-letter words instantly. Perfect for Wordle practice, word puzzles, Scrabble, and brainstorming.",
  keywords: ["5 letter word generator", "random 5 letter words", "five letter words", "wordle words"],
  alternates: { canonical: "https://webtoolswiki.com/5-letter-word-generator" },
  openGraph: {
    title: "5-Letter Word Generator – Random 5-Letter Words",
    description: "Free 5-letter word generator — get random 5-letter words instantly. Perfect for Wordle practice, word puzzles, Scrabble, and brainstorming.",
    url: "https://webtoolswiki.com/5-letter-word-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "5-Letter Word Generator",
  url: "https://webtoolswiki.com/5-letter-word-generator",
  description: "Free online random 5-letter word generator — perfect for Wordle practice, Scrabble, and word games.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FiveLetterClient />
    </>
  );
}
