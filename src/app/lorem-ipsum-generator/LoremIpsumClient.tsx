"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
];

const ALL_SENTENCES = PARAGRAPHS.flatMap(p =>
  p.split(/(?<=[.?!])\s+/).filter(Boolean)
);

const ALL_WORDS = PARAGRAPHS
  .join(" ")
  .replace(/[.,]/g, "")
  .split(/\s+/)
  .filter(Boolean);

type Mode = "paragraphs" | "sentences" | "words";

function generate(mode: Mode, count: number, startWithLorem: boolean): string {
  if (mode === "paragraphs") {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      if (i === 0 && startWithLorem) {
        result.push(PARAGRAPHS[0]);
      } else {
        result.push(PARAGRAPHS[i % PARAGRAPHS.length]);
      }
    }
    return result.join("\n\n");
  }

  if (mode === "sentences") {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      if (i === 0 && startWithLorem) {
        result.push(ALL_SENTENCES[0]);
      } else {
        result.push(ALL_SENTENCES[i % ALL_SENTENCES.length]);
      }
    }
    return result.join(" ");
  }

  // words
  const pool = startWithLorem
    ? ["Lorem", "ipsum", "dolor", "sit", "amet,", ...ALL_WORDS]
    : ALL_WORDS;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[i % pool.length]);
  }
  return result.join(" ");
}

const MODE_OPTIONS: { label: string; value: Mode; min: number; max: number; default: number }[] = [
  { label: "Paragraphs", value: "paragraphs", min: 1, max: 20, default: 3 },
  { label: "Sentences", value: "sentences", min: 1, max: 50, default: 5 },
  { label: "Words", value: "words", min: 10, max: 500, default: 50 },
];

export default function LoremIpsumClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const currentMode = MODE_OPTIONS.find(m => m.value === mode)!;

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    const m = MODE_OPTIONS.find(o => o.value === newMode)!;
    setCount(m.default);
    setResult("");
  };

  const handleGenerate = () => {
    setResult(generate(mode, count, startWithLorem));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const wordCount = result ? result.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = result.length;

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is Lorem Ipsum?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">Lorem Ipsum is the standard placeholder text used by designers, developers, and publishers when the actual content is not yet available. It has been the industry standard since the 1500s, originating from a work by the Roman philosopher Cicero. Using placeholder text lets you evaluate the visual layout and typography of a design without being distracted by the meaning of the words.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Lorem Ipsum Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select a unit type: Paragraphs (for blocks of text), Sentences (for shorter sections), or Words (for precise amounts).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Set the quantity using the number input.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Toggle "Start with Lorem ipsum…" to use the classic opening sentence.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Click "Generate" and copy the result with the Copy button.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Filling wireframes and UI mockups with realistic-looking text</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Testing typography, font sizes, and line spacing in web designs</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating dummy content for CMS and database development</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating placeholder text for print layouts, brochures, and presentations</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate classic Lorem Ipsum placeholder text — choose paragraphs, sentences, or words. Instant results, copy with one click."
      icon="📄"
      relatedTools={[
        { name: "Word Counter", href: "/word-counter" },
        { name: "Case Converter", href: "/case-converter" },
        { name: "Text Reverser", href: "/text-reverser" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Mode selector */}
      <div className="flex gap-2">
        {MODE_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleModeChange(value)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === value
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count + toggle */}
      <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-gray-500 whitespace-nowrap">
            Count ({currentMode.min}–{currentMode.max})
          </label>
          <input
            type="number"
            min={currentMode.min}
            max={currentMode.max}
            value={count}
            onChange={e => setCount(Math.min(currentMode.max, Math.max(currentMode.min, Number(e.target.value))))}
            className="w-20 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => setStartWithLorem(v => !v)}
            className={`relative w-9 h-5 rounded-full transition-colors ${startWithLorem ? "bg-indigo-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${startWithLorem ? "translate-x-4" : "translate-x-0"}`} />
          </div>
          <span className="text-xs text-gray-600">Start with "Lorem ipsum…"</span>
        </label>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
      >
        Generate
      </button>

      {/* Result */}
      {result && (
        <div className="mt-5">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <textarea
              readOnly
              value={result}
              rows={8}
              className="w-full bg-transparent text-sm text-gray-800 font-mono leading-relaxed resize-y focus:outline-none"
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {wordCount.toLocaleString()} words · {charCount.toLocaleString()} characters
            </span>
            <button
              onClick={handleCopy}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
