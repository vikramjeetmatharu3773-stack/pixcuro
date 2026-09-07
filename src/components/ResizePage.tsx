/**
 * Resize page that supports pixel OR millimetre-based dimensions with DPI.
 * Used by /photo-resizer, /passport-photo-resizer, /custom-photo-size.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, PRESETS } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor } from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';

type Unit = 'px' | 'mm';

interface Props {
  title: string;
  intro: string;
  path: string;
  defaultUnit?: Unit;
  defaultDpi?: number;
  presets?: { label: string; width: number; height: number }[];
  presetCategory?: keyof typeof PRESETS;
  defaultFormat?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export function ResizePage({ title, intro, path, defaultUnit = 'px', defaultDpi = 96, presets = [], presetCategory, defaultFormat = 'image/png' }: Props) {
  usePageMeta({
    title,
    description: intro,
    path,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      url: `${SITE.url}${path}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: intro,
    },
  });

  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [unit, setUnit] = useState<Unit>(defaultUnit);
  const [dpi, setDpi] = useState(defaultDpi);
  const [aspect, setAspect] = useState(true);
  const [quality, setQuality] = useState(0.92);

  const toPx = useCallback((v: number, u: Unit) => {
    if (u === 'mm') return Math.max(1, Math.round((v / 25.4) * dpi));
    return Math.max(1, Math.round(v));
  }, [dpi]);
  const fromPx = useCallback((px: number, u: Unit) => {
    if (u === 'mm') return Number(((px / dpi) * 25.4).toFixed(2));
    return Math.round(px);
  }, [dpi]);

  const [wInput, setWInput] = useState(0);
  const [hInput, setHInput] = useState(0);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, [loadFile, setError, preview]);

  // Initialize w/h from the loaded image dimensions (so the inputs aren't 1×1).
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!original) { setInitialized(false); return; }
    if (!initialized) {
      setWidth(original.img.naturalWidth);
      setHeight(original.img.naturalHeight);
      setWInput(original.img.naturalWidth);
      setHInput(original.img.naturalHeight);
      setInitialized(true);
    }
  }, [original, initialized]);

  // Sync output dimensions with the user's selected width/height (only after init)
  useEffect(() => {
    if (!original || !initialized) return;
    const pxW = toPx(wInput, unit);
    const pxH = toPx(hInput, unit);
    setWidth(pxW); setHeight(pxH);
  }, [wInput, hInput, unit, dpi, toPx, original, initialized]);

  // Push output dimensions into the editor state
  useEffect(() => {
    if (!state) return;
    if (width > 0 && height > 0) update((s) => ({ ...s, output: { ...s.output, width, height, quality, format: defaultFormat } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, quality]);

  if (!state || !original) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{title}</h1>
          <p className="text-ink-700 mt-2">{intro}</p>
        </header>
        <ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{title}</h1>
        <p className="text-ink-700 mt-2">{intro}</p>
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
          <div className="card p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <label className="block col-span-1">
                <span className="text-xs text-ink-700">Unit</span>
                <select className="select mt-1" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
                  <option value="px">Pixels</option>
                  <option value="mm">Millimetres</option>
                </select>
              </label>
              <label className="block col-span-1">
                <span className="text-xs text-ink-700">Width ({unit})</span>
                <input type="number" className="input mt-1" value={wInput || fromPx(width, unit)} onChange={(e) => {
                  const v = parseFloat(e.target.value) || 0;
                  setWInput(v);
                  if (aspect) {
                    const pxW = toPx(v, unit);
                    const ratio = original.img.naturalHeight / original.img.naturalWidth;
                    const newPxH = Math.max(1, Math.round(pxW * ratio));
                    setHInput(fromPx(newPxH, unit));
                  }
                }} />
              </label>
              <label className="block col-span-1">
                <span className="text-xs text-ink-700">Height ({unit})</span>
                <input type="number" className="input mt-1" value={hInput || fromPx(height, unit)} onChange={(e) => {
                  const v = parseFloat(e.target.value) || 0;
                  setHInput(v);
                  if (aspect) {
                    const pxH = toPx(v, unit);
                    const ratio = original.img.naturalWidth / original.img.naturalHeight;
                    const newPxW = Math.max(1, Math.round(pxH * ratio));
                    setWInput(fromPx(newPxW, unit));
                  }
                }} />
              </label>
            </div>
            <label className="block">
              <span className="text-xs text-ink-700">DPI</span>
              <input type="number" className="input mt-1" value={dpi} onChange={(e) => setDpi(parseInt(e.target.value, 10) || 96)} min={50} max={1200} />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-800">
              <input type="checkbox" checked={aspect} onChange={(e) => setAspect(e.target.checked)} />
              Lock aspect ratio
            </label>
            <p className="text-xs text-ink-500">Pixels: <span className="font-semibold">{width} × {height}</span></p>
          </div>

          {(presets.length > 0 || presetCategory) && (
            <div className="card p-4 space-y-2">
              <h3 className="font-display font-bold text-ink-900">Presets</h3>
              {presets.map((p) => (
                <button key={p.label} type="button" className="w-full text-left px-2 py-1 rounded-md hover:bg-ink-50 border border-ink-100 text-sm" onClick={() => { setWInput(p.width); setHInput(p.height); setUnit('px'); setAspect(true); }}>
                  {p.label}
                </button>
              ))}
              {presetCategory && PRESETS[presetCategory].map((p) => (
                <button key={p.label} type="button" className="w-full text-left px-2 py-1 rounded-md hover:bg-ink-50 border border-ink-100 text-sm" onClick={() => { setWInput(p.width); setHInput(p.height); setUnit('px'); setAspect(true); }}>
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <div className="card p-4 space-y-3">
            <label className="block">
              <span className="text-xs text-ink-700">Format</span>
              <select className="select mt-1" value={state.output.format} onChange={(e) => update((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
              </select>
            </label>
            {(state.output.format === 'image/jpeg' || state.output.format === 'image/webp') && (
              <label className="block">
                <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(state.output.quality * 100)}%</span></span>
                <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="mt-2 w-full accent-brand-600" />
              </label>
            )}
          </div>

          <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

function Preview({ source, state, onRender }: { source: HTMLImageElement; state: EditorState; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const token = useRef(0);
  useEffect(() => {
    const t = ++token.current;
    renderEditor(source, null, state).then(({ canvas, blob }) => {
      if (t !== token.current) return;
      if (canvasRef.current) {
        canvasRef.current.width = canvas.width;
        canvasRef.current.height = canvas.height;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.drawImage(canvas, 0, 0);
      }
      onRender(canvas, blob);
    }).catch(() => {});
  }, [source, state]);
  return <div className="card overflow-hidden"><canvas ref={canvasRef} className="block w-full h-auto bg-ink-100 checker-bg" /></div>;
}
