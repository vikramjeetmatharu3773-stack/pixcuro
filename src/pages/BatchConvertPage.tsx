import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { BatchPage, type BatchFile } from '../components/BatchPage';
import { canvasToResult, type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/batch-convert'];

interface Opts { format: 'image/png' | 'image/jpeg' | 'image/webp'; quality: number; }

const Options = ({ value, setValue }: { value: Opts; setValue: (v: Opts) => void }) => (
  <div className="card p-4 space-y-3">
    <h3 className="font-display font-bold text-ink-900">Convert to</h3>
    <label className="block">
      <span className="text-xs text-ink-700">Target format</span>
      <select className="select mt-1" value={value.format} onChange={(e) => setValue({ ...value, format: e.target.value as Opts['format'] })}>
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
        <option value="image/webp">WebP</option>
      </select>
    </label>
    {(value.format === 'image/jpeg' || value.format === 'image/webp') && (
      <label className="block">
        <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(value.quality * 100)}%</span></span>
        <input type="range" min={0.4} max={1} step={0.01} value={value.quality} onChange={(e) => setValue({ ...value, quality: parseFloat(e.target.value) })} className="mt-2 w-full accent-brand-600" />
      </label>
    )}
  </div>
);

async function processOne(img: HTMLImageElement, file: BatchFile, opts: Opts): Promise<ProcessResult> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2D context');
  if (opts.format === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  const ext = opts.format.split('/')[1].replace('jpeg', 'jpg');
  const baseName = file.file.name.replace(/\.[^.]+$/, '');
  return canvasToResult(canvas, opts.format, opts.quality, `${baseName}.${ext}`);
}

export function BatchConvertPage() {
  usePageMeta({
    title: TOOL!.title,
    description: TOOL!.description,
    path: '/batch-convert',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL!.title,
      url: `${SITE.url}/batch-convert`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL!.description,
    },
  });

  return (
    <BatchPage
      title={TOOL!.title}
      intro={TOOL!.intro}
      process={processOne}
      Options={Options}
      defaultOptions={{ format: 'image/webp', quality: 0.9 }}
    />
  );
}
