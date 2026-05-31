"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type DragonType = "Ancient" | "Fire" | "Ice" | "Shadow" | "Sea";

const PARTS: Record<DragonType, { pre: string[]; mid: string[]; suf: string[] }> = {
  Ancient: {
    pre: ["Kard","Zyr","Rax","Thor","Vax","Keth","Drax","Phar","Gar","Xthar","Oryx","Pyrax","Zareth","Kraxt","Gorthax","Nethkar","Xanthrak","Zephkard","Balthax","Malthor","Korrax","Tyraxon","Vorthak","Draxor","Pharathor","Garrox","Xethrak","Zandhor","Kraxton","Drathor"],
    mid: ["a","ar","ax","eth","or","oth","ox","ra","rax","rak","rath","rex","rix","rox","thax","thor","uk","ur","us","ux"],
    suf: ["ax","dor","eth","gor","kor","nar","nor","or","oth","rax","ron","sor","tar","thor","thos","tor","tur","us","vor","xor"],
  },
  Fire: {
    pre: ["Flam","Scor","Brax","Drak","Embr","Pyr","Blas","Cind","Flar","Ign","Scald","Blaz","Flick","Comb","Sear","Smol","Ash","Char","Glut","Smelt","Flare","Braze","Scorch","Kindle","Infer","Pyre","Magm","Volc","Caus","Furn"],
    mid: ["a","ar","en","or","ax","er","al","us","ok","ox","on","el","ex","in","ro","ra","ak","ix","ul","ur"],
    suf: ["ax","or","us","ath","nor","dor","gar","kar","nax","rax","thor","kor","vor","tar","nar","sor","tur","eth","xor","ron"],
  },
  Ice: {
    pre: ["Frost","Glac","Cryst","Shim","Blit","Sleet","Hail","Rime","Blizz","Chill","Freez","Polar","Tund","Arct","Shiv","Numb","Permaf","Floe","Drift","Shard","Glacid","Frostyn","Crystax","Sleethar","Hailkar","Rimenth","Blizzar","Chillrax","Freezeth","Polarthor"],
    mid: ["a","i","yn","ith","iss","ix","il","in","im","ir","is","yt","yll","yss","ynn","ith","ism","ixt","ild","ilm"],
    suf: ["ith","iss","yn","ix","yl","im","in","yst","yss","ynn","ilt","ild","ilm","ixt","ism","lyn","ryn","syn","tyn","zyn"],
  },
  Shadow: {
    pre: ["Shad","Vorth","Grim","Nyct","Umbr","Dusk","Mur","Noc","Crypt","Ebon","Shroud","Veil","Pall","Gloom","Dread","Bane","Morte","Phant","Spect","Wraith","Shadowyx","Vorthex","Grimoth","Nyctorax","Umbrax","Duskveil","Murkthorn","Nocthor","Cryptex","Ebonyx"],
    mid: ["a","al","ar","el","en","er","or","oth","yl","yr","um","ix","ax","ex","ox","ur","us","os","on","an"],
    suf: ["oth","yx","ex","ax","us","or","el","en","yl","yn","um","ix","ox","ur","os","on","an","ar","al","er"],
  },
  Sea: {
    pre: ["Trit","Shark","Mare","Cor","Tid","Surf","Reef","Brine","Tidal","Corl","Aqua","Plag","Naut","Deeps","Abyss","Billow","Crest","Eddyr","Vort","Temp","Tritonus","Sharkoral","Marestir","Coralius","Tideborn","Surfkalar","Reefnax","Brineor","Tidalus","Corlaxon"],
    mid: ["a","al","ar","on","us","or","el","en","ia","io","ax","ex","an","is","os","ul","ur","ir","im","in"],
    suf: ["on","us","al","or","el","en","ia","io","ax","ex","an","is","os","ul","ur","ir","im","in","ith","iss"],
  },
};

const TYPES: DragonType[] = ["Ancient", "Fire", "Ice", "Shadow", "Sea"];
const COUNTS = [1, 5, 10] as const;

const TYPE_COLORS: Record<DragonType, string> = {
  Ancient: "bg-yellow-100 text-yellow-800",
  Fire: "bg-red-100 text-red-700",
  Ice: "bg-blue-100 text-blue-700",
  Shadow: "bg-gray-200 text-gray-700",
  Sea: "bg-teal-100 text-teal-700",
};

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDragonName(type: DragonType): string {
  const { pre, mid, suf } = PARTS[type];
  const useMid = Math.random() > 0.45;
  const raw = rand(pre) + (useMid ? rand(mid) : "") + rand(suf);
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

export default function DragonNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [dragonType, setDragonType] = useState<DragonType>("Ancient");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(Array.from({ length: count }, () => generateDragonName(dragonType)));
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

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Dragon Name Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A dragon name generator creates powerful, ancient-sounding names for dragon characters in fantasy settings. Dragons are among the most iconic creatures in mythology and fantasy, and their names should reflect their age, power, and elemental nature. Our generator offers five dragon types — Ancient, Fire, Ice, Shadow, and Sea — each with names tuned to their unique personality and elemental theme, using appropriate phonetics and syllable patterns.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Dragon Name Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select a dragon type: Ancient (hard K/R/X sounds), Fire (aggressive consonants), Ice (crisp and sharp), Shadow (mysterious), or Sea (flowing and oceanic).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose how many names to generate.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate Dragon Names" and browse the results.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy your chosen name.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming dragon enemies and allies in D&D campaigns and Pathfinder</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating dragon characters for fantasy novels and world-building projects</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding names for dragon mounts, familiars, and companions in RPGs</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming dragons in video games and online role-playing communities</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Dragon Name Generator"
      icon="🐉"
      description="Create powerful, ancient dragon names for D&D, fantasy writing, and games. Choose your dragon type to get names with the right sound profile."
      relatedTools={[
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
        { name: "Demon Name Generator", href: "/demon-name-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Dragon type selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Dragon Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setDragonType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dragonType === t
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
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
              key={i}
              className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[dragonType]}`}>
                  {dragonType}
                </span>
                <span className="text-base font-semibold text-gray-900">{name}</span>
              </div>
              <button
                onClick={() => copyName(name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shrink-0"
              >
                {copied === name ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          Select a dragon type and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
