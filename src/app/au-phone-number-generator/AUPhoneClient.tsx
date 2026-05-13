"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

// Australian area codes: 2-digit, subscriber numbers make 8 digits total (10 with leading 0)
const areaCodes: Record<string, string[]> = {
  "Any State": ["02", "03", "07", "08"],
  "Sydney / NSW": ["02"],
  "Melbourne / VIC": ["03"],
  "Brisbane / QLD": ["07"],
  "Perth / WA": ["08"],
  "Mobile (04)": ["04"],
};

const formats = ["+61 X XXXX XXXX", "0X XXXX XXXX", "04XX XXX XXX"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAUPhone(areaCode: string, format: string): string {
  const isMobile = areaCode === "04";

  if (isMobile) {
    // Mobile: 04XX XXX XXX — 10 digits total
    const rest = String(rand(10000000, 99999999)); // 8 digits after "04"
    const full = "04" + rest;
    switch (format) {
      case "+61 X XXXX XXXX":
        // +61 4XX XXX XXX
        return `+61 ${full.slice(1, 3)} ${full.slice(3, 7)} ${full.slice(7)}`;
      case "0X XXXX XXXX":
        return `${full.slice(0, 2)} ${full.slice(2, 6)} ${full.slice(6)}`;
      case "04XX XXX XXX":
        return `${full.slice(0, 4)} ${full.slice(4, 7)} ${full.slice(7)}`;
      default:
        return full;
    }
  }

  // Landline: 0X + 8 subscriber digits = 10 digits total
  const subscriber = String(rand(10000000, 99999999)); // 8 digits
  const full = areaCode + subscriber;

  switch (format) {
    case "+61 X XXXX XXXX":
      // Drop leading 0: +61 X XXXX XXXX
      return `+61 ${full.slice(1, 2)} ${full.slice(2, 6)} ${full.slice(6)}`;
    case "0X XXXX XXXX":
      return `${full.slice(0, 2)} ${full.slice(2, 6)} ${full.slice(6)}`;
    case "04XX XXX XXX":
      // Landline doesn't fit 04XX pattern — fall back to 0X XXXX XXXX
      return `${full.slice(0, 2)} ${full.slice(2, 6)} ${full.slice(6)}`;
    default:
      return full;
  }
}

export default function AUPhoneClient() {
  const [state, setState] = useState("Any State");
  const [format, setFormat] = useState("+61 X XXXX XXXX");
  const [count, setCount] = useState(5);
  const [phones, setPhones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const codes = areaCodes[state] ?? areaCodes["Any State"];
    const results = Array.from({ length: count }, () => {
      const ac = codes[Math.floor(Math.random() * codes.length)];
      return generateAUPhone(ac, format);
    });
    setPhones(results);
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(phones.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="Australia Phone Number Generator"
      icon="🇦🇺"
      description="Generate random valid-format Australian phone numbers for testing and development."
      relatedTools={[
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
        { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator" },
        { name: "UK Phone Number Generator", href: "/uk-phone-number-generator" },
      ]}
      faqItems={[
        {
          q: "Are these real Australian phone numbers?",
          a: "No. These are randomly generated numbers that follow valid Australian phone number formats using real area codes. They are not assigned to any real person or business.",
        },
        {
          q: "What format do Australian phone numbers use?",
          a: "Australian landline numbers are 10 digits. They start with a 2-digit area code (02 for NSW, 03 for VIC, 07 for QLD, 08 for WA/SA) followed by 8 subscriber digits. When dialling internationally, drop the leading 0 and add +61.",
        },
        {
          q: "How do Australian mobile numbers differ from landlines?",
          a: "Australian mobile numbers always start with 04 and are 10 digits in total (e.g. 0412 345 678). They are not tied to any state or region. Internationally, dial +61 4XX XXX XXX.",
        },
      ]}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State / Type</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {Object.keys(areaCodes).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {formats.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Australian Phone Numbers
      </button>

      {phones.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{phones.length} numbers generated</span>
            <button
              onClick={copyAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
            {phones.map((phone, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <code className="font-mono text-gray-800 tracking-wider">{phone}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(phone)}
                  className="text-xs text-indigo-500 hover:text-indigo-700"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
