"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Race = "Human" | "Elf" | "Dwarf" | "Orc" | "Wizard" | "Rogue";
type Gender = "Any" | "Male" | "Female";

const NAMES: Record<Race, { male: string[]; female: string[] }> = {
  Human: {
    male: ["Aldric","Beron","Caelen","Dorian","Edric","Faelan","Gareth","Hadrian","Ivan","Jorath","Kelvin","Loran","Marius","Nolan","Osric","Percival","Quentin","Renly","Soren","Tomas","Ulric","Varen","Weston","Xander","Yoren","Zander","Aldous","Brander","Crispin","Daven"],
    female: ["Alara","Brynn","Cassiel","Dara","Elara","Fiona","Gwen","Hana","Isolde","Jessa","Kara","Lyra","Mara","Nora","Opal","Perra","Quinn","Rena","Sable","Tara","Una","Vela","Wren","Xara","Yara","Zara","Alissa","Brielle","Celia","Dalia"],
  },
  Elf: {
    male: ["Aerindel","Caladorn","Elarion","Faelar","Galanor","Halavan","Ithilion","Jariel","Kalenor","Larendel","Miralion","Naeryn","Orendel","Paladion","Quarion","Riandel","Sarandel","Thaladorn","Urandel","Valanor","Wrandel","Xalandel","Yarandel","Zalandor","Aerandel","Balandor","Carandel","Darandel","Earandel","Falandor"],
    female: ["Aelindra","Caladria","Elindra","Faelindra","Galandria","Halvindra","Ithindra","Jarlindra","Kalindra","Larindra","Miralindra","Naerindra","Orindra","Palindra","Quarindra","Rialindra","Sarindra","Thalindra","Urindra","Valindra","Wrindra","Xalindra","Yarindra","Zalindra","Aerlindra","Balindra","Carindra","Darindra","Earindra","Falindra"],
  },
  Dwarf: {
    male: ["Balin","Dwalin","Thorin","Gloin","Oin","Bifur","Bofur","Bombur","Dori","Nori","Ori","Fili","Kili","Gimli","Bram","Dolgrin","Eberk","Fargrim","Gardain","Harbek","Jundal","Kathra","Maulnar","Nadar","Oloric","Rangrim","Saber","Tordek","Ulfgar","Vondal"],
    female: ["Amber","Asta","Dagnal","Diesa","Eldeth","Falkrunn","Finellen","Gunnloda","Gurdis","Helja","Hlin","Kathra","Kristryd","Ilde","Liftrasa","Mardred","Riswynn","Sannl","Torbera","Torgga","Vistra","Brunhild","Dagmar","Edda","Freydis","Geirrid","Helga","Ingrid","Sigrid","Thora"],
  },
  Orc: {
    male: ["Gorgrak","Hurthak","Karthak","Morgar","Nagrak","Orthak","Rorthar","Skorthak","Urgash","Varthak","Worghak","Xarthak","Yargar","Zorthak","Grommash","Hellscream","Blackhand","Doomhammer","Stonemaul","Bonegrip","Bloodfist","Darkspear","Redmaw","Grimfang","Skullcrusher","Ironjaw","Warbringer","Deathsnarl","Grimscar","Boulderfist"],
    female: ["Gorsha","Hursha","Karsha","Morga","Nagrsha","Orsha","Rorsha","Skasha","Urgha","Varsha","Worsha","Xarsha","Yarsha","Zorsha","Gromsha","Hellsha","Blacksha","Doomsha","Stonesha","Bonesha","Bloodsha","Darksha","Redsha","Grimsha","Skullsha","Ironsha","Warsha","Deathsha","Stonefist","Bloodwrath"],
  },
  Wizard: {
    male: ["Aldarius","Balthazor","Celestian","Draventus","Elathius","Faridion","Galadrius","Horathion","Izarius","Jorenthos","Kalandros","Lorathius","Malachios","Naldorius","Orendrius","Pharanthus","Quintarius","Ranthios","Sorathus","Thalamdrus","Urandios","Valdorius","Wendarius","Xaranthos","Yordathus","Zalamdus","Azuranthos","Brandorius","Crystamius","Dawnarius"],
    female: ["Alathia","Brilliana","Celestria","Draventina","Elathira","Faridara","Galadria","Horathina","Izaria","Jorenthra","Kalandria","Lorathia","Malachira","Naldoria","Orindra","Pharanthra","Quintaria","Ranthia","Sorathia","Thalindra","Urathia","Valdoria","Wendaria","Xaranthia","Yordathia","Zalamira","Azuranthia","Brandoria","Crystamia","Dawnathra"],
  },
  Rogue: {
    male: ["Zax","Krix","Vex","Rix","Dax","Zex","Kix","Vrax","Drex","Syx","Zix","Krex","Vox","Rax","Nix","Grix","Pex","Quix","Zox","Wrax","Brex","Flux","Jax","Knix","Lox","Mex","Prex","Shax","Thrix","Wex"],
    female: ["Zaxa","Krixa","Vexa","Rixa","Daxa","Zexa","Kixa","Vraxa","Drexa","Syxa","Zixa","Krexa","Voxa","Raxa","Nixa","Grixa","Pexa","Quixa","Zoxa","Wraxa","Brexa","Fluxa","Jaxa","Knixa","Loxa","Mexa","Prexa","Shaxa","Thrixa","Wexa"],
  },
};

const RACES: Race[] = ["Human", "Elf", "Dwarf", "Orc", "Wizard", "Rogue"];
const COUNTS = [1, 5, 10] as const;

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

export default function FantasyNameClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [race, setRace] = useState<Race>("Human");
  const [gender, setGender] = useState<Gender>("Any");
  const [count, setCount] = useState<1 | 5 | 10>(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    const pool: string[] = [];
    const data = NAMES[race];
    if (gender === "Any" || gender === "Male") pool.push(...data.male);
    if (gender === "Any" || gender === "Female") pool.push(...data.female);
    setNames(pickRandom(pool, count));
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
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Fantasy Name Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A fantasy name generator creates unique character names for tabletop RPGs, novels, video games, and creative writing. Different fantasy races have distinct naming conventions: elves use flowing, melodic names; dwarves use hard, guttural sounds; orcs use aggressive consonants; wizards use mystical, ancient-sounding names. Our generator covers six major fantasy archetypes so you can find the perfect name for any character, regardless of their race or role.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Fantasy Name Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select a race or archetype: Human, Elf, Dwarf, Orc, Wizard, or Rogue.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose a gender: Male, Female, or Any.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Set how many names to generate (1, 5, or 10).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Click "Generate" and copy any name you like.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming D&D, Pathfinder, or other tabletop RPG characters</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating character names for fantasy novels and short stories</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding NPC names for dungeon masters and game masters</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming characters in video games, MMOs, and online role-playing</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Fantasy Name Generator"
      icon="⚔️"
      description="Create unique fantasy names for characters, heroes, villains, and NPCs. Perfect for D&D, RPGs, and fiction writing."
      relatedTools={[
        { name: "Elf Name Generator", href: "/elf-name-generator" },
        { name: "Dragon Name Generator", href: "/dragon-name-generator" },
        { name: "Quirk Generator", href: "/quirk-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Race selector */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Race / Style</p>
        <div className="flex flex-wrap gap-2">
          {RACES.map((r) => (
            <button
              key={r}
              onClick={() => setRace(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                race === r
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Gender selector */}
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
              className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between"
            >
              <span className="text-base font-semibold text-gray-900">{name}</span>
              <button
                onClick={() => copyName(name)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {copied === name ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          Select a race and click Generate Names to begin.
        </div>
      )}
    </ToolLayout>
  );
}
