import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE, TOOLS, CATEGORY_META, type ToolCategory } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function ToolsIndexPage() {
  usePageMeta({
    title: 'All Image Tools',
    description: `Browse every ${SITE.name} tool — background remover, compressor, resizer, cropper, converter, watermark and more.`,
    path: '/tools',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${SITE.name} tools`,
      itemListElement: TOOLS.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.url}${t.path}`,
        name: t.title,
      })),
    },
  });

  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return TOOLS;
    return TOOLS.filter((t) => {
      return (
        t.title.toLowerCase().includes(term) ||
        t.shortTitle.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.intro.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
      );
    });
  }, [q]);

  const categories: ToolCategory[] = ['remove', 'id', 'compress', 'resize', 'convert', 'edit', 'batch'];

  return (
    <div className="container-wide py-12">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">All image tools</h1>
        <p className="text-ink-700 mt-3">{TOOLS.length} tools organized by category. Each one runs in your browser.</p>
      </header>

      <div className="mb-8 max-w-md">
        <label className="block">
          <span className="sr-only">Search tools</span>
          <div className="relative">
            <input
              type="search"
              className="input pl-10"
              placeholder="Search tools (e.g. compress, passport, background)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search tools"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
        </label>
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center text-ink-600">
          No tools match “{q}”. Try a different keyword.
        </div>
      )}

      <div className="space-y-12">
        {categories.map((cat) => {
          const tools = filtered.filter((t) => t.category === cat);
          if (tools.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="font-display font-bold text-2xl text-ink-900">{CATEGORY_META[cat].title}</h2>
              <p className="text-ink-600 mt-1 mb-4">{CATEGORY_META[cat].subtitle}</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((t) => (
                  <Link key={t.slug} to={t.path} className="card p-5 hover:border-brand-300 hover:shadow-md transition-all">
                    <h3 className="font-display font-bold text-base text-ink-900">{t.shortTitle}</h3>
                    <p className="mt-1 text-sm text-ink-600 line-clamp-2">{t.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
