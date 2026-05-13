import type { Metadata } from "next";
import QuirkClient from "./QuirkClient";

export const metadata: Metadata = {
  title: "Quirk Generator – Random Character Quirks",
  description:
    "Free quirk generator — get random character quirks and personality traits for writing, roleplay, D&D, and character creation.",
  keywords: ["quirk generator", "character quirks", "personality quirks", "D&D character traits", "writing prompts"],
  openGraph: {
    title: "Quirk Generator – Random Character Quirks",
    description: "Free quirk generator — get random character quirks and personality traits for writing, roleplay, D&D, and character creation.",
    url: "https://webtoolswiki.com/quirk-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/quirk-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Quirk Generator",
  url: "https://webtoolswiki.com/quirk-generator",
  description: "Free quirk generator — get random character quirks and personality traits for writing, roleplay, D&D, and character creation.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are character quirks?", acceptedAnswer: { "@type": "Answer", text: "Character quirks are distinctive habits, behaviors, or personality traits that make a character feel unique and memorable." } },
    { "@type": "Question", name: "Can I use these for D&D characters?", acceptedAnswer: { "@type": "Answer", text: "Yes — quirks are perfect for tabletop RPGs like D&D, Pathfinder, or any roleplaying game where you want your character to stand out." } },
    { "@type": "Question", name: "How many quirks can I generate?", acceptedAnswer: { "@type": "Answer", text: "Generate 1, 3, 5, or 10 quirks at a time from our list of 60+ unique character traits." } },
  ],
};

export default function QuirkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <QuirkClient />
    </>
  );
}
