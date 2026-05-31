import type { Metadata } from "next";
import RandomDateClient from "./RandomDateClient";

export const metadata: Metadata = {
  title: "Random Date Generator – Generate Random Dates",
  description:
    "Free random date generator — generate random dates within any range and format. Perfect for testing, databases, and sample data.",
  keywords: ["random date generator", "random date", "fake date generator", "date randomizer"],
  alternates: { canonical: "https://webtoolswiki.com/random-date-generator" },
  openGraph: {
    title: "Random Date Generator – Generate Random Dates",
    description: "Free random date generator — generate random dates within any range and format. Perfect for testing, databases, and sample data.",
    url: "https://webtoolswiki.com/random-date-generator",
  },
};

const faqItems = [
  {
    q: "What formats are available?",
    a: "You can generate dates in US format (MM/DD/YYYY), UK format (DD/MM/YYYY), ISO 8601 (YYYY-MM-DD), long format (January 1, 2024), or as a Unix timestamp.",
  },
  {
    q: "Can I set a custom date range?",
    a: "Yes — set any start and end date using the date pickers. Dates are generated randomly within your chosen range.",
  },
  {
    q: "What is a Unix timestamp?",
    a: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC). It's widely used in programming and databases to store dates.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Random Date Generator",
  url: "https://webtoolswiki.com/random-date-generator",
  description: "Free random date generator — generate random dates within any range and format.",
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

export default function RandomDatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RandomDateClient faqItems={faqItems} />
    </>
  );
}
