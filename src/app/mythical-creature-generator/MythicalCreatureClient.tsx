"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface Creature {
  name: string;
  desc: string;
}

const CREATURES: Creature[] = [
  { name: "Dragon", desc: "A fire-breathing reptilian titan with wings and scales tougher than steel" },
  { name: "Phoenix", desc: "An immortal bird that bursts into flames and is reborn from its own ashes" },
  { name: "Unicorn", desc: "A pure white horse with a single spiraling horn said to heal any wound" },
  { name: "Griffin", desc: "Half eagle, half lion — guardian of treasure and symbol of divine power" },
  { name: "Mermaid", desc: "A sea-dweller with a human upper body and shimmering fish tail" },
  { name: "Centaur", desc: "Half human, half horse — wise archers and scholars of ancient Greece" },
  { name: "Minotaur", desc: "A fearsome creature with the head of a bull and the body of a man" },
  { name: "Basilisk", desc: "The king of serpents whose gaze turns living creatures to stone" },
  { name: "Chimera", desc: "A fire-breathing monster with a lion's head, goat's body, and serpent's tail" },
  { name: "Hydra", desc: "A multi-headed serpent that grows two new heads for every one cut off" },
  { name: "Pegasus", desc: "A magnificent winged horse born from Medusa's blood" },
  { name: "Sphinx", desc: "A riddle-keeper with a human head and lion's body who devours wrong-answerers" },
  { name: "Kraken", desc: "A colossal sea monster capable of dragging entire ships to the depths" },
  { name: "Yeti", desc: "An ape-like giant that roams the Himalayan snowfields, leaving massive footprints" },
  { name: "Banshee", desc: "A wailing spirit whose scream foretells the death of a family member" },
  { name: "Kitsune", desc: "A shape-shifting fox spirit from Japanese folklore with up to nine magical tails" },
  { name: "Tengu", desc: "A supernatural mountain-dwelling warrior with a long beak and feathered wings" },
  { name: "Selkie", desc: "A seal that sheds its skin to walk on land as a human" },
  { name: "Wendigo", desc: "A gaunt cannibalistic spirit of the frozen north, born from human desperation" },
  { name: "Werewolf", desc: "A human cursed to transform into a wolf under the light of the full moon" },
  { name: "Vampire", desc: "An undead being that feeds on blood and cannot endure sunlight" },
  { name: "Golem", desc: "A clay or stone creature animated by ancient ritual to protect or serve" },
  { name: "Djinn", desc: "A powerful spirit of smokeless fire that can grant wishes — at a price" },
  { name: "Naga", desc: "A divine serpent being from Hindu and Buddhist mythology with supernatural wisdom" },
  { name: "Leviathan", desc: "A sea-beast of biblical scale said to be chaos incarnate" },
  { name: "Thunderbird", desc: "A storm-summoning giant bird from Native American legend whose wingbeats make thunder" },
  { name: "Roc", desc: "An elephant-snatching bird so enormous it blots out the sun" },
  { name: "Carbuncle", desc: "A small jewel-bearing beast from South American legend with a gem on its forehead" },
  { name: "Manticore", desc: "A creature with a human face, lion's body, and scorpion's tail" },
  { name: "Peryton", desc: "A flying stag that casts the shadow of a man instead of its own form" },
  { name: "Amarok", desc: "A colossal wolf spirit from Inuit mythology said to hunt hunters who are alone" },
  { name: "Wyvern", desc: "A two-legged dragon with a barbed tail and venom that corrodes stone" },
  { name: "Kappa", desc: "A water-dwelling trickster from Japanese folklore with a dish of water atop its head" },
  { name: "Baku", desc: "A tapir-like spirit from Japanese mythology that devours nightmares" },
  { name: "Kelpie", desc: "A shape-shifting water horse from Scottish folklore that lures riders to their doom" },
  { name: "Hippocampus", desc: "A sea-horse from Greek myth with the front of a horse and the tail of a fish" },
  { name: "Cockatrice", desc: "A two-legged dragon with a rooster's head whose gaze or breath can kill" },
  { name: "Jackalope", desc: "A rabbit with antelope horns — a North American folklore cryptid" },
  { name: "Qilin", desc: "A chimeric celestial beast from Chinese mythology that heralds the arrival of a great leader" },
  { name: "Simurgh", desc: "A colossal benevolent bird from Persian myth wise enough to have witnessed three world destructions" },
  { name: "Harpy", desc: "A winged spirit from Greek myth with the face of a woman and the body of a bird" },
  { name: "Cyclops", desc: "A giant with a single enormous eye, master craftsman and fearsome warrior" },
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function MythicalCreatureClient() {
  const [mode, setMode] = useState<1 | 3>(1);
  const [results, setResults] = useState<Creature[]>([]);

  const generate = (n: 1 | 3) => {
    setMode(n);
    setResults(pickRandom(CREATURES, n));
  };

  return (
    <ToolLayout
      title="Mythical Creature Generator"
      icon="🐉"
      description="Discover random mythical creatures from world mythology, folklore, and fantasy. Perfect for D&D encounters, world-building, writing, and game design."
      relatedTools={[
        { name: "Quirk Generator", href: "/quirk-generator" },
        { name: "Disney Character Generator", href: "/disney-character-generator" },
        { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={[
        {
          q: "Where do these mythical creatures come from?",
          a: "The creatures in this generator are drawn from world mythologies including Greek, Norse, Japanese, Chinese, Persian, Celtic, Native American, Hindu, and many other traditions. Each has roots in real folklore and legend.",
        },
        {
          q: "Can I use this for D&D monster encounters?",
          a: "Yes! Many creatures here map directly to D&D bestiary entries. Use the generator to spark ideas for random encounters, dungeon denizens, or the origin of a villain's power.",
        },
        {
          q: "What's the difference between a dragon and a wyvern?",
          a: "In traditional heraldry and fantasy, a dragon has four legs plus two wings, while a wyvern has only two legs and two wings. In many modern fantasy settings the terms are used interchangeably.",
        },
      ]}
    >
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => generate(1)}
          className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
        >
          Generate Creature
        </button>
        <button
          onClick={() => generate(3)}
          className="flex-1 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold text-base hover:bg-indigo-50 transition-colors"
        >
          Generate 3
        </button>
      </div>

      {results.length > 0 && (
        <div className="flex flex-col gap-4">
          {results.map((creature) => (
            <div
              key={creature.name}
              className="rounded-xl bg-gray-50 border border-gray-100 px-6 py-5"
            >
              <p className="text-2xl font-bold text-gray-900 mb-1">{creature.name}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{creature.desc}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          Click a button above to conjure a creature from legend.
        </div>
      )}
    </ToolLayout>
  );
}
