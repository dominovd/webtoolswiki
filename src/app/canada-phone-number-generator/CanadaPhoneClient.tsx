"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const areaCodes: Record<string, number[]> = {
  "Any Province": [204,226,236,249,250,289,306,343,365,367,368,403,416,418,431,437,438,450,506,514,519,548,579,581,587,604,613,639,647,672,705,709,778,780,782,807,819,825,867,873,902,905],
  "Ontario": [226,249,289,343,365,416,437,519,548,613,647,705,807,905],
  "Quebec": [367,368,418,438,450,514,579,581,819,873],
  "British Columbia": [236,250,604,672,778],
  "Alberta": [403,587,780,825],
  "Saskatchewan": [306,639],
  "Manitoba": [204,431],
  "Nova Scotia": [782,902],
  "New Brunswick": [506,782],
};

const formats = ["(XXX) XXX-XXXX", "XXX-XXX-XXXX", "+1 XXX XXX XXXX", "XXX.XXX.XXXX"];

function generateCAPhone(areaCode: number, format: string): string {
  const exchange = Math.floor(Math.random() * 800) + 200;
  const subscriber = Math.floor(Math.random() * 9000) + 1000;
  const ac = String(areaCode);
  const ex = String(exchange).padStart(3, "0");
  const sub = String(subscriber).padStart(4, "0");

  switch (format) {
    case "(XXX) XXX-XXXX": return `(${ac}) ${ex}-${sub}`;
    case "XXX-XXX-XXXX": return `${ac}-${ex}-${sub}`;
    case "+1 XXX XXX XXXX": return `+1 ${ac} ${ex} ${sub}`;
    case "XXX.XXX.XXXX": return `${ac}.${ex}.${sub}`;
    default: return `(${ac}) ${ex}-${sub}`;
  }
}

export default function CanadaPhoneClient() {
  const [province, setProvince] = useState("Any Province");
  const [format, setFormat] = useState("(XXX) XXX-XXXX");
  const [count, setCount] = useState(5);
  const [phones, setPhones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const codes = areaCodes[province] ?? areaCodes["Any Province"];
    const results = Array.from({ length: count }, () => {
      const ac = codes[Math.floor(Math.random() * codes.length)];
      return generateCAPhone(ac, format);
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
      title="Canada Phone Number Generator"
      description="Generate random, valid-format Canadian phone numbers for testing, forms, and software development. Choose province and format."
      relatedTools={[
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
        { name: "IMEI Generator", href: "/imei-generator" },
        { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
      ]}
      faqItems={[
        {
          q: "Are these real Canadian phone numbers?",
          a: "No. These are randomly generated numbers with valid NANP format using real Canadian area codes. They are not assigned to any real person.",
        },
        {
          q: "Does Canada use the same phone format as the US?",
          a: "Yes — Canada uses the North American Numbering Plan (NANP), the same 10-digit system as the US. Canadian numbers use +1 country code and have province-specific area codes.",
        },
        {
          q: "What's the difference between Canadian and US numbers?",
          a: "The format is identical. The difference is in which area codes are assigned — Canadian area codes include 416 (Toronto), 604 (Vancouver), 514 (Montreal), 780 (Edmonton), etc.",
        },
      ]}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            {Object.keys(areaCodes).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {formats.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[1, 5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors"
      >
        Generate Canadian Phone Numbers
      </button>

      {phones.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{phones.length} numbers generated</span>
            <button onClick={copyAll} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
            {phones.map((phone, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <code className="font-mono text-gray-800 tracking-wider">{phone}</code>
                <button onClick={() => navigator.clipboard.writeText(phone)} className="text-xs text-indigo-500 hover:text-indigo-700">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
