"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function shuffle(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function generateAnagrams(input: string, count: number): string[] {
  const clean = input.toUpperCase().replace(/[^A-Z]/g, "");
  if (clean.length < 2) return [];
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < count && attempts < 10000) {
    const shuffled = shuffle(clean);
    if (shuffled !== clean) results.add(shuffled);
    attempts++;
  }
  return Array.from(results).slice(0, count);
}

export default function AnagramClient() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(10);
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    if (input.trim().length < 2) {
      setError("Please enter at least 2 letters.");
      return;
    }
    const results = generateAnagrams(input.trim(), count);
    if (results.length === 0) {
      setError("Could not generate anagrams. Try a longer word or phrase.");
    }
    setAnagrams(results);
  };

  const handleCopy = (text: string, i: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <ToolLayout
      title="Anagram Generator"
      description="Enter any word or phrase and instantly generate anagrams — rearranged letter combinations. Great for word games, puzzles, and creative naming."
      relatedTools={[
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
      ]}
      faqItems={[
        {
          q: "What is an anagram?",
          a: "An anagram is a word or phrase formed by rearranging the letters of another word or phrase. For example, 'listen' is an anagram of 'silent', and 'astronomer' rearranges to 'moon starer'.",
        },
        {
          q: "Does the generator create real words?",
          a: "Our generator creates letter rearrangements, not necessarily dictionary words. For finding valid dictionary anagrams, a word list is needed — but the rearrangements are great for puzzles, usernames, and game names.",
        },
        {
          q: "What's the maximum length of input?",
          a: "You can enter up to ~15 characters. Longer inputs produce an astronomical number of combinations, so we limit results to your chosen count.",
        },
        {
          q: "Can I use this for Scrabble or Words With Friends?",
          a: "Yes — this tool is great for finding all possible letter arrangements from your tiles. Combine it with a word validator for best results.",
        },
      ]}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter a word or phrase</label>
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. listen, silent night…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            maxLength={20}
          />
          <select
            className="rounded-xl border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <button
        onClick={generate}
        className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Anagrams
      </button>

      {anagrams.length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">
            {anagrams.length} anagram{anagrams.length !== 1 ? "s" : ""} of <strong>{input.toUpperCase().replace(/[^A-Z]/g, "")}</strong>:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {anagrams.map((ag, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                <span className="font-mono text-gray-800 text-sm">{ag}</span>
                <button
                  onClick={() => handleCopy(ag, i)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 ml-2"
                >
                  {copied === i ? "✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
