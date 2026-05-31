import type { Metadata } from "next";
import IPAddressClient from "./IPAddressClient";

export const metadata: Metadata = {
  title: "IP Address Generator – Random IPv4 & IPv6 Addresses",
  description:
    "Free IP address generator — generate random IPv4 and IPv6 addresses for testing, development, and network simulations.",
  keywords: ["ip address generator", "random ip address", "ipv4 generator", "ipv6 generator", "fake ip address"],
  alternates: { canonical: "https://webtoolswiki.com/ip-address-generator" },
  openGraph: {
    title: "IP Address Generator – Random IPv4 & IPv6 Addresses",
    description: "Free IP address generator — generate random IPv4 and IPv6 addresses for testing, development, and network simulations.",
    url: "https://webtoolswiki.com/ip-address-generator",
  },
};

const faqItems = [
  {
    q: "What is an IPv4 address?",
    a: "IPv4 addresses are 32-bit numbers written as four groups of digits separated by dots (e.g. 192.168.1.1). They identify devices on a network.",
  },
  {
    q: "What is the difference between IPv4 and IPv6?",
    a: "IPv4 uses 32-bit addresses (about 4 billion total) while IPv6 uses 128-bit addresses (virtually unlimited). IPv6 was created to solve IPv4 address exhaustion.",
  },
  {
    q: "Can I use these IP addresses for testing?",
    a: "Yes — generated IPs are great for testing network code, populating sample data, or UI development. They are not assigned to real devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IP Address Generator",
  url: "https://webtoolswiki.com/ip-address-generator",
  description: "Free IP address generator — generate random IPv4 and IPv6 addresses for testing and development.",
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

export default function IPAddressPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <IPAddressClient faqItems={faqItems} />
    </>
  );
}
