"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

function generateNumbers(
  min: number,
  max: number,
  count: number,
  allowDecimals: boolean,
  allowDuplicates: boolean
): number[] {
  const results: number[] = [];

  if (!allowDuplicates) {
    // For integers only, pick without replacement
    const range = Math.floor(max) - Math.ceil(min) + 1;
    const pool: number[] = [];
    for (let i = Math.ceil(min); i <= Math.floor(max); i++) pool.push(i);
    // Fisher-Yates shuffle then slice
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, range));
  }

  for (let i = 0; i < count; i++) {
    const raw = Math.random() * (max - min) + min;
    results.push(allowDecimals ? Math.round(raw * 100) / 100 : Math.floor(raw));
  }
  return results;
}

export default function RandomNumberClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [minVal, setMinVal] = useState("1");
  const [maxVal, setMaxVal] = useState("100");
  const [count, setCount] = useState(1);
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [sorted, setSorted] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = (): { min: number; max: number } | null => {
    const min = parseFloat(minVal);
    const max = parseFloat(maxVal);
    if (isNaN(min) || isNaN(max)) { setError("Please enter valid numbers."); return null; }
    if (min >= max) { setError("Min must be less than Max."); return null; }
    return { min, max };
  };

  const generate = () => {
    setError("");
    setWarning("");
    setSorted(false);

    const range = validate();
    if (!range) return;

    const { min, max } = range;

    if (!allowDuplicates && !allowDecimals) {
      const intRange = Math.floor(max) - Math.ceil(min) + 1;
      if (count > intRange) {
        setWarning(`Cannot generate ${count} unique integers in range [${Math.ceil(min)}, ${Math.floor(max)}] — only ${intRange} available. Showing ${intRange}.`);
      }
    }

    setResults(generateNumbers(min, max, count, allowDecimals, allowDuplicates));
  };

  const handleSort = () => {
    setResults((prev) => [...prev].sort((a, b) => a - b));
    setSorted(true);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(results.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Random Number Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A random number generator (RNG) produces numbers with no predictable pattern within a defined range. Random numbers are used everywhere from lotteries and games to scientific simulations and statistical sampling. Our generator lets you customise the range, quantity, and format — integers or decimals — and ensures you get genuinely unpredictable results every time.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Random Number Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Set your minimum and maximum values to define the range (e.g. 1 to 100).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose how many numbers to generate — from 1 up to 100.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Toggle "Allow decimals" for decimal results, or keep integers for whole numbers.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Enable "No duplicates" to ensure every generated number is unique.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">5</span>
            <span>Click "Generate" and optionally sort the results or copy them all.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Picking a random winner from a list by generating a number in a given range</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating random data for software testing and simulations</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Running raffles, lottery draws, or random prize selection</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Teaching probability and statistics concepts with live examples</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Number Generator"
      description="Generate one or multiple random numbers within any range. Supports integers and decimals, with optional duplicate filtering."
      icon="🎲"
      relatedTools={[
        { name: "Password Generator", href: "/password-generator" },
        { name: "Random Name Generator", href: "/random-name-generator" },
        { name: "Username Generator", href: "/username-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Min / Max / Count */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min</label>
          <input
            type="number"
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={minVal}
            onChange={(e) => setMinVal(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max</label>
          <input
            type="number"
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={maxVal}
            onChange={(e) => setMaxVal(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 mb-5">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allowDecimals}
            onChange={(e) => setAllowDecimals(e.target.checked)}
            className="accent-indigo-600 w-4 h-4"
          />
          <span className="text-sm text-gray-700">Allow decimals</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!allowDuplicates}
            onChange={(e) => setAllowDuplicates(!e.target.checked)}
            className="accent-indigo-600 w-4 h-4"
          />
          <span className="text-sm text-gray-700">No duplicates</span>
        </label>
      </div>

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {warning && <p className="mb-3 text-sm text-orange-500">{warning}</p>}

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-colors"
      >
        Generate
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          {/* Single number: very large display */}
          {results.length === 1 ? (
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 flex items-center justify-center">
              <span className="text-6xl font-bold text-gray-900 font-mono">{results[0]}</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {results.map((n, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-center">
                  <span className="font-mono font-semibold text-gray-900 text-sm">{n}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            {results.length > 1 && !sorted && (
              <button
                onClick={handleSort}
                className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-colors"
              >
                Sort Ascending
              </button>
            )}
            <button
              onClick={handleCopyAll}
              className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
