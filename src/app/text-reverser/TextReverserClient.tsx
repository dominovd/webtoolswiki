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
