import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "WebToolsWiki – Free Online Generators & Tools",
    template: "%s | WebToolsWiki",
  },
  description:
    "Free online generators and tools – phone numbers, text effects, gamertags, IMEI, anagrams, and more. Fast, simple, no sign-up required.",
  metadataBase: new URL("https://webtoolswiki.com"),
  openGraph: {
    siteName: "WebToolsWiki",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@webtoolswiki",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">

        {/* Affiliate top bar */}
        <div className="bg-violet-50 border-b border-violet-100 py-2 px-4 flex items-center justify-center gap-2 text-sm">
          <span className="text-violet-700">Is your website down?</span>
          <a
            href="https://isitdownstatus.com/en"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="font-medium text-indigo-600 hover:underline flex items-center gap-1"
          >
            Check on IsItDownStatus.com
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* Header */}
        <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-13">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 4.5h9M3 7.5h9M3 10.5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-[15px] font-medium text-gray-900">
                <span className="text-indigo-600">WebTools</span>Wiki
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "Text", href: "/cursive-text-generator" },
                { label: "Fake Data", href: "/imei-generator" },
                { label: "Gaming", href: "/xbox-gamertag-generator" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link href="/"
                className="ml-2 text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                All tools
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
        <Analytics />

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50 py-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="max-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M3 4.5h9M3 7.5h9M3 10.5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">WebToolsWiki</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Free online generators and tools. No sign-up required.</p>
                <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                  Partner:{" "}
                  <a href="https://isitdownstatus.com/en" target="_blank" rel="noopener noreferrer sponsored"
                    className="text-indigo-500 font-medium hover:underline">
                    IsItDownStatus.com
                  </a>
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Tools</p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  {[
                    { label: "Cursive Text Generator", href: "/cursive-text-generator" },
                    { label: "IMEI Generator", href: "/imei-generator" },
                    { label: "US Phone Number Generator", href: "/us-phone-number-generator" },
                    { label: "Xbox Gamertag Generator", href: "/xbox-gamertag-generator" },
                    { label: "Weird Text Generator", href: "/weird-text-generator" },
                    { label: "Pictionary Word Generator", href: "/pictionary-word-generator" },
                    { label: "Wu-Tang Name Generator", href: "/wu-tang-name-generator" },
                    { label: "Anagram Generator", href: "/anagram-generator" },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Company</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "About Us", href: "/about" },
                    { label: "Contact", href: "/contact" },
                    { label: "Privacy Policy", href: "/privacy" },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                  <a href="mailto:info@webtoolswiki.com" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                    info@webtoolswiki.com
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-300 border-t border-gray-100 pt-6">
              © {new Date().getFullYear()} WebToolsWiki. All tools are free to use.
              {" · "}
              <Link href="/privacy" className="hover:text-gray-500 transition-colors">Privacy</Link>
              {" · "}
              <Link href="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
