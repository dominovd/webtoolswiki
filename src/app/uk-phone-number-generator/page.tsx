import type { Metadata } from "next";
import UKPhoneClient from "./UKPhoneClient";

export const metadata: Metadata = {
  title: "UK Phone Number Generator – Random British Phone Numbers",
  description:
    "Generate random valid-format UK phone numbers for testing. Real UK area codes, multiple formats. Free, no sign-up.",
  keywords: ["uk phone number generator", "random uk phone number", "british phone number", "fake uk phone number"],
  openGraph: {
    title: "UK Phone Number Generator – Random British Phone Numbers",
    description: "Generate valid-format UK phone numbers with real area codes and mobile prefixes.",
    url: "https://webtoolswiki.com/uk-phone-number-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/uk-phone-number-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UK Phone Number Generator",
  url: "https://webtoolswiki.com/uk-phone-number-generator",
  description: "Free random UK phone number generator.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real UK phone numbers?", acceptedAnswer: { "@type": "Answer", text: "No — they use real UK area codes in valid formats but are not assigned to real people or businesses." } },
    { "@type": "Question", name: "What formats are available?", acceptedAnswer: { "@type": "Answer", text: "+44 20 XXXX XXXX, 020 XXXX XXXX, and mobile 07XXX XXXXXX formats." } },
    { "@type": "Question", name: "Which regions are covered?", acceptedAnswer: { "@type": "Answer", text: "London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Bristol, and other major UK cities plus mobile numbers." } },
  ],
};

export default function UKPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <UKPhoneClient />
    </>
  );
}
