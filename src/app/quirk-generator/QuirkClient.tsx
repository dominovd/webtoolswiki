"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const QUIRKS = [
  "Always speaks in third person",
  "Collects bottle caps obsessively",
  "Cannot make eye contact with anyone",
  "Quotes famous people incorrectly",
  "Hums when nervous",
  "Always carries a lucky charm",
  "Speaks very loudly even indoors",
  "Finishes other people's sentences",
  "Narrates their own actions out loud",
  "Never uses contractions",
  "Claps when excited",
  "Makes up words and uses them confidently",
  "Addresses everyone by their full name",
  "Always late but never apologizes",
  "Keeps a journal of overheard conversations",
  "Sniffs books before reading them",
  "Argues with inanimate objects",
  "Collects something bizarre like doorknobs or napkins",
  "Uses air quotes constantly",
  "Talks to plants and believes they respond",
  "Refers to the past in the present tense",
  "Falls asleep anywhere instantly",
  "Keeps a list of people who wronged them",
  "Always predicts the weather incorrectly",
  "Winks at strangers for no reason",
  "Refuses to sit in chairs, only squats",
  "Can't whisper — only shouts",
  "Gives nicknames to all their possessions",
  "Has a fear of round numbers",
  "Writes in all caps in physical notes",
  "Only eats foods of one color per day",
  "Believes they are being followed by pigeons",
  "Always agrees then does the opposite",
  "Answers questions with a question",
  "Has a signature catchphrase used in wrong contexts",
  "Draws tiny smiley faces on everything",
  "Introduces self using full name and occupation always",
  "Cries at commercials but not real sad events",
  "Keeps track of the moon phases",
  "Memorizes meaningless facts and shares them randomly",
  "Starts every story with 'So there I was'",
  "Gets attached to random objects and names them",
  "Apologizes to furniture they bump into",
  "Always brings snacks but never shares",
  "Believes in lucky and unlucky words",
  "Signs everything with a wax seal",
  "Refuses to use elevators out of principle",
  "Reviews everything they experience on a scale of 1–10 out loud",
  "Greets animals but ignores humans",
  "Laughs at own jokes before finishing them",
  "Tilts their head to the left when thinking",
  "Refuses to say goodbye, only 'see you in another life'",
  "Maintains eye contact for uncomfortably long periods",
  "Counts steps aloud whenever walking up stairs",
  "Always has an opinion about font choices",
  "Cannot resist correcting mispronunciations",
  "Rearranges items on others' desks without asking",
  "Speaks in rhyme when they're excited",
  "Always knows a shorter route but won't share until asked twice",
  "Keeps a tally of how many times they've been right",
  "Insists on using a fountain pen for everything",
];

const COUNT_OPTIONS = [1, 3, 5, 10];

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function QuirkClient() {
  const [count, setCount] = useState(3);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setResults(pickRandom(QUIRKS, count));
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const copyOne = (text: string, i: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="Quirk Generator"
      icon="🎭"
      description="Generate random character quirks and personality traits for writing, roleplay, D&D, and character creation. Pick how many quirks you want and click Generate."
      relatedTools={[
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
        { name: "Disney Character Generator", href: "/disney-character-generator" },
        { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={[
        {
          q: "What are character quirks used for?",
          a: "Character quirks are small, distinctive behavioral traits that make fictional characters feel real and memorable. They're used in creative writing, D&D character creation, roleplay games, improv acting, and any scenario where you need a fleshed-out personality.",
        },
        {
          q: "How many quirks should a character have?",
          a: "Most writers recommend 1–3 quirks per character. Too many can make a character feel cartoonish. A single strong quirk, consistently applied, is usually more effective than a long list.",
        },
        {
          q: "Can I use these quirks for D&D characters?",
          a: "Absolutely. D&D's character creation specifically encourages players to choose personality traits, ideals, bonds, and flaws. These quirks slot perfectly into the 'personality traits' category and can inspire the others too.",
        },
      ]}
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many quirks?</label>
          <div className="flex gap-2">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  count === n
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Quirks
      </button>

      {results.length > 0 && (
        <>
          <div className="mt-6 flex flex-col gap-3">
            {results.map((quirk, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-5 py-4"
              >
                <span className="text-gray-800 font-medium">{quirk}</span>
                <button
                  onClick={() => copyOne(quirk, i)}
                  className="ml-4 text-xs text-indigo-500 hover:text-indigo-700 shrink-0"
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          {results.length > 1 && (
            <button
              onClick={copyAll}
              className="mt-4 w-full py-2 rounded-lg border border-indigo-300 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              {copiedAll ? "Copied all!" : "Copy all quirks"}
            </button>
          )}
        </>
      )}
    </ToolLayout>
  );
}
