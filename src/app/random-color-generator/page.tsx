import type { Metadata } from "next";
import RandomColorClient from "./RandomColorClient";

export const metadata: Metadata = {
  title: "Random Color Generator – Random HEX, RGB & HSL Colors",
  description:
    "Free random color generator — generate random colors with HEX, RGB, and HSL values. Generate single colors or full palettes instantly.",
  keywords: [
    "random color generator",
    "random hex color",
    "color palette generator",
    "hex color generator",
    "random colour",
  ],
  alternates: { canonical: "https://webtoolswiki.com/random-color-generator" },
  openGraph: {
    title: "Random Color Generator – Random HEX, RGB & HSL Colors",
    description:
      "Free random color generator — generate random colors with HEX, RGB, and HSL values. Generate single colors or full palettes instantly.",
    url: "https://webtoolswiki.com/random-color-generator",
  },
};

const faqItems = [
  {
    q: "What is a HEX color code?",
    a: "A HEX color code is a 6-digit hexadecimal number prefixed with # that represents a color in RGB format. For example, #FF0000 is pure red.",
  },
  {
    q: "What is the difference between RGB and HSL?",
    a: "RGB defines colors by Red, Green, and Blue values (0-255). HSL uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%), which is often more intuitive for designers.",
  },
  {
    q: "Can I generate a matching color palette?",
    a: "Yes — switch to 'Color Palette' mode to generate 5 random colors at once. You can lock individual colors and regenerate the rest.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Random Color Generator",
  url: "https://webtoolswiki.com/random-color-generator",
  description:
    "Free random color generator — generate random colors with HEX, RGB, and HSL values. Generate single colors or full palettes instantly.",
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

export default function RandomColorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RandomColorClient faqItems={faqItems} />
    </>
  );
}
