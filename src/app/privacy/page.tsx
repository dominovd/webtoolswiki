import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – WebToolsWiki",
  description:
    "WebToolsWiki privacy policy. Learn how we handle your data — spoiler: we don't collect any.",
  alternates: { canonical: "https://webtoolswiki.com/privacy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "May 13, 2026";

const sections = [
  {
    title: "1. Information we collect",
    body: `WebToolsWiki does not collect, store, or transmit any personal information you enter into our tools. All generators and converters run entirely in your browser (client-side JavaScript). No input data is ever sent to our servers.

We do collect basic, anonymized analytics through standard server logs (page URLs, timestamps, browser type, referrer). This data contains no personally identifiable information and is used solely to understand which tools are most useful.`,
  },
  {
    title: "2. Cookies",
    body: `We use no first-party cookies. If we use third-party services (such as analytics), those services may set their own cookies in accordance with their privacy policies. You can disable cookies in your browser settings at any time without affecting tool functionality.`,
  },
  {
    title: "3. Third-party services",
    body: `Our site may include affiliate links (for example, to IsItDownStatus.com). Clicking these links may allow those third parties to collect data about you in accordance with their own privacy policies. We are not responsible for the privacy practices of external sites.`,
  },
  {
    title: "4. Advertising",
    body: `WebToolsWiki may display advertisements through third-party ad networks. These networks may use cookies and similar technologies to show relevant ads. You can opt out of interest-based advertising through your browser or device settings.`,
  },
  {
    title: "5. Children's privacy",
    body: `Our services are not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.`,
  },
  {
    title: "6. Data security",
    body: `Because we do not collect personal data through our tools, there is no user data to protect on our end. Standard HTTPS encryption is used for all connections to this website.`,
  },
  {
    title: "7. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the new policy.`,
  },
  {
    title: "8. Contact",
    body: `If you have any questions about this Privacy Policy, please contact us at info@webtoolswiki.com.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-gray-600">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-medium text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-xs text-gray-400 mb-10">Last updated: {lastUpdated}</p>

      <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-10 flex gap-3">
        <span className="text-lg">🔒</span>
        <div>
          <p className="text-sm font-medium text-green-800">Short version</p>
          <p className="text-xs text-green-700 mt-0.5 leading-relaxed">
            All our tools run in your browser. We don&apos;t collect, store, or transmit anything you type.
            Your data stays on your device.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title} className="border-b border-gray-100 pb-8 last:border-0">
            <h2 className="text-sm font-medium text-gray-900 mb-3">{s.title}</h2>
            {s.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-gray-500 leading-relaxed mb-3 last:mb-0">
                {para.includes("info@webtoolswiki.com") ? (
                  <>
                    {para.split("info@webtoolswiki.com")[0]}
                    <a href="mailto:info@webtoolswiki.com" className="text-indigo-600 hover:underline">
                      info@webtoolswiki.com
                    </a>
                    {para.split("info@webtoolswiki.com")[1]}
                  </>
                ) : para}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 text-xs text-gray-400 space-y-1">
        <p>WebToolsWiki · <a href="mailto:info@webtoolswiki.com" className="text-indigo-500 hover:underline">info@webtoolswiki.com</a></p>
        <p>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
          {" · "}
          <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
        </p>
      </div>
    </div>
  );
}
