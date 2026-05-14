"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Style = "cute" | "cool" | "funny" | "gamer";

const GENERIC_BASES = ["Alex", "Max", "Sam", "Jay", "Lee", "Kai", "Ace", "Sky", "Ash", "Rio"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNicknames(name: string, style: Style): string[] {
  const base = name.trim() || rand(GENERIC_BASES);
  const b = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
  const nicknames: string[] = [];

  if (style === "cute") {
    const suffixes = ["ie", "y", "kins", "bear", "bug", "boo", "pea", "pie"];
    const prefixes = ["Sweet", "Little", "Baby", "Tiny", "Lil'"];
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        nicknames.push(`${b}${rand(suffixes)}`);
      } else {
        nicknames.push(`${rand(prefixes)} ${b}`);
      }
    }
  } else if (style === "cool") {
    const coolPrefixes = ["Ice", "Shadow", "Storm", "Blaze", "Rex", "Ace"];
    const coolSuffixes = ["ster", "zilla", "master", "lord", "pro"];
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        nicknames.push(`${rand(coolPrefixes)} ${b}`);
      } else {
        nicknames.push(`${b}${rand(coolSuffixes)}`);
      }
    }
  } else if (style === "funny") {
    const transforms = [
      `${b}inator`,
      `${b} the Great`,
      `${b} McFace`,
      `${b}tron`,
      `${b} 3000`,
      `${b} Deluxe`,
      `${b} Jr.`,
      `${b} XL`,
    ];
    return transforms;
  } else {
    // gamer
    const num = Math.floor(Math.random() * 900) + 100;
    const gamingSuffixes = ["xx", "_pro", "_gg", "_ez", "_yt", "_tv"];
    const bLower = b.toLowerCase();
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        nicknames.push(`${bLower}${rand(gamingSuffixes)}`);
      } else {
        const n = Math.floor(Math.random() * 9000) + 1000;
        nicknames.push(`${bLower}${n}`);
      }
    }
    nicknames[0] = `x${bLower}x`;
    nicknames[1] = `${bLower}${num}`;
  }

  return [...new Set(nicknames)].slice(0, 8);
}

const STYLES: { key: Style; label: string }[] = [
  { key: "cute", label: "Cute" },
  { key: "cool", label: "Cool" },
  { key: "funny", label: "Funny" },
  { key: "gamer", label: "Gamer" },
];

export default function NicknameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [name, setName] = useState("");
  const [style, setStyle] = useState<Style>("cute");
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNicknames(generateNicknames(name, style));
    setCopied(null);
  };

  const copyOne = (nick: string) => {
    navigator.clipboard.writeText(nick).then(() => {
      setCopied(nick);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(nicknames.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Nickname Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A nickname generator creates personalised, fun alternatives to someone's real name. Nicknames can be cute, cool, funny, or gamer-style depending on the context. Whether you need a sweet nickname for a friend, an edgy alias for gaming, or a silly name for a group chat, our generator transforms any name into something memorable with just one click.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Nickname Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Type a name — your own, a friend's, or any word — into the input box.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Select a style: Cute (sweet, affectionate), Cool (edgy, confident), Funny (humorous, playful), or Gamer (gaming platform-ready).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate" to get 8 nickname ideas.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy any nickname you like and use it on social media, messaging apps, or gaming platforms.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating a cute pet name or term of endearment for a friend or partner</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding a cool gaming alias for Xbox, Discord, or Roblox</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating funny group chat names based on someone's real name</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Coming up with a social media username based on your actual name</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Nickname Generator"
      icon="😎"
      description="Generate fun, cute, or cool nicknames based on a name or word. Perfect for friends, gaming, and social media profiles."
      relatedTools={[
        { name: "Business Name Generator", href: "/business-name-generator" },
        { name: "Team Name Generator", href: "/team-name-generator" },
        { name: "Rap Name Generator", href: "/rap-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name or word <span className="text-gray-400 font-normal">(optional — leave blank for random)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. Alex"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
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
        Generate Nicknames
      </button>

      {nicknames.length > 0 && (
        <div className="mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {nicknames.map((nick) => (
              <div key={nick} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <span className="font-bold text-gray-900 text-base">{nick}</span>
                <button
                  onClick={() => copyOne(nick)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex-shrink-0 transition-colors"
                >
                  {copied === nick ? "Copied!" : "Copy"}
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
