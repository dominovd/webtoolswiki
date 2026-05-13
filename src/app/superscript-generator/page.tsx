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

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><SuperscriptClient /></>);
}
