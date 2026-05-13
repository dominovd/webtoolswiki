"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

// NZ area codes: 1 digit after leading 0; landline = 0X + 7 subscriber digits = 9 digits total
// Mobile: 02X prefix family, 8-9 digits total
const areaCodes: Record<string, string[]> = {
  "Any Region": ["09", "04", "03"],
  "Auckland": ["09"],
  "Wellington": ["04"],
  "Christchurch": ["03"],
  "Mobile (02)": ["021", "022", "027", "028"],
};

const formats = ["+64 X XXX XXXX", "0X XXX XXXX"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNZPhone(areaCode: string, format: string): string {
  const isMobile = areaCode.startsWith("02");

  if (isMobile) {
    // NZ mobile: 02X + 7 digits = 10 digits total (some 021/022/027 have 7-8 subscriber digits)
    const subscriber = String(rand(1000000, 9999999)); // 7 digits
    const full = areaCode + subscriber;
    switch (format) {
      case "+64 X XXX XXXX":
        // +64 2X XXX XXXX — drop leading 0
        return `+64 ${full.slice(1, 3)} ${full.slice(3, 6)} ${full.slice(6)}`;
      case "0X XXX XXXX":
        return `${full.slice(0, 3)} ${full.slice(3, 6)} ${full.slice(6)}`;
      default:
        return full;
    }
  }

  // Landline: 0X + 7 subscriber digits = 9 digits total
  const subscriber = String(rand(1000000, 9999999)); // 7 digits
  const full = areaCode + subscriber;

  switch (format) {
    case "+64 X XXX XXXX":
      // Drop leading 0: +64 X XXX XXXX
      return `+64 ${full.slice(1, 2)} ${full.slice(2, 5)} ${full.slice(5)}`;
    case "0X XXX XXXX":
      return `${full.slice(0, 2)} ${full.slice(2, 5)} ${full.slice(5)}`;
    default:
      return full;
  }
}

export default function NZPhoneClient() {
  const [region, setRegion] = useState("Any Region");
  const [format, setFormat] = useState("+64 X XXX XXXX");
  const [count, setCount] = useState(5);
  const [phones, setPhones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const codes = areaCodes[region] ?? areaCodes["Any Region"];
    const results = Array.from({ length: count }, () => {
      const ac = codes[Math.floor(Math.random() * codes.length)];
      return generateNZPhone(ac, format);
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
      title="New Zealand Phone Number Generator"
      icon="🇳🇿"
      description="Generate random valid-format New Zealand phone numbers for testing and development."
      relatedTools={[
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
        { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator" },
        { name: "UK Phone Number Generator", href: "/uk-phone-number-generator" },
      ]}
      faqItems={[
        {
          q: "Are these real New Zealand phone numbers?",
          a: "No. These are randomly generated numbers that follow valid New Zealand phone number formats using real area codes. They are not assigned to any real person or business.",
        },
        {
          q: "What format do New Zealand phone numbers use?",
          a: "NZ landline numbers are 9 digits and start with a single-digit area code after the leading 0: 09 for Auckland, 04 for Wellington, and 03 for Christchurch and the South Island. The international dialling code is +64.",
        },
        {
          q: "How do NZ mobile numbers work?",
          a: "New Zealand mobile numbers start with 02 and are typically 9-10 digits in total. Common prefixes include 021, 022, 027, and 028. Internationally they are written as +64 2X XXX XXXX.",
        },
      ]}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {Object.keys(areaCodes).map((r) => (
              <option key={r} value={r}>{r}</option>
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
        Generate NZ Phone Numbers
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
