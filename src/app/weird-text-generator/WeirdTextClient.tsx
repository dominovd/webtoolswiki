"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

// Bubble/circled letters
const bubbleMap: Record<string,string> = {a:"ⓐ",b:"ⓑ",c:"ⓒ",d:"ⓓ",e:"ⓔ",f:"ⓕ",g:"ⓖ",h:"ⓗ",i:"ⓘ",j:"ⓙ",k:"ⓚ",l:"ⓛ",m:"ⓜ",n:"ⓝ",o:"ⓞ",p:"ⓟ",q:"ⓠ",r:"ⓡ",s:"ⓢ",t:"ⓣ",u:"ⓤ",v:"ⓥ",w:"ⓦ",x:"ⓧ",y:"ⓨ",z:"ⓩ",A:"Ⓐ",B:"Ⓑ",C:"Ⓒ",D:"Ⓓ",E:"Ⓔ",F:"Ⓕ",G:"Ⓖ",H:"Ⓗ",I:"Ⓘ",J:"Ⓙ",K:"Ⓚ",L:"Ⓛ",M:"Ⓜ",N:"Ⓝ",O:"Ⓞ",P:"Ⓟ",Q:"Ⓠ",R:"Ⓡ",S:"Ⓢ",T:"Ⓣ",U:"Ⓤ",V:"Ⓥ",W:"Ⓦ",X:"Ⓧ",Y:"Ⓨ",Z:"Ⓩ"};

// Upside down map
const upsideMap: Record<string,string> = {a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",B:"B",C:"Ɔ",D:"D",E:"Ǝ",F:"Ⅎ",G:"פ",H:"H",I:"I",J:"ɾ",K:"K",L:"˥",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Q",R:"R",S:"S",T:"┴",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z"};

// Strikethrough
function strikethrough(text: string) { return text.split("").map(c => c === " " ? " " : c + "̶").join(""); }

// Vaporwave (fullwidth)
function vaporwave(text: string) {
  return text.split("").map(c => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCharCode(code + 65248);
    if (c === " ") return "　";
    return c;
  }).join("");
}

// Zalgo (light)
const zalgoUp = ["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","͘","̇"];
const zalgoDown = ["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ"];
function zalgo(text: string, intensity = 2) {
  return text.split("").map(c => {
    if (c === " ") return c;
    let r = c;
    for (let i = 0; i < intensity; i++) r += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
    for (let i = 0; i < intensity; i++) r += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
    return r;
  }).join("");
}

const styles = [
  { key: "bubble",      label: "Ⓑ Bubble Text",       fn: (t:string) => t.split("").map(c=>bubbleMap[c]??c).join("") },
  { key: "upside",      label: "↕ Upside Down",        fn: (t:string) => t.split("").map(c=>upsideMap[c]??c).reverse().join("") },
  { key: "strike",      label: "S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶",    fn: strikethrough },
  { key: "vaporwave",   label: "Ｖａｐｏｒｗａｖｅ",   fn: vaporwave },
  { key: "zalgo",       label: "Z̷a̴l̸g̵o̶ Glitch",     fn: (t:string) => zalgo(t, 2) },
  { key: "mock",        label: "mOcKiNg SpOnGeBoB",    fn: (t:string) => t.split("").map((c,i)=>i%2===0?c.toLowerCase():c.toUpperCase()).join("") },
];

export default function WeirdTextClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string|null>(null);

  const handleCopy = (text:string, key:string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(()=>setCopied(null),2000); });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Weird Text Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A weird text generator transforms normal text into eye-catching Unicode styles that stand out in social media posts, bios, and messages. Unlike regular bold or italic formatting that only works in certain apps, these styles use actual Unicode characters that display anywhere text is supported — including Instagram, TikTok, Twitter, Discord, and WhatsApp. Our generator offers six distinct styles from bubble text to corrupted zalgo glitch effects.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Weird Text Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Type or paste your text into the input box at the top.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>All six styles preview simultaneously: Bubble, Upside Down, Strikethrough, Vaporwave, Zalgo Glitch, and Mocking.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Copy" next to any style you want to use.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Paste directly into Instagram captions, TikTok bios, Discord messages, Twitter posts, or anywhere else.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Making Instagram bios and TikTok profiles stand out with unique text styling</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Adding ᵥₐₚₒᵣwₐᵥₑ or glitch aesthetics to social media posts</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating eye-catching Discord server names or usernames</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Using S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ text for humorous or stylistic effect in messages</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Weird Text Generator"
      icon="Z̷"
      description="Generate glitch, bubble, zalgo, upside-down, vaporwave, and other weird text effects. Copy and paste into any app."
      relatedTools={[
        { name: "Cursive Text Generator", href: "/cursive-text-generator" },
        { name: "Superscript Generator", href: "/superscript-generator" },
        { name: "Symbol Text Generator", href: "/symbol-text-generator" },
      ]}
      faqItems={[
        { q: "What is zalgo text?", a: "Zalgo text uses Unicode combining characters that stack above and below letters, creating a distorted 'corrupted' visual effect." },
        { q: "Will weird text work on Instagram or TikTok?", a: "Yes — all styles use real Unicode characters that display on most platforms, including Instagram, TikTok, Twitter, and Discord." },
        { q: "What is vaporwave text?", a: "Vaporwave (fullwidth) text uses Unicode fullwidth characters that are wider than normal, giving a retro, aesthetic feel popular in memes and social media." },
      ]}
      guide={guide}
    >
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Enter your text</label>
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={2} placeholder="Type something…" value={input} onChange={e=>setInput(e.target.value)}
        />
      </div>

      {input ? (
        <div className="mt-5 space-y-3">
          {styles.map(({ key, label, fn }) => {
            const result = fn(input);
            return (
              <div key={key} className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">{label}</span>
                  <button onClick={() => handleCopy(result, key)}
                    className="text-xs px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                    {copied === key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-lg text-gray-800 break-all leading-relaxed">{result}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-xs text-gray-400 text-center">Type something to preview all weird text styles</p>
      )}
    </ToolLayout>
  );
}
