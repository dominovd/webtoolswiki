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

export default function NZPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NZPhoneClient />
    </>
  );
}
