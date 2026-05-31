"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

function toAlternating(text: string): string {
  let i = 0;
  return text.replace(/[a-zA-Z]/g, c => {
    const result = i % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
    i++;
    return result;
  });
}

function toCamelCase(text: string): string {
  const words = text.trim().split(/[\s_\-]+/).filter(Boolean);
  return words
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function toSnakeCase(text: string): string {
  return text.trim().toLowerCase().replace(/[\s\-]+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function toKebabCase(text: string): string {
  return text.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

const CONVERSIONS = [
  { key: "uppercase",    label: "UPPERCASE",      fn: (t: string) => t.toUpperCase() },
  { key: "lowercase",    label: "lowercase",      fn: (t: string) => t.toLowerCase() },
  { key: "titlecase",    label: "Title Case",     fn: toTitleCase },
  { key: "sentencecase", label: "Sentence case",  fn: toSentenceCase },
  { key: "alternating",  label: "aLtErNaTiNg",    fn: toAlternating },
  { key: "camelcase",    label: "camelCase",      fn: toCamelCase },
  { key: "snakecase",    label: "snake_case",     fn: toSnakeCase },
  { key: "kebabcase",    label: "kebab-case",     fn: toKebabCase },
];

export default function CaseConverterClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [input, setInput] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const result = active
    ? CONVERSIONS.find(c => c.key === active)?.fn(input) ?? ""
    : "";

  const handleConvert = (key: string) => {
    setActive(key);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Case Converter?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A case converter transforms text between different capitalisation styles with one click. Whether you need to convert a headline to Title Case, fix an all-caps paste to sentence case, or format variable names as camelCase or snake_case for programming, a case converter saves time and eliminates manual retyping. It's one of the most-used text utilities for writers, developers, and content editors.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Case Converter</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Type or paste your text into the input box.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Click any of the 8 conversion buttons: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg, camelCase, snake_case, or kebab-case.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>The converted result appears instantly in the result card below.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Click Copy to copy the converted text to your clipboard.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Converting copied text to the correct case for documents and presentations</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Formatting variable names in camelCase or snake_case for programming</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Fixing accidentally capitalised text (e.g. when CAPS LOCK was on)</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Converting titles and headings to Title Case for articles and blog posts</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case, and alternating case instantly."
      icon="Aa"
      relatedTools={[
        { name: "Word Counter", href: "/word-counter" },
        { name: "Text Reverser", href: "/text-reverser" },
        { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Enter your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          rows={5}
          placeholder="Type or paste text here…"
          value={input}
          onChange={e => { setInput(e.target.value); setActive(null); setCopied(false); }}
        />
      </div>

      {/* Conversion buttons */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CONVERSIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleConvert(key)}
            disabled={!input.trim()}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              active === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Result */}
      {active && result !== "" && (
        <div className="mt-5 bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              {CONVERSIONS.find(c => c.key === active)?.label}
            </span>
            <button
              onClick={handleCopy}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-gray-800 break-words leading-relaxed whitespace-pre-wrap">{result}</p>
        </div>
      )}

      {!input.trim() && (
        <p className="mt-4 text-xs text-gray-400 text-center">Enter text above then choose a conversion</p>
      )}
    </ToolLayout>
  );
}
