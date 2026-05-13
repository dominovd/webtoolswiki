"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const ADJECTIVE_MAP: Record<string, string> = {
  A: "Abysmal",
  B: "Bastard",
  C: "Calculated",
  D: "Devastatin'",
  E: "Enlightened",
  F: "Furious",
  G: "Gravediggin'",
  H: "Hardened",
  I: "Intellectual",
  J: "Justified",
  K: "Killer",
  L: "Lyrical",
  M: "Mystical",
  N: "Notorious",
  O: "Old Dirty",
  P: "Phantom",
  Q: "Quiet Storm",
  R: "Reckless",
  S: "Shaolin",
  T: "Tactical",
  U: "Unbreakable",
  V: "Violent",
  W: "Wicked",
  X: "Xtreme",
  Y: "Youthful",
  Z: "Zesty",
};

const NOUN_MAP: Record<string, string> = {
  A: "Assassin",
  B: "Bandit",
  C: "Crusher",
  D: "Destroyer",
  E: "Emperor",
  F: "Fist",
  G: "Ghost",
  H: "Hawk",
  I: "Intellectual",
  J: "Justice",
  K: "Killa",
  L: "Lion",
  M: "Master",
  N: "Ninja",
  O: "Oracle",
  P: "Prophet",
  Q: "Quan",
  R: "Rebel",
  S: "Slayer",
  T: "Tiger",
  U: "Undertaker",
  V: "Villain",
  W: "Warrior",
  X: "Xecutioner",
  Y: "Youth",
  Z: "Zealot",
};

function getLetter(input: string): string {
  return input.trim().charAt(0).toUpperCase();
}

function getWuName(firstName: string, lastName: string): string | null {
  const fLetter = getLetter(firstName);
  const lLetter = getLetter(lastName);
  if (!fLetter || !lLetter) return null;
  const adj = ADJECTIVE_MAP[fLetter];
  const noun = NOUN_MAP[lLetter];
  if (!adj || !noun) return null;
  return `${adj} ${noun}`;
}

export default function WuTangClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setError("");
    setResult(null);
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both a first name and a last name.");
      return;
    }
    const name = getWuName(firstName, lastName);
    if (!name) {
      setError("Could not generate a name — make sure both names start with a letter.");
      return;
    }
    setResult(name);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") generate();
  };

  return (
    <ToolLayout
      title="Wu-Tang Name Generator"
      icon="🎤"
      description="Enter your real name and discover your official Wu-Tang Clan name. Based on the classic Wu-Tang Name Generator formula — first letter of first name gives your adjective, first letter of last name gives your noun."
      relatedTools={[
        { name: "Quirk Generator", href: "/quirk-generator" },
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
        { name: "Disney Character Generator", href: "/disney-character-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={[
        {
          q: "How does the Wu-Tang name formula work?",
          a: "The classic Wu-Tang Name Generator maps the first letter of your first name to an adjective and the first letter of your last name to a noun. Combine them and that's your Wu-Tang Clan name — forever.",
        },
        {
          q: "Is this the official Wu-Tang name generator?",
          a: "This is based on the widely circulated Wu-Tang Name Generator formula popularized in the 1990s. It's not an official Wu-Tang Clan product, but the formula is the same one the internet has loved for decades.",
        },
        {
          q: "What if my letter isn't in the list?",
          a: "All 26 letters A–Z are covered. Make sure your name starts with a standard Latin letter. Names beginning with numbers or special characters won't match — try a nickname instead.",
        },
      ]}
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Robert"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Diggs"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <p className="mb-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Wu-Tang Name
      </button>

      {result && (
        <div className="mt-6 rounded-2xl bg-gray-800 border border-gray-700 px-6 py-8 text-center">
          <p className="text-xs uppercase tracking-widest text-yellow-500 mb-3 font-medium">
            Your Wu-Tang name is
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-yellow-400 leading-tight">
            {result}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {getLetter(firstName)} → {ADJECTIVE_MAP[getLetter(firstName)]} &nbsp;·&nbsp;
            {getLetter(lastName)} → {NOUN_MAP[getLetter(lastName)]}
          </p>
          <button
            onClick={handleCopy}
            className="mt-5 px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-sm font-semibold transition-colors"
          >
            {copied ? "Copied!" : "Copy Name"}
          </button>
        </div>
      )}

      {!result && (
        <div className="mt-6 rounded-2xl bg-gray-800 border border-gray-700 px-6 py-8 text-center">
          <p className="text-gray-500 text-sm">Enter your name above to reveal your Wu-Tang identity.</p>
        </div>
      )}
    </ToolLayout>
  );
}
