import { SITE } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';

export function TermsPage() {
  usePageMeta({
    title: 'Terms of Service',
    description: `${SITE.name} terms of service.`,
    path: '/terms',
  });

  return (
    <article className="container-narrow py-12 max-w-none">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">Terms of Service</h1>
      <p className="text-sm text-ink-500 mt-2">Last updated: today</p>

      <Section title="1. Acceptance">
        <p>By using {SITE.name} you agree to these terms. If you do not agree, please do not use the service.</p>
      </Section>

      <Section title="2. Service">
        <p>
          {SITE.name} provides free, browser-based image tools. The service is provided "as is" without
          warranty of any kind. We may modify or discontinue features at any time.
        </p>
      </Section>

      <Section title="3. Your content">
        <p>
          You retain all rights to the images you process. Because processing happens in your browser,
          we never have access to your images and cannot claim any rights over them.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <p>You agree not to use {SITE.name} to process illegal content or to attempt to disrupt the service.</p>
      </Section>

      <Section title="5. No professional advice">
        <p>
          Tools such as the Passport Photo Maker provide convenient starting points only. Always
          verify the exact requirements with the relevant authority before submission.
        </p>
      </Section>

      <Section title="6. Limitation of liability">
        <p>
          To the maximum extent permitted by law, {SITE.name} and its operators are not liable for any
          indirect or consequential damages arising from use of the service.
        </p>
      </Section>

      <Section title="7. Changes">
        <p>We may update these terms. The latest version is always available on this page.</p>
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
