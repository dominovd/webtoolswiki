import type { Metadata } from "next";
import SubscriptClient from "./SubscriptClient";

export const metadata: Metadata = {
  title: "Subscript Generator – Copy & Paste Subscript Text",
  description: "Free subscript text generator — convert text and numbers to subscript Unicode characters. Copy and paste anywhere instantly.",
  keywords: ["subscript generator", "subscript text", "subscript letters", "subscript copy paste"],
  alternates: { canonical: "https://webtoolswiki.com/subscript-generator" },
  openGraph: { title: "Subscript Generator", description: "Convert text to subscript Unicode characters instantly.", url: "https://webtoolswiki.com/subscript-generator" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Subscript Generator", url: "https://webtoolswiki.com/subscript-generator",
  description: "Free online subscript text generator.", applicationCategory: "UtilityApplication",
  operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is subscript text?", acceptedAnswer: { "@type": "Answer", text: "Subscript text appears below the normal baseline — like the '2' in H₂O. Our generator uses Unicode subscript characters that work in plain text." } },
    { "@type": "Question", name: "Can I use subscript for chemistry?", acceptedAnswer: { "@type": "Answer", text: "Yes! H₂O, CO₂, CH₄ — all digits 0–9 have subscript equivalents. Most common lowercase letters also work. Great for chemical formulas in plain text." } },
    { "@type": "Question", name: "Why do some letters look the same?", acceptedAnswer: { "@type": "Answer", text: "Not all letters have Unicode subscript versions. Letters without a subscript equivalent are shown as-is." } },
    { "@type": "Question", name: "Does this work in Google Docs or Word?", acceptedAnswer: { "@type": "Answer", text: "Yes — these are real Unicode characters, not formatting. They paste as plain text and appear subscript on any platform that renders Unicode." } },
  ],
};

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><SubscriptClient /></>);
}
