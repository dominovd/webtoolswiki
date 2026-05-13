"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

type Difficulty = "easy" | "medium" | "hard";

const WORDS: Record<Difficulty, string[]> = {
  easy: [
    "cat","dog","sun","car","house","tree","fish","bird","hat","cup",
    "book","ball","star","moon","cake","shoe","boat","kite","frog","duck",
    "lion","bear","rain","snow","fire","flag","door","ring","bed","chair",
    "table","clock","flower","apple","banana","pizza","sandwich","umbrella",
    "rainbow","butterfly","elephant","giraffe","penguin","guitar","train",
    "airplane","bicycle","mountain","beach","castle","cactus","candle",
    "carrot","cheese","chicken","cloud","cookie","corn","cow","crown",
    "diamond","dolphin","egg","fence","ghost","glasses","heart","horse",
    "key","ladder","lamp","lemon","map","mushroom","nest","octopus",
    "owl","panda","parrot","pear","rabbit","robot","rocket","scissors",
    "shark","sheep","snail","snake","spider","strawberry","sword","tiger",
    "tomato","turtle","volcano","watermelon","whale","witch","wolf","zebra",
  ],
  medium: [
    "doctor","teacher","surfing","dancing","sleeping","cooking","reading",
    "swimming","jogging","painting","birthday","wedding","camping","fishing",
    "skating","bowling","gardening","traveling","shopping","laughing","crying",
    "sneezing","telescope","volcano","submarine","escalator","kangaroo",
    "pineapple","snowflake","fireworks","lightning","popcorn","spaghetti",
    "treasure","skeleton","jellyfish","dinosaur","astronaut","magician",
    "superhero","detective","pirate","circus","concert","library","hospital",
    "airport","pharmacy","museum","stadium","earthquake","hurricane","tornado",
    "avalanche","waterfall","lighthouse","windmill","rollercoaster","carousel",
    "submarine","helicopter","motorcycle","skateboard","trampoline","parachute",
    "microscope","binoculars","thermometer","calculator","compass","hourglass",
    "boomerang","catapult","labyrinth","quicksand","shipwreck","thunderstorm",
    "accountant","architect","comedian","conductor","journalist","librarian",
    "lifeguard","mechanic","plumber","scientist","veterinarian","firefighter",
  ],
  hard: [
    "democracy","evolution","invisible","adventure","electricity","teamwork",
    "knowledge","happiness","confusion","nostalgia","philosophy","ambition",
    "patience","jealousy","forgiveness","determination","enthusiasm",
    "procrastination","catastrophe","imagination","coincidence","infrastructure",
    "unemployment","superstition","consequences","contradiction","exaggeration",
    "hallucination","interpretation","miscommunication","overreaction",
    "procrastinate","responsibility","simultaneously","underestimate",
    "vulnerability","whistleblower","accomplishment","acknowledgement",
    "breakthrough","circumstances","collaboration","communication","competition",
    "concentration","consciousness","contemplation","conversation","coordination",
    "disappointment","discrimination","documentation","embarrassment","encouragement",
    "enlightenment","entertainment","establishment","exaggeration","expectations",
    "extraordinary","globalization","hallucination","hospitality","independence",
    "industrialization","inflammation","inspiration","intelligence","investigation",
    "manipulation","misunderstanding","modernization","motivation","negotiation",
    "observation","organization","overwhelm","participation","perseverance",
  ],
};

const COUNT_OPTIONS = [1, 5, 10];

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; activeColor: string; description: string }> = {
  easy: {
    label: "Easy",
    color: "border-green-200 text-green-700 hover:bg-green-50",
    activeColor: "bg-green-600 text-white border-green-600",
    description: "Simple objects and animals anyone can draw",
  },
  medium: {
    label: "Medium",
    color: "border-amber-200 text-amber-700 hover:bg-amber-50",
    activeColor: "bg-amber-500 text-white border-amber-500",
    description: "Actions, concepts, and more complex scenes",
  },
  hard: {
    label: "Hard",
    color: "border-red-200 text-red-700 hover:bg-red-50",
    activeColor: "bg-red-600 text-white border-red-600",
    description: "Abstract ideas and complex vocabulary",
  },
};

function pick(difficulty: Difficulty, n: number): string[] {
  const list = WORDS[difficulty];
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, list.length));
}

export default function PictionaryClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [count, setCount] = useState(5);
  const [words, setWords] = useState<string[]>(() => pick("easy", 5));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    setWords(pick(difficulty, count));
  }, [difficulty, count]);

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    setWords(pick(d, count));
  };

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

  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <ToolLayout
      title="Pictionary Word Generator"
      icon="🎨"
      description="Generate random Pictionary words for your drawing games. Choose Easy, Medium, or Hard difficulty — perfect for Pictionary, charades, and any drawing game night."
      relatedTools={[
        { name: "4-Letter Word Generator", href: "/4-letter-word-generator" },
        { name: "5-Letter Word Generator", href: "/5-letter-word-generator" },
        { name: "6-Letter Word Generator", href: "/6-letter-word-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
      ]}
      faqItems={[
        {
          q: "How does the Pictionary word generator work?",
          a: "Select a difficulty level (Easy, Medium, or Hard), choose how many words you want, and click Generate. The tool picks random words from our curated lists designed for drawing games.",
        },
        {
          q: "What is the difference between the difficulty levels?",
          a: "Easy words are simple objects and animals that are straightforward to draw. Medium includes actions, professions, and more complex scenes. Hard features abstract concepts and long words that are genuinely tricky to convey through drawing.",
        },
        {
          q: "Can I use this for charades or other games?",
          a: "Absolutely! The word lists work great for charades, Pictionary variants, party games, and drawing apps like skribbl.io. Just set the difficulty to match your group.",
        },
        {
          q: "How many words are in each difficulty?",
          a: "Easy has around 100 words, Medium has around 80 words, and Hard has around 60 words — all carefully chosen to be appropriate for their difficulty level in a drawing context.",
        },
      ]}
    >
      {/* Difficulty tabs */}
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2">Difficulty</p>
        <div className="flex gap-2 flex-wrap">
          {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => handleDifficultyChange(d)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                difficulty === d ? DIFFICULTY_CONFIG[d].activeColor : DIFFICULTY_CONFIG[d].color
              }`}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">{config.description}</p>
      </div>

      {/* Count + Generate controls */}
      <div className="flex flex-wrap items-center gap-3 mt-2">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500 whitespace-nowrap">How many?</label>
          <select
            value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {COUNT_OPTIONS.map(n => (
              <option key={n} value={n}>{n} word{n !== 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <button
          onClick={generate}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Generate
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

      {/* Word cards */}
      {words.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((word, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4"
            >
              <span className="text-2xl font-bold text-gray-800 capitalize">{word}</span>
              <button
                onClick={() => copyWord(word, i)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
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
