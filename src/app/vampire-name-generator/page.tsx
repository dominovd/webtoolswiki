import type { Metadata } from "next";
import VampireNameClient from "./VampireNameClient";

export const metadata: Metadata = {
  title: "Vampire Name Generator – Gothic Vampire Names",
  description:
    "Free vampire name generator — create dark, aristocratic vampire names for games, stories, and Halloween. Dracula-inspired names with gothic flair.",
  keywords: [
    "vampire name generator",
    "gothic names generator",
    "vampire names",
    "dracula names",
    "halloween name generator",
  ],
  alternates: { canonical: "https://webtoolswiki.com/vampire-name-generator" },
  openGraph: {
    title: "Vampire Name Generator – Gothic Vampire Names",
    description:
      "Free vampire name generator — create dark, aristocratic vampire names for games, stories, and Halloween. Dracula-inspired names with gothic flair.",
    url: "https://webtoolswiki.com/vampire-name-generator",
  },
};

const faqItems = [
  {
    q: "What makes a good vampire name?",
    a: "Classic vampire names tend to be aristocratic, Eastern European, or ancient Latin-sounding. They often have multiple syllables and a dark, formal quality.",
  },
  {
    q: "Can I use these for Halloween costumes or parties?",
    a: "Yes — vampire names work great for Halloween costume ideas, themed parties, creative writing, RPGs, and social media handles.",
  },
  {
    q: "What is the origin of the name Dracula?",
    a: "Dracula comes from the Romanian 'Dracul' meaning 'Dragon' or 'Devil.' Bram Stoker popularized it for his 1897 novel, based on Vlad III of Wallachia.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vampire Name Generator",
  url: "https://webtoolswiki.com/vampire-name-generator",
  description:
    "Free vampire name generator — create dark, aristocratic vampire names for games, stories, and Halloween. Dracula-inspired names with gothic flair.",
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
      <VampireNameClient faqItems={faqItems} />
    </>
  );
}
