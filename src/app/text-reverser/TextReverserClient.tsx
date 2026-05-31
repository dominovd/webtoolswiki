"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const MODES = [
  {
    key: "chars",
    label: "Reverse Characters",
    description: "e.g. \"hello\" → \"olleh\"",
    fn: (text: string) => text.split("").reverse().join(""),
  },
  {
    key: "words",
    label: "Reverse Words",
    description: "e.g. \"hello world\" → \"world hello\"",
    fn: (text: string) => text.split(" ").reverse().join(" "),
  },
  {
    key: "flip",
    label: "Flip Each Word",
    description: "e.g. \"hello world\" → \"olleh dlrow\"",
    fn: (text: string) =>
      text
        .split(" ")
        .map(w => w.split("").reverse().join(""))
        .join(" "),
  },
];

export default function TextReverserClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Text Reverser?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A text reverser flips the order of characters or words in any text string. It offers three modes: reversing all characters (so "hello" becomes "olleh"), reversing the word order (so "hello world" becomes "world hello"), or flipping each word's letters while keeping word order (so "hello world" becomes "olleh dlrow"). Reversed text is used for puzzles, ciphers, creative writing, and social media effects.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Text Reverser</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Type or paste your text into the input box — results appear instantly as you type.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Three output cards show all reversal modes simultaneously.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click Copy on whichever result you want.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Paste into messages, social media, or use it as a simple mirror cipher.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating mirror-text effects for social media posts and bios</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Writing simple ciphers or coded messages for games and puzzles</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Checking palindromes (words that read the same forwards and backwards)</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creative writing exercises and word games</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse text by characters, by words, or flip each word individually. Results update live as you type — copy with one click."
      icon="↩"
      relatedTools={[
        { name: "Case Converter", href: "/case-converter" },
        { name: "Word Counter", href: "/word-counter" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Enter your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          rows={4}
          placeholder="Type or paste text here…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      {input ? (
        <div className="mt-5 space-y-3">
          {MODES.map(({ key, label, description, fn }) => {
            const result = fn(input);
            return (
              <div key={key} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                    <span className="ml-2 text-xs text-gray-400">{description}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(result, key)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {copied === key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-800 break-all leading-relaxed">{result}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-xs text-gray-400 text-center">Type something to see all three reversal modes</p>
      )}
    </ToolLayout>
  );
}
