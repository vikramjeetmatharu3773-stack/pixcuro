import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function AboutPage() {
  usePageMeta({
    title: 'About',
    description: `About ${SITE.name} — a free, privacy-first image toolkit that runs in your browser.`,
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${SITE.name}`,
      url: `${SITE.url}/about`,
    },
  });

  return (
    <article className="container-narrow py-12 prose prose-ink max-w-none">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">About {SITE.name}</h1>
      <p className="text-ink-700 mt-4">
        {SITE.name} is a small, focused image toolkit built around one idea:
        your photos should stay on your device. Every tool — the background remover, compressor, resizer,
        cropper and converter — runs locally in your browser using open-source technologies. There is no
        signup, no upload, and no tracking of your images.
      </p>

      <h2 className="font-display font-bold text-xl mt-8 mb-2 text-ink-900">Why we built it</h2>
      <p className="text-ink-700">
        Most online image tools send your files to a remote server. That costs money to operate, slows
        things down, and exposes your photos to other parties. Modern browsers are powerful enough to
        do this work locally. {SITE.name} exists to make that easy.
      </p>

      <h2 className="font-display font-bold text-xl mt-8 mb-2 text-ink-900">What we use</h2>
      <ul className="list-disc pl-6 text-ink-700 space-y-1">
        <li>React + Vite + TypeScript for the user interface.</li>
        <li>Tailwind CSS for styling.</li>
        <li>Native HTML Canvas for image processing (resize, crop, convert, watermark).</li>
        <li>An open-source background-removal model that runs entirely in the browser via WebAssembly.</li>
        <li>Static hosting on a generous free tier — no servers, no databases.</li>
      </ul>

      <h2 className="font-display font-bold text-xl mt-8 mb-2 text-ink-900">What we don't do</h2>
      <ul className="list-disc pl-6 text-ink-700 space-y-1">
        <li>We don't store or upload your images.</li>
        <li>We don't require an account.</li>
        <li>We don't show ads or sell your data.</li>
        <li>We don't make up trust badges, customer counts, or awards.</li>
      </ul>

      <h2 className="font-display font-bold text-xl mt-8 mb-2 text-ink-900">Get in touch</h2>
      <p className="text-ink-700">
        Found a bug, or have a tool suggestion? Use the <a className="text-brand-700 hover:underline" href="/contact">contact form</a>.
      </p>
    </article>
  );
}
