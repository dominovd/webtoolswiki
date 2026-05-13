import type { Metadata } from "next";
import NicknameClient from "./NicknameClient";

export const metadata: Metadata = {
  title: "Nickname Generator – Cool Nicknames for Anyone",
  description:
    "Free nickname generator — get fun, cute, or cool nicknames based on a name or word. Perfect for friends, gaming, and social media.",
  keywords: ["nickname generator", "cool nickname generator", "nickname ideas", "funny nicknames", "cute nicknames"],
  openGraph: {
    title: "Nickname Generator – Cool Nicknames for Anyone",
    description: "Get fun, cute, or cool nicknames based on a name or word. Perfect for friends, gaming, and social media.",
    url: "https://webtoolswiki.com/nickname-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/nickname-generator" },
};

const faqItems = [
  {
    q: "How are nicknames generated?",
    a: "Nicknames are created by transforming your input name with style-appropriate prefixes, suffixes, and modifications.",
  },
  {
    q: "Can I use these nicknames on social media?",
    a: "Yes! Generated nicknames work great for Instagram, TikTok, Discord, and gaming platforms. Check availability on each platform.",
  },
  {
    q: "What if I don't enter a name?",
    a: "If you leave the name field empty, we'll generate random nicknames using common name components.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Nickname Generator",
  url: "https://webtoolswiki.com/nickname-generator",
  description: "Free nickname generator — get fun, cute, or cool nicknames based on a name or word. Perfect for friends, gaming, and social media.",
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

export default function NicknamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <NicknameClient faqItems={faqItems} />
    </>
  );
}
