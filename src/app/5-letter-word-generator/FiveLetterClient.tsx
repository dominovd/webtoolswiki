"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

const WORDS: string[] = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alike","align","alive","alley",
  "allow","alone","along","alter","amber","angel","anger","angle","ankle","annex",
  "apple","apply","arena","argue","arise","armor","array","arrow","aside","asset",
  "atlas","attic","audio","awful","awake","azure","badge","baker","basic","basis",
  "batch","beach","began","begin","being","below","bench","berry","birth","black",
  "blade","blame","blast","blaze","blend","bless","blind","block","bloom","blown",
  "blues","blunt","blush","board","bonus","boost","bound","brake","brand","brave",
  "bread","break","breed","brick","bride","brief","bring","brisk","broke","brook",
  "brown","brush","build","built","bunch","burst","cabin","camel","candy","carry",
  "catch","cause","cedar","chain","chair","chaos","charm","chase","cheap","check",
  "chess","chest","chief","child","chill","choir","civic","civil","claim","clash",
  "class","clean","clear","click","cliff","climb","cling","clock","close","cloud",
  "clown","coach","coast","color","comet","comic","coral","couch","count","court",
  "cover","craft","crane","crash","crazy","cream","creed","creek","crisp","cross",
  "crowd","crown","cruel","crush","curve","cycle","daisy","dance","debut","decor",
  "delay","depth","dirty","disco","ditch","dizzy","dodge","doubt","dough","draft",
  "drain","drama","dream","drift","drink","drive","drone","drown","dwarf","eagle",
  "early","earth","eight","elect","elite","email","empty","enter","entry","equal",
  "error","event","every","exact","extra","fable","faint","faith","false","fancy",
  "feast","field","fifty","fight","final","fixed","flame","flare","flash","flick",
  "float","flood","floor","flora","floss","fluid","flute","focal","foggy","force",
  "forge","found","frame","frank","fraud","fresh","front","frost","froze","fruit",
  "fully","funds","funny","fuzzy","ghost","giant","given","glare","glass","glide",
  "globe","gloom","glory","gloss","glove","glyph","grace","grade","grain","grant",
  "graph","grasp","grass","graze","great","greet","grief","grind","groan","groin",
];

const COUNT_OPTIONS = [1, 5, 10, 20, 50];

function pick(n: number): string[] {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, WORDS.length));
}

export default function FiveLetterClient() {
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
      title="5-Letter Word Generator"
      icon="🔤"
      description="Generate random 5-letter words instantly. Great for Wordle practice, Scrabble, word puzzles, and brainstorming. All words are common English five-letter words."
      relatedTools={[
        { name: "4-Letter Word Generator", href: "/4-letter-word-generator" },
        { name: "6-Letter Word Generator", href: "/6-letter-word-generator" },
        { name: "Pictionary Word Generator", href: "/pictionary-word-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
      ]}
      faqItems={[
        {
          q: "Are these words good for Wordle practice?",
          a: "Absolutely! Wordle uses 5-letter words, and our generator pulls from a list of common English 5-letter words — exactly the kind used in Wordle. Use it to practice guessing or to study common patterns.",
        },
        {
          q: "Can I use these for Scrabble?",
          a: "Yes. All words in our list are standard English words. Most are valid in TWL and SOWPODS Scrabble dictionaries. Verify against the official list for competitive play.",
        },
        {
          q: "How many 5-letter words are in the generator?",
          a: "Our curated list contains over 200 common 5-letter English words, giving you a wide variety every time you generate.",
        },
        {
          q: "How do I get a new set of words?",
          a: "Simply click the Regenerate button. Each click picks a fresh random selection from the word list. You can also change the count using the dropdown before generating.",
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
