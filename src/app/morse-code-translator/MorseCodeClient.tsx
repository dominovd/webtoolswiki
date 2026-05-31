"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "/": "-..-.",
  " ": "/",
};

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => MORSE_MAP[ch] ?? "")
    .filter((code, i, arr) => {
      // collapse consecutive "/" separators from multiple spaces
      if (code === "/" && arr[i - 1] === "/") return false;
      return code !== "";
    })
    .join(" ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(" / ")
    .map((word) =>
      word
        .split(" ")
        .map((code) => REVERSE_MAP[code] ?? "?")
        .join("")
    )
    .join(" ");
}

export default function MorseCodeClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [mode, setMode] = useState<"toMorse" | "fromMorse">("toMorse");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    if (mode === "toMorse") {
      setResult(textToMorse(input));
    } else {
      setResult(morseToText(input));
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

  const switchMode = (newMode: "toMorse" | "fromMorse") => {
    setMode(newMode);
    setInput("");
    setResult("");
    setCopied(false);
  };

  return (
    <ToolLayout
      title="Morse Code Translator"
      description="Convert text to Morse code or decode Morse code back to text instantly. Supports all letters, numbers, and common punctuation."
      icon="·-"
      relatedTools={[
        { name: "Binary Code Generator", href: "/binary-code-generator" },
        { name: "Text Reverser", href: "/text-reverser" },
        { name: "Case Converter", href: "/case-converter" },
      ]}
      faqItems={faqItems}
    >
      {/* Mode toggle */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-5 w-fit">
        <button
          onClick={() => switchMode("toMorse")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "toMorse"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Text → Morse
        </button>
        <button
          onClick={() => switchMode("fromMorse")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "fromMorse"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Morse → Text
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {mode === "toMorse" ? "Enter text" : "Enter Morse code"}
        </label>
        {mode === "fromMorse" && (
          <p className="text-xs text-gray-400 mb-2">
            Separate letters with spaces, words with &nbsp;<code className="bg-gray-100 px-1 rounded"> / </code>
          </p>
        )}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "toMorse"
              ? "Type something here..."
              : "... --- ...  /  ... --- ..."
          }
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Translate button */}
      <button
        onClick={handleTranslate}
        disabled={!input.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 mb-5"
      >
        Translate
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
