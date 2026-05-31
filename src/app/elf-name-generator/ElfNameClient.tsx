"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Gender = "Any" | "Male" | "Female";

const START: string[] = ["Ae","Al","An","Ar","Ca","Ce","El","Er","Fa","Fe","Ga","Gal","Il","Ir","Ka","Ke","La","Le","Li","Lor","Mi","Na","Ne","Or","Pa","Qu","Ra","Re","Ri","Sa","Si","Tal","Th","Ti","Ul","Va","Vi","Xal","Ya","Za"];
const MID: string[] = ["an","ar","el","en","er","il","in","ir","la","le","li","lo","na","ne","ni","or","ra","re","ri","ro","sa","si","ta","te","ti","ul","va","vi","xa","ya","za"];
const END_MALE: string[] = ["ael","aer","al","an","aorn","ar","ath","del","dor","el","eon","er","ial","iel","il","ion","ior","ith","lar","lian","lor","mus","n","nael","nel","nor","noth","or","oth","riel","rion","ron","sar","sel","sol","sor","thor","thon","thos","tiel","tor","ul","van","vel","vor","wyn","xan","yl","yr"];
const END_FEMALE: string[] = ["a","ae","aera","aiel","aia","ala","alle","ana","anel","ara","aria","ariel","aryn","aya","ela","elia","ella","elra","ena","era","eria","ia","iel","ila","ilia","ina","ira","la","lia","liel","lira","na","nae","nara","niel","nira","ra","rae","rael","raia","riel","rina","sa","sel","siel","sia","stra","ta","tae","tiel","tia","ula","via","ya","yael","yara","yiel"];

// Syllable meanings for building composite meanings
const MEANINGS: Record<string, string> = {
  Ae: "eternal", Al: "bright", An: "grace", Ar: "noble", Ca: "silver",
  Ce: "pure", El: "star", Er: "ancient", Fa: "wind", Fe: "spirit",
  Ga: "golden", Gal: "radiant", Il: "moon", Ir: "dawn", Ka: "swift",
  Ke: "gentle", La: "forest", Le: "leaf", Li: "light", Lor: "song",
  Mi: "dream", Na: "night", Ne: "river", Or: "sun", Pa: "peace",
  Qu: "water", Ra: "fire", Re: "earth", Ri: "sky", Sa: "shadow",
  Si: "silence", Tal: "high", Th: "wild", Ti: "free", Ul: "deep",
  Va: "twilight", Vi: "bloom", Xal: "crystal", Ya: "dawn", Za: "mystery",
};

function getMeaning(start: string, end: boolean): string {
  const base = MEANINGS[start] ?? "ancient";
  const suffixes = end
    ? ["one", "child", "guardian", "walker", "born", "seeker", "weaver"]
    : ["spirit", "heart", "soul", "light", "keeper", "dreamer", "singer"];
  return base + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateElfName(gender: "Male" | "Female"): { name: string; meaning: string } {
  const start = rand(START);
  const endArr = gender === "Male" ? END_MALE : END_FEMALE;
  // 50% chance to add a mid syllable
  const useMid = Math.random() > 0.5;
  const mid = useMid ? rand(MID) : "";
  const end = rand(endArr);
  const raw = start + mid + end;
  // Trim to max 14 chars
  const name = raw.length > 14 ? start + end : raw;
  // Capitalise properly
  const finalName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const meaning = getMeaning(start, gender === "Male");
  return { name: finalName, meaning };
}

const COUNTS = [1, 5, 10] as const;

export default function ElfNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [gender, setGender] = useState<Gender>("Any");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [results, setResults] = useState<{ name: string; meaning: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const genders: ("Male" | "Female")[] =
      gender === "Any" ? ["Male", "Female"] : [gender];
    const list = Array.from({ length: count }, () =>
      generateElfName(genders[Math.floor(Math.random() * genders.length)])
    );
    setResults(list);
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.map((r) => r.name).join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <ToolLayout
      title="Elf Name Generator"
      icon="🌿"
      description="Create beautiful, authentic elvish names for D&D characters, fantasy novels, and games. Each name comes with a suggested meaning."
      relatedTools={[
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
        { name: "Dragon Name Generator", href: "/dragon-name-generator" },
        { name: "Fairy Name Generator", href: "/fairy-name-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Gender */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Gender</p>
        <div className="flex gap-2">
          {(["Any", "Male", "Female"] as Gender[]).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                gender === g
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {g}
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
        {results.length > 1 && (
          <button
            onClick={copyAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {copiedAll ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-base font-semibold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 italic">{r.meaning}</p>
              </div>
              <button
                onClick={() => copyName(r.name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shrink-0"
              >
                {copied === r.name ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          Select a gender and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
