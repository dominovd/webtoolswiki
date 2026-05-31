import type { Metadata } from "next";
import VikingNameClient from "./VikingNameClient";

export const metadata: Metadata = {
  title: "Viking Name Generator – Random Norse & Viking Names",
  description:
    "Free Viking name generator — create authentic Old Norse and Viking names with meanings. Male and female Viking names for games, stories, and more.",
  keywords: [
    "viking name generator",
    "norse name generator",
    "old norse names",
    "viking names",
    "norse mythology names",
  ],
  alternates: { canonical: "https://webtoolswiki.com/viking-name-generator" },
  openGraph: {
    title: "Viking Name Generator – Random Norse & Viking Names",
    description:
      "Free Viking name generator — create authentic Old Norse and Viking names with meanings. Male and female Viking names for games, stories, and more.",
    url: "https://webtoolswiki.com/viking-name-generator",
  },
};

const faqItems = [
  {
    q: "Are these real Viking names?",
    a: "Yes — our list includes authentic Old Norse names used by historical Vikings, drawn from Norse sagas, runic inscriptions, and historical records.",
  },
  {
    q: "What is a kenning?",
    a: "A kenning is a compound poetic expression used in Old Norse and Old English poetry. Vikings used kenning-style nicknames like 'Ironside' or 'Bloodaxe' to describe warriors' legendary deeds.",
  },
  {
    q: "Can I use these names for D&D or video games?",
    a: "Absolutely — Viking and Norse names work great for tabletop RPGs, video games, fantasy novels, and any project with a Norse aesthetic.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Viking Name Generator",
  url: "https://webtoolswiki.com/viking-name-generator",
  description:
    "Free Viking name generator — create authentic Old Norse and Viking names with meanings. Male and female Viking names for games, stories, and more.",
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
      <VikingNameClient faqItems={faqItems} />
    </>
  );
}
