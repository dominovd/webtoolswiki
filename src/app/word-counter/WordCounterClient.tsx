"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const STOP_WORDS = new Set([
  "the","a","an","is","in","of","and","to","it","that","this","with",
  "for","on","are","was","at","be","by","from","or","but","not","have",
  "had","has",
]);

function getStats(text: string) {
  const words = text.trim() === "" ? [] : text.trim().split(/\s+/).filter(Boolean);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) ?? []).length || (text.trim().length > 0 ? 1 : 0);
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim().length > 0 ? 1 : 0);
  const wordCount = words.length;
  const minutes = Math.round(wordCount / 200);
  const readingTime = wordCount === 0 ? "—" : minutes < 1 ? "< 1 min" : `${minutes} min read`;
  return { wordCount, characters, charactersNoSpaces, sentences, paragraphs, readingTime, words };
}

function getTopWords(words: string[]): { word: string; count: number }[] {
  const freq: Record<string, number> = {};
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean.length < 2) continue;
    if (STOP_WORDS.has(clean)) continue;
    freq[clean] = (freq[clean] ?? 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
}

export default function WordCounterClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [text, setText] = useState("");

  const stats = getStats(text);
  const topWords = getTopWords(stats.words);

  const statCards = [
    { label: "Words", value: stats.wordCount },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: stats.readingTime },
  ];

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs and estimate reading time instantly. Paste any text to analyse it."
      icon="📝"
      relatedTools={[
        { name: "Case Converter", href: "/case-converter" },
        { name: "Text Reverser", href: "/text-reverser" },
        { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
      ]}
      faqItems={faqItems}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Paste or type your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          rows={10}
          placeholder="Start typing or paste your text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setText("")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {statCards.map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl border border-gray-100 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-snug">{label}</div>
          </div>
        ))}
      </div>

      {topWords.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-medium text-gray-500 mb-2">Most common words</p>
          <div className="flex flex-wrap gap-2">
            {topWords.map(({ word, count }) => (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 font-medium"
              >
                {word}
                <span className="text-indigo-400">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
