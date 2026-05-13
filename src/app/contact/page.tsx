import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us – WebToolsWiki",
  description:
    "Get in touch with the WebToolsWiki team. Report a bug, suggest a new tool, or ask about partnerships.",
  alternates: { canonical: "https://webtoolswiki.com/contact" },
};

const topics = [
  { icon: "🐛", label: "Report a bug", desc: "Something not working? Let us know." },
  { icon: "💡", label: "Suggest a tool", desc: "Have an idea for a new generator or utility?" },
  { icon: "🤝", label: "Partnerships", desc: "Sponsorships, link exchanges, affiliate deals." },
  { icon: "❓", label: "General question", desc: "Anything else on your mind." },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-gray-600">Contact</span>
      </nav>

      <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-3 py-1.5 text-xs font-medium text-violet-700 mb-6">
        ✉️ Say hello
      </div>

      <h1 className="text-3xl font-medium text-gray-900 mb-3">Contact Us</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-10">
        We read every message. Typical response time is 1–2 business days.
      </p>

      {/* Email CTA */}
      <div className="bg-indigo-600 rounded-2xl p-6 mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-medium text-sm mb-1">Email us directly</p>
          <p className="text-indigo-200 text-xs">For fastest response, reach out via email</p>
        </div>
        <a
          href="mailto:info@webtoolswiki.com"
          className="flex-shrink-0 bg-white text-indigo-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          info@webtoolswiki.com
        </a>
      </div>

      {/* Topics */}
      <h2 className="text-sm font-medium text-gray-900 mb-4">What can we help with?</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-12">
        {topics.map((t) => (
          <a key={t.label} href={`mailto:info@webtoolswiki.com?subject=${encodeURIComponent(t.label)}`}
            className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-violet-50 transition-all group">
            <span className="text-xl">{t.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">{t.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-8 text-xs text-gray-400 space-y-1">
        <p>WebToolsWiki · <a href="mailto:info@webtoolswiki.com" className="text-indigo-500 hover:underline">info@webtoolswiki.com</a></p>
        <p>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          {" · "}
          <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
        </p>
      </div>
    </div>
  );
}
