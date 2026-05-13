import type { Metadata } from "next";
import IMEIClient from "./IMEIClient";

export const metadata: Metadata = {
  title: "IMEI Generator – Free Random IMEI Number Generator",
  description:
    "Generate random, valid-format IMEI numbers instantly. Choose iPhone, Samsung, Pixel, or fully random. Correct Luhn checksum. Free, no sign-up.",
  keywords: ["imei generator", "random imei", "imei number generator", "fake imei"],
  openGraph: {
    title: "IMEI Generator – Free Random IMEI Number Generator",
    description: "Generate valid-format IMEI numbers for testing. iPhone, Samsung, Pixel and more.",
    url: "https://webtoolswiki.com/imei-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/imei-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IMEI Generator",
  url: "https://webtoolswiki.com/imei-generator",
  description: "Free online IMEI number generator with valid Luhn checksum.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are generated IMEIs valid?", acceptedAnswer: { "@type": "Answer", text: "Generated IMEIs pass the Luhn checksum algorithm used to validate IMEI format. They are not registered to real devices and should only be used for testing or development." } },
    { "@type": "Question", name: "What is an IMEI number?", acceptedAnswer: { "@type": "Answer", text: "IMEI (International Mobile Equipment Identity) is a unique 15-digit number that identifies mobile devices. It's used by networks to identify valid devices." } },
    { "@type": "Question", name: "Can I use these IMEIs for app testing?", acceptedAnswer: { "@type": "Answer", text: "Yes — these are the primary use case. They pass format validation checks but are not associated with real devices." } },
  ],
};

export default function IMEIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <IMEIClient />
    </>
  );
}
