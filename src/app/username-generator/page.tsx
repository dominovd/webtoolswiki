import type { Metadata } from "next";
import UsernameClient from "./UsernameClient";

export const metadata: Metadata = {
  title: "Username Generator – Cool Unique Usernames",
  description:
    "Free username generator — create cool, unique usernames for gaming, social media, Discord, TikTok, and more. Hundreds of combinations.",
  keywords: ["username generator", "cool username generator", "gaming username", "discord username", "random username"],
  alternates: { canonical: "https://webtoolswiki.com/username-generator" },
  openGraph: {
    title: "Username Generator – Cool Unique Usernames",
    description: "Create cool, unique usernames for gaming, social media, Discord, TikTok, and more.",
    url: "https://webtoolswiki.com/username-generator",
  },
};

const faqItems = [
  {
    q: "Will these usernames be available?",
    a: "Availability depends on the platform. Always check availability on the specific site or app after generating.",
  },
  {
    q: "How do I pick a good username?",
    a: "Keep it short (under 15 chars), memorable, and avoid special characters that some platforms don't support.",
  },
  {
    q: "Can I use these on TikTok, Instagram, or Discord?",
    a: "Yes — all generated usernames use only letters and numbers, compatible with most major platforms.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Username Generator",
  url: "https://webtoolswiki.com/username-generator",
  description: "Free online username generator. Create cool, unique usernames for gaming, social media, and more.",
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

export default function UsernamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <UsernameClient faqItems={faqItems} />
    </>
  );
}
