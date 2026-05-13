import type { Metadata } from "next";
import MythicalCreatureClient from "./MythicalCreatureClient";

export const metadata: Metadata = {
  title: "Mythical Creature Generator – Random Fantasy Creatures",
  description:
    "Free mythical creature generator — discover random mythical creatures from world mythology, folklore, and fantasy. Perfect for D&D, writing, and game design.",
  keywords: ["mythical creature generator", "random mythical creatures", "fantasy creature generator", "D&D monsters", "folklore creatures"],
  openGraph: {
    title: "Mythical Creature Generator – Random Fantasy Creatures",
    description: "Discover random mythical creatures from world mythology, folklore, and fantasy. Free, instant.",
    url: "https://webtoolswiki.com/mythical-creature-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/mythical-creature-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mythical Creature Generator",
  url: "https://webtoolswiki.com/mythical-creature-generator",
  description: "Free mythical creature generator — discover random mythical creatures from world mythology, folklore, and fantasy.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Where do these creatures come from?", acceptedAnswer: { "@type": "Answer", text: "Our list includes creatures from Greek, Norse, Japanese, Celtic, Persian, Inuit, Native American, and other world mythologies." } },
    { "@type": "Question", name: "Can I use these for D&D or writing?", acceptedAnswer: { "@type": "Answer", text: "Yes — mythical creatures make great inspiration for D&D encounters, fantasy writing, game design, and worldbuilding." } },
    { "@type": "Question", name: "How many creatures are in the list?", acceptedAnswer: { "@type": "Answer", text: "Our generator includes 42 mythical creatures from world mythology, each with a description." } },
  ],
};

export default function MythicalCreaturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MythicalCreatureClient />
    </>
  );
}
