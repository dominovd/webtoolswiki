"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

const WORDS: string[] = [
  "word","love","time","life","hand","face","look","work","call","need",
  "feel","home","room","door","mind","fire","blue","gray","moon","star",
  "bird","fish","tree","leaf","rock","snow","cold","warm","dark","flow",
  "deep","wild","calm","bold","kind","true","soft","rose","gold","iron",
  "silk","rain","seed","ring","path","road","hill","lake","wave","sand",
  "wind","fall","play","song","hope","wish","gift","flag","hook","lock",
  "milk","salt","talk","walk","jump","curl","fold","glow","sing","dive",
  "swim","hunt","ride","meet","read","hear","open","save","hold","grow",
  "tell","give","find","make","know","seem","come","live","draw","rest",
  "help","bear","lead","gain","born","lift","rise","burn","spin","grit",
  "dust","dusk","dawn","dune","haze","mist","foam","bark","corn","herb",
  "jade","lace","lime","mint","navy","opal","plum","ruby","rust","sage",
  "teal","vine","wren","yarn","zinc","arch","beam","cave","clay","coal",
  "cork","cove","crag","crop","curl","damp","dart","dent","dew","dome",
];

const COUNT_OPTIONS = [1, 5, 10, 20, 50];

function pick(n: number): string[] {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, WORDS.length));
}

export default function FourLetterClient() {
  const [count, setCount] = useState(10);
  const [words, setWords] = useState<string[]>(() => pick(10));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    setWords(pick(count));
  }, [count]);

  const copyWord = (word: string, index: number) => {
    navigator.clipboard.writeText(word).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(words.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    });
  };

  return (
    <ToolLayout
      title="4-Letter Word Generator"
      icon="🔤"
      description="Generate random 4-letter words instantly. Great for Wordle practice, Scrabble, word games, and creative writing prompts."
      relatedTools={[
        { name: "5-Letter Word Generator", href: "/5-letter-word-generator" },
        { name: "6-Letter Word Generator", href: "/6-letter-word-generator" },
        { name: "Pictionary Word Generator", href: "/pictionary-word-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
      ]}
      faqItems={[
        {
          q: "What are 4-letter words used for?",
          a: "Four-letter words are perfect for word games like Scrabble and Boggle, Wordle variants, creative writing, and brainstorming. They're short enough to be memorable and versatile.",
        },
        {
          q: "Can I use these words for Scrabble?",
          a: "Yes! All words in our list are common English words. Most are valid in standard Scrabble dictionaries (TWL/SOWPODS). Always verify against the official word list for competitive play.",
        },
        {
          q: "How many words can I generate at once?",
          a: "You can generate 1, 5, 10, 20, or 50 random 4-letter words at a time using the count selector. Click Regenerate to get a fresh set.",
        },
        {
          q: "Are the words truly random?",
          a: "Yes — each click on Generate picks words randomly from our curated list of common English 4-letter words, so you get a different set every time.",
        },
      ]}
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500 whitespace-nowrap">How many?</label>
          <select
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {COUNT_OPTIONS.map(n => (
              <option key={n} value={n}>{n} words</option>
            ))}
          </select>
        </div>
        <button
          onClick={generate}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Regenerate
        </button>
        {words.length > 0 && (
          <button
            onClick={copyAll}
            className="px-5 py-2 rounded-lg border border-indigo-300 text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            {copiedAll ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>

      {/* Word grid */}
      {words.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {words.map((word, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3"
            >
              <span className="text-xl font-bold text-gray-800 tracking-wide capitalize">{word}</span>
              <button
                onClick={() => copyWord(word, i)}
                className="text-xs px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
              >
                {copiedIndex === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
