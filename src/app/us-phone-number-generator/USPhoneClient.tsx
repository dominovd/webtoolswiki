"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const areaCodes: Record<string, number[]> = {
  "Any State":    [201,202,203,205,206,207,208,209,210,212,213,214,215,216,217,219,224,225,228,229,231,234,239,240,248,251,252,253,254,256,260,262,267,269,270,272,276,281,301,302,303,304,305,307,308,309,310,312,313,314,315,316,317,318,319,320,321,323,325,330,331,332,334,336,337,339,346,347,351,352,360,361,380,385,386,401,402,404,405,406,407,408,409,410,412,413,414,415,417,419,423,424,425,430,432,434,435,440,442,443,458,463,469,470,475,478,479,480,484,501,502,503,504,505,507,508,509,510,512,513,515,516,517,518,520,530,531,539,540,541,551,559,561,562,563,567,570,571,573,574,575,580,585,586,601,602,603,605,606,607,608,609,610,612,614,615,616,617,618,619,620,623,626,628,629,630,631,636,641,646,650,651,657,660,661,662,667,669,678,680,681,682,701,702,703,704,706,707,708,712,713,714,715,716,717,718,719,720,724,725,727,731,732,734,737,740,747,754,757,760,762,763,765,769,770,772,773,774,775,779,781,785,786,801,802,803,804,805,806,808,810,812,813,814,815,816,817,818,828,830,831,832,843,845,847,848,850,856,857,858,859,860,862,863,864,865,870,872,878,901,903,904,906,907,908,909,910,912,913,914,915,916,917,918,919,920,925,928,929,931,936,937,940,941,947,949,951,952,954,956,959,970,971,972,973,978,979,980,984,985,989],
  "New York":     [212,315,332,347,516,518,585,607,631,646,680,716,718,838,845,914,917,929,934],
  "California":   [209,213,310,323,341,408,415,424,442,510,530,559,562,619,626,628,650,657,661,669,707,714,747,760,805,818,831,858,909,916,925,949,951],
  "Texas":        [210,214,254,281,325,346,361,409,430,432,469,512,682,713,737,806,817,830,832,903,915,936,940,956,972,979],
  "Florida":      [239,305,321,352,386,407,561,689,727,754,772,786,813,850,863,904,941,954],
  "Illinois":     [217,224,309,312,331,618,630,708,773,779,815,847,872],
  "Pennsylvania": [215,267,272,412,445,484,570,610,717,724,814,878],
};

const formats = ["(XXX) XXX-XXXX", "XXX-XXX-XXXX", "XXX.XXX.XXXX", "+1 XXX XXX XXXX", "XXXXXXXXXX"];

function generatePhone(areaCode: number, format: string): string {
  const ex  = String(Math.floor(Math.random() * 800) + 200).padStart(3, "0");
  const sub = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
  const ac  = String(areaCode);
  switch (format) {
    case "(XXX) XXX-XXXX":    return `(${ac}) ${ex}-${sub}`;
    case "XXX-XXX-XXXX":      return `${ac}-${ex}-${sub}`;
    case "XXX.XXX.XXXX":      return `${ac}.${ex}.${sub}`;
    case "+1 XXX XXX XXXX":   return `+1 ${ac} ${ex} ${sub}`;
    default:                  return `${ac}${ex}${sub}`;
  }
}

export default function USPhoneClient() {
  const [state,  setState]  = useState("Any State");
  const [format, setFormat] = useState("(XXX) XXX-XXXX");
  const [count,  setCount]  = useState(5);
  const [phones, setPhones] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const codes = areaCodes[state] ?? areaCodes["Any State"];
    setPhones(Array.from({ length: count }, () => {
      const ac = codes[Math.floor(Math.random() * codes.length)];
      return generatePhone(ac, format);
    }));
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(phones.join("\n")).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolLayout
      title="US Phone Number Generator"
      description="Generate random, valid-format US phone numbers for testing, forms, and development. Choose your state, format, and quantity."
      relatedTools={[
        { name: "Canada Phone Number Generator", href: "/canada-phone-number-generator" },
        { name: "IMEI Generator",                href: "/imei-generator" },
        { name: "Cursive Text Generator",        href: "/cursive-text-generator" },
      ]}
      faqItems={[
        { q: "Are these real phone numbers?",
          a: "No. Randomly generated numbers with valid NANP format and real area codes — not assigned to any real person." },
        { q: "What is NANP?",
          a: "The North American Numbering Plan — the 10-digit telephone system used in the US, Canada, and 20+ other countries." },
        { q: "Can I use these for testing?",
          a: "Yes — perfect for form validation, database seeding, software QA, and any situation needing plausible-looking phone numbers." },
        { q: "Why do some area codes belong to multiple states?",
          a: "Some metro areas spanning state borders share area codes, and overlay codes cover the same geographic area." },
      ]}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={state} onChange={(e) => setState(e.target.value)}>
            {Object.keys(areaCodes).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={format} onChange={(e) => setFormat(e.target.value)}>
            {formats.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[1, 5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <button onClick={generate}
        className="mt-5 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors">
        Generate US Phone Numbers
      </button>

      {phones.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{phones.length} numbers generated</span>
            <button onClick={copyAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
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
