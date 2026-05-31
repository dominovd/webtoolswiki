import type { Metadata } from "next";
import UUIDClient from "./UUIDClient";

export const metadata: Metadata = {
  title: "UUID Generator – Generate Random UUIDs Online",
  description:
    "Free UUID generator — generate version 4 UUIDs instantly. Generate 1 to 100 UUIDs at once, formatted and ready to copy.",
  keywords: ["uuid generator", "uuid v4 generator", "random uuid", "guid generator", "unique id generator"],
  alternates: { canonical: "https://webtoolswiki.com/uuid-generator" },
  openGraph: {
    title: "UUID Generator – Generate Random UUIDs Online",
    description: "Free UUID generator — generate version 4 UUIDs instantly. Generate 1 to 100 UUIDs at once, formatted and ready to copy.",
    url: "https://webtoolswiki.com/uuid-generator",
  },
};

const faqItems = [
  {
    q: "What is a UUID?",
    a: "A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. Version 4 UUIDs are randomly generated.",
  },
  {
    q: "Are generated UUIDs truly unique?",
    a: "UUID v4 has 2^122 possible values (~5.3×10^36), making the probability of collision astronomically small. They are considered unique for all practical purposes.",
  },
  {
    q: "What is the difference between UUID and GUID?",
    a: "GUID (Globally Unique Identifier) is Microsoft's term for UUID. They are the same format and serve the same purpose.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator",
  url: "https://webtoolswiki.com/uuid-generator",
  description: "Free UUID generator — generate version 4 UUIDs instantly.",
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

export default function UUIDPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <UUIDClient faqItems={faqItems} />
    </>
  );
}
