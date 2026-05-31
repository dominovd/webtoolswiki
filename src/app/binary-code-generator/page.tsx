import type { Metadata } from "next";
import BinaryCodeClient from "./BinaryCodeClient";

export const metadata: Metadata = {
  title: "Binary Code Generator – Text to Binary Converter",
  description:
    "Free binary code generator — convert text to binary code and binary to text instantly. Each character shown as 8-bit binary.",
  keywords: ["binary code generator", "text to binary", "binary converter", "binary translator", "binary code"],
  alternates: { canonical: "https://webtoolswiki.com/binary-code-generator" },
  openGraph: {
    title: "Binary Code Generator – Text to Binary Converter",
    description: "Free binary code generator — convert text to binary code and binary to text instantly. Each character shown as 8-bit binary.",
    url: "https://webtoolswiki.com/binary-code-generator",
  },
};

const faqItems = [
  {
    q: "What is binary code?",
    a: "Binary code represents data using only two symbols: 0 and 1. Computers store all data — text, images, programs — as sequences of binary digits (bits).",
  },
  {
    q: "How many bits are in a character?",
    a: "In standard ASCII encoding, each character uses 8 bits (1 byte). For example, the letter 'A' is 01000001 in binary.",
  },
  {
    q: "Can I convert binary back to text?",
    a: "Yes — switch to 'Binary → Text' mode, paste your binary code with spaces between each 8-bit group, and click Convert.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Binary Code Generator",
  url: "https://webtoolswiki.com/binary-code-generator",
  description: "Free binary code generator — convert text to binary code and binary to text instantly.",
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

export default function BinaryCodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BinaryCodeClient faqItems={faqItems} />
    </>
  );
}
