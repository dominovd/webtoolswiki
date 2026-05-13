import type { Metadata } from "next";
import BusinessNameClient from "./BusinessNameClient";

export const metadata: Metadata = {
  title: "Business Name Generator – Creative Business Name Ideas",
  description:
    "Free business name generator — get creative, catchy business name ideas instantly. Great for startups, brands, shops, and agencies.",
  keywords: ["business name generator", "company name generator", "startup name generator", "brand name generator"],
  openGraph: {
    title: "Business Name Generator – Creative Business Name Ideas",
    description: "Get creative, catchy business name ideas instantly. Free for startups, brands, shops, and agencies.",
    url: "https://webtoolswiki.com/business-name-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/business-name-generator" },
};

const faqItems = [
  {
    q: "Can I trademark a generated business name?",
    a: "Generated names are not checked for trademark availability. Always search the USPTO trademark database and consult a lawyer before registering a business name.",
  },
  {
    q: "How do I choose the best business name?",
    a: "Pick a name that's easy to spell, memorable, and reflects your brand. Check that the domain name and social media handles are available.",
  },
  {
    q: "Are these names unique?",
    a: "Names are randomly generated from word combinations. Always verify that your chosen name isn't already in use before registering.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Business Name Generator",
  url: "https://webtoolswiki.com/business-name-generator",
  description: "Free business name generator — get creative, catchy business name ideas instantly. Great for startups, brands, shops, and agencies.",
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

export default function BusinessNamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BusinessNameClient faqItems={faqItems} />
    </>
  );
}
