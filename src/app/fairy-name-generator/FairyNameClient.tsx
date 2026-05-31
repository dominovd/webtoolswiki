"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Gender = "Female" | "Male" | "Any";
type Style = "Whimsical" | "Dark Fae";

const WHIMSICAL_FEMALE_BASES = ["Dewdrop","Blossom","Petal","Shimmer","Glimmer","Sparkle","Twinkle","Whisper","Moonbeam","Starlight","Daffodil","Marigold","Clover","Willow","Fern","Meadow","Iris","Violet","Primrose","Lily"];
const WHIMSICAL_FEMALE_SUFFIXES = ["bell","wing","bloom","dust","glow","mist","spark","shine","light","dream","wish","dance","song","tale","fae","sprite","pixie","nymph"];

const WHIMSICAL_MALE_BASES = ["Thorn","Briar","Alder","Birch","Cedar","Elm","Oakhart","Pineshaw","Rowan","Sage","Aspen","Hazel","Linden","Mossgrow","Nettle","Osier","Poplar","Quill","Reed","Sorrel"];
const WHIMSICAL_MALE_SUFFIXES = ["swift","shadow","breeze","leaf","bark","root","stone","brook","glen","vale","moor","fen","dale","shaw","wood","grove","heath","bower","copse","weald"];

const DARK_FAE_NAMES = ["Nightshade","Shadowmere","Darkholm","Thornwick","Grimfae","Moonshard","Starless","Voidbloom","Duskpetal","Ashenwing","Eclipsemere","Gloomhaven","Hexbloom","Ironbramble","Jadewither","Kelpwraith","Lunadark","Mortiflora","Nightfall","Obsidianfae","Crimsonthorn","Duskwraith","Ebonbloom","Fadingstar","Gloomwing"];

const DESCRIPTIONS = [
  "keeper of morning dew",
  "guardian of the silver birch",
  "weaver of moonbeams",
  "dancer of twilight winds",
  "tender of forgotten blossoms",
  "whisperer of the ancient oak",
  "keeper of summer secrets",
  "watcher of the hollow hills",
  "singer of the midnight brook",
  "bearer of the first frost",
  "collector of lost dreams",
  "guardian of the forest edge",
  "weaver of spider silk and starlight",
  "keeper of the wild primrose",
  "tender of the glowworm lanterns",
  "caller of the spring rains",
  "guardian of the hedgerow paths",
  "keeper of the twilight pools",
  "weaver of cricket songs",
  "watcher of the amber harvest",
  "tender of the firefly meadows",
  "keeper of the winter stars",
  "guardian of the mossy stones",
  "singer of the willow's lament",
];

const COUNTS = [1, 5, 10] as const;

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(gender: "Female" | "Male", style: Style): { name: string; desc: string } {
  let name: string;

  if (style === "Dark Fae") {
    name = rand(DARK_FAE_NAMES);
  } else if (gender === "Female") {
    name = rand(WHIMSICAL_FEMALE_BASES) + rand(WHIMSICAL_FEMALE_SUFFIXES);
  } else {
    name = rand(WHIMSICAL_MALE_BASES) + rand(WHIMSICAL_MALE_SUFFIXES);
  }

  const desc = rand(DESCRIPTIONS);
  return { name, desc };
}

export default function FairyNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [gender, setGender] = useState<Gender>("Female");
  const [style, setStyle] = useState<Style>("Whimsical");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [results, setResults] = useState<{ name: string; desc: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const genders: ("Female" | "Male")[] =
      gender === "Any" ? ["Female", "Male"] : [gender];
    setResults(
      Array.from({ length: count }, () =>
        generateName(genders[Math.floor(Math.random() * genders.length)], style)
      )
    );
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

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Fairy Name Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A fairy name generator creates magical, whimsical names for fairy and fae characters in fantasy stories, RPGs, and creative projects. Fairy names traditionally draw from nature — flowers, elements, seasons, and woodland creatures — giving them a delicate, otherworldly quality. Our generator offers two styles: Whimsical (soft, nature-inspired names like Dewdrop or Blossom) and Dark Fae (gothic, mysterious names for the more sinister side of faerie mythology).</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Fairy Name Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Choose a gender: Female, Male, or Any.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Select a style: Whimsical for classic fairy names, or Dark Fae for gothic, mysterious names.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Set the quantity and click "Generate."</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Each name card shows the fairy name plus a nature-inspired title describing their role.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming fairy characters in fantasy novels, poetry, and creative writing</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating fae NPCs for D&D campaigns and Pathfinder adventures</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding fairy names for costumes, online handles, and social media aliases</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming characters in fairy-tale inspired video games and interactive fiction</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Fairy Name Generator"
      icon="🧚"
      description="Create magical, whimsical fairy names for stories, games, and creative projects. Choose between soft nature-inspired names or mysterious Dark Fae names."
      relatedTools={[
        { name: "Elf Name Generator", href: "/elf-name-generator" },
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Gender */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Gender</p>
        <div className="flex gap-2">
          {(["Female", "Male", "Any"] as Gender[]).map((g) => (
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

      {/* Style */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Style</p>
        <div className="flex gap-2">
          {(["Whimsical", "Dark Fae"] as Style[]).map((s) => (
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
                <p className="text-xs text-gray-400 mt-0.5 italic">{r.desc}</p>
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
          Select a style and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
