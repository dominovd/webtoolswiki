"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

async function hashText(text: string, algo: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const ALGORITHMS: { label: string; algo: string; note?: string }[] = [
  { label: "SHA-1", algo: "SHA-1", note: "(not recommended for security)" },
  { label: "SHA-256", algo: "SHA-256" },
  { label: "SHA-384", algo: "SHA-384" },
  { label: "SHA-512", algo: "SHA-512" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 flex-shrink-0"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function HashClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to hash.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const results: Record<string, string> = {};
      await Promise.all(
        ALGORITHMS.map(async ({ algo }) => {
          results[algo] = await hashText(inputText, algo);
        })
      );
      setHashes(results);
    } catch {
      setError("Failed to generate hashes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-256, SHA-1, SHA-384, and SHA-512 hashes from any text. Runs entirely in your browser using the Web Crypto API."
      icon="#"
      relatedTools={[
        { name: "UUID Generator", href: "/uuid-generator" },
        { name: "Password Generator", href: "/password-generator" },
        { name: "Binary Code Generator", href: "/binary-code-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text to hash
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter any text here..."
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">Tip: Press Ctrl+Enter (or Cmd+Enter) to generate.</p>
      </div>

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-colors disabled:opacity-60 mb-6"
      >
        {loading ? "Generating..." : "Generate Hashes"}
      </button>

      {/* Results grid */}
      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {ALGORITHMS.map(({ label, algo, note }) => (
            <div key={algo} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">{label}</span>
                  {note && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{note}</span>
                  )}
                </div>
                <CopyButton text={hashes[algo] ?? ""} />
              </div>
              <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                {hashes[algo] || "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
