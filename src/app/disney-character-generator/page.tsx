import type { Metadata } from "next";
import DisneyCharacterClient from "./DisneyCharacterClient";

export const metadata: Metadata = {
  title: "Disney Character Generator – Random Disney Characters",
  description:
    "Free Disney character generator — discover random classic Disney characters for trivia, games, and fun. Which Disney character are you?",
  keywords: ["disney character generator", "random disney character", "disney characters", "which disney character are you"],
  openGraph: {
    title: "Disney Character Generator – Random Disney Characters",
    description: "Discover random Disney characters for trivia, games, and fun. Which Disney character are you?",
    url: "https://webtoolswiki.com/disney-character-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/disney-character-generator" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Disney Character Generator",
  url: "https://webtoolswiki.com/disney-character-generator",
  description: "Free Disney character generator — discover random classic Disney characters for trivia, games, and fun.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Which Disney movies are included?", acceptedAnswer: { "@type": "Answer", text: "Characters from classic Disney films (Snow White, Cinderella, The Little Mermaid) through modern hits (Frozen, Moana, Encanto) and Pixar films (Toy Story, Finding Nemo, Up)." } },
    { "@type": "Question", name: "How many characters are in the list?", acceptedAnswer: { "@type": "Answer", text: "Over 100 Disney and Pixar characters are included in our generator." } },
    { "@type": "Question", name: "Can I use this as a party game?", acceptedAnswer: { "@type": "Answer", text: "Yes! 'Which Disney character are you?' is a great icebreaker or party game — generate a character and describe why it fits you." } },
  ],
};

export default function DisneyCharacterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DisneyCharacterClient />
    </>
  );
}
