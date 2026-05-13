import type { Metadata } from "next";
import TeamNameClient from "./TeamNameClient";

export const metadata: Metadata = {
  title: "Team Name Generator – Cool Team Names for Any Sport",
  description:
    "Free team name generator — get cool, funny, or fierce team name ideas for sports, trivia, office, fantasy football, and more.",
  keywords: ["team name generator", "sports team names", "funny team names", "fantasy football team names", "trivia team names"],
  openGraph: {
    title: "Team Name Generator – Cool Team Names for Any Sport",
    description: "Get cool, funny, or fierce team name ideas for sports, trivia, office, fantasy football, and more.",
    url: "https://webtoolswiki.com/team-name-generator",
  },
  alternates: { canonical: "https://webtoolswiki.com/team-name-generator" },
};

const faqItems = [
  {
    q: "Can I use these team names for my sports league?",
    a: "Absolutely — all generated names are free to use for any purpose, from recreational leagues to fantasy sports.",
  },
  {
    q: "How do I pick the best team name?",
    a: "Choose a name your whole team loves, that's easy to remember, and ideally has some humor or intimidation factor depending on your sport.",
  },
  {
    q: "Can I generate names for other categories?",
    a: "Select from our category tabs: Sports, Gaming, Trivia, Office, and Fantasy Football — each has its own themed name lists.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Team Name Generator",
  url: "https://webtoolswiki.com/team-name-generator",
  description: "Free team name generator — get cool, funny, or fierce team name ideas for sports, trivia, office, fantasy football, and more.",
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

export default function TeamNamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <TeamNameClient faqItems={faqItems} />
    </>
  );
}
