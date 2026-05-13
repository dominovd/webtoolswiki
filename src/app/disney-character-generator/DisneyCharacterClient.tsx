"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const CHARACTERS = [
  "Mickey Mouse", "Minnie Mouse", "Donald Duck", "Daisy Duck", "Goofy", "Pluto",
  "Chip", "Dale", "Tinker Bell", "Peter Pan", "Wendy Darling", "Captain Hook",
  "Simba", "Nala", "Mufasa", "Scar", "Timon", "Pumbaa",
  "Ariel", "Flounder", "Sebastian", "Ursula", "Prince Eric",
  "Belle", "Beast", "Gaston", "Lumière", "Mrs. Potts", "Cogsworth", "Chip (teacup)",
  "Cinderella", "Prince Charming", "Fairy Godmother", "Lady Tremaine",
  "Sleeping Beauty", "Maleficent",
  "Pinocchio", "Jiminy Cricket", "Geppetto",
  "Bambi", "Thumper", "Flower",
  "Dumbo", "Timothy Mouse",
  "Snow White", "Evil Queen", "Grumpy", "Happy", "Sleepy", "Bashful", "Sneezy", "Doc", "Dopey",
  "Aladdin", "Jasmine", "Jafar", "Genie", "Iago",
  "Mulan", "Mushu", "Shang",
  "Pocahontas", "John Smith", "Meeko", "Flit",
  "Moana", "Maui", "Tamatoa",
  "Rapunzel", "Flynn Rider", "Mother Gothel", "Pascal", "Maximus",
  "Elsa", "Anna", "Kristoff", "Sven", "Olaf", "Hans",
  "Woody", "Buzz Lightyear", "Jessie", "Rex", "Hamm", "Slinky Dog", "Mr. Potato Head",
  "WALL-E", "EVE",
  "Nemo", "Marlin", "Dory", "Gill",
  "Remy", "Linguini", "Colette",
  "Lightning McQueen", "Mater", "Sally",
  "Mirabel", "Luisa", "Isabella", "Bruno", "Abuela Alma",
  "Luca", "Alberto", "Giulia",
  "Hercules", "Hades", "Megara", "Phil",
  "Tarzan", "Jane Porter",
  "Stitch", "Lilo", "Nani",
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const BG_COLORS = [
  "bg-pink-50 border-pink-200",
  "bg-yellow-50 border-yellow-200",
  "bg-blue-50 border-blue-200",
  "bg-purple-50 border-purple-200",
  "bg-green-50 border-green-200",
  "bg-orange-50 border-orange-200",
];

const TEXT_COLORS = [
  "text-pink-700",
  "text-yellow-700",
  "text-blue-700",
  "text-purple-700",
  "text-green-700",
  "text-orange-700",
];

export default function DisneyCharacterClient() {
  const [mode, setMode] = useState<"one" | "five">("one");
  const [results, setResults] = useState<string[]>([]);

  const spin = (m: "one" | "five") => {
    setMode(m);
    setResults(pickRandom(CHARACTERS, m === "one" ? 1 : 5));
  };

  return (
    <ToolLayout
      title="Disney Character Generator"
      icon="🏰"
      description="Which Disney character are you? Spin the wheel to discover a random classic Disney or Pixar character. Great for trivia nights, games, and fun."
      relatedTools={[
        { name: "Quirk Generator", href: "/quirk-generator" },
        { name: "Mythical Creature Generator", href: "/mythical-creature-generator" },
        { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={[
        {
          q: "How many Disney characters are in the generator?",
          a: "The generator includes over 100 classic Disney and Pixar characters spanning decades of films — from Snow White and Pinocchio all the way through Encanto and Luca.",
        },
        {
          q: "Can I use this for party games?",
          a: "Absolutely! Use 'Get 5 characters' to assign characters to players for Disney trivia, charades, or costume party themes. Each spin is random so everyone gets a fair shot.",
        },
        {
          q: "Does this include Pixar characters?",
          a: "Yes — since Pixar is now part of Disney, the generator includes beloved Pixar characters like Woody, Buzz, Nemo, WALL-E, Remy, Lightning McQueen, and more.",
        },
      ]}
    >
      <p className="text-center text-base text-gray-600 mb-6 font-medium">
        ✨ Which Disney character are you today? ✨
      </p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => spin("one")}
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 transition-colors"
        >
          Spin!
        </button>
        <button
          onClick={() => spin("five")}
          className="flex-1 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold text-base hover:bg-indigo-50 transition-colors"
        >
          Get 5 Characters
        </button>
      </div>

      {results.length === 1 && (
        <div className={`rounded-2xl border-2 px-8 py-8 text-center ${BG_COLORS[0]}`}>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">You are...</p>
          <p className={`text-4xl font-extrabold ${TEXT_COLORS[0]}`}>{results[0]}</p>
          <p className="mt-3 text-sm text-gray-400">Click Spin! to try again</p>
        </div>
      )}

      {results.length > 1 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {results.map((char, i) => (
            <div
              key={i}
              className={`rounded-xl border-2 px-5 py-4 text-center ${BG_COLORS[i % BG_COLORS.length]}`}
            >
              <p className={`text-xl font-bold ${TEXT_COLORS[i % TEXT_COLORS.length]}`}>{char}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          Press Spin! to discover your Disney character.
        </div>
      )}
    </ToolLayout>
  );
}
