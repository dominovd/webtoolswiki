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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real English words?", acceptedAnswer: { "@type": "Answer", text: "Yes — all words in our list are common English words. They're great for word games, Scrabble practice, and creative writing." } },
    { "@type": "Question", name: "Can I use these for Wordle?", acceptedAnswer: { "@type": "Answer", text: "Wordle uses 5-letter words, but our 4-letter word generator is great for similar word games like Wordle variants and other puzzles." } },
    { "@type": "Question", name: "How many words can I generate?", acceptedAnswer: { "@type": "Answer", text: "You can generate 1, 5, 10, 20, or 50 words at a time from our list of 160+ common 4-letter words." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FourLetterClient />
    </>
  );
}
