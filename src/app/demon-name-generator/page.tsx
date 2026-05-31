import type { Metadata } from "next";
import DemonNameClient from "./DemonNameClient";

export const metadata: Metadata = {
  title: "Demon Name Generator – Random Demon Names",
  description:
    "Free demon name generator — create dark, powerful demon names for D&D, fantasy writing, and horror games. Unique demonic names every time.",
  keywords: [
    "demon name generator",
    "random demon names",
    "demonic names",
    "dnd demon names",
    "devil name generator",
  ],
  alternates: { canonical: "https://webtoolswiki.com/demon-name-generator" },
  openGraph: {
    title: "Demon Name Generator – Random Demon Names",
    description:
      "Free demon name generator — create dark, powerful demon names for D&D, fantasy writing, and horror games. Unique demonic names every time.",
    url: "https://webtoolswiki.com/demon-name-generator",
  },
};

const faqItems = [
  {
    q: "Can I use these names for D&D demons?",
    a: "Yes — all generated demon names are free to use for D&D, Pathfinder, horror writing, video games, or any creative project.",
  },
  {
    q: "What makes a good demon name?",
    a: "Demon names typically use harsh consonants (K, Z, X, R), guttural sounds, and often have multiple syllables that feel ancient and threatening.",
  },
  {
    q: "What is the difference between a demon and a devil in D&D?",
    a: "In D&D, demons (Chaotic Evil) come from the Abyss while devils (Lawful Evil) come from the Nine Hells. Each has distinct naming conventions reflecting their nature.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Demon Name Generator",
  url: "https://webtoolswiki.com/demon-name-generator",
  description:
    "Free demon name generator — create dark, powerful demon names for D&D, fantasy writing, and horror games. Unique demonic names every time.",
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
      <DemonNameClient faqItems={faqItems} />
    </>
  );
}
