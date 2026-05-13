import type { Metadata } from "next";
import SuperscriptClient from "./SuperscriptClient";

export const metadata: Metadata = {
  title: "Superscript Generator – Copy & Paste Superscript Text",
  description: "Free superscript text generator — convert any text or numbers to superscript Unicode characters. Copy and paste into any app, no sign-up needed.",
  keywords: ["superscript generator", "superscript text", "superscript letters", "superscript copy paste"],
  alternates: { canonical: "https://webtoolswiki.com/superscript-generator" },
  openGraph: { title: "Superscript Generator", description: "Convert text to superscript Unicode characters instantly.", url: "https://webtoolswiki.com/superscript-generator" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Superscript Generator", url: "https://webtoolswiki.com/superscript-generator",
  description: "Free online superscript text generator.", applicationCategory: "UtilityApplication",
  operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is superscript text?", acceptedAnswer: { "@type": "Answer", text: "Superscript text appears above the normal text baseline — like the '2' in E=mc². Our generator uses Unicode superscript characters that work as plain text." } },
    { "@type": "Question", name: "Will superscript work on social media?", acceptedAnswer: { "@type": "Answer", text: "Yes — these are real Unicode characters that display on Instagram, Twitter, Discord, TikTok, and most modern platforms." } },
    { "@type": "Question", name: "Why do some letters look the same?", acceptedAnswer: { "@type": "Answer", text: "Not every letter has a Unicode superscript version. Letters without one are shown at normal size." } },
  ],
};

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><SuperscriptClient /></>);
}
