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

export default function IMEIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IMEIClient />
    </>
  );
}
