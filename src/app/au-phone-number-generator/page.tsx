import type { Metadata } from "next";
import AUPhoneClient from "./AUPhoneClient";

export const metadata: Metadata = {
  title: "Australia Phone Number Generator – Random Australian Phone Numbers",
  description:
    "Generate random valid-format Australian phone numbers for testing. Real AU area codes, mobile prefixes, multiple formats. Free, no sign-up.",
  keywords: ["australia phone number generator", "random australian phone number", "fake au phone number", "australian mobile number generator"],
  openGraph: {
    title: "Australia Phone Number Generator – Random Australian Phone Numbers",
    description: "Generate valid-format Australian phone numbers with real area codes and mobile prefixes.",
    url: "https://webtoolswiki.com/au-phone-number-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/au-phone-number-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Australia Phone Number Generator",
  url: "https://webtoolswiki.com/au-phone-number-generator",
  description: "Free random Australian phone number generator.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real Australian phone numbers?", acceptedAnswer: { "@type": "Answer", text: "No — they use real Australian area codes in valid formats but are not assigned to real people." } },
    { "@type": "Question", name: "What formats are supported?", acceptedAnswer: { "@type": "Answer", text: "(02) XXXX XXXX, +61 2 XXXX XXXX, and Australian mobile 04XX XXX XXX formats." } },
    { "@type": "Question", name: "Which states are covered?", acceptedAnswer: { "@type": "Answer", text: "All Australian states: NSW, VIC, QLD, WA, SA, TAS, NT, and ACT, plus mobile numbers." } },
  ],
};

export default function AUPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AUPhoneClient />
    </>
  );
}
