"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Style = "Classic" | "Funny" | "Fearsome";

const CLASSIC_ADJ = ["Salty","Iron","Silver","Black","Red","Bloody","Mad","Bold","Daring","Fierce","Greedy","Jolly","Cursed","Golden","Scarlet","Rusty","Brave","Crafty","Shrewd","Wily"];
const CLASSIC_NAMES = ["Jack","Pete","Morgan","Drake","Kidd","Bonney","Rackham","Sparrow","Hook","Flint","Silver","Smee","Norrington","Barbossa","Will","Henry","James","Edward","Charles","Thomas"];
const CLASSIC_TITLES = ["the Dread","the Merciless","the Bold","the Cursed","the Fearsome","the Legend","the Terror","the Magnificent","the Infamous","the Notorious","the Unstoppable","the Dreaded","the Vile","the Plunderer","the Scoundrel","the Rogue","the Buccaneer","the Corsair","the Privateer","the Freebooter"];

const FUNNY_NAMES = ["Smellybeard McGee","Wobbly Walkplank","Toothless Tim the Terrible","One-Eyed Ollie","Flatfoot Freddie","Scurvy Sam the Smelly","Bumbling Barnacle Bob","Clumsy Captain Klutz","Dizzy Davy the Daft","Groggy Pete the Seasick","Hiccuping Harold","Itchy Ivan the Uncomfortable","Jumpy Jake the Nervous","Knobby-Knees Ned","Leaky Larry the Lost"];

const FEARSOME_NAMES = ["The Kraken's Wrath","Deathstorm","Doombringer","Soulsever","Bloodtide","Darkwater","Hellsea","Ironclad Terror","Jade Serpent","Killstorm","Leviathan's Bane","Maelstrom","Nightmare Tide","Ocean's Dread","Plague Ship"];

const STYLES: Style[] = ["Classic", "Funny", "Fearsome"];
const COUNTS = [1, 5, 10] as const;

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateClassic(): string {
  return `${rand(CLASSIC_ADJ)} ${rand(CLASSIC_NAMES)} ${rand(CLASSIC_TITLES)}`;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
}

function generateNames(style: Style, count: number): string[] {
  if (style === "Classic") {
    return Array.from({ length: count }, () => generateClassic());
  }
  if (style === "Funny") return pickRandom(FUNNY_NAMES, count);
  return pickRandom(FEARSOME_NAMES, count);
}

export default function PirateNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [style, setStyle] = useState<Style>("Classic");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(generateNames(style, count));
    setCopied(null);
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <ToolLayout
      title="Pirate Name Generator"
      icon="🏴‍☠️"
      description="Get a swashbuckling pirate name instantly. Classic, funny, and fearsome pirate names for parties, games, and any high-seas adventure."
      relatedTools={[
        { name: "Viking Name Generator", href: "/viking-name-generator" },
        { name: "Rap Name Generator", href: "/rap-name-generator" },
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Style selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Style</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                style === s
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Count + Generate */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {COUNTS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                count === c
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={generate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Generate Names
        </button>
        {names.length > 1 && (
          <button
            onClick={copyAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {copiedAll ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>

      {names.length > 0 ? (
        <div className="flex flex-col gap-3">
          {names.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="bg-amber-50 rounded-xl border border-amber-200 p-4 flex items-center justify-between gap-3"
            >
              <span className="text-base font-semibold text-gray-900">{name}</span>
              <button
                onClick={() => copyName(name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors flex-shrink-0"
              >
                {copied === name ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          Choose a style and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
