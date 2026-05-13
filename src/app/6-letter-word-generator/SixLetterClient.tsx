"use client";
import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

const WORDS: string[] = [
  "absent","accept","access","action","active","actual","afford","afraid","agency","agenda",
  "almost","around","attack","attend","banner","battle","beauty","before","behind","better",
  "beyond","borrow","bottle","bottom","bridge","broken","budget","burden","butter","button",
  "camera","cancel","castle","caught","center","change","charge","choice","chorus","circle",
  "classy","clever","closed","clouds","cobalt","coffee","combat","coming","common","corner",
  "costly","couple","course","create","credit","danger","decide","degree","design","desire",
  "detail","dinner","direct","dollar","double","driven","easily","energy","engage","enough",
  "entire","equity","escape","events","exceed","except","expand","expert","fabric","fallen",
  "family","famous","farmer","faster","father","figure","filter","finger","finish","flower",
  "flying","follow","forest","forget","formal","foster","fourth","frozen","funded","future",
  "gained","garden","gather","gentle","gifted","global","golden","gossip","gotten","ground",
  "growth","guided","guilty","harbor","hardly","health","hearts","hidden","hollow","hunter",
  "hurdle","hustle","indeed","inside","island","jigsaw","joined","jungle","junior","justice",
  "keeper","kernel","knight","launch","lavish","leader","leaves","legend","length","lesson",
  "letter","lights","lively","living","loaded","locked","lonely","looked","losing","loving",
  "mantle","marble","market","marvel","master","mirror","mobile","modern","module","moment",
  "monkey","mortal","mostly","motion","muscle","mutual","mystic","narrow","nature","nearby",
  "neatly","neural","nicely","nimble","normal","notice","number","object","office","opened",
  "option","origin","output","palace","parent","parted","patrol","paused","pillar","planet",
  "player","plural","pocket","portal","postal","posted","powder","prefer","pretty","prince",
  "prison","profit","proper","proven","purple","pushed","puzzle","quoted","rabbit","racing",
  "radial","random","rarely","rating","really","reason","recipe","record","reduce","reform",
  "refuge","refuse","remain","remote","rental","repair","repeat","report","rescue","resort",
  "result","return","reveal","review","reward","ribbon","rising","robust","rocket","ruling",
  "safety","sanity","saving","scarce","scenic","screen","search","season","second","secret",
  "select","series","server","severe","simple","sinful","single","sketch","smooth","social",
  "solved","sorted","source","spoken","stable","static","status","steady","stored","stream",
  "street","strict","strong","studio","submit","subtle","sudden","summer","supply","surely",
  "system","talent","target","taught","temple","tenant","tender","tested","thanks","theory",
  "toggle","toward","travel","treaty","trophy","tumble","tunnel","turban","twenty","unique",
  "united","update","upward","useful","vision","visual","vivid","volume","voting","wealth",
];

const COUNT_OPTIONS = [1, 5, 10, 20, 50];

function pick(n: number): string[] {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, WORDS.length));
}

export default function SixLetterClient() {
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
      title="6-Letter Word Generator"
      icon="🔤"
      description="Generate random 6-letter words instantly. Perfect for Scrabble, word puzzles, creative writing, and expanding your vocabulary."
      relatedTools={[
        { name: "4-Letter Word Generator", href: "/4-letter-word-generator" },
        { name: "5-Letter Word Generator", href: "/5-letter-word-generator" },
        { name: "Pictionary Word Generator", href: "/pictionary-word-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
      ]}
      faqItems={[
        {
          q: "Why use a 6-letter word generator?",
          a: "Six-letter words score well in Scrabble and are common in word puzzles. They're also great for creative writing exercises, vocabulary building, and word game practice.",
        },
        {
          q: "Are these valid Scrabble words?",
          a: "Our list is made up of common English words, most of which are valid in TWL and SOWPODS Scrabble dictionaries. Always verify against the official word list for tournament play.",
        },
        {
          q: "How large is the word list?",
          a: "The generator includes over 250 curated common 6-letter English words, ensuring a good variety with every generation.",
        },
        {
          q: "Can I generate multiple batches?",
          a: "Yes — simply click Regenerate as many times as you like. Each click picks a fresh random set from the full word list.",
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
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {words.map((word, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3"
            >
              <span className="text-lg font-bold text-gray-800 tracking-wide capitalize">{word}</span>
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
