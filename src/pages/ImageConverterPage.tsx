import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { SingleImageEditorPage } from '../components/SingleImageEditorPage';

const TOOL = TOOL_BY_PATH['/image-converter'];

export function ImageConverterPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/image-converter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/image-converter`,
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
      sidebar={({ state, setState }) => (
        <div className="card p-4 space-y-3">
          <h3 className="font-display font-bold text-ink-900">Convert to</h3>
          <label className="block">
            <span className="text-xs text-ink-700">Target format</span>
            <select className="select mt-1" value={state.output.format} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}>
              <option value="image/png">PNG (lossless, transparency)</option>
              <option value="image/jpeg">JPG (smaller, no transparency)</option>
              <option value="image/webp">WebP (small + transparent)</option>
            </select>
          </label>
          {(state.output.format === 'image/jpeg' || state.output.format === 'image/webp') && (
            <label className="block">
              <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(state.output.quality * 100)}%</span></span>
              <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, quality: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
            </label>
          )}
          {state.output.format === 'image/jpeg' && (
            <label className="block">
              <span className="text-xs text-ink-700">Flatten color (background for transparent areas)</span>
              <input type="text" className="input mt-1" value={state.output.flattenColor} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, flattenColor: e.target.value } }))} />
            </label>
          )}
        </div>
      )}
    />
  );
}
