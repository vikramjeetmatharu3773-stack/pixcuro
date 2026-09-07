import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SITE, TOOLS, CATEGORY_META, type ToolCategory } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { ToolPreview } from '../components/ToolPreview';
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
        /* ignore silently */
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [navigate]);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const handleSelect = async (file: File) => {
    try {
      validateFile(file);
      await fileToImage(file);
      navigate(HERO_TOOL_PATH, { state: { file } });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Invalid file');
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
          100% in your browser · Free on GitHub Pages · Sign-in to download
        </div>
        <h1 className="font-display font-extrabold tracking-tight text-3xl sm:text-5xl lg:text-6xl text-ink-900 leading-[1.1]">
          Free image tools that run
          <br />
          <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
            in your browser.
          </span>
        </h1>
        <p className="mt-5 text-lg text-ink-600 max-w-2xl mx-auto">
          Remove backgrounds, compress, resize, crop, convert and watermark images — all processed locally in your browser. Pixcuro is hosted free on GitHub Pages, so your images never touch a server. Sign in to download.
        </p>

        <div className="mt-8 max-w-xl mx-auto">
          <ImageUploader
            onSelect={handleSelect}
            onError={(m) => setUploadError(m)}
            hint="Drop, click, or paste an image — JPG, PNG, WebP"
          />
          {uploadError && (
            <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{uploadError}</p>
          )}
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-ink-500">
            {pasteSupported && (
              <span className="inline-flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /></svg>
                Paste from clipboard works
              </span>
            )}
            <span>·</span>
            <span>Free sign-in to download</span>
          </div>
        </div>
      </section>

      {/* Trust strip — proper SVG icons, no emojis, no fake claims */}
      <section className="container-narrow pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: 'Runs in your browser',
              sub: 'No server roundtrip',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="13" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M7 9.5h4M7 12.5h7" strokeWidth="1.8" />
                </svg>
              ),
              tint: 'bg-brand-100 text-brand-700',
            },
            {
              label: 'Files stay on device',
              sub: 'No tracking pixels',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
                </svg>
              ),
              tint: 'bg-emerald-100 text-emerald-700',
            },
            {
              label: 'Hosted on GitHub Pages',
              sub: 'Free, open source',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                </svg>
              ),
              tint: 'bg-ink-900 text-white',
            },
            {
              label: 'Sign-in to download',
              sub: 'No bot abuse',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                  <path d="M17.5 8l1.8 1.8L22 7" strokeWidth="2.2" />
                </svg>
              ),
              tint: 'bg-amber-100 text-amber-700',
            },
          ].map((b) => (
            <div key={b.label} className="card px-4 py-3.5 flex items-center gap-3">
              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${b.tint}`}>{b.icon}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-900 leading-tight">{b.label}</p>
                <p className="text-xs text-ink-500 mt-0.5 leading-tight">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — each card now has an animated preview on the LEFT */}
      <section className="container-wide pb-16">
        <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-ink-900 mb-2">All tools</h2>
        <p className="text-ink-600 mb-8 max-w-2xl">
          Every tool below runs entirely in your browser. Sign in (free, Google) to download the result.
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
                      className="card p-4 hover:border-brand-300 hover:shadow-md transition-all group flex gap-4"
                    >
                      <div className="w-24 shrink-0 self-start">
                        <ToolPreview slug={t.slug} category={t.category} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display font-bold text-sm text-ink-900 group-hover:text-brand-700 leading-tight">
                            {t.shortTitle}
                          </h4>
                          {t.badge && <span className="badge text-[9px] whitespace-nowrap">{t.badge}</span>}
                        </div>
                        <p className="mt-1 text-xs text-ink-600 line-clamp-2 leading-snug">{t.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sample showcase — what each tool can do, at a glance */}
      <section className="container-wide py-14">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">See what each tool produces</h2>
          <p className="mt-2 text-ink-600 max-w-2xl mx-auto">Real before / after pairs from the same tools you can use right now. All rendered locally in your browser.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Background removed',
              tag: 'Background Remover',
              beforeBg: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
              afterBg: '#ffffff',
              afterIsTransparent: true,
              subject: '#118ce6',
              path: '/background-remover',
            },
            {
              title: 'Compressed 2.8 MB → 820 KB',
              tag: 'Image Compressor',
              beforeLabel: '2.8 MB',
              afterLabel: '820 KB',
              subject: '#6366f1',
              path: '/image-compressor',
            },
            {
              title: 'Resized 4000×3000 → 1280×720',
              tag: 'Image Resizer',
              beforeLabel: '4000×3000',
              afterLabel: '1280×720',
              subject: '#0e7490',
              path: '/image-resizer',
            },
            {
              title: 'Cropped 16:9',
              tag: 'Image Cropper',
              beforeLabel: '4:3 source',
              afterLabel: '16:9 output',
              subject: '#db2777',
              path: '/image-cropper',
            },
            {
              title: 'JPG → WebP',
              tag: 'Image Converter',
              beforeLabel: 'JPG · 1.2 MB',
              afterLabel: 'WebP · 480 KB',
              subject: '#0891b2',
              path: '/image-converter',
            },
            {
              title: 'Watermark added',
              tag: 'Watermark',
              beforeLabel: 'Original',
              afterLabel: '© Brand',
              subject: '#a855f7',
              path: '/watermark-image',
            },
          ].map((s) => (
            <Link
              key={s.title}
              to={s.path}
              className="card p-4 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-wide text-brand-700 font-bold">{s.tag}</p>
                <svg className="w-3.5 h-3.5 text-ink-400 group-hover:text-brand-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
              <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden border border-ink-200 aspect-[4/3]">
                <div
                  className="relative flex items-center justify-center"
                  style={{ background: s.beforeBg }}
                >
                  {s.afterIsTransparent ? (
                    <>
                      <div className="absolute inset-0 opacity-50" style={{
                        backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
                        backgroundSize: '14px 14px',
                        backgroundPosition: '0 0, 0 7px, 7px -7px, -7px 0px',
                      }} />
                      <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: s.subject }}>YOU</div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-lg" style={{ background: s.subject }} />
                      <p className="mt-2 text-[10px] font-bold text-ink-700">{s.beforeLabel}</p>
                    </div>
                  )}
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-black/60 text-white">Before</span>
                </div>
                <div
                  className="relative flex items-center justify-center"
                  style={{ background: s.afterBg }}
                >
                  {s.afterIsTransparent ? (
                    <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: s.subject }}>YOU</div>
                  ) : (
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto rounded-lg" style={{ background: s.subject }} />
                      <p className="mt-2 text-[10px] font-bold text-ink-700">{s.afterLabel}</p>
                    </div>
                  )}
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-brand-600 text-white">After</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-ink-900 group-hover:text-brand-700">{s.title}</p>
            </Link>
          ))}
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
              { n: 3, title: 'Download', text: 'Sign in (free) and click Download. Pick PNG, JPG or WebP. PDF for printable sheets.' },
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
            { q: 'Is Pixcuro really free?', a: 'Yes — sign in (free, Google) and you get a generous daily quota. No credit card, no trials, no expiry. Hosted on GitHub Pages.' },
            { q: 'What about background removal quality?', a: 'We use an open-source model that runs locally. Quality is suitable for product photos, portraits and ID photos.' },
            { q: 'Why is sign-in required for downloads?', a: 'To keep the service fast and bot-free. Processing is still done entirely in your browser — sign-in only authorizes downloads.' },
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
