import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function PrivacyPage() {
  usePageMeta({
    title: 'Privacy Policy',
    description: `${SITE.name} privacy policy — your images are processed in your browser and never uploaded.`,
    path: '/privacy',
  });

  return (
    <article className="container-narrow py-12 max-w-none">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">Privacy Policy</h1>
      <p className="text-sm text-ink-500 mt-2">Last updated: today</p>

      <Section title="Summary">
        <p>
          {SITE.name} is built around privacy. Every image you upload is processed in your own browser.
          We do not have a backend that receives your files, and we do not upload them anywhere. The
          background-removal AI model runs locally via WebAssembly.
        </p>
      </Section>

      <Section title="What we collect">
        <ul className="list-disc pl-6 text-ink-700 space-y-1">
          <li>Nothing about your images. They never leave your device.</li>
          <li>Standard, privacy-friendly analytics only if you opt in (currently disabled by default).</li>
          <li>Standard server logs from our hosting provider (vercel.app). These contain IP address, request path, and user agent, and are used solely for abuse prevention and traffic limits.</li>
        </ul>
      </Section>

      <Section title="Cookies">
        <p>
          We do not set tracking cookies. The website may use your browser's local storage to remember
          tool preferences (such as the last background color you picked). You can clear this at any
          time from your browser settings.
        </p>
      </Section>

      <Section title="Third parties">
        <p>
          By default, we do not send your data to any third party. The fonts used on this site are
          served by Google Fonts when that improves performance — Google may receive your IP address as
          part of that request. If you prefer, you can disable web fonts in your browser.
        </p>
      </Section>

      <Section title="Children's privacy">
        <p>
          {SITE.name} is not directed at children under 13 and we do not knowingly collect any
          information from them.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this policy. The latest version is always available on this page.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions? Use the <a className="text-brand-700 hover:underline" href="/contact">contact form</a>.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display font-bold text-xl text-ink-900 mb-2">{title}</h2>
      <div className="text-ink-700 space-y-2">{children}</div>
    </section>
  );
}
