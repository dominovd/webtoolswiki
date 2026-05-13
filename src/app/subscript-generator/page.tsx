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

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><SubscriptClient /></>);
}
