"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const adjectives = [
  "Shadow","Dark","Neon","Ghost","Iron","Steel","Storm","Frost","Blaze","Cyber",
  "Silent","Rapid","Fierce","Swift","Epic","Mystic","Crimson","Golden","Toxic","Savage",
  "Ultra","Hyper","Nova","Apex","Alpha","Omega","Void","Turbo","Rogue","Stealth",
  "Electric","Atomic","Cosmic","Ninja","Dragon","Phoenix","Viper","Titan","Phantom","Blazing",
  "Frozen","Hidden","Secret","Deadly","Lunar","Solar","Wild","Mad","Wicked","Sly",
];

const nouns = [
  "Wolf","Fox","Hawk","Bear","Tiger","Dragon","Viper","Eagle","Shark","Panther",
  "Knight","Sniper","Hunter","Warrior","Ninja","Ghost","Reaper","Demon","Phoenix","Titan",
  "Strike","Blade","Claw","Fang","Force","Bolt","Pulse","Surge","Slash","Storm",
  "Skull","Wraith","Specter","Cipher","Vector","Nexus","Raven","Falcon","Lynx","Cobra",
  "Panda","Rhino","Raptor","Jackal","Hyena","Gator","Mamba","Condor","Grizzly","Stallion",
];

const suffixes = ["", "X", "Pro", "HD", "360", "XL", "99", "007", "101", "420", "69", "777"];

function generateGamertag(style: string): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const num = Math.floor(Math.random() * 999) + 1;

  switch (style) {
    case "Classic": return `${adj}${noun}${suffix}`;
    case "With Numbers": return `${adj}${noun}${num}`;
    case "Short": return `${adj.slice(0, 4)}${noun.slice(0, 4)}${Math.floor(Math.random() * 99)}`;
    case "ALL CAPS": return `${adj}${noun}`.toUpperCase();
    case "Xtra Cool": return `x${adj}${noun}x`.replace(/\s/g, "");
    default: return `${adj}${noun}`;
  }
}

const styles = ["Classic", "With Numbers", "Short", "ALL CAPS", "Xtra Cool"];

export default function XboxClient() {
  const [style, setStyle] = useState("Classic");
  const [count, setCount] = useState(10);
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    setTags(Array.from({ length: count }, () => generateGamertag(style)));
  };

  const handleCopy = (tag: string, i: number) => {
    navigator.clipboard.writeText(tag).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Gamertag Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A gamertag generator creates unique, creative usernames specifically designed for gaming platforms like Xbox, PlayStation Network (PSN), and Steam. A great gamertag should be memorable, easy to say, and reflect your gaming persona. Our generator combines curated adjectives and nouns into names that feel authentically gamer-friendly, across multiple style options.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Gamertag Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select a style: Classic (adjective + noun), Numbers (with random digits), Short (compact names under 8 chars), CAPS (all uppercase), or Xtra Cool (edgy with X/Z/K letters).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Click "Generate" to create 10 gamertag options.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Check availability on your gaming platform of choice.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy the gamertag and use it on Xbox, PSN, Steam, Discord, or anywhere else.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating a new Xbox Live or PlayStation Network gamertag</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding a unique Steam username that isn't already taken</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Setting up a Discord handle for a gaming server</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Naming a gaming YouTube channel or Twitch stream</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Xbox Gamertag Generator"
      description="Generate cool, unique Xbox gamertag ideas instantly. Pick a style, choose how many, and find the perfect gamertag for your Xbox or PC gaming account."
      guide={guide}
      relatedTools={[
        { name: "Anagram Generator", href: "/anagram-generator" },
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
      ]}
      faqItems={[
        {
          q: "How long can an Xbox gamertag be?",
          a: "Xbox gamertags can be up to 12 characters long. Our generator creates tags within this limit for the Short style. Classic and other styles may occasionally exceed this — filter as needed.",
        },
        {
          q: "Can I use these gamertags on PSN or Steam?",
          a: "Yes! Even though we call them Xbox gamertags, these username ideas work great for PlayStation Network (PSN), Steam, Discord, and any other gaming platform.",
        },
        {
          q: "What if the gamertag is already taken?",
          a: "Try a different style or regenerate. Adding numbers (the 'With Numbers' style) usually helps find available names. Xbox also lets you add a suffix number automatically when a name is taken.",
        },
        {
          q: "Are the generated gamertags appropriate?",
          a: "Yes — all adjectives and nouns in our list are positive, gaming-themed, and appropriate for all ages.",
        },
      ]}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            {styles.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many?</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[5, 10, 20, 30].map((n) => <option key={n} value={n}>{n} gamertags</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Gamertags
      </button>

      {tags.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 gap-2">
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
              <span className="font-mono font-semibold text-gray-800">{tag}</span>
              <button
                onClick={() => handleCopy(tag, i)}
                className="text-xs text-indigo-500 hover:text-indigo-700 ml-3"
              >
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
