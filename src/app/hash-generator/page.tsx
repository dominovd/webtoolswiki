import type { Metadata } from "next";
import HashClient from "./HashClient";

export const metadata: Metadata = {
  title: "Hash Generator – SHA-256, SHA-1 & SHA-512 Online",
  description:
    "Free hash generator — generate SHA-256, SHA-1, SHA-512, and SHA-384 hashes from any text online. Instant, secure, runs in your browser.",
  keywords: [
    "hash generator",
    "sha256 generator",
    "sha-1 generator",
    "sha512 hash",
    "text hash generator",
    "md5 alternative",
  ],
  alternates: { canonical: "https://webtoolswiki.com/hash-generator" },
  openGraph: {
    title: "Hash Generator – SHA-256, SHA-1 & SHA-512 Online",
    description:
      "Free hash generator — generate SHA-256, SHA-1, SHA-512, and SHA-384 hashes from any text online. Instant, secure, runs in your browser.",
    url: "https://webtoolswiki.com/hash-generator",
  },
};

const faqItems = [
  {
    q: "What is a hash function?",
    a: "A hash function converts any input text into a fixed-length string of characters. The same input always produces the same hash, but the input cannot be recovered from the hash.",
  },
  {
    q: "Which hash algorithm should I use?",
    a: "Use SHA-256 or SHA-512 for security-sensitive applications. SHA-1 is outdated and should be avoided for cryptographic purposes. SHA-384 is a good middle ground.",
  },
  {
    q: "Is MD5 supported?",
    a: "MD5 is not available via the browser's built-in Web Crypto API, which we use to ensure security. We support SHA-1, SHA-256, SHA-384, and SHA-512 instead.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hash Generator",
  url: "https://webtoolswiki.com/hash-generator",
  description:
    "Free hash generator — generate SHA-256, SHA-1, SHA-512, and SHA-384 hashes from any text online. Instant, secure, runs in your browser.",
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

export default function HashGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HashClient faqItems={faqItems} />
    </>
  );
}
