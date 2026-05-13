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
      { name: "Cursive Text Generator", href: "/cursive-text-generator", desc: "Convert text to Unicode cursive styles", vol: "90K/mo", icon: "✍️", badge: "bg-violet-50 text-violet-700" },
      { name: "Anagram Generator", href: "/anagram-generator", desc: "Rearrange letters into new words", vol: "71K/mo", icon: "🔀", badge: "bg-violet-50 text-violet-700" },
      { name: "Weird Text Generator", href: "/weird-text-generator", desc: "Glitch, zalgo, bubble, vaporwave styles", vol: "40K/mo", icon: "Z̷", badge: "bg-violet-50 text-violet-700" },
      { name: "Symbol Text Generator", href: "/symbol-text-generator", desc: "Hearts, stars, arrows & 200+ symbols", vol: "35K/mo", icon: "★", badge: "bg-violet-50 text-violet-700" },
      { name: "Superscript Generator", href: "/superscript-generator", desc: "Tiny raised Unicode letters & numbers", vol: "25K/mo", icon: "ˢ", badge: "bg-violet-50 text-violet-700" },
      { name: "Subscript Generator", href: "/subscript-generator", desc: "Chemical formulas & subscript text", vol: "18K/mo", icon: "₄", badge: "bg-violet-50 text-violet-700" },
    ],
  },
  {
    label: "Word generators",
    color: "bg-amber-500",
    tools: [
      { name: "Pictionary Word Generator", href: "/pictionary-word-generator", desc: "Easy, medium & hard drawing game words", vol: "22K/mo", icon: "🎨", badge: "bg-amber-50 text-amber-700" },
      { name: "5-Letter Word Generator", href: "/5-letter-word-generator", desc: "Random 5-letter words — great for Wordle", vol: "12K/mo", icon: "5️⃣", badge: "bg-amber-50 text-amber-700" },
      { name: "4-Letter Word Generator", href: "/4-letter-word-generator", desc: "Random 4-letter words for word games", vol: "13K/mo", icon: "4️⃣", badge: "bg-amber-50 text-amber-700" },
      { name: "6-Letter Word Generator", href: "/6-letter-word-generator", desc: "Random 6-letter words for Scrabble & puzzles", vol: "5K/mo", icon: "6️⃣", badge: "bg-amber-50 text-amber-700" },
    ],
  },
  {
    label: "Phone number generators",
    color: "bg-blue-600",
    tools: [
      { name: "US Phone Number Generator", href: "/us-phone-number-generator", desc: "Real area codes, multiple formats", vol: "147K/mo", icon: "🇺🇸", badge: "bg-blue-50 text-blue-700" },
      { name: "IMEI Generator", href: "/imei-generator", desc: "Valid-format IMEI with Luhn checksum", vol: "185K/mo", icon: "📱", badge: "bg-blue-50 text-blue-700" },
      { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator", desc: "By province, NANP-compliant", vol: "41K/mo", icon: "🇨🇦", badge: "bg-blue-50 text-blue-700" },
      { name: "UK Phone Number Generator", href: "/uk-phone-number-generator", desc: "UK area codes + mobile 07XXX formats", vol: "30K/mo", icon: "🇬🇧", badge: "bg-blue-50 text-blue-700" },
      { name: "Australia Phone Number Generator", href: "/au-phone-number-generator", desc: "AU state codes + +61 international format", vol: "20K/mo", icon: "🇦🇺", badge: "bg-blue-50 text-blue-700" },
      { name: "New Zealand Phone Generator", href: "/nz-phone-number-generator", desc: "NZ area codes + +64 international format", vol: "8K/mo", icon: "🇳🇿", badge: "bg-blue-50 text-blue-700" },
    ],
  },
  {
    label: "Gaming & fun",
    color: "bg-green-600",
    tools: [
      { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator", desc: "Cool names for Xbox, PSN, Steam", vol: "92K/mo", icon: "🎮", badge: "bg-green-50 text-green-700" },
      { name: "Wu-Tang Name Generator", href: "/wu-tang-name-generator", desc: "Get your official Wu-Tang Clan name", vol: "18K/mo", icon: "🎤", badge: "bg-green-50 text-green-700" },
      { name: "Disney Character Generator", href: "/disney-character-generator", desc: "Discover a random Disney/Pixar character", vol: "15K/mo", icon: "🏰", badge: "bg-green-50 text-green-700" },
      { name: "Mythical Creature Generator", href: "/mythical-creature-generator", desc: "Random fantasy creatures from world mythology", vol: "12K/mo", icon: "🐉", badge: "bg-green-50 text-green-700" },
      { name: "Quirk Generator", href: "/quirk-generator", desc: "Random character quirks for D&D & writing", vol: "9K/mo", icon: "🎭", badge: "bg-green-50 text-green-700" },
    ],
  },
];

const stats = [
  { num: "21+", label: "Free tools" },
  { num: "700K+", label: "Monthly searches" },
  { num: "0", label: "Sign-ups needed" },
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
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xl">{tool.icon}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tool.badge}`}>
                        {tool.vol}
                      </span>
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
