import type { Metadata } from "next";
import LoremIpsumClient from "./LoremIpsumClient";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator – Placeholder Text Generator",
  description: "Free Lorem Ipsum generator — generate placeholder text in seconds. Choose paragraphs, sentences, or words. Classic Latin or random filler text.",
  keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator", "lorem ipsum"],
  alternates: { canonical: "https://webtoolswiki.com/lorem-ipsum-generator" },
  openGraph: {
    title: "Lorem Ipsum Generator – Placeholder Text Generator",
    description: "Free Lorem Ipsum generator — generate placeholder text in seconds. Choose paragraphs, sentences, or words.",
    url: "https://webtoolswiki.com/lorem-ipsum-generator",
  },
};

const faqItems = [
  { q: "What is Lorem Ipsum?", a: "Lorem Ipsum is placeholder text used in graphic design, publishing, and web development to demonstrate layout without meaningful content. It has been used since the 1500s." },
  { q: "Is Lorem Ipsum real Latin?", a: "It is derived from a 45 BC philosophical work by Cicero, though the text has been scrambled and altered over the centuries." },
  { q: "Can I use this text in my designs?", a: "Yes — Lorem Ipsum is completely free to use in any design, mockup, prototype, or project." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lorem Ipsum Generator",
  url: "https://webtoolswiki.com/lorem-ipsum-generator",
  description: "Free Lorem Ipsum generator — generate placeholder text in seconds.",
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
      <LoremIpsumClient faqItems={faqItems} />
    </>
  );
}
