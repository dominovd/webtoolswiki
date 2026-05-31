"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

type IPType = "IPv4" | "IPv6" | "Both";
const COUNT_OPTIONS = [1, 5, 10, 20];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateIPv4(): string {
  // First octet: 1-223, excluding 127
  let first = randomInt(1, 222);
  if (first >= 127) first += 1; // skip 127
  const second = randomInt(0, 255);
  const third = randomInt(0, 255);
  const fourth = randomInt(0, 255);
  return `${first}.${second}.${third}.${fourth}`;
}

function generateIPv6(): string {
  return Array.from({ length: 8 }, () =>
    randomInt(0, 65535).toString(16).padStart(4, "0")
  ).join(":");
}

function generateAddress(type: IPType): string {
  if (type === "IPv4") return generateIPv4();
  if (type === "IPv6") return generateIPv6();
  return Math.random() < 0.5 ? generateIPv4() : generateIPv6();
}

export default function IPAddressClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [type, setType] = useState<IPType>("IPv4");
  const [count, setCount] = useState(5);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = () => {
    setAddresses(Array.from({ length: count }, () => generateAddress(type)));
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const handleCopyOne = (addr: string, index: number) => {
    navigator.clipboard.writeText(addr).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(addresses.join("\n")).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="IP Address Generator"
      description="Generate random IPv4 and IPv6 addresses for testing, development, and network simulations."
      icon="🌐"
      relatedTools={[
        { name: "UUID Generator", href: "/uuid-generator" },
        { name: "Random Number Generator", href: "/random-number-generator" },
        { name: "Password Generator", href: "/password-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-5">
        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Type</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {(["IPv4", "IPv6", "Both"] as IPType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  type === t ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Count</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  count === n ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors mb-5"
      >
        Generate Addresses
      </button>

      {/* Results */}
      {addresses.length > 0 && (
        <>
          <div className="space-y-2 mb-4">
            {addresses.map((addr, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-gray-900 break-all select-all">{addr}</span>
                <button
                  onClick={() => handleCopyOne(addr, i)}
                  className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleCopyAll}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {copiedAll ? "Copied all!" : "Copy All"}
          </button>
        </>
      )}
    </ToolLayout>
  );
}
