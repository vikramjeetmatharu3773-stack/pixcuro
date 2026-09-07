import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, TOOL_BY_PATH, PRESETS, ASPECT_RATIOS } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { BeforeAfter } from '../components/Primitives';
import { ToolEmptyState } from '../components/ToolEmptyState';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor } from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';
import { tryConsumeDownloadToken } from '../lib/rateLimit';
import { saveAs } from 'file-saver';

const TOOL = TOOL_BY_PATH['/image-resizer'];

function PreviewRenderer({ source, state, onRender }: { source: HTMLImageElement; state: EditorState; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
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
  return <canvas ref={canvasRef} className="hidden" aria-hidden="true" />;
}

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

  const { original, state, update, undo, redo, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspect, setAspect] = useState(true);
  const [quality, setQuality] = useState(0.92);
  const [ratioLocked, setRatioLocked] = useState<number | null>(null);

  // Initialize w/h from the loaded image
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!original) { setInitialized(false); return; }
    if (!initialized) {
      setWidth(original.img.naturalWidth);
      setHeight(original.img.naturalHeight);
      setInitialized(true);
    }
  }, [original, initialized]);

  // Push output dimensions into the editor state
  useEffect(() => {
    if (!state || !initialized) return;
    update((s) => ({ ...s, output: { ...s.output, width, height, quality } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, quality, initialized]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, [loadFile, setError, preview]);

  const onDownload = () => {
    if (!preview) return;
    if (!tryConsumeDownloadToken()) return;
    saveAs(preview.blob, preview.name);
  };

  if (!state || !original) {
    return (
      <ToolEmptyState
        title={TOOL!.title}
        intro={TOOL!.intro}
        description="Resize an image to exact pixel dimensions, by percentage, or using social-media presets. Aspect-ratio lock keeps things from distorting. The output downloads as PNG, JPG, or WebP — your choice."
        category="resize"
        features={[
          { title: 'Exact dimensions', text: 'Type a width and height in pixels. Lock the aspect ratio to avoid distortion.' },
          { title: 'Percentage scaling', text: 'Use the 25/50/75/100% buttons for quick size changes.' },
          { title: 'Social presets', text: 'Open the social preset list to find Instagram, YouTube, LinkedIn, X and more.' },
        ]}
        faqs={[
          { q: 'Does resizing reduce quality?', a: 'No — it re-encodes the image at the new dimensions. PNG is lossless; JPG and WebP quality is yours to control.' },
          { q: 'Can I resize to a specific DPI?', a: 'Yes — the Custom Photo Size tool supports millimetres + DPI for print work.' },
          { q: 'What about bulk resizing?', a: 'The Batch Resize tool can apply the same dimensions to many images at once.' },
        ]}
        upload={<ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />}
        error={error}
      />
    );
  }

  const applyScale = (pct: number) => {
    const w = Math.max(1, Math.round(original.img.naturalWidth * pct / 100));
    const h = Math.max(1, Math.round(original.img.naturalHeight * pct / 100));
    setWidth(w); setHeight(h);
  };
  const applyPreset = (w: number, h: number) => {
    setWidth(w); setHeight(h);
    setRatioLocked(w / h);
  };

  // Savings %
  const savedPct = preview && original.size > 0 && preview.size < original.size
    ? ((1 - preview.size / original.size) * 100).toFixed(0)
    : null;
  const grewPct = preview && original.size > 0 && preview.size > original.size
    ? ((preview.size / original.size - 1) * 100).toFixed(0)
    : null;

  return (
    <div className="container-narrow py-6 pb-24 sm:pb-8">
      <header className="mb-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-900">{TOOL!.title}</h1>
        <p className="mt-1 text-sm text-ink-600">{TOOL!.intro}</p>
      </header>

      {/* 1. IMAGE WITH BEFORE/AFTER SLIDER */}
      <BeforeAfter
        before={original.url}
        after={preview?.url ?? original.url}
        beforeLabel="Original"
        afterLabel="Resized"
      />

      {/* 2. EDIT CONTROLS — IMMEDIATELY BELOW */}
      <div className="mt-4 card p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-ink-700">Width (px)</span>
            <input
              type="number"
              className="input mt-1"
              value={width}
              onChange={(e) => {
                const w = parseInt(e.target.value, 10) || 0;
                setWidth(w);
                if (aspect) setHeight(Math.max(1, Math.round((original.img.naturalHeight / original.img.naturalWidth) * w)));
              }}
            />
          </label>
          <label className="block">
            <span className="text-xs text-ink-700">Height (px)</span>
            <input
              type="number"
              className="input mt-1"
              value={height}
              onChange={(e) => {
                const h = parseInt(e.target.value, 10) || 0;
                setHeight(h);
                if (aspect) setWidth(Math.max(1, Math.round((original.img.naturalWidth / original.img.naturalHeight) * h)));
              }}
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-800">
          <input
            type="checkbox"
            checked={aspect}
            onChange={(e) => {
              setAspect(e.target.checked);
              if (e.target.checked) setRatioLocked(width / height);
              else setRatioLocked(null);
            }}
          />
          Lock aspect ratio
        </label>

        <div className="grid grid-cols-4 gap-1">
          {[25, 50, 75, 100].map((p) => (
            <button
              key={p}
              type="button"
              className="px-2 py-1 rounded-md text-xs font-medium border border-ink-200 hover:bg-ink-50"
              onClick={() => applyScale(p)}
            >
              {p}%
            </button>
          ))}
        </div>

        <details className="text-xs">
          <summary className="cursor-pointer text-brand-700 font-medium">Aspect ratio lock</summary>
          <div className="flex flex-wrap gap-1 mt-2">
            {ASPECT_RATIOS.map((a) => (
              <button
                key={a.label}
                type="button"
                className={`px-2 py-1 rounded-md text-xs border ${ratioLocked === a.value ? 'bg-brand-100 border-brand-300' : 'border-ink-200 hover:bg-ink-50'}`}
                onClick={() => {
                  if (a.value === null) { setRatioLocked(null); setAspect(false); return; }
                  setRatioLocked(a.value); setAspect(true);
                  setHeight(Math.max(1, Math.round(width / a.value)));
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </details>

        <details className="text-xs">
          <summary className="cursor-pointer text-brand-700 font-medium">Social & web presets</summary>
          <div className="space-y-1 mt-2 max-h-56 overflow-y-auto pr-1">
            {Object.entries(PRESETS).map(([group, items]) => (
              <div key={group}>
                <p className="text-[10px] uppercase tracking-wide text-ink-500 mt-1">{group}</p>
                {items.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="w-full text-left px-2 py-1 rounded-md hover:bg-ink-50 border border-ink-100"
                    onClick={() => applyPreset(p.width, p.height)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </details>

        <label className="block">
          <span className="text-xs text-ink-700">Output format</span>
          <select
            className="select mt-1"
            value={state.output.format}
            onChange={(e) => update((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}
          >
            <option value="image/png">PNG (lossless)</option>
            <option value="image/jpeg">JPG (smaller)</option>
            <option value="image/webp">WebP (modern)</option>
          </select>
        </label>

        {(state.output.format === 'image/jpeg' || state.output.format === 'image/webp') && (
          <label className="block">
            <span className="text-xs text-ink-700 flex justify-between">
              <span>Quality</span><span>{Math.round(quality * 100)}%</span>
            </span>
            <input
              type="range"
              min={0.4}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="mt-2 w-full accent-brand-600"
            />
          </label>
        )}

        <details className="text-xs">
          <summary className="cursor-pointer text-brand-700 font-medium">Target a specific file size</summary>
          <p className="text-ink-500 mt-1 mb-2">Auto-picks the lowest quality that hits your target.</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              max={5000}
              step={10}
              value={state.output.targetKB ?? 0}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10) || 0;
                update((s) => ({ ...s, output: { ...s.output, targetKB: v } }));
              }}
              className="input flex-1"
              placeholder="e.g. 200"
            />
            <span className="text-xs text-ink-500">KB</span>
          </div>
        </details>
      </div>

      {/* 3. COMPACT FILE SUMMARY + SINGLE DOWNLOAD */}
      <div className="mt-4 card p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 text-sm min-w-0">
            <span className="font-medium text-ink-900 whitespace-nowrap">File summary</span>
            <span className="hidden sm:inline text-ink-300">·</span>
            <span className="text-ink-600 truncate">
              {original.img.naturalWidth}×{original.img.naturalHeight}
              <span className="text-ink-400"> → </span>
              {width}×{height}
            </span>
            {savedPct && (
              <span className="text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2 py-0.5">
                {savedPct}% smaller
              </span>
            )}
            {grewPct && (
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 rounded-full px-2 py-0.5">
                {grewPct}% larger
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="w-9 h-9 rounded-lg bg-ink-100 hover:bg-ink-200 disabled:opacity-40 flex items-center justify-center"
              aria-label="Undo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="w-9 h-9 rounded-lg bg-ink-100 hover:bg-ink-200 disabled:opacity-40 flex items-center justify-center"
              aria-label="Redo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></svg>
            </button>
            <button
              type="button"
              onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}
              className="w-9 h-9 rounded-lg bg-ink-100 hover:bg-ink-200 flex items-center justify-center"
              aria-label="Start over"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
            </button>
            <button
              type="button"
              onClick={onDownload}
              disabled={!preview}
              className="btn-primary px-4 py-2 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Preview rendering (hidden canvas) */}
      <PreviewRenderer
        source={original.img}
        state={state}
        onRender={(_, blob) => {
          if (preview?.url) URL.revokeObjectURL(preview.url);
          const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
          const url = URL.createObjectURL(blob);
          setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
        }}
      />
    </div>
  );
}