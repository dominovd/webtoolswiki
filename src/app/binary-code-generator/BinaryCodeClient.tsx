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

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is Binary Code?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">Binary code is the fundamental language of computers, representing all data as sequences of 0s and 1s. Each character in standard ASCII encoding is represented by 8 binary digits (bits), called a byte. For example, the letter 'A' is 01000001 and 'a' is 01100001. Understanding binary is essential for computer science students, programmers, and anyone interested in how computers work at the hardware level.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Binary Code Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Select "Text → Binary" to convert text into binary code, or "Binary → Text" to decode binary back to readable text.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Type or paste your input.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Convert" to see the result in the monospace output card.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Copy the result with the Copy button.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Learning how computers represent text and data at the binary level</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating binary-coded messages for puzzles, escape rooms, and games</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Studying computer science fundamentals and data encoding</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Converting text for low-level programming exercises and demonstrations</span></li>
        </ul>
      </div>
    </div>
  );

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
      guide={guide}
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
