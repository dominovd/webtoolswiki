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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these common English words?", acceptedAnswer: { "@type": "Answer", text: "Yes — our list focuses on frequently used 6-letter English words suitable for word games, writing, and puzzles." } },
    { "@type": "Question", name: "Can I use 6-letter words in Scrabble?", acceptedAnswer: { "@type": "Answer", text: "Yes, and they can score very well — especially if you can use all 7 tiles for a bingo." } },
    { "@type": "Question", name: "How many words can I generate?", acceptedAnswer: { "@type": "Answer", text: "Generate 1, 5, 10, 20, or 50 words at a time from our curated list of 250+ six-letter words." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SixLetterClient />
    </>
  );
}
