import type { Metadata } from "next";
import FantasyNameClient from "./FantasyNameClient";

export const metadata: Metadata = {
  title: "Fantasy Name Generator – Random Fantasy Character Names",
  description:
    "Free fantasy name generator — create unique fantasy names for characters, heroes, villains, and NPCs. Perfect for D&D, RPGs, and fiction writing.",
  keywords: [
    "fantasy name generator",
    "random fantasy names",
    "dnd character names",
    "rpg name generator",
    "fantasy character names",
  ],
  alternates: { canonical: "https://webtoolswiki.com/fantasy-name-generator" },
  openGraph: {
    title: "Fantasy Name Generator – Random Fantasy Character Names",
    description:
      "Free fantasy name generator — create unique fantasy names for characters, heroes, villains, and NPCs. Perfect for D&D, RPGs, and fiction writing.",
    url: "https://webtoolswiki.com/fantasy-name-generator",
  },
};

const faqItems = [
  {
    q: "Can I use these names for D&D?",
    a: "Yes — all generated names are free to use for D&D characters, tabletop RPGs, video games, novels, and any other creative project.",
  },
  {
    q: "How are fantasy names generated?",
    a: "Names are drawn from curated lists designed to sound authentic for each fantasy race — elves get flowing syllables, dwarves get hard consonants, orcs get guttural sounds.",
  },
  {
    q: "Can I generate names for different races?",
    a: "Yes — select from Human, Elf, Dwarf, Orc, Wizard, or Rogue to get names that fit that race's aesthetic and naming conventions.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fantasy Name Generator",
  url: "https://webtoolswiki.com/fantasy-name-generator",
  description:
    "Free fantasy name generator — create unique fantasy names for characters, heroes, villains, and NPCs. Perfect for D&D, RPGs, and fiction writing.",
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
      <FantasyNameClient faqItems={faqItems} />
    </>
  );
}
