"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Gender = "Any" | "Male" | "Female";
type Style = "Historical Norse" | "Legendary" | "Berserker";

const MALE_NAMES = ["Ragnar","Bjorn","Erik","Leif","Gunnar","Sigurd","Ivar","Harald","Olaf","Sven","Ulf","Vidar","Thorin","Halfdan","Gorm","Rollo","Ragnvald","Egil","Gudmund","Ormr","Asgeir","Brynjar","Dagfinnr","Einarr","Finnbogi","Gisli","Hakon","Ingvar","Jorund","Ketil","Leidolf","Magni","Njall","Osvald","Palnatoki","Rolf","Skald","Thorbjorn","Ulfr","Valdimar"];
const MALE_KENNINGS = ["Ironside","Bloodaxe","Longbow","Stormborn","Deepmind","Ravenhair","Thunderfist","Shieldbiter","Wavecutter","Dragonslayer","Skullbreaker","Ironhide","Coldblood","Fireheart","Stormcrow","Wolfpelt","Bearsark","Ironbrand","Hawkeye","Serpentbane"];
const FEMALE_NAMES = ["Astrid","Freya","Sigrid","Gudrun","Helga","Ragnhild","Ingrid","Brynhildr","Sif","Skadi","Thora","Valdis","Yrsa","Asgerd","Bothild","Dagny","Eerika","Frida","Gunhild","Hild","Inga","Jorunn","Katla","Lagertha","Magnhild","Nanna","Oddrun","Ragna","Solveig","Torhild"];
const FEMALE_KENNINGS = ["Ironmaiden","Shieldmaiden","Stormcaller","Ravenwitch","Bloodlake","Frostborn","Moonweaver","Seafarer","Valkyrja","Wavewalker","Spellweaver","Runecarver","Dragonrider","Crystalborn","Darkwater","Emberheart","Frostweave","Goldtress","Heavenspear","Ironclad"];

const MEANINGS: Record<string, string> = {
  Ulf: "Wolf", Bjorn: "Bear", Ragnar: "Counsel + Army", Sif: "Wife/Bride",
  Freya: "Lady/Noble", Ivar: "Bow Warrior", Sigurd: "Victory Guard",
  Gunnar: "War Warrior", Halfdan: "Half-Dane", Vidar: "Wide Warrior",
  Astrid: "Divine Strength", Ingrid: "Beautiful", Helga: "Holy/Sacred",
  Gudrun: "God's Rune", Skadi: "Harm/Damage", Thora: "Thunder",
  Leif: "Heir/Descendant", Egil: "Edge/Terror", Hakon: "High Son",
  Magni: "Strong/Mighty", Nanna: "Daring/Brave",
};

const GENDERS: Gender[] = ["Any", "Male", "Female"];
const STYLES: Style[] = ["Historical Norse", "Legendary", "Berserker"];
const COUNTS = [1, 5, 10] as const;

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(gender: Gender, style: Style): { name: string; meaning?: string } {
  const useMale = gender === "Male" || (gender === "Any" && Math.random() < 0.5);
  const baseNames = useMale ? MALE_NAMES : FEMALE_NAMES;
  const kennings = useMale ? MALE_KENNINGS : FEMALE_KENNINGS;
  const baseName = rand(baseNames);
  const meaning = MEANINGS[baseName];

  if (style === "Historical Norse") {
    return { name: baseName, meaning };
  } else if (style === "Legendary") {
    return { name: `${baseName} ${rand(kennings)}`, meaning };
  } else {
    // Berserker — add "the" kenning
    return { name: `${baseName} the ${rand(kennings)}`, meaning };
  }
}

export default function VikingNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [gender, setGender] = useState<Gender>("Any");
  const [style, setStyle] = useState<Style>("Historical Norse");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<{ name: string; meaning?: string }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const results = Array.from({ length: count }, () => generateName(gender, style));
    setNames(results);
    setCopied(null);
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.map((n) => n.name).join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <ToolLayout
      title="Viking Name Generator"
      icon="⚔️"
      description="Create authentic Old Norse and Viking names with meanings. Male and female Viking names for games, stories, and creative projects."
      relatedTools={[
        { name: "Fantasy Name Generator", href: "/fantasy-name-generator" },
        { name: "Pirate Name Generator", href: "/pirate-name-generator" },
        { name: "Demon Name Generator", href: "/demon-name-generator" },
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
          {names.map(({ name, meaning }, i) => (
            <div
              key={`${name}-${i}`}
              className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-base font-semibold text-gray-900">{name}</span>
                {meaning && (
                  <p className="text-xs text-gray-400 mt-0.5">Meaning: {meaning}</p>
                )}
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
          Choose your options and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
