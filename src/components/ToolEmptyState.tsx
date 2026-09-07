import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { TOOLS, type ToolEntry } from '../lib/site';

interface ToolEmptyStateProps {
  title: string;
  intro: string;
  description?: string;
  features?: { title: string; text: string; icon?: ReactNode }[];
  upload: ReactNode;
  error?: string | null;
  processing?: ReactNode;
  faqs?: { q: string; a: string }[];
  category?: ToolEntry['category'];
  badge?: string;
}

/**
 * Polished empty state for tool pages.
 * Displays "Related tools" section on every tool page.
 */
export function ToolEmptyState({
  title, intro, description, features, upload, error, processing, faqs, badge,
}: ToolEmptyStateProps) {
  const related = TOOLS.filter((t) => t.title !== title).slice(0, 6);

  return (
    <div className="container-narrow py-8 sm:py-10">
      <header className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          {badge && <span className="badge">{badge}</span>}
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{title}</h1>
        <p className="mt-3 text-lg text-ink-700">{intro}</p>
        {description && <p className="mt-3 text-ink-600 leading-relaxed">{description}</p>}
      </header>

      <div className="mt-7">
        {upload}
        {error && <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
        {processing}
      </div>

      {features && features.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-4">Why use our {title.toLowerCase()}?</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card p-5">
                <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
                  {f.icon ?? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display font-bold text-base text-ink-900">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((f) => (
              <details key={f.q} className="card p-4 group">
                <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-ink-900 text-sm">
                  <span>{f.q}</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-4">Explore other tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <Link key={t.slug} to={t.path} className="card p-4 hover:border-brand-300 hover:shadow-md transition-all flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20" /></svg>
                  </div>
                  <h3 className="font-display font-bold text-sm text-ink-900">{t.shortTitle}</h3>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-400">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
