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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these Wordle words?", acceptedAnswer: { "@type": "Answer", text: "Our list includes many common 5-letter words similar to those used in Wordle. Use them to practice guessing strategies or warm up before playing." } },
    { "@type": "Question", name: "How many 5-letter words are there in English?", acceptedAnswer: { "@type": "Answer", text: "There are thousands of 5-letter words in English. Our generator includes 200+ of the most common ones for everyday use." } },
    { "@type": "Question", name: "Can I use these for Scrabble?", acceptedAnswer: { "@type": "Answer", text: "Yes — 5-letter words score well in Scrabble. All words in our list are standard English words." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FiveLetterClient />
    </>
  );
}
