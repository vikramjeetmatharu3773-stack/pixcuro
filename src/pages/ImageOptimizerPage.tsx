import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { SingleImageEditorPage } from '../components/SingleImageEditorPage';

const TOOL = TOOL_BY_PATH['/image-optimizer'];

export function ImageOptimizerPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/image-optimizer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/image-optimizer`,
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
          <h3 className="font-display font-bold text-ink-900">Optimization</h3>
          <p className="text-sm text-ink-600">We default to WebP because it usually beats JPG and PNG on size for the same quality.</p>
          <label className="block">
            <span className="text-xs text-ink-700">Format</span>
            <select className="select mt-1" value={state.output.format} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}>
              <option value="image/webp">WebP (recommended)</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG (lossless)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(state.output.quality * 100)}%</span></span>
            <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, quality: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
          </label>
        </div>
      )}
    />
  );
}
