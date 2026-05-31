import type { Metadata } from "next";
import MorseCodeClient from "./MorseCodeClient";

export const metadata: Metadata = {
  title: "Morse Code Translator – Text to Morse Code",
  description:
    "Free Morse code translator — convert text to Morse code and Morse code to text instantly. Dots, dashes, and spaces decoded online.",
  keywords: ["morse code translator", "text to morse code", "morse code converter", "decode morse code"],
  alternates: { canonical: "https://webtoolswiki.com/morse-code-translator" },
  openGraph: {
    title: "Morse Code Translator – Text to Morse Code",
    description: "Free Morse code translator — convert text to Morse code and Morse code to text instantly. Dots, dashes, and spaces decoded online.",
    url: "https://webtoolswiki.com/morse-code-translator",
  },
};

const faqItems = [
  {
    q: "What is Morse code?",
    a: "Morse code is a communication system that represents letters and numbers as sequences of dots (short signals) and dashes (long signals). It was invented by Samuel Morse in the 1830s.",
  },
  {
    q: "How do I decode Morse code?",
    a: "Switch to 'Morse → Text' mode, enter your Morse code using dots (.) and dashes (-), separate letters with spaces and words with a forward slash (/), then click Translate.",
  },
  {
    q: "What does SOS look like in Morse code?",
    a: "SOS is '... --- ...' — three dots, three dashes, three dots. It's the universal distress signal.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Morse Code Translator",
  url: "https://webtoolswiki.com/morse-code-translator",
  description: "Free Morse code translator — convert text to Morse code and Morse code to text instantly.",
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

export default function MorseCodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MorseCodeClient faqItems={faqItems} />
    </>
  );
}
