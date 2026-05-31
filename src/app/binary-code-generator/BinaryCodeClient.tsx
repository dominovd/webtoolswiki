"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

function textToBinary(text: string): string {
  return text
    .split("")
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  const bytes = binary.trim().split(/\s+/);
  return bytes
    .map((byte) => {
      const code = parseInt(byte, 2);
      return isNaN(code) ? "?" : String.fromCharCode(code);
    })
    .join("");
}

export default function BinaryCodeClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [mode, setMode] = useState<"toBinary" | "fromBinary">("toBinary");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (mode === "toBinary") {
      setResult(textToBinary(input));
    } else {
      setResult(binaryToText(input));
    }
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const switchMode = (newMode: "toBinary" | "fromBinary") => {
    setMode(newMode);
    setInput("");
    setResult("");
    setCopied(false);
  };

  return (
    <ToolLayout
      title="Binary Code Generator"
      description="Convert text to binary code or decode binary back to text. Each character is represented as 8-bit binary (ASCII encoding)."
      icon="01"
      relatedTools={[
        { name: "Morse Code Translator", href: "/morse-code-translator" },
        { name: "Hash Generator", href: "/hash-generator" },
        { name: "UUID Generator", href: "/uuid-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Mode toggle */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-5 w-fit">
        <button
          onClick={() => switchMode("toBinary")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "toBinary"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Text → Binary
        </button>
        <button
          onClick={() => switchMode("fromBinary")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "fromBinary"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Binary → Text
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {mode === "toBinary" ? "Enter text" : "Enter binary code"}
        </label>
        {mode === "fromBinary" && (
          <p className="text-xs text-gray-400 mb-2">
            Separate each 8-bit group with a space, e.g. <code className="bg-gray-100 px-1 rounded">01000001 01000010</code>
          </p>
        )}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "toBinary"
              ? "Type something here..."
              : "01001000 01100101 01101100 01101100 01101111"
          }
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Convert button */}
      <button
        onClick={handleConvert}
        disabled={!input.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 mb-5"
      >
        Convert
      </button>

      {/* Result */}
      {result && (
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Result</span>
            <button
              onClick={handleCopy}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="font-mono text-sm text-gray-900 break-all leading-relaxed select-all">
            {result}
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
