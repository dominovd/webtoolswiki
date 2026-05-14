"use client";
import Link from "next/link";

interface RelatedTool { name: string; href: string }
interface FaqItem { q: string; a: string }

interface Props {
  title: string;
  description: string;
  icon?: string;
  children: React.ReactNode;
  guide?: React.ReactNode;
  relatedTools?: RelatedTool[];
  faqItems?: FaqItem[];
}

export default function ToolLayout({ title, description, icon = "🛠️", children, guide, relatedTools, faqItems }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-7">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-gray-600">{title}</span>
      </nav>

      {/* Page header */}
      <div className="flex items-start gap-4 mb-3">
        <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-snug">{title}</h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xl">{description}</p>
        </div>
      </div>

      {/* Tool box */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {children}
      </div>

      {/* Guide / SEO content */}
      {guide && (
        <section className="mt-10 prose-sm text-gray-600">
          {guide}
        </section>
      )}

      {/* FAQ */}
      {faqItems && faqItems.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Frequently asked questions</h2>
          <div className="divide-y divide-gray-100">
            {faqItems.map((item) => (
              <div key={item.q} className="py-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <span className="text-indigo-300 text-base">+</span>
                  {item.q}
                </h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed pl-5">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium text-gray-900 mb-3">Related tools</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link key={t.href} href={t.href}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-violet-200 text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
