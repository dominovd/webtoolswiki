import type { Metadata } from "next";
import TextReverserClient from "./TextReverserClient";

export const metadata: Metadata = {
  title: "Text Reverser – Reverse Any Text Online",
  description: "Free text reverser — reverse text by characters, by words, or flip each word individually. Instant results, copy with one click.",
  keywords: ["text reverser", "reverse text", "backwards text", "reverse words", "mirror text"],
  alternates: { canonical: "https://webtoolswiki.com/text-reverser" },
  openGraph: {
    title: "Text Reverser – Reverse Any Text Online",
    description: "Free text reverser — reverse text by characters, by words, or flip each word individually. Instant results, copy with one click.",
    url: "https://webtoolswiki.com/text-reverser",
  },
};

const faqItems = [
  { q: "What is reversed text used for?", a: "Reversed text is used for fun social media posts, puzzles, creative writing, mirror effects, and as a simple cipher." },
  { q: "Does reversing work with emojis and special characters?", a: "Basic text reversal works with standard characters. Emojis and some Unicode characters may display unexpectedly when reversed due to how they're encoded." },
  { q: "Can I reverse a whole paragraph?", a: "Yes — paste any amount of text and all three reversal modes work on the full input instantly." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Reverser",
  url: "https://webtoolswiki.com/text-reverser",
  description: "Free text reverser — reverse text by characters, by words, or flip each word individually.",
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
      <TextReverserClient faqItems={faqItems} />
    </>
  );
}
