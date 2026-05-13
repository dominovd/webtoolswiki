import type { Metadata } from "next";
import SymbolTextClient from "./SymbolTextClient";

export const metadata: Metadata = {
  title: "Symbol Text Generator – Unicode Symbols & Special Characters",
  description: "Free symbol text generator — browse and copy hundreds of Unicode symbols: hearts, stars, arrows, currency, math, decorative, and more.",
  keywords: ["symbol text generator", "unicode symbols", "special characters", "text symbols copy paste"],
  alternates: { canonical: "https://webtoolswiki.com/symbol-text-generator" },
  openGraph: { title: "Symbol Text Generator – Unicode Symbols", description: "Browse and copy hundreds of Unicode symbols instantly.", url: "https://webtoolswiki.com/symbol-text-generator" },
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "Symbol Text Generator", url: "https://webtoolswiki.com/symbol-text-generator",
  description: "Free Unicode symbol browser and text generator.", applicationCategory: "UtilityApplication",
  operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><SymbolTextClient /></>);
}
