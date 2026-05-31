"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

const COUNT_OPTIONS = [1, 5, 10, 25, 50, 100];

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UUIDClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [count, setCount] = useState(5);
  const [casing, setCasing] = useState<"lower" | "upper">("lower");
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = () => {
    const generated = Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (!hyphens) uuid = uuid.replace(/-/g, "");
      if (casing === "upper") uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(generated);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const handleCopyOne = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a UUID?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems without requiring a central authority to manage the IDs. UUID version 4 — the most common type — is randomly generated, giving it 2¹²² possible values. The probability of generating the same UUID twice is astronomically small, making UUIDs ideal for database primary keys, session tokens, API request IDs, and distributed systems where uniqueness must be guaranteed across multiple servers.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the UUID Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select how many UUIDs to generate: 1, 5, 10, 25, 50, or 100.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose uppercase or lowercase format.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Toggle hyphens on or off as needed.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Click "Generate" and copy individual UUIDs or use "Copy All" for the full list.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating database primary keys for PostgreSQL, MySQL, or MongoDB</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating unique session tokens and API request identifiers</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Seeding test databases with realistic unique IDs</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Identifying records in distributed systems and microservices</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate version 4 UUIDs instantly. Choose count, casing, and hyphen format — copy individually or all at once."
      icon="#"
      relatedTools={[
        { name: "Random Number Generator", href: "/random-number-generator" },
        { name: "Password Generator", href: "/password-generator" },
        { name: "Hash Generator", href: "/hash-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-5">
        {/* Count */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Count</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  count === n
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Casing */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Format</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setCasing("lower")}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                casing === "lower" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Lowercase
            </button>
            <button
              onClick={() => setCasing("upper")}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                casing === "upper" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Uppercase
            </button>
          </div>
        </div>
      </div>

      {/* Hyphens toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none mb-5">
        <input
          type="checkbox"
          checked={hyphens}
          onChange={(e) => setHyphens(e.target.checked)}
          className="accent-indigo-600 w-4 h-4"
        />
        <span className="text-sm text-gray-700">Include hyphens</span>
      </label>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors mb-5"
      >
        Generate UUIDs
      </button>

      {/* Results */}
      {uuids.length > 0 && (
        <>
          <div className="space-y-2 mb-4">
            {uuids.map((uuid, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-gray-900 break-all select-all">{uuid}</span>
                <button
                  onClick={() => handleCopyOne(uuid, i)}
                  className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleCopyAll}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {copiedAll ? "Copied all!" : "Copy All"}
          </button>
        </>
      )}
    </ToolLayout>
  );
}
