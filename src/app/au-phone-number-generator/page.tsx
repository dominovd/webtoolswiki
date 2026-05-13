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

export default function AUPhonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AUPhoneClient />
    </>
  );
}
