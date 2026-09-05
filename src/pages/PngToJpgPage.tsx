import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { SingleImageEditorPage } from '../components/SingleImageEditorPage';

const TOOL = TOOL_BY_PATH['/png-to-jpg'];

export function PngToJpgPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/png-to-jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/png-to-jpg`,
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
      defaultFormat="image/jpeg"
      defaultQuality={0.9}
      sidebar={({ state, setState }) => (
        <div className="card p-4 space-y-3">
          <h3 className="font-display font-bold text-ink-900">JPG quality</h3>
          <label className="block">
            <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(state.output.quality * 100)}%</span></span>
            <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, quality: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
          </label>
          <label className="block">
            <span className="text-xs text-ink-700">Background color (for transparency)</span>
            <input type="text" className="input mt-1" value={state.output.flattenColor} onChange={(e) => setState((s) => ({ ...s, output: { ...s.output, flattenColor: e.target.value } }))} />
          </label>
        </div>
      )}
    />
  );
}
