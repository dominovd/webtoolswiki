import type { Metadata } from "next";
import WeirdTextClient from "./WeirdTextClient";

export const metadata: Metadata = {
  title: "Weird Text Generator – Creepy & Glitch Text Effects",
  description: "Free weird text generator — create glitch, zalgo, bubble, upside-down and other creepy text effects. Copy and paste anywhere.",
  keywords: ["weird text generator", "glitch text generator", "zalgo text", "creepy text generator", "fancy text"],
  alternates: { canonical: "https://webtoolswiki.com/weird-text-generator" },
  openGraph: { title: "Weird Text Generator – Glitch & Creepy Text Effects", description: "Create glitch, zalgo, bubble, and upside-down text effects instantly.", url: "https://webtoolswiki.com/weird-text-generator" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Weird Text Generator", url: "https://webtoolswiki.com/weird-text-generator",
  description: "Free weird and glitch text generator with multiple styles.", applicationCategory: "UtilityApplication",
  operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is zalgo text?", acceptedAnswer: { "@type": "Answer", text: "Zalgo text uses Unicode combining characters that stack above and below letters, creating a distorted 'corrupted' visual effect." } },
    { "@type": "Question", name: "Will weird text work on Instagram or TikTok?", acceptedAnswer: { "@type": "Answer", text: "Yes — all styles use real Unicode characters that display on most platforms, including Instagram, TikTok, Twitter, and Discord." } },
    { "@type": "Question", name: "What is vaporwave text?", acceptedAnswer: { "@type": "Answer", text: "Vaporwave (fullwidth) text uses Unicode fullwidth characters that are wider than normal, giving a retro, aesthetic feel popular in memes and social media." } },
  ],
};

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><WeirdTextClient /></>);
}
