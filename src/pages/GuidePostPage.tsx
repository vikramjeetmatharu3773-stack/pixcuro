import { Link, useParams } from 'react-router-dom';
import { GUIDES } from '../lib/guides';
import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

export function GuidePostPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return <NotFoundPage />;

  usePageMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      author: { '@type': 'Organization', name: SITE.name },
      publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.svg` } },
      mainEntityOfPage: `${SITE.url}/guides/${guide.slug}`,
    },
  });

  return (
    <article className="container-narrow py-12 max-w-3xl">
      <Link to="/guides" className="text-sm text-brand-700 hover:underline">← All guides</Link>
      <div className="flex items-center gap-3 mt-4 text-xs text-ink-500">
        <span className="badge">{guide.category}</span>
        <span>{guide.readingMinutes} min read</span>
      </div>
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mt-2">{guide.title}</h1>
      <p className="mt-3 text-ink-700 text-lg">{guide.intro}</p>

      <div className="prose prose-ink max-w-none mt-8 space-y-8">
        {guide.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-2">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-700 leading-relaxed">{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="card p-5 mt-10 flex items-center justify-between gap-3 bg-brand-50 border-brand-200">
        <div>
          <p className="font-display font-bold text-ink-900">Ready to try?</p>
          <p className="text-sm text-ink-700">Open the tool and put this guide into practice.</p>
        </div>
        <Link to={guide.cta.href} className="btn-primary">{guide.cta.label}</Link>
      </div>
    </article>
  );
}
