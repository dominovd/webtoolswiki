"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function convertText(input: string, type: string): string {
  const map: Record<string, [number, number]> = {
    script:      [0x1d4ea, 0x1d4d0],
    bold_script: [0x1d4ea + 26, 0x1d4d0 + 26],
    italic:      [0x1d44e, 0x1d434],
    double:      [0x1d552, 0x1d538],
  };
  const specials: Record<string, Record<string, string>> = {
    script: { e: "𝑒", g: "𝑔", o: "𝑜", A: "𝒜", B: "𝐵", E: "𝐸", F: "𝐹", H: "𝐻", I: "𝐼", L: "𝐿", M: "𝑀", R: "𝑅" },
    italic: { h: "ℎ" },
  };

  const [lBase, uBase] = map[type] ?? [0x1d4ea, 0x1d4d0];

  return input.split("").map((ch) => {
    const sp = specials[type]?.[ch];
    if (sp) return sp;
    if (ch >= "a" && ch <= "z") return String.fromCodePoint(lBase + ch.charCodeAt(0) - 97);
    if (ch >= "A" && ch <= "Z") return String.fromCodePoint(uBase + ch.charCodeAt(0) - 65);
    return ch;
  }).join("");
}

const styles = [
  { key: "script",      label: "Cursive Script",   preview: "𝒶𝒷𝒸" },
  { key: "bold_script", label: "Bold Cursive",      preview: "𝓪𝓫𝓬" },
  { key: "italic",      label: "Italic",            preview: "𝑎𝑏𝑐" },
  { key: "double",      label: "Double Struck",     preview: "𝕒𝕓𝕔" },
];

export default function CursiveClient() {
  const [input, setInput]   = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Cursive Text Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A cursive text generator converts standard text into Unicode characters that resemble cursive or handwritten lettering styles. These are real Unicode characters — not images or fonts — so they can be copied and pasted into any app that supports text: Instagram bios, TikTok captions, Discord profiles, Twitter, WhatsApp, and more. No special font or software is needed on the receiving end.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Cursive Text Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Type or paste your text into the input box.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose from multiple styles: Script (𝓬𝓾𝓻𝓼𝓲𝓿𝓮), Bold Script (𝕭𝖔𝖑𝖉), Italic, or Double-Struck.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Copy" next to the style you want.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Paste the copied text anywhere — Instagram, TikTok, Twitter, Discord, Snapchat, and most other apps.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Decorating Instagram bios and TikTok profile names with stylish text</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Adding cursive flair to social media captions and comments</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating unique Discord usernames or server names</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Personalising messages on WhatsApp, iMessage, or Telegram</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Cursive Text Generator"
      description="Type any text and instantly convert it to cursive and fancy Unicode styles. Copy and paste anywhere — Instagram, TikTok, Twitter, Discord bios, and more."
      guide={guide}
      relatedTools={[
        { name: "Anagram Generator",           href: "/anagram-generator" },
        { name: "Xbox Gamertag Generator",      href: "/xbox-gamertag-generator" },
        { name: "IMEI Generator",               href: "/imei-generator" },
      ]}
      faqItems={[
        { q: "How does the cursive text generator work?",
          a: "It maps each letter to its Unicode equivalent in mathematical script, bold script, or italic alphabets. These are standard Unicode characters that render in cursive-like styles on most platforms." },
        { q: "Can I use cursive text on Instagram or TikTok?",
          a: "Yes! Unicode cursive characters work in Instagram bios, captions, TikTok bios, Twitter/X profiles, Discord usernames, and most social media platforms." },
        { q: "Why do some characters not convert?",
          a: "Numbers, punctuation, and special symbols don't have Unicode script equivalents and appear as-is. Only standard a–z and A–Z letters are converted." },
        { q: "Is the generated text a font?",
          a: "No — it's regular Unicode text, not a font. That's why it can be copied and pasted anywhere without installing anything." },
      ]}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">Enter your text</label>
      <textarea
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows={3}
        placeholder="Type something here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input ? (
        <div className="mt-6 space-y-4">
          {styles.map(({ key, label }) => {
            const converted = convertText(input, key);
            return (
              <div key={key} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
                  <button
                    onClick={() => handleCopy(converted, key)}
                    className="text-xs px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    {copied === key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xl text-gray-800 break-all">{converted}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-400 text-center">Start typing to see cursive styles appear below</p>
      )}
    </ToolLayout>
  );
}
