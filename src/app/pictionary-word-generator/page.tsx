import type { Metadata } from "next";
import PictionaryClient from "./PictionaryClient";

export const metadata: Metadata = {
  title: "Pictionary Word Generator – Random Words for Drawing Games",
  description: "Free Pictionary word generator — get random easy, medium, or hard words for Pictionary, drawing games, and charades.",
  keywords: ["pictionary word generator", "random pictionary words", "drawing game words", "pictionary ideas"],
  alternates: { canonical: "https://webtoolswiki.com/pictionary-word-generator" },
  openGraph: {
    title: "Pictionary Word Generator – Random Words for Drawing Games",
    description: "Free Pictionary word generator — get random easy, medium, or hard words for Pictionary, drawing games, and charades.",
    url: "https://webtoolswiki.com/pictionary-word-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pictionary Word Generator",
  url: "https://webtoolswiki.com/pictionary-word-generator",
  description: "Free online Pictionary word generator with easy, medium, and hard difficulty categories.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What difficulty levels are available?", acceptedAnswer: { "@type": "Answer", text: "Easy (simple objects anyone can draw), Medium (actions and concepts), and Hard (abstract ideas that are challenging to illustrate)." } },
    { "@type": "Question", name: "Can I use this for charades?", acceptedAnswer: { "@type": "Answer", text: "Yes — the word categories work equally well for charades, Pictionary, drawing games, and other party games." } },
    { "@type": "Question", name: "How many words can I generate at once?", acceptedAnswer: { "@type": "Answer", text: "Generate 1, 5, or 10 words per round. Switch difficulties between rounds to keep the game interesting." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PictionaryClient />
    </>
  );
}
