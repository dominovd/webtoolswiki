import type { Metadata } from "next";
import PirateNameClient from "./PirateNameClient";

export const metadata: Metadata = {
  title: "Pirate Name Generator – Get Your Pirate Name",
  description:
    "Free pirate name generator — get a swashbuckling pirate name instantly. Classic, funny, and fearsome pirate names for parties, games, and more.",
  keywords: [
    "pirate name generator",
    "pirate names",
    "funny pirate name",
    "pirate name ideas",
    "talk like a pirate",
  ],
  alternates: { canonical: "https://webtoolswiki.com/pirate-name-generator" },
  openGraph: {
    title: "Pirate Name Generator – Get Your Pirate Name",
    description:
      "Free pirate name generator — get a swashbuckling pirate name instantly. Classic, funny, and fearsome pirate names for parties, games, and more.",
    url: "https://webtoolswiki.com/pirate-name-generator",
  },
};

const faqItems = [
  {
    q: "When is Talk Like a Pirate Day?",
    a: "International Talk Like a Pirate Day is celebrated every year on September 19th. It's the perfect occasion to use your pirate name!",
  },
  {
    q: "What do pirates actually say?",
    a: "Classic pirate speech includes 'Ahoy!', 'Shiver me timbers!', 'Avast ye!', 'Arr!', and 'Landlubber.' Much of this was popularized by the 1950 film Treasure Island.",
  },
  {
    q: "Can I use my pirate name for a game or event?",
    a: "Absolutely — pirate names work great for costume parties, Halloween, themed events, gaming usernames, and any swashbuckling adventure.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pirate Name Generator",
  url: "https://webtoolswiki.com/pirate-name-generator",
  description:
    "Free pirate name generator — get a swashbuckling pirate name instantly. Classic, funny, and fearsome pirate names for parties, games, and more.",
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
      <PirateNameClient faqItems={faqItems} />
    </>
  );
}
