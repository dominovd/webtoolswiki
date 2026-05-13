import type { Metadata } from "next";
import CanadaPhoneClient from "./CanadaPhoneClient";

export const metadata: Metadata = {
  title: "Canada Phone Number Generator – Random Canadian Phone Numbers",
  description:
    "Generate random, valid-format Canadian phone numbers for testing. Choose province and format. Real Canadian area codes, NANP-compliant. Free, no sign-up.",
  keywords: ["canada phone number generator", "canadian phone number generator", "random canadian number", "fake canada phone number"],
  openGraph: {
    title: "Canada Phone Number Generator – Random Canadian Phone Numbers",
    description: "Generate valid Canadian phone numbers by province. Real area codes, multiple formats.",
    url: "https://webtoolswiki.com/canada-phone-number-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/canada-phone-number-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Canada Phone Number Generator",
  url: "https://webtoolswiki.com/canada-phone-number-generator",
  description: "Free random Canadian phone number generator with real area codes.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real Canadian phone numbers?", acceptedAnswer: { "@type": "Answer", text: "No — they use real Canadian area codes in valid NANP formats but are not assigned to real people or businesses." } },
    { "@type": "Question", name: "Which provinces are covered?", acceptedAnswer: { "@type": "Answer", text: "All Canadian provinces and territories are covered, including Ontario, Quebec, British Columbia, Alberta, Manitoba, and more." } },
    { "@type": "Question", name: "What formats are supported?", acceptedAnswer: { "@type": "Answer", text: "(416) 555-5555, 416-555-5555, +1-416-555-5555, and other standard formats." } },
  ],
};

export default function CanadaPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CanadaPhoneClient />
    </>
  );
}
