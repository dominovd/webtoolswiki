import type { Metadata } from "next";
import FairyNameClient from "./FairyNameClient";

export const metadata: Metadata = {
  title: "Fairy Name Generator – Random Fairy Names",
  description:
    "Free fairy name generator — create magical, whimsical fairy names for stories, games, and creative projects. Male and female fairy names.",
  keywords: [
    "fairy name generator",
    "fairy names",
    "random fairy name",
    "fae name generator",
    "pixie name generator",
  ],
  alternates: { canonical: "https://webtoolswiki.com/fairy-name-generator" },
  openGraph: {
    title: "Fairy Name Generator – Random Fairy Names",
    description:
      "Free fairy name generator — create magical, whimsical fairy names for stories, games, and creative projects. Male and female fairy names.",
    url: "https://webtoolswiki.com/fairy-name-generator",
  },
};

const faqItems = [
  {
    q: "What is the difference between fairy and fae names?",
    a: "Fairy names tend to be whimsical and nature-inspired (Dewdrop, Blossom), while Fae names from Celtic mythology are often more mystical and ancient-sounding.",
  },
  {
    q: "Can I use these names for creative writing?",
    a: "Yes — all generated fairy names are free to use for stories, RPGs, character creation, or any creative project.",
  },
  {
    q: "Do fairies have surnames?",
    a: "In most fairy traditions, fairies are known by a single name or by a nature title (e.g. 'Lily of the Valley' or 'Silver Brook'). Our generator reflects this convention.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fairy Name Generator",
  url: "https://webtoolswiki.com/fairy-name-generator",
  description:
    "Free fairy name generator — create magical, whimsical fairy names for stories, games, and creative projects. Male and female fairy names.",
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
      <FairyNameClient faqItems={faqItems} />
    </>
  );
}
