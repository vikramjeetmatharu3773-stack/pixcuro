import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, TOOL_BY_PATH, ASPECT_RATIOS } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor, DEFAULT_CROP } from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/image-cropper'];

export function ImageCropperPage() {
  usePageMeta({
    title: TOOL!.title,
    description: TOOL!.description,
    path: '/image-cropper',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL!.title,
      url: `${SITE.url}/image-cropper`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL!.description,
    },
  });

  const { original, state, update, undo, redo, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (state) update((s) => ({ ...s, crop: { ...DEFAULT_CROP, enabled: true } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.sourceWidth]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, [loadFile, setError, preview]);

  if (!state || !original) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
          <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
        </header>
        <ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
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
          <CropCanvas
            original={original.img}
            state={state}
            aspectRatio={aspectRatio}
            onChange={update}
            onRender={(_, blob) => {
              if (preview?.url) URL.revokeObjectURL(preview.url);
              const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
              const url = URL.createObjectURL(blob);
              setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
            }}
          />
          <EditorToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onReset={() => update((s) => ({ ...s, crop: { ...DEFAULT_CROP, enabled: true } }))} />
          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Cropped"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Aspect ratio</h3>
            <div className="flex flex-wrap gap-1">
              {ASPECT_RATIOS.map((a) => (
                <button key={a.label} type="button" className={`px-2 py-1 rounded-md text-xs font-medium border ${aspectRatio === a.value ? 'bg-brand-100 border-brand-300 text-brand-800' : 'border-ink-200 hover:bg-ink-50'}`} onClick={() => setAspectRatio(a.value)}>{a.label}</button>
              ))}
            </div>
            <button type="button" className="btn-ghost text-xs" onClick={() => update((s) => ({ ...s, crop: { ...DEFAULT_CROP, enabled: true, width: 0.8, height: 0.8, x: 0.1, y: 0.1 } }))}>Reset crop</button>
            <p className="text-xs text-ink-500">Crop: <span className="font-semibold">{Math.round(state.crop.x * original.img.naturalWidth)}</span>, <span className="font-semibold">{Math.round(state.crop.y * original.img.naturalHeight)}</span> · <span className="font-semibold">{Math.round(state.crop.width * original.img.naturalWidth)} × {Math.round(state.crop.height * original.img.naturalHeight)}</span></p>
          </div>
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Output</h3>
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
                <input type="range" min={0.4} max={1} step={0.01} value={state.output.quality} onChange={(e) => update((s) => ({ ...s, output: { ...s.output, quality: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
              </label>
            )}
          </div>
          <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

function CropCanvas({ original, state, aspectRatio, onChange, onRender }: { original: HTMLImageElement; state: EditorState; aspectRatio: number | null; onChange: (next: EditorState | ((prev: EditorState) => EditorState)) => void; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState({ w: 0, h: 0 });
  const [drag, setDrag] = useState<null | 'move' | { corner: 'nw' | 'ne' | 'sw' | 'se' }>(null);
  const startRef = useRef<{ x: number; y: number; crop: typeof state.crop } | null>(null);
  const renderToken = useRef(0);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        setDisplay({ w: cr.width, h: cr.height });
      }
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = ++renderToken.current;
    renderEditor(original, null, state).then(({ canvas, blob }) => {
      if (t !== renderToken.current) return;
      onRender(canvas, blob);
    }).catch(() => {});
  }, [original, state]); // eslint-disable-line react-hooks/exhaustive-deps

  const crop = state.crop;
  const left = crop.x * display.w;
  const top = crop.y * display.h;
  const w = crop.width * display.w;
  const h = crop.height * display.h;

  const startDrag = (e: React.PointerEvent, mode: typeof drag) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDrag(mode);
    startRef.current = { x: e.clientX, y: e.clientY, crop: { ...crop } };
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drag || !startRef.current || !wrapRef.current) return;
    const dx = (e.clientX - startRef.current.x) / display.w;
    const dy = (e.clientY - startRef.current.y) / display.h;
    let next = { ...startRef.current.crop };
    if (drag === 'move') {
      next.x = Math.max(0, Math.min(1 - next.width, next.x + dx));
      next.y = Math.max(0, Math.min(1 - next.height, next.y + dy));
    } else {
      const corner = drag.corner;
      let newX = next.x, newY = next.y, newW = next.width, newH = next.height;
      const dW = dx, dH = dy;
      if (corner === 'se') { newW = next.width + dW; newH = aspectRatio ? newW / aspectRatio : next.height + dH; }
      if (corner === 'sw') { newW = next.width - dW; newX = next.x + dW; newH = aspectRatio ? newW / aspectRatio : next.height + dH; }
      if (corner === 'ne') { newW = next.width + dW; newH = aspectRatio ? newW / aspectRatio : next.height - dH; newY = next.y + dH; }
      if (corner === 'nw') { newW = next.width - dW; newX = next.x + dW; newH = aspectRatio ? newW / aspectRatio : next.height - dH; newY = next.y + dH; }
      if (newW < 0.05) newW = 0.05;
      if (newH < 0.05) newH = 0.05;
      newX = Math.max(0, newX); newY = Math.max(0, newY);
      if (newX + newW > 1) newW = 1 - newX;
      if (newY + newH > 1) newH = 1 - newY;
      next = { ...next, x: newX, y: newY, width: newW, height: newH };
    }
    onChange((s) => ({ ...s, crop: { ...next, enabled: true }, output: { ...s.output, width: Math.round(original.naturalWidth * next.width), height: Math.round(original.naturalHeight * next.height) } }));
  };

  const onUp = () => { setDrag(null); startRef.current = null; };

  return (
    <div className="card overflow-hidden">
      <div ref={wrapRef} className="relative w-full select-none touch-none" style={{ aspectRatio: `${original.naturalWidth} / ${original.naturalHeight}` }}>
        <img src={original.src} alt="Source" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/40" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top}px, ${left}px ${top + h}px, ${left + w}px ${top + h}px, ${left + w}px ${top}px, ${left}px ${top}px)` }} />
        </div>
        <div
          className="absolute border-2 border-white shadow-md cursor-move"
          style={{ left, top, width: w, height: h }}
          onPointerDown={(e) => startDrag(e, 'move')}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/3 right-1/3 bottom-1/3 border border-white/50" />
          </div>
          {(['nw', 'ne', 'sw', 'se'] as const).map((corner) => (
            <div
              key={corner}
              className={`absolute w-4 h-4 bg-white border border-ink-300 rounded-sm ${corner === 'nw' ? '-left-2 -top-2 cursor-nw-resize' : corner === 'ne' ? '-right-2 -top-2 cursor-ne-resize' : corner === 'sw' ? '-left-2 -bottom-2 cursor-sw-resize' : '-right-2 -bottom-2 cursor-se-resize'}`}
              onPointerDown={(e) => { e.stopPropagation(); startDrag(e, { corner }); }}
              onPointerMove={onMove}
              onPointerUp={onUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
