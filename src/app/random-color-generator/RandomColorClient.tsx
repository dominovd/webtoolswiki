"use client";
import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

interface FaqItem { q: string; a: string }

function randomHex(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let { r, g, b } = hexToRgb(hex);
  let rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function RandomColorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const [mode, setMode] = useState<"single" | "palette">("single");

  // Single color state
  const [color, setColor] = useState("#000000");
  const [locked, setLocked] = useState(false);

  // Palette state
  const [palette, setPalette] = useState<string[]>(["#000000", "#000000", "#000000", "#000000", "#000000"]);
  const [paletteLocks, setPaletteLocks] = useState<boolean[]>([false, false, false, false, false]);
  const [paletteAllCopied, setPaletteAllCopied] = useState(false);

  const generateSingle = useCallback(() => {
    if (!locked) setColor(randomHex());
  }, [locked]);

  const generatePalette = useCallback(() => {
    setPalette((prev) => prev.map((c, i) => paletteLocks[i] ? c : randomHex()));
  }, [paletteLocks]);

  useEffect(() => {
    setColor(randomHex());
    setPalette([randomHex(), randomHex(), randomHex(), randomHex(), randomHex()]);
  }, []);

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const togglePaletteLock = (i: number) => {
    setPaletteLocks((prev) => prev.map((v, idx) => idx === i ? !v : v));
  };

  const handleCopyAllHex = () => {
    navigator.clipboard.writeText(palette.join(", ")).then(() => {
      setPaletteAllCopied(true);
      setTimeout(() => setPaletteAllCopied(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="Random Color Generator"
      description="Generate random colors with HEX, RGB, and HSL values. Switch to palette mode to generate 5 colors at once."
      icon="🎨"
      relatedTools={[
        { name: "Random Number Generator", href: "/random-number-generator" },
        { name: "Password Generator", href: "/password-generator" },
        { name: "UUID Generator", href: "/uuid-generator" },
      ]}
      faqItems={faqItems}
    >
      {/* Mode selector */}
      <div className="flex gap-2 mb-6">
        {(["single", "palette"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {m === "single" ? "Single Color" : "Color Palette"}
          </button>
        ))}
      </div>

      {mode === "single" ? (
        <div>
          {/* Color swatch */}
          <div
            className="w-full rounded-2xl mb-5 border border-gray-100"
            style={{ height: "200px", backgroundColor: color }}
          />

          {/* Color values */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">HEX</span>
                <p className="font-mono text-gray-900 font-semibold mt-0.5">{color.toUpperCase()}</p>
              </div>
              <CopyButton text={color.toUpperCase()} />
            </div>
            <div className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">RGB</span>
                <p className="font-mono text-gray-900 font-semibold mt-0.5">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</p>
              </div>
              <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            </div>
            <div className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">HSL</span>
                <p className="font-mono text-gray-900 font-semibold mt-0.5">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</p>
              </div>
              <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={generateSingle}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Generate New Color
            </button>
            <button
              onClick={() => setLocked((v) => !v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                locked
                  ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                  : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {locked ? "🔒 Locked" : "🔓 Lock"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Palette swatches */}
          <div className="flex gap-2 mb-4 rounded-2xl overflow-hidden border border-gray-100" style={{ height: "100px" }}>
            {palette.map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Per-color rows */}
          <div className="space-y-2 mb-5">
            {palette.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 border border-gray-200"
                  style={{ backgroundColor: c }}
                />
                <span className="font-mono text-sm text-gray-900 font-medium flex-1">{c.toUpperCase()}</span>
                <button
                  onClick={() => togglePaletteLock(i)}
                  className={`text-sm px-2 py-1 rounded-md transition-colors ${
                    paletteLocks[i]
                      ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                  title={paletteLocks[i] ? "Unlock" : "Lock"}
                >
                  {paletteLocks[i] ? "🔒" : "🔓"}
                </button>
                <CopyButton text={c.toUpperCase()} />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={generatePalette}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Generate Palette
            </button>
            <button
              onClick={handleCopyAllHex}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {paletteAllCopied ? "Copied!" : "Copy All HEX"}
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
