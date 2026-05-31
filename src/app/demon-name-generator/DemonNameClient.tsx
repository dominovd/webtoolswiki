"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Rank = "Lesser Demon" | "Greater Demon" | "Demon Lord" | "Archdevil";

const PREFIXES: Record<Rank, string[]> = {
  "Lesser Demon": ["Gar","Maz","Zor","Vel","Nox","Dusk","Grim","Vex","Kur","Nak","Ruk","Skol","Tor","Brak","Drak","Groth","Hrak","Krak","Lrak","Mrak"],
  "Greater Demon": ["Malachar","Vothrak","Xarzoth","Belthak","Zarathos","Darkmar","Gorthrak","Hexvorthar","Iraxor","Jezarak"],
  "Demon Lord": ["Azmodeus","Bel'zarath","Cythorax","Dyurrath","Elythrak","Falazor","Gothrazak","Hexathor","Ixalrak","Jarazoth"],
  "Archdevil": ["Mephistophex","Belzebathor","Asmodethrak","Dis'zarathex","Erathomax","Fal'zerathus","Gorthaximus","Hexathormax","Ixaraximus","Jazarathex"],
};

const SUFFIXES = ["ak","ar","ath","az","eth","gor","ix","kar","nak","nor","oth","rax","rek","rok","thar","thrak","ul","ur","vak","zar","zoth"];
const RANKS: Rank[] = ["Lesser Demon", "Greater Demon", "Demon Lord", "Archdevil"];
const COUNTS = [1, 5, 10] as const;

const RANK_BADGE: Record<Rank, string> = {
  "Lesser Demon": "bg-red-900 text-red-200",
  "Greater Demon": "bg-red-800 text-red-100",
  "Demon Lord": "bg-red-700 text-white",
  "Archdevil": "bg-rose-900 text-rose-100",
};

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDemonName(rank: Rank): string {
  const prefix = rand(PREFIXES[rank]);
  if (rank === "Lesser Demon") {
    return prefix + rand(SUFFIXES);
  }
  return prefix;
}

function pickUnique(rank: Rank, count: number): string[] {
  const pool = PREFIXES[rank];
  if (rank === "Lesser Demon") {
    const results: string[] = [];
    const seen = new Set<string>();
    let attempts = 0;
    while (results.length < count && attempts < 200) {
      const name = generateDemonName(rank);
      if (!seen.has(name)) { seen.add(name); results.push(name); }
      attempts++;
    }
    return results;
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, pool.length));
}

export default function DemonNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [rank, setRank] = useState<Rank>("Lesser Demon");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(pickUnique(rank, count));
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
      title="Demon Name Generator"
      icon="😈"
      description="Create dark, powerful demon names for D&D, fantasy writing, and horror games. Choose a rank for names that match the demon's power level."
      relatedTools={[
        { name: "Dragon Name Generator", href: "/dragon-name-generator" },
        { name: "Vampire Name Generator", href: "/vampire-name-generator" },
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Rank selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Demon Rank</p>
        <div className="flex flex-wrap gap-2">
          {RANKS.map((r) => (
            <button
              key={r}
              onClick={() => setRank(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                rank === r
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
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
          {names.map((name) => (
            <div
              key={name}
              className="bg-red-50 rounded-xl border border-red-100 p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RANK_BADGE[rank]}`}>
                  {rank}
                </span>
                <span className="text-base font-semibold text-gray-900">{name}</span>
              </div>
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
          Select a rank and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
