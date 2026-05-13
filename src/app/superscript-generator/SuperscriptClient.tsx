"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const supMap: Record<string, string> = {
  a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",
  n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"q",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ",
  A:"ᴬ",B:"ᴮ",C:"ᶜ",D:"ᴰ",E:"ᴱ",F:"ᶠ",G:"ᴳ",H:"ᴴ",I:"ᴵ",J:"ᴶ",K:"ᴷ",L:"ᴸ",M:"ᴹ",
  N:"ᴺ",O:"ᴼ",P:"ᴾ",Q:"Q",R:"ᴿ",S:"ˢ",T:"ᵀ",U:"ᵁ",V:"ᵛ",W:"ᵂ",X:"ˣ",Y:"ʸ",Z:"ᶻ",
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
  "+":"⁺","-":"⁻","=":"⁼","(":"⁽",")":"⁾",
};

function toSuperscript(text: string) {
  return text.split("").map(c => supMap[c] ?? c).join("");
}

export default function SuperscriptClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = toSuperscript(input);

  const copy = () => {
    navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <ToolLayout
      title="Superscript Generator"
      icon="⁴"
      description="Convert any text or numbers to superscript Unicode characters instantly. Works everywhere — Google Docs, social media, emails, and more."
      relatedTools={[
        { name: "Subscript Generator", href: "/subscript-generator" },
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "Weird Text Generator", href: "/weird-text-generator" },
        { name: "Symbol Text Generator", href: "/symbol-text-generator" },
      ]}
      faqItems={[
        { q: "What is a superscript generator?", a: "It converts regular letters and numbers to their Unicode superscript equivalents — characters that appear raised above the baseline, like ᵃ ᵇ ᶜ or ¹ ² ³." },
        { q: "Where can I use superscript text?", a: "Anywhere that accepts Unicode text: Google Docs, Twitter/X, Instagram bios, Discord, WhatsApp, email, and most websites." },
        { q: "Are all letters available as superscript?", a: "Most lowercase letters, all digits, and some uppercase letters have Unicode superscript equivalents. A few characters (like Q) have no official superscript and appear unchanged." },
        { q: "Is this the same as HTML <sup> tag?", a: "No — our generator produces real Unicode characters, not HTML markup. This means the result works in plain-text environments where HTML isn't supported." },
      ]}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Enter your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3} placeholder="Type anything…" value={input} onChange={e => setInput(e.target.value)}
        />
      </div>

      {input && (
        <div className="mt-4 bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Superscript result</p>
              <p className="text-2xl text-gray-900 break-all leading-relaxed">{result}</p>
            </div>
            <button onClick={copy}
              className="shrink-0 text-xs px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      {!input && (
        <p className="mt-4 text-xs text-gray-400 text-center">Start typing to see superscript appear</p>
      )}
    </ToolLayout>
  );
}
