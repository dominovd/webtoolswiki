"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const tacPrefixes = [
  { brand: "Apple iPhone 15",      tac: "35617510" },
  { brand: "Apple iPhone 14",      tac: "35332211" },
  { brand: "Apple iPhone 13",      tac: "35274211" },
  { brand: "Samsung Galaxy S24",   tac: "35874611" },
  { brand: "Samsung Galaxy S23",   tac: "35265811" },
  { brand: "Google Pixel 8",       tac: "35693311" },
  { brand: "Xiaomi 13",            tac: "86741404" },
  { brand: "OnePlus 12",           tac: "86765103" },
  { brand: "Random",               tac: null },
];

function generateIMEI(tac: string | null): string {
  let body = tac ?? Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  while (body.length < 14) body += Math.floor(Math.random() * 10).toString();
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let d = parseInt(body[i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return body + (10 - (sum % 10)) % 10;
}

export default function IMEIClient() {
  const [selectedBrand, setSelectedBrand] = useState("Random");
  const [selectedTac,   setSelectedTac]   = useState<string | null>(null);
  const [count,  setCount]  = useState(5);
  const [imeis,  setImeis]  = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setImeis(Array.from({ length: count }, () => generateIMEI(selectedTac)));
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(imeis.join("\n")).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is an IMEI Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">An IMEI (International Mobile Equipment Identity) generator creates 15-digit numbers that follow the valid IMEI format and pass the Luhn checksum algorithm. These generated IMEIs are structurally identical to real device IMEIs but are not registered to any actual device. They are widely used by developers, QA engineers, and researchers who need valid-format IMEI numbers without using real device identifiers.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the IMEI Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select the device brand (iPhone, Samsung, Pixel, or Random) to use a realistic TAC prefix for that manufacturer.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose how many IMEIs to generate — from 1 up to 50.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate" to create a fresh batch of valid-format IMEIs.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy individual IMEIs or use "Copy All" to grab the full list for your test data.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Testing mobile app features that validate or display IMEI numbers</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Seeding development databases with realistic device identifiers</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>QA testing form validation for IMEI input fields</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Academic research and education about mobile device identification</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="IMEI Generator"
      description="Generate random, valid-format IMEI numbers for testing. Choose a device type or generate fully random IMEIs with correct Luhn checksum."
      guide={guide}
      relatedTools={[
        { name: "US Phone Number Generator",     href: "/us-phone-number-generator" },
        { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator" },
        { name: "Cursive Text Generator",        href: "/cursive-text-generator" },
      ]}
      faqItems={[
        { q: "What is an IMEI number?",
          a: "IMEI stands for International Mobile Equipment Identity — a unique 15-digit number identifying every mobile device. Carriers use it to validate devices on their networks." },
        { q: "Are these IMEI numbers real?",
          a: "No. These are randomly generated numbers with valid format and checksum, for testing purposes only. They are not associated with any real device." },
        { q: "How is IMEI validated?",
          a: "IMEI numbers use the Luhn algorithm — the same checksum formula used for credit card numbers. Our generator always produces structurally valid IMEIs." },
        { q: "What is a TAC code?",
          a: "The first 8 digits of an IMEI are the Type Allocation Code (TAC), identifying the manufacturer and model. The last digit is the Luhn checksum." },
      ]}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Device type</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={selectedBrand}
            onChange={(e) => {
              const found = tacPrefixes.find((t) => t.brand === e.target.value);
              setSelectedBrand(e.target.value);
              setSelectedTac(found?.tac ?? null);
            }}
          >
            {tacPrefixes.map((t) => <option key={t.brand} value={t.brand}>{t.brand}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many?</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20, 50].map((n) => <option key={n} value={n}>{n} IMEI{n > 1 ? "s" : ""}</option>)}
          </select>
        </div>
      </div>

      <button onClick={generate}
        className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors">
        Generate IMEI Numbers
      </button>

      {imeis.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{imeis.length} IMEI{imeis.length > 1 ? "s" : ""} generated</span>
            <button onClick={copyAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
            {imeis.map((imei, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <code className="font-mono text-gray-800 text-sm tracking-wider">{imei}</code>
                <button onClick={() => navigator.clipboard.writeText(imei)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 ml-4">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
