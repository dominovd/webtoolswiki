import type { Metadata } from "next";
import RandomNumberClient from "./RandomNumberClient";

export const metadata: Metadata = {
  title: "Random Number Generator – Generate Random Numbers",
  description:
    "Free random number generator — generate one or multiple random numbers within any range. Supports integers and decimals.",
  keywords: ["random number generator", "random number", "random integer generator", "number randomizer"],
  alternates: { canonical: "https://webtoolswiki.com/random-number-generator" },
  openGraph: {
    title: "Random Number Generator – Generate Random Numbers",
    description: "Generate one or multiple random numbers within any range. Supports integers and decimals.",
    url: "https://webtoolswiki.com/random-number-generator",
  },
};

const faqItems = [
  {
    q: "Are the numbers truly random?",
    a: "Numbers are generated using JavaScript's Math.random(), which uses a pseudo-random algorithm. For most purposes this is sufficiently random.",
  },
  {
    q: "What is the maximum range I can use?",
    a: "You can enter any numbers supported by JavaScript, including very large ranges. For the 'no duplicates' option, count cannot exceed the range size.",
  },
  {
    q: "Can I generate decimal numbers?",
    a: "Yes — toggle 'Allow decimals' to get numbers with 2 decimal places within your chosen range.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Random Number Generator",
  url: "https://webtoolswiki.com/random-number-generator",
  description: "Free online random number generator. Generate one or multiple random numbers within any range.",
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

export default function RandomNumberPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RandomNumberClient faqItems={faqItems} />
    </>
  );
}
