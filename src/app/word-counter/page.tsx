import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter – Count Words, Characters & More",
  description: "Free word counter tool — count words, characters, sentences, paragraphs and estimate reading time instantly. Paste any text to analyse it.",
  keywords: ["word counter", "character counter", "word count tool", "text analyzer"],
  alternates: { canonical: "https://webtoolswiki.com/word-counter" },
  openGraph: {
    title: "Word Counter – Count Words, Characters & More",
    description: "Free word counter tool — count words, characters, sentences, paragraphs and estimate reading time instantly. Paste any text to analyse it.",
    url: "https://webtoolswiki.com/word-counter",
  },
};

const faqItems = [
  { q: "How does the word counter work?", a: "The word counter splits your text by spaces and line breaks to count words, then measures the total characters, sentences (by punctuation), and paragraphs (by blank lines)." },
  { q: "How is reading time calculated?", a: "Reading time is estimated at 200 words per minute, which is the average adult reading speed for informational content." },
  { q: "Does my text get stored anywhere?", a: "No — all analysis happens instantly in your browser. Your text is never sent to any server." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: "https://webtoolswiki.com/word-counter",
  description: "Free word counter tool — count words, characters, sentences, paragraphs and estimate reading time instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <WordCounterClient faqItems={faqItems} />
    </>
  );
}
