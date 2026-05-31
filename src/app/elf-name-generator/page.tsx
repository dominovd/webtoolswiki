import type { Metadata } from "next";
import ElfNameClient from "./ElfNameClient";

export const metadata: Metadata = {
  title: "Elf Name Generator – Random Elvish Names",
  description:
    "Free elf name generator — create beautiful elvish names for D&D characters, fantasy novels, and games. Male and female elf names.",
  keywords: [
    "elf name generator",
    "elvish name generator",
    "elven names",
    "dnd elf names",
    "fantasy elf names",
  ],
  alternates: { canonical: "https://webtoolswiki.com/elf-name-generator" },
  openGraph: {
    title: "Elf Name Generator – Random Elvish Names",
    description:
      "Free elf name generator — create beautiful elvish names for D&D characters, fantasy novels, and games. Male and female elf names.",
    url: "https://webtoolswiki.com/elf-name-generator",
  },
};

const faqItems = [
  {
    q: "What makes a good elf name?",
    a: "Elvish names typically feature flowing vowels, soft consonants, and lyrical sounds. They often have multiple syllables and end in vowels or soft consonants like -el, -ar, or -iel.",
  },
  {
    q: "Can I use these names for D&D or Pathfinder?",
    a: "Yes — all elf names are free to use for tabletop RPGs, fantasy novels, video games, and any creative project.",
  },
  {
    q: "Do elf names have meanings?",
    a: "In most fantasy traditions, elvish names carry meanings from an ancient language. Each generated name shows a suggested meaning based on its syllables.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Elf Name Generator",
  url: "https://webtoolswiki.com/elf-name-generator",
  description:
    "Free elf name generator — create beautiful elvish names for D&D characters, fantasy novels, and games. Male and female elf names.",
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
      <ElfNameClient faqItems={faqItems} />
    </>
  );
}
