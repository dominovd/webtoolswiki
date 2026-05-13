import type { Metadata } from "next";
import PasswordClient from "./PasswordClient";

export const metadata: Metadata = {
  title: "Password Generator – Strong Random Passwords",
  description:
    "Free password generator — create strong, secure random passwords instantly. Customize length, include symbols, numbers, uppercase, and lowercase letters.",
  keywords: ["password generator", "random password generator", "strong password generator", "secure password"],
  alternates: { canonical: "https://webtoolswiki.com/password-generator" },
  openGraph: {
    title: "Password Generator – Strong Random Passwords",
    description: "Free password generator — create strong, secure random passwords instantly.",
    url: "https://webtoolswiki.com/password-generator",
  },
};

const faqItems = [
  {
    q: "How long should my password be?",
    a: "At least 16 characters for most accounts, 20+ for banking and email. Longer passwords are exponentially harder to crack.",
  },
  {
    q: "Are generated passwords stored anywhere?",
    a: "No — passwords are generated entirely in your browser and never sent to any server.",
  },
  {
    q: "What makes a password strong?",
    a: "A strong password is long (16+ characters), uses a mix of uppercase, lowercase, numbers and symbols, and avoids dictionary words.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator",
  url: "https://webtoolswiki.com/password-generator",
  description: "Free online password generator. Create strong, secure random passwords instantly.",
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

export default function PasswordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PasswordClient faqItems={faqItems} />
    </>
  );
}
