"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const categories = [
  { label: "Hearts & Love", symbols: ["❤","🧡","💛","💚","💙","💜","🖤","🤍","💔","❣","💕","💞","💓","💗","💖","💘","💝","💟","♡","♥"] },
  { label: "Stars & Sparkles", symbols: ["★","☆","✦","✧","✩","✪","✫","✬","✭","✮","✯","✰","⭐","🌟","💫","✨","🌠","⭑","⭒","✵"] },
  { label: "Arrows", symbols: ["→","←","↑","↓","↔","↕","↗","↘","↙","↖","⇒","⇐","⇑","⇓","⇔","➔","➜","➝","➞","➟","➠","➡","➢","➣","➤","➥","➦","➧","➨"] },
  { label: "Math", symbols: ["∞","≠","≈","≤","≥","±","÷","×","∑","√","∫","∂","∆","∇","π","∈","∉","∅","⊂","⊃","∩","∪","∧","∨","¬"] },
  { label: "Currency", symbols: ["$","€","£","¥","₹","₽","₩","₪","₫","฿","₱","₴","₦","₡","₢","₣","₤","₥","₧","₨","₲","₵","₸","₺"] },
  { label: "Decorative", symbols: ["✿","❀","❁","❂","❃","❄","❅","❆","❇","❈","❉","❊","❋","✾","✽","✺","✹","✸","✷","✶","✵","✴","✳","✲","✱"] },
  { label: "Checkmarks & X", symbols: ["✓","✔","✕","✖","✗","✘","☑","☒","☐","❌","❎","✅","☓","⊗","⊘","⊙","⊚","⊛","⊜","⊝"] },
  { label: "Miscellaneous", symbols: ["©","®","™","℃","℉","°","§","¶","†","‡","‰","‱","№","℗","℘","ℛ","℞","℟","℠","℡","Ω","μ","∞","♾","⚡","☀","☁","☂","☃","☄"] },
];

export default function SymbolTextClient() {
  const [collected, setCollected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const add = (sym: string) => setCollected(prev => [...prev, sym]);
  const remove = (i: number) => setCollected(prev => prev.filter((_, idx) => idx !== i));

  const copySymbol = (sym: string) => {
    navigator.clipboard.writeText(sym).then(() => { setLastCopied(sym); setTimeout(() => setLastCopied(null), 1200); });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(collected.join("")).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <ToolLayout
      title="Symbol Text Generator"
      icon="★"
      description="Click any symbol to copy it instantly, or build a collection of symbols to copy all at once. Hundreds of Unicode symbols organized by category."
      relatedTools={[
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
        { name: "Superscript Generator", href: "/superscript-generator" },
      ]}
      faqItems={[
        { q: "How do I copy a symbol?", a: "Click any symbol to copy it to your clipboard instantly. You can also click '+' to add it to your collection, then copy all at once." },
        { q: "Will these symbols work everywhere?", a: "Most Unicode symbols display correctly on modern devices, browsers, and apps. Older systems may show boxes or question marks for some symbols." },
        { q: "Can I use symbols in Instagram bio or TikTok?", a: "Yes! Unicode symbols paste directly into social media bios, captions, and usernames on most platforms." },
      ]}
    >
      {/* Collection builder */}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-500 mb-2">Your collection</p>
        <div className="min-h-12 bg-gray-50 rounded-xl border border-gray-200 p-3 flex flex-wrap gap-2 items-center">
          {collected.length === 0 ? (
            <span className="text-xs text-gray-400">Click symbols below to add them here</span>
          ) : (
            <>
              {collected.map((sym, i) => (
                <span key={i} onClick={() => remove(i)}
                  className="text-lg cursor-pointer hover:opacity-60 transition-opacity" title="Click to remove">
                  {sym}
                </span>
              ))}
              <button onClick={copyAll}
                className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">
                {copied ? "Copied!" : "Copy all"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Symbol grid */}
      <div className="space-y-5">
        {categories.map(cat => (
          <div key={cat.label}>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">{cat.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.symbols.map(sym => (
                <div key={sym} className="relative group">
                  <button
                    onClick={() => copySymbol(sym)}
                    onContextMenu={(e) => { e.preventDefault(); add(sym); }}
                    title="Click to copy · Right-click to add to collection"
                    className="w-9 h-9 text-lg border border-gray-100 rounded-lg hover:border-indigo-300 hover:bg-violet-50 transition-all flex items-center justify-center"
                  >
                    {sym}
                  </button>
                  {lastCopied === sym && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
                      Copied!
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400">Tip: click to copy instantly · right-click to add to collection</p>
    </ToolLayout>
  );
}
