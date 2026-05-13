import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us – WebToolsWiki",
  description:
    "WebToolsWiki is a free collection of online generators and tools. Learn about our mission to make useful web tools accessible to everyone.",
  alternates: { canonical: "https://webtoolswiki.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-gray-600">About</span>
      </nav>

      <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-3 py-1.5 text-xs font-medium text-violet-700 mb-6">
        ✦ Our story
      </div>

      <h1 className="text-3xl font-medium text-gray-900 mb-4">About WebToolsWiki</h1>

      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-5">
        <p>
          WebToolsWiki is a free collection of online generators and utilities built for developers,
          designers, marketers, and everyday users who need quick, reliable results without signing up
          for yet another service.
        </p>
        <p>
          Every tool on this site runs entirely in your browser. That means no data is ever sent to
          our servers, no accounts are required, and everything is instant. We believe useful tools
          should be free and accessible to everyone.
        </p>

        <h2 className="text-lg font-medium text-gray-900 mt-8 mb-3">What we build</h2>
        <p>
          We focus on generators and converters that people actually search for — phone number generators,
          text style converters, IMEI generators, gamertag creators, anagram tools, and more. Each tool
          is crafted to be fast, simple, and genuinely useful.
        </p>

        <h2 className="text-lg font-medium text-gray-900 mt-8 mb-3">Our principles</h2>
        <ul className="space-y-2 list-none pl-0">
          {[
            ["⚡", "Instant", "No loading spinners, no server round-trips. Everything runs client-side."],
            ["🔒", "Private", "Your input stays on your device. We don't log, track, or store anything you type."],
            ["🆓", "Free", "All tools are free to use. No paywalls, no premium tiers, no upsells."],
            ["🎯", "Focused", "We build tools that solve one thing well, not bloated platforms."],
          ].map(([icon, title, desc]) => (
            <li key={title as string} className="flex gap-3 py-3 border-b border-gray-100">
              <span className="text-lg">{icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{title as string}</p>
                <p className="text-sm text-gray-500 mt-0.5">{desc as string}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-medium text-gray-900 mt-8 mb-3">Get in touch</h2>
        <p>
          Have a suggestion for a new tool, found a bug, or want to partner with us?
          We&apos;d love to hear from you.
        </p>
        <p>
          Email us at{" "}
          <a href="mailto:info@webtoolswiki.com" className="text-indigo-600 hover:underline font-medium">
            info@webtoolswiki.com
          </a>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <p className="text-sm text-gray-400 mb-4">Explore our tools</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Cursive Text Generator", href: "/cursive-text-generator" },
            { name: "IMEI Generator", href: "/imei-generator" },
            { name: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
            { name: "US Phone Number Generator", href: "/us-phone-number-generator" },
          ].map((t) => (
            <Link key={t.href} href={t.href}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors">
              {t.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
