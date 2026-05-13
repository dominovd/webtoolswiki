"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const subMap: Record<string, string> = {
  a:"ₐ",b:"b",c:"c",d:"d",e:"ₑ",f:"f",g:"g",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",
  n:"ₙ",o:"ₒ",p:"ₚ",q:"q",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",w:"w",x:"ₓ",y:"y",z:"z",
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉",
  "+":"₊","-":"₋","=":"₌","(":"₍",")":"₎",
};

function toSubscript(text: string) {
  return text.split("").map(c => subMap[c] ?? c).join("");
}

export default function SubscriptClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = toSubscript(input);

  const copy = () => {
    navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <ToolLayout
      title="Subscript Generator"
      icon="₄"
      description="Convert any text or numbers to subscript Unicode characters instantly. Perfect for chemical formulas, math notation, and stylized text."
      relatedTools={[
        { name: "Superscript Generator", href: "/superscript-generator" },
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
        { name: "Symbol Text Generator", href: "/symbol-text-generator" },
      ]}
      faqItems={[
        { q: "What is subscript text?", a: "Subscript text appears below the normal baseline — like the '2' in H₂O. Our generator uses Unicode subscript characters that work in plain text." },
        { q: "Can I use subscript for chemistry?", a: "Yes! H₂O, CO₂, CH₄ — all digits 0–9 have subscript equivalents. Most common lowercase letters also work. Great for chemical formulas in plain text." },
        { q: "Why do some letters look the same?", a: "Not all letters have Unicode subscript versions. Letters without a subscript equivalent are shown as-is." },
        { q: "Does this work in Google Docs or Word?", a: "Yes — these are real Unicode characters, not formatting. They paste as plain text and appear subscript on any platform that renders Unicode." },
      ]}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Enter your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3} placeholder="e.g. H2O, CO2…" value={input} onChange={e => setInput(e.target.value)}
        />
      </div>

      {input && (
        <div className="mt-4 bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Subscript result</p>
              <p className="text-2xl text-gray-900 break-all leading-relaxed">{result}</p>
            </div>
            <button onClick={copy}
              className="shrink-0 text-xs px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      {!input && <p className="mt-4 text-xs text-gray-400 text-center">Start typing to see subscript appear</p>}
    </ToolLayout>
  );
}
