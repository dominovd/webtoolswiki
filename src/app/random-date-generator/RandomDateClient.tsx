"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD" | "Long" | "Unix";
const FORMAT_OPTIONS: DateFormat[] = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD", "Month DD, YYYY", "Unix Timestamp"] as unknown as DateFormat[];
const FORMAT_LABELS: Record<string, string> = {
  "MM/DD/YYYY": "MM/DD/YYYY (US)",
  "DD/MM/YYYY": "DD/MM/YYYY (UK)",
  "YYYY-MM-DD": "YYYY-MM-DD (ISO)",
  "Long": "Month DD, YYYY",
  "Unix": "Unix Timestamp",
};
const ALL_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD", "Long", "Unix"] as const;
type Fmt = typeof ALL_FORMATS[number];

const COUNT_OPTIONS = [1, 5, 10, 20, 50];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatDate(date: Date, fmt: Fmt): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  switch (fmt) {
    case "MM/DD/YYYY": return `${pad(m)}/${pad(d)}/${y}`;
    case "DD/MM/YYYY": return `${pad(d)}/${pad(m)}/${y}`;
    case "YYYY-MM-DD": return `${y}-${pad(m)}-${pad(d)}`;
    case "Long": return `${MONTH_NAMES[date.getMonth()]} ${d}, ${y}`;
    case "Unix": return Math.floor(date.getTime() / 1000).toString();
  }
}

function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

export default function RandomDateClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [startDate, setStartDate] = useState("1970-01-01");
  const [endDate, setEndDate] = useState(getTodayString());
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<Fmt>("YYYY-MM-DD");
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [dates, setDates] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setError("");
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (isNaN(start) || isNaN(end)) { setError("Please enter valid dates."); return; }
    if (start > end) { setError("Start date must be before end date."); return; }

    const rangeMs = end - start;
    const generated: string[] = [];
    const usedTs = new Set<number>();

    let attempts = 0;
    while (generated.length < count && attempts < count * 20) {
      attempts++;
      const ts = start + Math.floor(Math.random() * (rangeMs + 1));
      const dayTs = Math.floor(ts / 86400000) * 86400000; // normalize to day
      if (noDuplicates && usedTs.has(dayTs)) continue;
      usedTs.add(dayTs);
      generated.push(formatDate(new Date(dayTs), format));
    }

    setDates(generated);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const handleCopyOne = (date: string, index: number) => {
    navigator.clipboard.writeText(date).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(dates.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Random Date Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A random date generator creates dates that fall within a specified range, formatted in your chosen style. Random dates are essential in software development for testing date-handling logic, populating sample datasets, and creating realistic mock data. Instead of manually inventing dates, developers and testers use date generators to quickly produce hundreds of varied, realistic timestamps.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Random Date Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Set your start and end dates using the date pickers to define the range.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose how many dates to generate (1–50).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Select a format: US (MM/DD/YYYY), UK (DD/MM/YYYY), ISO (YYYY-MM-DD), Long (January 1, 2024), or Unix timestamp.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Toggle "No duplicates" to ensure every date is unique.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">5</span>
            <span>Click "Generate" and copy results.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Seeding test databases with realistic date data for booking, event, or transaction records</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Testing date validation, sorting, and filtering logic in applications</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating sample datasets for data science projects and tutorials</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating fictional event timelines for writing and game design</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Date Generator"
      description="Generate random dates within any date range and format. Perfect for testing, populating databases, and creating sample data."
      icon="📅"
      relatedTools={[
        { name: "Random Number Generator", href: "/random-number-generator" },
        { name: "UUID Generator", href: "/uuid-generator" },
        { name: "Password Generator", href: "/password-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Date range */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>

      {/* Count */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Count</label>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 w-fit">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                count === n ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Format */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as Fmt)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
        >
          {ALL_FORMATS.map((f) => (
            <option key={f} value={f}>
              {FORMAT_LABELS[f] ?? f}
            </option>
          ))}
        </select>
      </div>

      {/* No duplicates toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none mb-5">
        <input
          type="checkbox"
          checked={noDuplicates}
          onChange={(e) => setNoDuplicates(e.target.checked)}
          className="accent-indigo-600 w-4 h-4"
        />
        <span className="text-sm text-gray-700">No duplicates</span>
      </label>

      {/* Error */}
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors mb-5"
      >
        Generate Dates
      </button>

      {/* Results */}
      {dates.length > 0 && (
        <>
          <div className="space-y-2 mb-4">
            {dates.map((date, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-gray-900 select-all">{date}</span>
                <button
                  onClick={() => handleCopyOne(date, i)}
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
