import type { Metadata } from "next";
import RandomNameClient from "./RandomNameClient";

export const metadata: Metadata = {
  title: "Random Name Generator – Fake Names for Any Use",
  description:
    "Free random name generator — generate realistic fake first names, last names, and full names. Great for testing, fiction, forms, and privacy.",
  keywords: ["random name generator", "fake name generator", "random first name", "random last name", "fake person name"],
  alternates: { canonical: "https://webtoolswiki.com/random-name-generator" },
  openGraph: {
    title: "Random Name Generator – Fake Names for Any Use",
    description: "Generate realistic fake names for testing, fiction, forms, and privacy.",
    url: "https://webtoolswiki.com/random-name-generator",
  },
};

const faqItems = [
  {
    q: "Are these real people's names?",
    a: "No — names are randomly combined from common first and last name lists. Any resemblance to real people is coincidental.",
  },
  {
    q: "Can I use these names for forms or testing?",
    a: "Yes! Fake names are perfect for filling test forms, creating placeholder data, or protecting your privacy in sign-ups.",
  },
  {
    q: "How are names generated?",
    a: "A random first name is paired with a random last name from our lists. You can filter by gender for male or female names.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Random Name Generator",
  url: "https://webtoolswiki.com/random-name-generator",
  description: "Free online random name generator. Generate realistic fake names for testing, fiction, and privacy.",
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

export default function RandomNamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RandomNameClient faqItems={faqItems} />
    </>
  );
}
