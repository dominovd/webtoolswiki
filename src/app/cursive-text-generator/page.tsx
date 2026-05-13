import type { Metadata } from "next";
import CursiveClient from "./CursiveClient";

export const metadata: Metadata = {
  title: "Cursive Text Generator – Copy & Paste Cursive Fonts",
  description:
    "Free cursive text generator — convert any text to cursive Unicode styles instantly. Copy and paste into Instagram, TikTok, Twitter, Discord bios, and more. No sign-up needed.",
  keywords: ["cursive text generator", "cursive font generator", "fancy text generator", "cursive letters copy paste"],
  openGraph: {
    title: "Cursive Text Generator – Copy & Paste Cursive Fonts",
    description: "Convert text to cursive Unicode styles. Works on Instagram, TikTok, Twitter, Discord.",
    url: "https://webtoolswiki.com/cursive-text-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/cursive-text-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cursive Text Generator",
  url: "https://webtoolswiki.com/cursive-text-generator",
  description: "Free online cursive text generator. Convert any text to Unicode cursive and script styles.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Does cursive text work on Instagram and TikTok?", acceptedAnswer: { "@type": "Answer", text: "Yes — these are real Unicode characters, not images. They paste directly into Instagram bios, TikTok captions, Twitter, Discord, and most other platforms." } },
    { "@type": "Question", name: "Why do some letters look different from real cursive?", acceptedAnswer: { "@type": "Answer", text: "The styles use Unicode mathematical script letters, which closely resemble cursive but are available as plain text. Not all letters have perfect cursive equivalents." } },
    { "@type": "Question", name: "Can I use cursive text in emails or Google Docs?", acceptedAnswer: { "@type": "Answer", text: "Yes. Because these are Unicode characters, they appear in any app that supports text — including Gmail, Google Docs, Word, and messaging apps." } },
  ],
};

export default function CursivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CursiveClient />
    </>
  );
}
