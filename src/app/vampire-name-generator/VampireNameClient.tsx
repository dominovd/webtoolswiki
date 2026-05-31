"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Gender = "Any" | "Male" | "Female";
type Style = "Classic Gothic" | "Modern Vampire" | "Ancient";

const GOTHIC_MALE = ["Vladislav","Dracula","Armand","Lestat","Damien","Sebastian","Lucian","Dorian","Adrian","Malachai","Corvus","Desmond","Emeric","Fabian","Gideon","Harkon","Iovinus","Jasper","Kael","Laurent","Mordecai","Nikolai","Oberon","Percival","Quintus","Ravenscroft","Silas","Thibault","Ulric","Valendar"];
const GOTHIC_FEMALE = ["Carmilla","Lilith","Seraphina","Arabella","Isadora","Celestine","Morgana","Vivienne","Evangeline","Theodora","Anastasia","Bianca","Claudia","Delphine","Elspeth","Francisca","Genevieve","Helena","Isolde","Jacinda","Katerina","Lavinia","Mirabelle","Nadine","Ophelia","Portia","Quintessa","Rosalind","Sophia","Tatiana"];
const MODERN = ["Raven","Ash","Storm","Zane","Blade","Nyx","Onyx","Shade","Dusk","Vex","Cain","Dean","Eli","Felix","Gael","Haze","Ivan","Jace","Knox","Lace","Mace","Sage","Ursa","Vale","Wade","Crow","Echo","Flint","Grey","Hex"];
const ANCIENT_MALE = ["Lucius Varro","Marcus Quintus","Gaius Nero","Titus Aemilius","Quintus Fabius","Decimus Brutus","Aulus Plautius","Spurius Papirius","Manius Curius","Publius Scipio"];
const ANCIENT_FEMALE = ["Livia Augusta","Julia Domna","Faustina Minor","Sabina Tranquilla","Plotina Pompeia","Valeria Maxima","Cornelia Metella","Aurelia Cotta","Pompeia Sullana","Servilia Caepionis"];

const GENDERS: Gender[] = ["Any", "Male", "Female"];
const STYLES: Style[] = ["Classic Gothic", "Modern Vampire", "Ancient"];
const COUNTS = [1, 5, 10] as const;

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
}

function buildPool(gender: Gender, style: Style): string[] {
  if (style === "Modern Vampire") return MODERN;
  if (style === "Ancient") {
    if (gender === "Male") return ANCIENT_MALE;
    if (gender === "Female") return ANCIENT_FEMALE;
    return [...ANCIENT_MALE, ...ANCIENT_FEMALE];
  }
  // Classic Gothic
  if (gender === "Male") return GOTHIC_MALE;
  if (gender === "Female") return GOTHIC_FEMALE;
  return [...GOTHIC_MALE, ...GOTHIC_FEMALE];
}

export default function VampireNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [gender, setGender] = useState<Gender>("Any");
  const [style, setStyle] = useState<Style>("Classic Gothic");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const pool = buildPool(gender, style);
    setNames(pickRandom(pool, count));
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
      title="Vampire Name Generator"
      icon="🧛"
      description="Create dark, aristocratic vampire names for games, stories, and Halloween. Dracula-inspired gothic names with classic and modern styles."
      relatedTools={[
        { name: "Demon Name Generator", href: "/demon-name-generator" },
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Gender selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Gender</p>
        <div className="flex gap-2">
          {GENDERS.map((g) => (
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
          {names.map((name) => (
            <div
              key={name}
              className="bg-purple-50 rounded-xl border border-purple-200 p-4 flex items-center justify-between gap-3"
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
