import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

const FAQ = [
  {
    q: 'Do you upload my images?',
    a: 'No. Every tool runs locally in your browser. Your image bytes never leave your device.',
  },
  {
    q: 'Is Pixcuro really free?',
    a: 'Yes — sign in (free, Google) and you get a generous daily quota. No credit card, no trials, no expiry.',
  },
  {
    q: 'How does the background remover work without uploading?',
    a: 'We use an open-source model that runs entirely in your browser via WebAssembly. The model is downloaded to your browser cache on first use; afterwards, processing is offline-capable.',
  },
  {
    q: 'What file formats are supported?',
    a: 'Input: PNG, JPG/JPEG, WebP, BMP, GIF. Output: PNG (transparent), JPG, WebP. PDF output is available for printable photo sheets.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'We accept files up to 25 MB. Very large images may be slow on low-memory devices because processing happens locally.',
  },
  {
    q: 'Are the passport sizes official?',
    a: 'The presets are commonly reported sizes and good starting points. Always verify the exact requirements with the issuing authority before submission.',
  },
  {
    q: 'Can I process many images at once?',
    a: 'Yes — see the Batch tools: Batch Compress, Batch Resize and Batch Convert.',
  },
  {
    q: 'Can I use this commercially?',
    a: 'Yes. Your outputs belong to you. Pixcuro uses open-source components.',
  },
  {
    q: 'Do you use tracking or analytics?',
    a: 'No analytics scripts are loaded by default. We may add a privacy-friendly analytics option in the future, but it will be off by default.',
  },
  {
    q: 'Why is my browser using so much CPU during background removal?',
    a: 'Background removal is computationally expensive and runs on your device. Close other tabs or use a smaller image if performance is poor.',
  },
];

export function FaqPage() {
  usePageMeta({
    title: 'Frequently Asked Questions',
    description: `Common questions about ${SITE.name} — privacy, file size, browser usage and more.`,
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  });

  return (
    <article className="container-narrow py-12 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">Frequently asked questions</h1>
      <p className="text-ink-700 mt-3">Quick answers to the most common questions about {SITE.name}.</p>
      <div className="mt-8 space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="card p-5 group">
            <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-ink-900">
              <span>{f.q}</span>
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </summary>
            <p className="mt-3 text-ink-700 text-sm">{f.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
