"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Category = "sports" | "gaming" | "trivia" | "office" | "fantasy";

const SPORTS_ADJECTIVES = ["Fierce", "Raging", "Thunder", "Iron", "Steel", "Rapid", "Blazing", "Mighty", "Wild", "Savage", "Elite", "Unstoppable", "Legendary", "Ruthless", "Relentless"];
const SPORTS_NOUNS = ["Wolves", "Eagles", "Titans", "Dragons", "Warriors", "Falcons", "Bulls", "Bears", "Lions", "Sharks", "Vipers", "Cobras", "Raptors", "Rhinos", "Stallions"];

const GAMING_NAMES = ["The Lag Lords", "No Scope Nation", "GG Easy", "Ctrl Alt Defeat", "404 Team Not Found", "Keyboard Warriors", "Press F to Win", "Respawn Rangers", "Clutch or Kick", "Pixel Pioneers", "The Headshot Heroes", "Loading Please Wait", "Git Gud Gang", "Final Boss", "The AFK Squad"];

const TRIVIA_NAMES = ["Quiz Khalifa", "Les Quizerables", "I Am Smarticus", "Game of Phones", "E=MC Hammered", "Trivia Newton John", "Agatha Quiztie", "Let's Get Quizzical", "Sofa King Smart", "The Big Lebowski Fan Club", "Wikipedia Brown", "Smarty Pints", "404 Knowledge Not Found", "The Fact Pack", "Ctrl + Alt + Defeat"];

const OFFICE_NAMES = ["The Spreadsheet Ninjas", "Meeting Survivors", "Ctrl Alt Delete", "Email Overload", "The Deadline Dodgers", "Out of Office", "CC Everyone", "The Reply All Squad", "Synergy Heroes", "Pivot Table Pros", "The Fire Drill Team", "Zoom Fatigue FC", "Calendar Blocked", "Bandwidth Exceeded", "The Budget Cuts"];

const FANTASY_NAMES = ["Victorious Secret", "Nacho Average Team", "Touch Me I'm Sick", "Game of Throws", "The Brady Bunch", "Saquon My Wayward Son", "You Can't Handle the Touchdown", "Run CMC", "Lamar Jackpot", "Forrest Gump FC", "Inglorious Batters", "The Gronkowski Effect", "Zero to Mahomes", "Straight Outta Options", "The Bye Week Blues"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNames(category: Category): string[] {
  if (category === "sports") {
    const names: string[] = [];
    const adjs = shuffle(SPORTS_ADJECTIVES);
    const nouns = shuffle(SPORTS_NOUNS);
    for (let i = 0; i < 10; i++) {
      names.push(`${adjs[i % adjs.length]} ${nouns[i % nouns.length]}`);
    }
    return names;
  }
  const pool =
    category === "gaming" ? GAMING_NAMES :
    category === "trivia" ? TRIVIA_NAMES :
    category === "office" ? OFFICE_NAMES :
    FANTASY_NAMES;
  return shuffle(pool).slice(0, 10);
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "sports", label: "Sports" },
  { key: "gaming", label: "Gaming" },
  { key: "trivia", label: "Trivia / Pub Quiz" },
  { key: "office", label: "Office" },
  { key: "fantasy", label: "Fantasy Football" },
];

export default function TeamNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [category, setCategory] = useState<Category>("sports");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(generateNames(category));
    setCopied(null);
  };

  const copyOne = (name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="Team Name Generator"
      icon="🏆"
      description="Get cool, funny, or fierce team name ideas for sports, gaming, trivia, office teams, and fantasy football. 10 names every time."
      relatedTools={[
        { name: "Business Name Generator", href: "/business-name-generator" },
        { name: "Nickname Generator", href: "/nickname-generator" },
        { name: "Rap Name Generator", href: "/rap-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={faqItems}
    >
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                category === c.key
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Team Names
      </button>

      {names.length > 0 && (
        <div className="mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {names.map((name) => (
              <div key={name} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <span className="font-bold text-gray-900 text-base">{name}</span>
                <button
                  onClick={() => copyOne(name)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex-shrink-0 transition-colors"
                >
                  {copied === name ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={copyAll}
              className="flex-1 py-2.5 rounded-xl border border-indigo-300 text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              {copiedAll ? "Copied all!" : "Copy All"}
            </button>
            <button
              onClick={generate}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
