import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SITE, TOOLS, CATEGORY_META, type ToolCategory } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { fileToImage, validateFile } from '../lib/imageOps';

const HERO_TOOL_PATH = '/background-remover';

function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-to-br from-brand-200/40 via-brand-100/20 to-transparent blur-3xl" />
      <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-brand-400/10 blur-3xl" />
    </div>
  );
}

export function HomePage() {
  usePageMeta({
    title: 'Free Image Tools — Background Remover, Compressor, Resizer',
    description: SITE.description,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE.name,
      url: SITE.url,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: SITE.description,
      featureList: TOOLS.map((t) => t.title),
    },
  });

  const navigate = useNavigate();
  const [pasteSupported] = useState(() => typeof window !== 'undefined');

  // Allow pasting an image from clipboard to start a background removal
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith('image/'));
      if (!item) return;
      const file = item.getAsFile();
      if (!file) return;
      try {
        validateFile(file);
        navigate(`${HERO_TOOL_PATH}?auto=1`, { state: { file } });
      } catch {
        // ignore silently
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [navigate]);

  const handleSelect = async (file: File) => {
    try {
      validateFile(file);
      await fileToImage(file);
      navigate(HERO_TOOL_PATH, { state: { file } });
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Invalid file');
    }
  };

  const grouped = TOOLS.reduce<Record<ToolCategory, typeof TOOLS>>(
    (acc, t) => {
      (acc[t.category] ||= []).push(t);
      return acc;
    },
    {} as Record<ToolCategory, typeof TOOLS>,
  );

  const categoryOrder: ToolCategory[] = ['remove', 'id', 'compress', 'resize', 'convert', 'edit', 'batch'];

  return (
    <div className="relative">
      <HeroBackground />

      {/* Hero */}
      <section className="container-narrow pt-12 pb-10 sm:pt-20 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-ink-200 text-xs font-medium text-ink-700 mb-5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
          100% client-side · No uploads · No signup
        </div>
        <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-6xl text-ink-900 leading-[1.05]">
          Remove image backgrounds
          <br />
          <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            in seconds.
          </span>
        </h1>
        <p className="mt-5 text-lg text-ink-600 max-w-2xl mx-auto">
          Free image tools that run in your browser — background remover, compressor, resizer, cropper, converter and watermark.
          Your photos never leave your device.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <ImageUploader
            onSelect={handleSelect}
            hint="Drop, click, or paste an image — JPG, PNG, WebP"
          />
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-ink-500">
            {pasteSupported && (
              <span className="inline-flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /></svg>
                Paste from clipboard works
              </span>
            )}
            <span>·</span>
            <span>No account needed</span>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-narrow pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Runs in your browser', icon: '🖥️' },
            { label: 'Your images stay private', icon: '🔒' },
            { label: 'No signup, no limits', icon: '✨' },
            { label: 'Free forever', icon: '🆓' },
          ].map((b) => (
            <div key={b.label} className="card px-4 py-3 text-sm text-ink-800 flex items-center gap-2">
              <span aria-hidden="true" className="text-lg">{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-wide pb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-2">All tools</h2>
        <p className="text-ink-600 mb-8 max-w-2xl">
          Every tool below runs entirely in your browser. No uploads, no signup, no tracking.
        </p>
        <div className="space-y-12">
          {categoryOrder.map((cat) => {
            const tools = grouped[cat];
            if (!tools || tools.length === 0) return null;
            return (
              <div key={cat}>
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-xl text-ink-900">{CATEGORY_META[cat].title}</h3>
                  <span className="text-sm text-ink-500 hidden sm:inline">{CATEGORY_META[cat].subtitle}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((t) => (
                    <Link
                      key={t.slug}
                      to={t.path}
                      className="card p-5 hover:border-brand-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-base text-ink-900 group-hover:text-brand-700">
                          {t.shortTitle}
                        </h4>
                        {t.badge && <span className="badge text-[10px]">{t.badge}</span>}
                      </div>
                      <p className="mt-1.5 text-sm text-ink-600 line-clamp-2">{t.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-ink-200">
        <div className="container-narrow py-14">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-2 text-center">How it works</h2>
          <p className="text-ink-600 mb-10 text-center max-w-xl mx-auto">A simple three-step flow used by every tool.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { n: 1, title: 'Upload', text: 'Drop, click, or paste an image. Files are processed locally — they never leave your device.' },
              { n: 2, title: 'Process', text: 'Choose a tool and adjust settings with sliders, presets or a color picker. Changes preview live.' },
              { n: 3, title: 'Download', text: 'Click the big Download button. Pick PNG, JPG or WebP. PDF for printable sheets.' },
            ].map((s) => (
              <div key={s.n} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">{s.n}</div>
                <h3 className="mt-4 font-display font-bold text-lg text-ink-900">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ quick */}
      <section className="container-narrow py-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-6 text-center">Common questions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { q: 'Do you upload my images?', a: 'No. Every tool runs in your browser. Your image never leaves your device.' },
            { q: 'Is it really free?', a: 'Yes. No signup, no hidden limits, no payment. Pixcuro is free for everyone.' },
            { q: 'What about background removal quality?', a: 'We use an open-source model that runs locally. Quality is suitable for product photos, portraits and ID photos.' },
            { q: 'Can I use this commercially?', a: 'Yes — your outputs belong to you. The code we use is open-source.' },
          ].map((f) => (
            <div key={f.q} className="card p-5">
              <h3 className="font-semibold text-ink-900">{f.q}</h3>
              <p className="mt-1 text-sm text-ink-600">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/faq" className="text-brand-700 hover:text-brand-800 text-sm font-semibold">
            See the full FAQ →
          </Link>
        </div>
      </section>
    </div>
  );
}
