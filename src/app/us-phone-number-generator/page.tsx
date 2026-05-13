import type { Metadata } from "next";
import USPhoneClient from "./USPhoneClient";

export const metadata: Metadata = {
  title: "US Phone Number Generator – Random American Phone Numbers",
  description:
    "Generate random, valid-format US phone numbers for testing and development. Choose state, format, and quantity. Real area codes, NANP-compliant. Free.",
  keywords: ["us phone number generator", "random us phone number", "american phone number generator", "fake us phone number"],
  openGraph: {
    title: "US Phone Number Generator – Random American Phone Numbers",
    description: "Generate valid-format US phone numbers. Real area codes, multiple formats. Free.",
    url: "https://webtoolswiki.com/us-phone-number-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/us-phone-number-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "US Phone Number Generator",
  url: "https://webtoolswiki.com/us-phone-number-generator",
  description: "Free random US phone number generator with real area codes and multiple formats.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real US phone numbers?", acceptedAnswer: { "@type": "Answer", text: "No — generated numbers use real US area codes in valid formats but are not assigned to real people. Use them for testing, forms, or placeholder data." } },
    { "@type": "Question", name: "What formats are available?", acceptedAnswer: { "@type": "Answer", text: "You can generate numbers in (555) 555-5555, 555-555-5555, 5555555555, +1-555-555-5555, and 555.555.5555 formats." } },
    { "@type": "Question", name: "Can I use these for app testing?", acceptedAnswer: { "@type": "Answer", text: "Yes — these numbers pass basic format validation checks making them ideal for form testing, database seeding, and UI development." } },
  ],
};

export default function USPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <USPhoneClient />
    </>
  );
}
