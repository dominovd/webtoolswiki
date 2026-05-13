"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PREFIXES = ["Pro", "Smart", "Pure", "True", "Peak", "Core", "Bright", "Next", "Bold", "Rise", "Nova", "Apex", "Prime", "Swift", "Clear", "Zen", "Vital", "Blue", "Green", "Red"];
const NOUNS = ["Hub", "Lab", "Works", "Studio", "Space", "Force", "Wave", "Spark", "Edge", "Flow", "Pulse", "Nest", "Forge", "Base", "Bridge", "Reach", "Sync", "Link", "Shift", "Craft"];
const MODERN_SUFFIXES = ["ly", "ify", "io", "ish", "co", "ai", "app", "hq"];
const CLASSIC_ENDINGS = ["& Co", "Group", "Partners", "Solutions", "Consulting", "Services", "Associates", "Enterprises"];

type Style = "modern" | "classic" | "creative" | "local";

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function generateNames(keyword: string, style: Style): string[] {
  const kw = keyword.trim();
  const names: string[] = [];

  for (let i = 0; i < 10; i++) {
    const prefix = rand(PREFIXES);
    const noun = rand(NOUNS);

    if (style === "modern") {
      if (kw) {
        const opts = [
          `${capitalize(kw)}${rand(MODERN_SUFFIXES)}`,
          `${prefix}${capitalize(kw)}`,
          `${capitalize(kw)}${noun}`,
          `${capitalize(kw)}${rand(MODERN_SUFFIXES)}`,
          `${prefix}${rand(MODERN_SUFFIXES)}`,
        ];
        names.push(rand(opts));
      } else {
        names.push(`${prefix}${rand(MODERN_SUFFIXES)}`);
      }
    } else if (style === "classic") {
      if (kw) {
        const opts = [
          `${capitalize(kw)} ${rand(CLASSIC_ENDINGS)}`,
          `${prefix} ${capitalize(kw)} ${rand(CLASSIC_ENDINGS)}`,
          `${capitalize(kw)} ${noun} ${rand(CLASSIC_ENDINGS)}`,
        ];
        names.push(rand(opts));
      } else {
        names.push(`${prefix} ${noun} ${rand(CLASSIC_ENDINGS)}`);
      }
    } else if (style === "creative") {
      if (kw) {
        const opts = [
          `${capitalize(kw)}${noun}`,
          `${prefix}${capitalize(kw)}`,
          `${capitalize(kw)}${prefix.toLowerCase()}`,
          `${prefix}${capitalize(kw)}${noun}`,
        ];
        names.push(rand(opts));
      } else {
        const opts = [
          `${prefix}${noun}`,
          `${noun}${prefix.toLowerCase()}`,
          `${prefix}${rand(NOUNS)}`,
        ];
        names.push(rand(opts));
      }
    } else {
      // local
      const cities = ["Austin", "Denver", "Portland", "Nashville", "Seattle", "Boston", "Phoenix", "Atlanta", "Dallas", "Miami"];
      const services = ["Plumbing", "Roofing", "Cleaning", "Catering", "Design", "Printing", "Landscaping", "Painting", "Moving", "Consulting"];
      if (kw) {
        const opts = [
          `${rand(cities)} ${capitalize(kw)}`,
          `${capitalize(kw)} of ${rand(cities)}`,
          `${rand(cities)} ${capitalize(kw)} ${rand(CLASSIC_ENDINGS)}`,
        ];
        names.push(rand(opts));
      } else {
        names.push(`${rand(cities)} ${rand(services)}`);
      }
    }
  }

  // deduplicate while preserving order
  return [...new Set(names)].slice(0, 10);
}

const STYLES: { key: Style; label: string }[] = [
  { key: "modern", label: "Modern" },
  { key: "classic", label: "Classic" },
  { key: "creative", label: "Creative" },
  { key: "local", label: "Local" },
];

export default function BusinessNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<Style>("modern");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(generateNames(keyword, style));
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
      title="Business Name Generator"
      icon="🏢"
      description="Generate creative, catchy business name ideas instantly. Enter an industry keyword and choose a style to get 10 name ideas."
      relatedTools={[
        { name: "Nickname Generator", href: "/nickname-generator" },
        { name: "Team Name Generator", href: "/team-name-generator" },
        { name: "Rap Name Generator", href: "/rap-name-generator" },
        { name: "Random Name Generator", href: "/random-name-generator" },
      ]}
      faqItems={faqItems}
    >
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry keyword <span className="text-gray-400 font-normal">(optional — e.g. coffee, tech, health)</span>
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. coffee"
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
        Generate Business Names
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
