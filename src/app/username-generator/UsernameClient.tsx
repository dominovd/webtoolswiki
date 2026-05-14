"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

const classicAdj = [
  "Cool","Fast","Bold","Keen","Wild","Epic","Iron","Blue","Gold","Dark",
  "Soft","Pure","Bright","Calm","Swift","Sharp","Lucky","Brave","Quiet","Grand",
];
const classicNoun = [
  "Tiger","Fox","Bear","Hawk","Wolf","Eagle","Lion","Shark","Drake","Storm",
  "Rock","Flame","River","Stone","Cloud","Byte","Code","Pixel","Wave","Peak",
];

const gamerAdj = ["Shadow","Neon","Iron","Blaze","Storm","Dark","Ghost","Viper","Cyber","Toxic","Savage","Void","Nova","Apex","Rogue"];
const gamerNoun = ["Wolf","Knight","Hunter","Dragon","Phoenix","Titan","Viper","Reaper","Blade","Strike","Force","Claw","Fang","Edge","Rush"];

const aestheticWord = ["soft","lunar","starry","pastel","dreamy","quiet","velvet","honey","bloom","sage","mist","glow","dusk","dawn","petal","cloud","silk","haze","lavender","rose"];
const aestheticSuffix = ["girl","angel","core","aesthetic","mode","life","vibes","heart","soul","dreams"];

const darkPrefix = ["Dark","Shadow","Void","Death","Ghost","Raven","Grave","Dusk","Bleak","Grim"];
const darkNoun = ["Walker","Seeker","Hunter","Knight","Lord","Reaper","Soul","Shade","Wraith","Bane"];

const proFirst = ["Alex","Jordan","Morgan","Taylor","Casey","Riley","Cameron","Avery","Quinn","Blake","Drew","Skyler","Devon","Reese","Parker"];
const proLast = ["Chen","Kim","Park","Lee","Wang","Smith","Jones","Brown","Davis","Wilson","Moore","Taylor","Anderson","Thomas","Jackson"];
const proRoles = ["Dev","Pro","Digital","Consulting","Creative","Solutions","Studio","Works","Labs","Co"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function incorporateKeyword(username: string, keyword: string): string {
  if (!keyword.trim()) return username;
  const kw = keyword.trim().replace(/\s+/g, "");
  const r = Math.random();
  if (r < 0.33) return kw + username;
  if (r < 0.66) return username + kw;
  return kw + "_" + username;
}

function generateUsername(style: string, keyword: string): string {
  let base = "";
  switch (style) {
    case "Classic":
      base = pick(classicAdj) + pick(classicNoun) + rnd(10, 999);
      break;
    case "Gamer":
      base = pick(gamerAdj) + pick(gamerNoun) + (Math.random() < 0.5 ? rnd(1, 99).toString() : "");
      break;
    case "Aesthetic":
      base = pick(aestheticWord) + pick(aestheticSuffix);
      break;
    case "Dark":
      base = pick(darkPrefix) + pick(darkNoun) + (Math.random() < 0.4 ? rnd(1, 99).toString() : "");
      break;
    case "Professional":
      if (Math.random() < 0.5) {
        base = pick(proFirst) + "." + pick(proLast);
      } else {
        base = pick(proFirst) + pick(proLast) + pick(proRoles);
      }
      break;
    default:
      base = pick(classicAdj) + pick(classicNoun) + rnd(10, 999);
  }

  if (keyword.trim()) {
    return incorporateKeyword(base, keyword);
  }
  return base;
}

const styles = ["Classic", "Gamer", "Aesthetic", "Dark", "Professional"];

export default function UsernameClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState("Classic");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setUsernames(Array.from({ length: 10 }, () => generateUsername(style, keyword)));
  };

  const handleCopy = (u: string, i: number) => {
    navigator.clipboard.writeText(u).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(usernames.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Username Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A username generator creates unique, creative usernames for social media, gaming platforms, forums, and apps. A good username should be memorable, available, and reflect your personality or brand. Our generator offers five distinct styles — from classic combinations to gamer tags and aesthetic handles — so you can find the perfect fit for any platform.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Username Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Optionally enter a keyword or your name to personalise the results.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Select a username style: Classic, Gamer, Aesthetic, Dark, or Professional.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate" to see 10 username suggestions instantly.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy any username you like and check its availability on your target platform.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating a unique gaming handle for Xbox, PlayStation, or Steam</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Finding an available Instagram, TikTok, or Twitter username</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Setting up a Discord or Reddit account name</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating professional usernames for LinkedIn or work tools</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Username Generator"
      description="Create cool, unique usernames for gaming, social media, Discord, TikTok, and more. Pick a style, add an optional keyword, and get 10 results instantly."
      icon="@"
      relatedTools={[
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
        { name: "Password Generator", href: "/password-generator" },
        { name: "Random Name Generator", href: "/random-name-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Keyword (optional)</label>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. dragon, luna…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            maxLength={20}
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-colors"
      >
        Generate Usernames
      </button>

      {usernames.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">10 usernames — {style} style</p>
            <button
              onClick={handleCopyAll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {copiedAll ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {usernames.map((u, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                <span className="font-mono font-semibold text-gray-900">{u}</span>
                <button
                  onClick={() => handleCopy(u, i)}
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
