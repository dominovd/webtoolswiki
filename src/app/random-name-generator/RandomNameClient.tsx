"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

const maleFirstNames = [
  "James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles",
  "Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua",
  "Kenneth","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan",
  "Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon",
  "Benjamin","Samuel","Raymond","Gregory","Frank","Alexander","Patrick","Jack","Dennis","Jerry",
  "Tyler","Aaron","Jose","Adam","Nathan","Henry","Zachary","Douglas","Peter","Kyle",
  "Noah","Ethan","Jeremy","Christian","Walter","Keith","Austin","Roger","Terry","Sean",
];

const femaleFirstNames = [
  "Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen",
  "Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Dorothy","Kimberly","Emily","Donna",
  "Michelle","Carol","Amanda","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia",
  "Kathleen","Amy","Angela","Shirley","Anna","Brenda","Pamela","Emma","Nicole","Helen",
  "Samantha","Katherine","Christine","Debra","Rachel","Carolyn","Janet","Catherine","Maria","Heather",
  "Diane","Julie","Joyce","Victoria","Ruth","Virginia","Lauren","Kelly","Christina","Joan",
  "Evelyn","Judith","Olivia","Martha","Cheryl","Megan","Andrea","Hannah","Jacqueline","Ann",
  "Jean","Alice","Kathryn","Gloria","Teresa","Amber",
];

const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Phillips","Evans","Turner","Parker","Collins","Edwards","Stewart","Morris","Murphy","Cook",
  "Rogers","Morgan","Peterson","Cooper","Reed","Bailey","Bell","Gomez","Kelly","Howard",
  "Ward","Cox","Diaz","Richardson","Wood","Watson","Brooks","Bennett","Gray","James",
  "Reyes","Cruz","Hughes","Price","Butler","Foster","Powell","Long","Patterson","Hughes",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNames(gender: string, count: number): string[] {
  return Array.from({ length: count }, () => {
    let first: string;
    if (gender === "Male") first = pick(maleFirstNames);
    else if (gender === "Female") first = pick(femaleFirstNames);
    else first = Math.random() < 0.5 ? pick(maleFirstNames) : pick(femaleFirstNames);
    return `${first} ${pick(lastNames)}`;
  });
}

export default function RandomNameClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [gender, setGender] = useState("Any");
  const [count, setCount] = useState(5);
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setNames(generateNames(gender, count));
  };

  const handleCopy = (name: string, i: number) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(names.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Random Name Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A random name generator creates realistic-sounding fake names by combining common first names and last names from a curated database. Generated names look and feel like real people's names without being associated with any real individual, making them safe to use for testing, development, fiction, and privacy protection.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Random Name Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Choose a gender filter — Any, Male, or Female — to narrow the name style.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Select how many names you want to generate: 1, 5, 10, or 20 at a time.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate Names" to get a fresh batch of random names.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Click "Copy" on any individual name, or use "Copy All" to grab the full list.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Populating test databases and sample datasets with realistic names</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating placeholder names for UI/UX mockups and prototypes</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming fictional characters in stories, games, and scripts</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Filling out online forms without revealing your real identity</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Name Generator"
      description="Generate realistic fake first names, last names, and full names. Perfect for testing, fiction, forms, and protecting your privacy."
      icon="👤"
      relatedTools={[
        { name: "Username Generator", href: "/username-generator" },
        { name: "Password Generator", href: "/password-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {["Any", "Male", "Female"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many?</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n} value={n}>{n} name{n !== 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-colors"
      >
        Generate Names
      </button>

      {names.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">{names.length} name{names.length !== 1 ? "s" : ""} generated</p>
            <button
              onClick={handleCopyAll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {copiedAll ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="grid gap-2">
            {names.map((name, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{name}</span>
                <button
                  onClick={() => handleCopy(name, i)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 ml-3 flex-shrink-0"
                >
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
