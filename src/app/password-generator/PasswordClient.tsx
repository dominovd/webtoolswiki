"use client";
import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getStrength(password: string, length: number, charsetSize: number): { label: string; color: string; width: string } {
  if (length < 8 || charsetSize === 0) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (length < 12 || charsetSize < 30) return { label: "Fair", color: "bg-orange-400", width: "w-2/4" };
  if (length < 16 || charsetSize < 60) return { label: "Strong", color: "bg-green-500", width: "w-3/4" };
  return { label: "Very Strong", color: "bg-emerald-500", width: "w-full" };
}

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let charset = "";
  if (useUpper) charset += UPPERCASE;
  if (useLower) charset += LOWERCASE;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;
  if (!charset) return "";

  // Guarantee at least one character from each selected set
  const required: string[] = [];
  if (useUpper) required.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  if (useLower) required.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  if (useNumbers) required.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  if (useSymbols) required.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);

  const rest = Array.from({ length: length - required.length }, () =>
    charset[Math.floor(Math.random() * charset.length)]
  );

  const all = [...required, ...rest];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.join("");
}

export default function PasswordClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(length, useUpper, useLower, useNumbers, useSymbols));
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  useEffect(() => { generate(); }, [generate]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const charsetSize =
    (useUpper ? UPPERCASE.length : 0) +
    (useLower ? LOWERCASE.length : 0) +
    (useNumbers ? NUMBERS.length : 0) +
    (useSymbols ? SYMBOLS.length : 0);

  const strength = getStrength(password, length, charsetSize);

  const toggles: { label: string; value: boolean; set: (v: boolean) => void }[] = [
    { label: "Uppercase (A-Z)", value: useUpper, set: setUseUpper },
    { label: "Lowercase (a-z)", value: useLower, set: setUseLower },
    { label: "Numbers (0-9)", value: useNumbers, set: setUseNumbers },
    { label: "Symbols (!@#$%^&*)", value: useSymbols, set: setUseSymbols },
  ];

  const guide = (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">What is a Password Generator?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">A password generator is a tool that creates strong, random passwords using a combination of letters, numbers, and symbols. Unlike passwords you create yourself, randomly generated passwords are not based on dictionary words or personal information, making them far harder to crack. Using a unique strong password for every account is the single most effective way to protect your online security.</p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">How to use the Password Generator</h2>
        <ol className="space-y-2">
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">1</span>
            <span>Set your desired password length using the slider — 16 characters or more is recommended for most accounts.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">2</span>
            <span>Choose which character types to include: uppercase letters, lowercase letters, numbers, and symbols.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">3</span>
            <span>Click "Regenerate" to create a new password, or copy the one shown automatically.</span>
          </li>
          <li className="flex gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">4</span>
            <span>Paste the password into your password manager for safe storage.</span>
          </li>
        </ol>
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Common uses</h2>
        <ul className="space-y-1.5">
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Securing email, banking, and social media accounts</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Creating passwords for new account registrations</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Generating API keys and temporary credentials for testing</span></li>
          <li className="flex gap-2 text-sm text-gray-600"><span className="text-indigo-400">→</span><span>Replacing weak or reused passwords during a security audit</span></li>
        </ul>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure random passwords instantly. Customize the length and character types to fit your security needs."
      icon="🔐"
      relatedTools={[
        { name: "Username Generator", href: "/username-generator" },
        { name: "Random Number Generator", href: "/random-number-generator" },
        { name: "Random Name Generator", href: "/random-name-generator" },
      ]}
      faqItems={faqItems}
      guide={guide}
    >
      {/* Length slider */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password length: <span className="font-semibold text-indigo-600">{length}</span>
        </label>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {toggles.map((t) => (
          <label key={t.label} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={t.value}
              onChange={(e) => t.set(e.target.checked)}
              className="accent-indigo-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700">{t.label}</span>
          </label>
        ))}
      </div>

      {/* Password display */}
      {password && (
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
          <p className="font-mono text-xl md:text-2xl font-semibold text-gray-900 break-all text-center tracking-wider select-all">
            {password}
          </p>
        </div>
      )}

      {/* Strength bar */}
      {password && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Strength</span>
            <span className={`text-xs font-semibold ${
              strength.label === "Weak" ? "text-red-500" :
              strength.label === "Fair" ? "text-orange-400" :
              strength.label === "Strong" ? "text-green-600" : "text-emerald-600"
            }`}>{strength.label}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={generate}
          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          disabled={!password}
          className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition-colors disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy Password"}
        </button>
      </div>
    </ToolLayout>
  );
}
