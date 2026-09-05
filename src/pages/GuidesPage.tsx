import { Link } from 'react-router-dom';
import { GUIDES } from '../lib/guides';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function GuidesPage() {
  usePageMeta({
    title: 'Guides & Resources',
    description: `Practical guides on background removal, image compression, format conversion and privacy from ${SITE.name}.`,
    path: '/guides',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${SITE.name} guides`,
      itemListElement: GUIDES.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.url}/guides/${g.slug}`,
        name: g.title,
      })),
    },
  });

  return (
    <div className="container-narrow py-12">
      <header className="max-w-2xl mb-10">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">Guides & resources</h1>
        <p className="text-ink-700 mt-3">Practical, honest guides on background removal, image formats, compression and privacy.</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <Link key={g.slug} to={`/guides/${g.slug}`} className="card p-5 hover:border-brand-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-xs text-ink-500">
              <span className="badge">{g.category}</span>
              <span>{g.readingMinutes} min read</span>
            </div>
            <h2 className="mt-2 font-display font-bold text-lg text-ink-900">{g.title}</h2>
            <p className="mt-1 text-sm text-ink-600 line-clamp-2">{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
