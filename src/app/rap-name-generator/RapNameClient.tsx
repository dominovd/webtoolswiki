"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Style = "classic" | "trap" | "oldschool" | "lyrical";

const NOUNS = ["Blaze", "Frost", "Storm", "Gold", "Fire", "Ice", "Steel", "Stone", "Smoke", "Cash", "Hustle", "Flex", "Grind", "Wave", "Vibe", "Dime", "Ace", "King", "Boss", "Chief", "Prince", "Duke", "Baron", "Lord"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function cap(s: string): string {
  if (!s) return rand(NOUNS);
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function generateRapNames(firstName: string, lastName: string, style: Style): string[] {
  const fn = firstName.trim();
  const ln = lastName.trim();
  const f = fn ? cap(fn) : rand(NOUNS);
  const l = ln ? cap(ln) : rand(NOUNS);
  const noun = rand(NOUNS);

  if (style === "classic") {
    return [
      `Lil ${f}`,
      `Big ${f}`,
      `Young ${f}`,
      `DJ ${f}`,
      `${f} Dolla`,
      `${f} Millions`,
    ];
  } else if (style === "trap") {
    return [
      `${f} Gang`,
      `21 ${f}`,
      `${f} 6ix`,
      `${f} Huncho`,
      `Lil ${f} X`,
      `${f} Baby`,
    ];
  } else if (style === "oldschool") {
    return [
      `MC ${f}`,
      `${f} Def`,
      `${f} Ice`,
      `${f} Def Poetry`,
      `DJ ${f} Scratch`,
      `Grand Master ${f}`,
    ];
  } else {
    // lyrical
    return [
      `${f} the Poet`,
      `${f} Wordsmith`,
      `${f} Verse`,
      `${f} Rhyme`,
      `${f} Ink`,
      `Professor ${f}`,
    ];
  }
}

const STYLES: { key: Style; label: string }[] = [
  { key: "classic", label: "Classic Hip-Hop" },
  { key: "trap", label: "Trap" },
  { key: "oldschool", label: "Old School" },
  { key: "lyrical", label: "Lyrical" },
];

export default function RapNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [style, setStyle] = useState<Style>("classic");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(generateRapNames(firstName, lastName, style));
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
      title="Rap Name Generator"
      icon="🎤"
      description="Get your rapper name instantly. Enter your real name or go random — classic hip-hop, trap, old school, and lyrical styles."
      relatedTools={[
        { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator" },
        { name: "Nickname Generator", href: "/nickname-generator" },
        { name: "Business Name Generator", href: "/business-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={faqItems}
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. Drake"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. Graham"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
        <div className="flex gap-2 flex-wrap">
          {STYLES.map((s) => (
            <button
              key={s.key}
              onClick={() => setStyle(s.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                style === s.key
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Rap Names
      </button>

      {names.length > 0 && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-widest text-yellow-600 font-medium mb-3">Your rap names</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {names.map((name) => (
              <div key={name} className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex items-center justify-between gap-3">
                <span className="font-bold text-yellow-400 text-base">{name}</span>
                <button
                  onClick={() => copyOne(name)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg px-4 py-2 text-sm font-medium flex-shrink-0 transition-colors"
                >
                  {copied === name ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={copyAll}
              className="flex-1 py-2.5 rounded-xl border border-yellow-400 text-yellow-600 text-sm font-medium hover:bg-yellow-50 transition-colors"
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
