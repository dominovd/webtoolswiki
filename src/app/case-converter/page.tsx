import type { Metadata } from "next";
import CaseConverterClient from "./CaseConverterClient";

export const metadata: Metadata = {
  title: "Case Converter – Convert Text to Any Case",
  description: "Free case converter — convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more instantly.",
  keywords: ["case converter", "text case converter", "uppercase converter", "lowercase converter", "title case converter", "camelcase converter"],
  alternates: { canonical: "https://webtoolswiki.com/case-converter" },
  openGraph: {
    title: "Case Converter – Convert Text to Any Case",
    description: "Free case converter — convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more instantly.",
    url: "https://webtoolswiki.com/case-converter",
  },
};

const faqItems = [
  { q: "What is Title Case?", a: "Title Case capitalises the first letter of every word. It's used for titles, headings, and proper nouns." },
  { q: "What is camelCase?", a: "camelCase joins words together with no spaces, capitalising the first letter of each word except the first. It's commonly used in programming variable names." },
  { q: "What is snake_case?", a: "snake_case uses all lowercase letters with underscores between words. It's widely used in Python variable names, database columns, and file names." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: "https://webtoolswiki.com/case-converter",
  description: "Free case converter — convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more instantly.",
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
      <CaseConverterClient faqItems={faqItems} />
    </>
  );
}
