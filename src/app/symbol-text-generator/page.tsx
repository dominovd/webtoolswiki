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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I copy a symbol?", acceptedAnswer: { "@type": "Answer", text: "Click any symbol to copy it to your clipboard instantly. You can also click '+' to add it to your collection, then copy all at once." } },
    { "@type": "Question", name: "Will these symbols work everywhere?", acceptedAnswer: { "@type": "Answer", text: "Most Unicode symbols display correctly on modern devices, browsers, and apps. Older systems may show boxes or question marks for some symbols." } },
    { "@type": "Question", name: "Can I use symbols in Instagram bio or TikTok?", acceptedAnswer: { "@type": "Answer", text: "Yes! Unicode symbols paste directly into social media bios, captions, and usernames on most platforms." } },
  ],
};

export default function Page() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /><SymbolTextClient /></>);
}
