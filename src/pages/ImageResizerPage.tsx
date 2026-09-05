import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, TOOL_BY_PATH, PRESETS, ASPECT_RATIOS } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor } from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/image-resizer'];

export function ImageResizerPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/image-resizer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/image-resizer`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspect, setAspect] = useState(true);
  const [quality, setQuality] = useState(0.92);

  useEffect(() => {
    if (state && width > 0 && height > 0) update((s) => ({ ...s, output: { ...s.output, width, height, quality } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, quality]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, [loadFile, setError, preview]);

  // Initialize w/h from the loaded image dimensions
  useEffect(() => {
    if (original) {
      setWidth(original.img.naturalWidth);
      setHeight(original.img.naturalHeight);
    }
  }, [original]);

  if (!state || !original) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
          <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
        </header>
        <ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
        <ResizeHints />
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
        <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Preview source={original.img} state={state} onRender={(_, blob) => {
            if (preview?.url) URL.revokeObjectURL(preview.url);
            const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
            const url = URL.createObjectURL(blob);
            setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
          }} />
          <EditorToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onReset={reset} />

          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Resized"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
        </div>
        <div className="space-y-4">
          <ResizeControls
            original={original.img}
            width={width} setWidth={(w) => { setWidth(w); if (aspect) setHeight(Math.max(1, Math.round((original.img.naturalHeight / original.img.naturalWidth) * w))); }}
            height={height} setHeight={(h) => { setHeight(h); if (aspect) setWidth(Math.max(1, Math.round((original.img.naturalWidth / original.img.naturalHeight) * h))); }}
            aspect={aspect} setAspect={setAspect}
            quality={quality} setQuality={setQuality}
            format={state.output.format as 'image/png' | 'image/jpeg' | 'image/webp'} setFormat={(f) => update((s) => ({ ...s, output: { ...s.output, format: f } }))}
          />
          <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

function ResizeControls({ original, width, setWidth, height, setHeight, aspect, setAspect, format, setFormat, quality, setQuality }: {
  original: HTMLImageElement;
  width: number; setWidth: (n: number) => void;
  height: number; setHeight: (n: number) => void;
  aspect: boolean; setAspect: (b: boolean) => void;
  format: 'image/png' | 'image/jpeg' | 'image/webp'; setFormat: (f: 'image/png' | 'image/jpeg' | 'image/webp') => void;
  quality: number; setQuality: (n: number) => void;
}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const applyScale = (pct: number) => {
    const w = Math.max(1, Math.round(original.naturalWidth * pct / 100));
    const h = Math.max(1, Math.round(original.naturalHeight * pct / 100));
    setWidth(w); setHeight(h);
  };
  const applyPreset = (w: number, h: number) => { setWidth(w); setHeight(h); setAspect(true); setAspectRatio(w / h); };
  return (
    <div className="card p-4 space-y-4">
      <div className="text-sm text-ink-700">
        Original: <span className="font-semibold">{original.naturalWidth} × {original.naturalHeight}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-xs text-ink-700">Width (px)</span>
          <input type="number" className="input mt-1" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)} />
        </label>
        <label className="block">
          <span className="text-xs text-ink-700">Height (px)</span>
          <input type="number" className="input mt-1" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-800">
        <input type="checkbox" checked={aspect} onChange={(e) => setAspect(e.target.checked)} />
        Lock aspect ratio
      </label>
      <div className="grid grid-cols-4 gap-1">
        {[25, 50, 75, 100].map((p) => (
          <button key={p} type="button" className="px-2 py-1 rounded-md text-xs font-medium border border-ink-200 hover:bg-ink-50" onClick={() => applyScale(p)}>{p}%</button>
        ))}
      </div>
      <details className="text-xs">
        <summary className="cursor-pointer text-brand-700 font-medium">Aspect ratio lock</summary>
        <div className="flex flex-wrap gap-1 mt-2">
          {ASPECT_RATIOS.map((a) => (
            <button key={a.label} type="button" className={`px-2 py-1 rounded-md text-xs border ${aspectRatio === a.value ? 'bg-brand-100 border-brand-300' : 'border-ink-200 hover:bg-ink-50'}`} onClick={() => {
              if (a.value === null) { setAspectRatio(null); setAspect(false); return; }
              setAspectRatio(a.value); setAspect(true);
              const newH = Math.max(1, Math.round(width / a.value));
              setHeight(newH);
            }}>{a.label}</button>
          ))}
        </div>
      </details>
      <details className="text-xs">
        <summary className="cursor-pointer text-brand-700 font-medium">Social & web presets</summary>
        <div className="space-y-2 mt-2">
          {Object.entries(PRESETS).map(([group, items]) => (
            <div key={group}>
              <p className="text-[11px] uppercase tracking-wide text-ink-500 mt-1">{group}</p>
              <div className="flex flex-col gap-1">
                {items.map((p) => (
                  <button key={p.label} type="button" className="text-left px-2 py-1 rounded-md hover:bg-ink-50 border border-ink-100" onClick={() => applyPreset(p.width, p.height)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>
      <label className="block">
        <span className="text-xs text-ink-700">Output format</span>
        <select className="select mt-1" value={format} onChange={(e) => setFormat(e.target.value as typeof format)}>
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/webp">WebP</option>
        </select>
      </label>
      {(format === 'image/jpeg' || format === 'image/webp') && (
        <label className="block">
          <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(quality * 100)}%</span></span>
          <input type="range" min={0.4} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="mt-2 w-full accent-brand-600" />
        </label>
      )}
    </div>
  );
}

function Preview({ source, state, onRender }: { source: HTMLImageElement; state: EditorState; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const token = useRef(0);
  useEffect(() => {
    const t = ++token.current;
    renderEditor(source, null, state)
      .then(({ canvas, blob }) => {
        if (t !== token.current) return;
        if (canvasRef.current) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(canvas, 0, 0);
        }
        onRender(canvas, blob);
      })
      .catch(() => {});
  }, [source, state]);
  return (
    <div className="card overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-auto bg-ink-100 checker-bg" />
    </div>
  );
}

function ResizeHints() {
  return (
    <div className="grid sm:grid-cols-3 gap-3 mt-8">
      {[
        { title: 'Exact dimensions', text: 'Type a width and height in pixels. Lock the aspect ratio to avoid distortion.' },
        { title: 'Percentage scaling', text: 'Use the 25/50/75/100% buttons for quick size changes.' },
        { title: 'Social presets', text: 'Open the social preset list to find Instagram, YouTube, LinkedIn, X and more.' },
      ].map((f) => (
        <div key={f.title} className="card p-5">
          <h3 className="font-display font-bold text-base text-ink-900">{f.title}</h3>
          <p className="mt-1 text-sm text-ink-600">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
