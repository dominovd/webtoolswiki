import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online Generators & Tools – WebToolsWiki",
  description:
    "100+ free online generators: cursive text, phone numbers, IMEI, gamertags, anagrams, and more. No sign-up, works instantly in your browser.",
  alternates: {
    canonical: "https://webtoolswiki.com",
  },
  openGraph: {
    title: "Free Online Generators & Tools – WebToolsWiki",
    description: "100+ free tools: cursive text, IMEI, phone numbers, gamertags, anagrams. Instant, free, no sign-up.",
    url: "https://webtoolswiki.com",
    type: "website",
  },
};

const categories = [
  {
    label: "Text & Word tools",
    color: "bg-violet-600",
    tools: [
      { name: "Cursive Text Generator", href: "/cursive-text-generator", desc: "Convert text to Unicode cursive styles", icon: "✍️" },
      { name: "Anagram Generator", href: "/anagram-generator", desc: "Rearrange letters into new words", icon: "🔀" },
      { name: "Weird Text Generator", href: "/weird-text-generator", desc: "Glitch, zalgo, bubble, vaporwave styles", icon: "Z̷" },
      { name: "Symbol Text Generator", href: "/symbol-text-generator", desc: "Hearts, stars, arrows & 200+ symbols", icon: "★" },
      { name: "Superscript Generator", href: "/superscript-generator", desc: "Tiny raised Unicode letters & numbers", icon: "ˢ" },
      { name: "Subscript Generator", href: "/subscript-generator", desc: "Chemical formulas & subscript text", icon: "₄" },
    ],
  },
  {
    label: "Word generators",
    color: "bg-amber-500",
    tools: [
      { name: "Pictionary Word Generator", href: "/pictionary-word-generator", desc: "Easy, medium & hard drawing game words", icon: "🎨" },
      { name: "5-Letter Word Generator", href: "/5-letter-word-generator", desc: "Random 5-letter words — great for Wordle", icon: "5️⃣" },
      { name: "4-Letter Word Generator", href: "/4-letter-word-generator", desc: "Random 4-letter words for word games", icon: "4️⃣" },
      { name: "6-Letter Word Generator", href: "/6-letter-word-generator", desc: "Random 6-letter words for Scrabble & puzzles", icon: "6️⃣" },
    ],
  },
  {
    label: "Phone number generators",
    color: "bg-blue-600",
    tools: [
      { name: "US Phone Number Generator", href: "/us-phone-number-generator", desc: "Real area codes, multiple formats", icon: "🇺🇸" },
      { name: "IMEI Generator", href: "/imei-generator", desc: "Valid-format IMEI with Luhn checksum", icon: "📱" },
      { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator", desc: "By province, NANP-compliant", icon: "🇨🇦" },
      { name: "UK Phone Number Generator", href: "/uk-phone-number-generator", desc: "UK area codes + mobile 07XXX formats", icon: "🇬🇧" },
      { name: "Australia Phone Number Generator", href: "/au-phone-number-generator", desc: "AU state codes + +61 international format", icon: "🇦🇺" },
      { name: "New Zealand Phone Generator", href: "/nz-phone-number-generator", desc: "NZ area codes + +64 international format", icon: "🇳🇿" },
    ],
  },
  {
    label: "Text utilities",
    color: "bg-orange-500",
    tools: [
      { name: "Word Counter", href: "/word-counter", desc: "Count words, characters, sentences & reading time", icon: "📝" },
      { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator", desc: "Generate placeholder text for designs & mockups", icon: "📄" },
      { name: "Case Converter", href: "/case-converter", desc: "UPPERCASE, lowercase, camelCase, snake_case & more", icon: "Aa" },
      { name: "Text Reverser", href: "/text-reverser", desc: "Reverse text by characters, words, or flip each word", icon: "↩" },
      { name: "Morse Code Translator", href: "/morse-code-translator", desc: "Convert text to Morse code and back", icon: "·-" },
      { name: "Binary Code Generator", href: "/binary-code-generator", desc: "Translate text to binary and binary to text", icon: "01" },
    ],
  },
  {
    label: "Developer tools",
    color: "bg-slate-600",
    tools: [
      { name: "UUID Generator", href: "/uuid-generator", desc: "Generate v4 UUIDs for databases & APIs", icon: "#" },
      { name: "Random Color Generator", href: "/random-color-generator", desc: "Random HEX, RGB & HSL colors and palettes", icon: "🎨" },
      { name: "Hash Generator", href: "/hash-generator", desc: "SHA-256, SHA-512 & more via Web Crypto API", icon: "🔑" },
      { name: "IP Address Generator", href: "/ip-address-generator", desc: "Random IPv4 and IPv6 addresses for testing", icon: "🌐" },
      { name: "Random Date Generator", href: "/random-date-generator", desc: "Random dates in any range and format", icon: "📅" },
    ],
  },
  {
    label: "Fantasy name generators",
    color: "bg-purple-600",
    tools: [
      { name: "Fantasy Name Generator", href: "/fantasy-name-generator", desc: "Human, Elf, Dwarf, Orc, Wizard & Rogue names", icon: "⚔️" },
      { name: "Elf Name Generator", href: "/elf-name-generator", desc: "Flowing elvish names with meanings", icon: "🌿" },
      { name: "Dragon Name Generator", href: "/dragon-name-generator", desc: "Ancient, Fire, Ice, Shadow & Sea dragon names", icon: "🐉" },
      { name: "Fairy Name Generator", href: "/fairy-name-generator", desc: "Whimsical and Dark Fae fairy names", icon: "🧚" },
      { name: "Demon Name Generator", href: "/demon-name-generator", desc: "Dark demonic names by rank", icon: "😈" },
      { name: "Viking Name Generator", href: "/viking-name-generator", desc: "Authentic Old Norse names with meanings", icon: "⚔️" },
      { name: "Vampire Name Generator", href: "/vampire-name-generator", desc: "Gothic, modern and ancient vampire names", icon: "🧛" },
      { name: "Pirate Name Generator", href: "/pirate-name-generator", desc: "Classic, funny & fearsome pirate names", icon: "🏴‍☠️" },
    ],
  },
  {
    label: "Utility generators",
    color: "bg-teal-600",
    tools: [
      { name: "Password Generator", href: "/password-generator", desc: "Strong random passwords with custom options", icon: "🔐" },
      { name: "Random Name Generator", href: "/random-name-generator", desc: "Realistic fake names for testing & privacy", icon: "👤" },
      { name: "Username Generator", href: "/username-generator", desc: "Cool usernames for gaming & social media", icon: "@" },
      { name: "Random Number Generator", href: "/random-number-generator", desc: "Random integers or decimals in any range", icon: "🎲" },
      { name: "Business Name Generator", href: "/business-name-generator", desc: "Creative brand & company name ideas", icon: "🏢" },
      { name: "Nickname Generator", href: "/nickname-generator", desc: "Cute, cool, or funny nicknames for anyone", icon: "😎" },
    ],
  },
  {
    label: "Gaming & fun",
    color: "bg-green-600",
    tools: [
      { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator", desc: "Cool names for Xbox, PSN, Steam", icon: "🎮" },
      { name: "Team Name Generator", href: "/team-name-generator", desc: "Sports, trivia, office & fantasy football names", icon: "🏆" },
      { name: "Rap Name Generator", href: "/rap-name-generator", desc: "Get your rapper name in seconds", icon: "🎤" },
      { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator", desc: "Get your official Wu-Tang Clan name", icon: "🎵" },
      { name: "Disney Character Generator", href: "/disney-character-generator", desc: "Discover a random Disney/Pixar character", icon: "🏰" },
      { name: "Mythical Creature Generator", href: "/mythical-creature-generator", desc: "Random fantasy creatures from world mythology", icon: "🐉" },
      { name: "Quirk Generator", href: "/quirk-generator", desc: "Random character quirks for D&D & writing", icon: "🎭" },
    ],
  },
];

const stats = [
  { num: "48+", label: "Free tools" },
  { num: "0", label: "Sign-ups needed" },
  { num: "100%", label: "Free forever" },
];

const features = [
  { icon: "⚡", title: "Instant results", desc: "Runs entirely in your browser. No waiting, no servers." },
  { icon: "🔒", title: "Privacy first", desc: "Your data never leaves your device." },
  { icon: "✅", title: "Always free", desc: "No accounts, no subscriptions, no fees." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-14 pb-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-3 py-1.5 text-xs font-medium text-violet-700 mb-6">
            ✦ 100+ free tools, no sign-up required
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight max-w-xl">
            Free Generators &amp;{" "}
            <span className="text-indigo-600">Online Tools</span>
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-lg leading-relaxed">
            Instant results in your browser. Phone numbers, cursive text, gamertags, IMEI, anagrams, and more.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="#tools"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
              ⚡ Browse all tools
            </Link>
            <Link href="/cursive-text-generator"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Most popular →
            </Link>
          </div>
          <div className="mt-10 flex gap-8 pt-8 border-t border-gray-100">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-medium text-gray-900">{s.num}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-medium text-gray-900">Popular tools</h2>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{cat.label}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.tools.map((tool) => (
                  <Link key={tool.href} href={tool.href}
                    className="group flex flex-col border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all bg-white">
                    <div className="mb-3">
                      <span className="text-xl">{tool.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">{tool.name}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed flex-1">{tool.desc}</p>
                    <span className="mt-3 text-xs text-indigo-500 group-hover:text-indigo-700 transition-colors">
                      Try it →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-gray-100 bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-base font-medium text-gray-900 mb-6">Why WebToolsWiki?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <span className="text-2xl">{f.icon}</span>
                <p className="mt-3 text-sm font-medium text-gray-900">{f.title}</p>
                <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
