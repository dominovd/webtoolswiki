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

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is an IP Address?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">An IP (Internet Protocol) address is a numerical label assigned to every device on a network. IPv4 addresses are written as four groups of numbers (0–255) separated by dots, like 192.168.1.1. IPv6 uses eight groups of four hexadecimal digits, like 2001:0db8:85a3:0000:0000:8a2e:0370:7334. IPv4 offers about 4 billion unique addresses, which have been largely exhausted, driving the transition to IPv6 with its virtually unlimited address space.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the IP Address Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Choose address type: IPv4, IPv6, or Both.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Select how many addresses to generate (1–20).</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Generate" to create random IP addresses.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy individual addresses or use "Copy All."</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Populating test databases with realistic network address data</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Testing IP validation logic and network-related form fields</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating sample datasets for networking tutorials and demos</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Simulating network logs for development and QA testing</span></li>
        </ul>
      </div>
    </div>
  );

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
      guide={guide}
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
