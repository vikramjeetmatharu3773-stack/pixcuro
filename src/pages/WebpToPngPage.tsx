import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { SingleImageEditorPage } from '../components/SingleImageEditorPage';

const TOOL = TOOL_BY_PATH['/webp-to-png'];

export function WebpToPngPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/webp-to-png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/webp-to-png`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });
  return (
    <SingleImageEditorPage
      title={TOOL!.title}
      intro={TOOL!.intro}
      defaultFormat="image/png"
      sidebar={() => (
        <div className="card p-4 space-y-3">
          <h3 className="font-display font-bold text-ink-900">Output</h3>
          <p className="text-sm text-ink-600">Format: <span className="font-semibold">PNG (lossless, transparency preserved)</span></p>
        </div>
      )}
    />
  );
}
