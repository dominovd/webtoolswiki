import type { Metadata } from "next";
import AnagramClient from "./AnagramClient";

export const metadata: Metadata = {
  title: "Anagram Generator – Find Anagrams of Any Word or Phrase",
  description:
    "Free anagram generator — rearrange letters to create anagrams of any word or phrase. Great for word games, Scrabble, puzzles, and creative naming. Instant results.",
  keywords: ["anagram generator", "anagram maker", "word anagram", "anagram solver", "anagram name generator"],
  openGraph: {
    title: "Anagram Generator – Find Anagrams of Any Word or Phrase",
    description: "Rearrange letters to create anagrams instantly. Great for Scrabble, puzzles, and games.",
    url: "https://webtoolswiki.com/anagram-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/anagram-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Anagram Generator",
  url: "https://webtoolswiki.com/anagram-generator",
  description: "Free online anagram generator. Rearrange letters from any word or phrase.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AnagramPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnagramClient />
    </>
  );
}
