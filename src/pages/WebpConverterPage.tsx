import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { SingleImageEditorPage } from '../components/SingleImageEditorPage';

const TOOL = TOOL_BY_PATH['/webp-converter'];

export function WebpConverterPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/webp-converter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/webp-converter`,
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
      defaultFormat="image/webp"
      defaultQuality={0.85}
      sidebar={({ state, setState }) => (
        <div className="card p-4 space-y-3">
          <h3 className="font-display font-bold text-ink-900">Output</h3>
          <label className="block">
            <span className="text-xs text-ink-700">Convert to</span>
            <select className="select mt-1" value={state.output.format} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
            </select>
          </label>
          {(state.output.format === 'image/webp' || state.output.format === 'image/jpeg') && (
            <label className="block">
              <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(state.output.quality * 100)}%</span></span>
              <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, quality: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
            </label>
          )}
        </div>
      )}
    />
  );
}
