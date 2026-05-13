import type { Metadata } from "next";
import NZPhoneClient from "./NZPhoneClient";

export const metadata: Metadata = {
  title: "New Zealand Phone Number Generator – Random NZ Phone Numbers",
  description:
    "Generate random valid-format New Zealand phone numbers for testing. Real NZ area codes, mobile prefixes, multiple formats. Free, no sign-up.",
  keywords: ["new zealand phone number generator", "random nz phone number", "fake new zealand phone number", "nz mobile number generator"],
  openGraph: {
    title: "New Zealand Phone Number Generator – Random NZ Phone Numbers",
    description: "Generate valid-format New Zealand phone numbers with real area codes and mobile prefixes.",
    url: "https://webtoolswiki.com/nz-phone-number-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/nz-phone-number-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "New Zealand Phone Number Generator",
  url: "https://webtoolswiki.com/nz-phone-number-generator",
  description: "Free random New Zealand phone number generator.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are these real New Zealand phone numbers?", acceptedAnswer: { "@type": "Answer", text: "No — they use real NZ area codes in valid formats but are not assigned to real people." } },
    { "@type": "Question", name: "What formats are available?", acceptedAnswer: { "@type": "Answer", text: "(09) XXX XXXX, +64 9 XXX XXXX, and NZ mobile 02X XXX XXXX formats." } },
    { "@type": "Question", name: "Which regions are covered?", acceptedAnswer: { "@type": "Answer", text: "Auckland, Wellington, Christchurch, Hamilton, Dunedin, and other major NZ regions plus mobile numbers." } },
  ],
};

export default function NZPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <NZPhoneClient />
    </>
  );
}
