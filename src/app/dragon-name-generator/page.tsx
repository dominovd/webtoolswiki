import type { Metadata } from "next";
import DragonNameClient from "./DragonNameClient";

export const metadata: Metadata = {
  title: "Dragon Name Generator – Random Dragon Names",
  description:
    "Free dragon name generator — create powerful, ancient dragon names for D&D, fantasy writing, and games. Male and female dragon names.",
  keywords: [
    "dragon name generator",
    "random dragon names",
    "dnd dragon names",
    "fantasy dragon names",
  ],
  alternates: { canonical: "https://webtoolswiki.com/dragon-name-generator" },
  openGraph: {
    title: "Dragon Name Generator – Random Dragon Names",
    description:
      "Free dragon name generator — create powerful, ancient dragon names for D&D, fantasy writing, and games. Male and female dragon names.",
    url: "https://webtoolswiki.com/dragon-name-generator",
  },
};

const faqItems = [
  {
    q: "Can I use these dragon names for D&D?",
    a: "Yes — all names are free to use for D&D campaigns, Pathfinder, fantasy novels, video games, or any creative project.",
  },
  {
    q: "What makes a good dragon name?",
    a: "Dragon names typically use hard, powerful consonants like K, R, X, and Z, with long vowel sounds that feel ancient and imposing.",
  },
  {
    q: "Do the dragon types affect the name style?",
    a: "Yes — each type generates names with different sound profiles. Fire dragons get aggressive consonants, ice dragons get crisp sounds, shadow dragons get mysterious names.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dragon Name Generator",
  url: "https://webtoolswiki.com/dragon-name-generator",
  description:
    "Free dragon name generator — create powerful, ancient dragon names for D&D, fantasy writing, and games. Male and female dragon names.",
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
      <DragonNameClient faqItems={faqItems} />
    </>
  );
}
