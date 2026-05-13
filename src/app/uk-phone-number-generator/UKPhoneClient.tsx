"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const areaCodes: Record<string, string[]> = {
  "Any Region": ["020", "0161", "0121", "0113", "0141", "0131", "0151", "0117", "0114", "0191"],
  "London": ["020"],
  "Manchester": ["0161"],
  "Birmingham": ["0121"],
  "Leeds": ["0113"],
  "Glasgow": ["0141"],
  "Edinburgh": ["0131"],
  "Liverpool": ["0151"],
  "Bristol": ["0117"],
  "Sheffield": ["0114"],
  "Newcastle": ["0191"],
  "Mobile": ["07700", "07800", "07900", "07400", "07500", "07600"],
};

const formats = ["+44 XXXX XXXXXX", "0XXX XXX XXXX", "0XXXXXXXXXXXX"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUKPhone(areaCode: string, format: string): string {
  const isMobile = areaCode.startsWith("07");

  if (isMobile) {
    // Mobile: prefix is 5 digits (e.g. 07700), subscriber is 6 digits
    const subscriber = String(rand(100000, 999999));
    const local = areaCode + subscriber;
    switch (format) {
      case "+44 XXXX XXXXXX": {
        // +44 7700 XXXXXX
        const withoutLeadingZero = local.slice(1); // remove leading 0
        return `+44 ${withoutLeadingZero.slice(0, 4)} ${withoutLeadingZero.slice(4)}`;
      }
      case "0XXX XXX XXXX":
        return `${areaCode} ${subscriber.slice(0, 3)} ${subscriber.slice(3)}`;
      case "0XXXXXXXXXXXX":
        return local;
      default:
        return local;
    }
  }

  // Landline: area code is 3-4 digits, subscriber fills to 10 digits total
  const totalDigits = 10;
  const subscriberLength = totalDigits - areaCode.length;
  const subscriberMin = Math.pow(10, subscriberLength - 1);
  const subscriberMax = Math.pow(10, subscriberLength) - 1;
  const subscriber = String(rand(subscriberMin, subscriberMax));

  switch (format) {
    case "+44 XXXX XXXXXX": {
      const withoutLeadingZero = (areaCode + subscriber).slice(1);
      const areaLen = areaCode.length - 1;
      return `+44 ${withoutLeadingZero.slice(0, areaLen)} ${withoutLeadingZero.slice(areaLen)}`;
    }
    case "0XXX XXX XXXX": {
      const local = areaCode + subscriber;
      const mid = local.slice(areaCode.length, areaCode.length + 3);
      const end = local.slice(areaCode.length + 3);
      return `${areaCode} ${mid} ${end}`;
    }
    case "0XXXXXXXXXXXX":
      return areaCode + subscriber;
    default:
      return areaCode + subscriber;
  }
}

export default function UKPhoneClient() {
  const [region, setRegion] = useState("Any Region");
  const [format, setFormat] = useState("+44 XXXX XXXXXX");
  const [count, setCount] = useState(5);
  const [phones, setPhones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const codes = areaCodes[region] ?? areaCodes["Any Region"];
    const results = Array.from({ length: count }, () => {
      const ac = codes[Math.floor(Math.random() * codes.length)];
      return generateUKPhone(ac, format);
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
      title="UK Phone Number Generator"
      icon="🇬🇧"
      description="Generate random valid-format UK phone numbers for testing and development."
      relatedTools={[
        { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
        { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator" },
        { name: "IMEI Generator", href: "/imei-generator" },
      ]}
      faqItems={[
        {
          q: "Are these real UK phone numbers?",
          a: "No. These are randomly generated numbers that follow valid UK phone number formats using real area codes. They are not assigned to any real person or business.",
        },
        {
          q: "What format do UK phone numbers use?",
          a: "UK landline numbers are 10 digits starting with 0 (e.g. 020 for London, 0161 for Manchester). When dialling internationally, drop the leading 0 and add +44. Mobile numbers start with 07 and are also 11 digits in total.",
        },
        {
          q: "What is the difference between UK landline and mobile numbers?",
          a: "UK landlines use geographic area codes such as 020 (London) or 0121 (Birmingham). Mobile numbers always start with 07 (e.g. 07700, 07800) and are not tied to a specific region.",
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
        Generate UK Phone Numbers
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
