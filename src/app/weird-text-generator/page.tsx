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

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><WeirdTextClient /></>);
}
