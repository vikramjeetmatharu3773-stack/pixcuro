import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { type EditorState, buildDefaultState, renderEditor, DEFAULT_TRANSFORM } from '../lib/editor';
import { fileToImage, type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/image-rotate'];

export function ImageRotatePage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/image-rotate',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/image-rotate`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  const [original, setOriginal] = useState<{ img: HTMLImageElement; url: string; size: number; name: string; type: string } | null>(null);
  const [state, setState] = useState<EditorState | null>(null);
  const [past, setPast] = useState<EditorState[]>([]);
  const [future, setFuture] = useState<EditorState[]>([]);
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((u: EditorState | ((p: EditorState) => EditorState)) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = typeof u === 'function' ? u(prev) : u;
      if (Object.is(next, prev)) return prev;
      setPast((p) => [...p.slice(-49), prev]);
      setFuture([]);
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (!prev || past.length === 0) return prev;
      const previous = past[past.length - 1];
      setPast((p) => p.slice(0, -1));
      setFuture((f) => [prev, ...f]);
      return previous;
    });
  }, [past]);

  const redo = useCallback(() => {
    setState((prev) => {
      if (!prev || future.length === 0) return prev;
      const next = future[0];
      setFuture((f) => f.slice(1));
      setPast((p) => [...p, prev]);
      return next;
    });
  }, [future]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      const url = URL.createObjectURL(file);
      const img = await fileToImage(file);
      setOriginal({ img, url, size: file.size, name: file.name, type: file.type });
      setState(buildDefaultState(img.naturalWidth, img.naturalHeight, file.name.replace(/\.[^.]+$/, '')));
      setPast([]); setFuture([]);
      setPreview(null);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, []);

  const reset = () => {
    if (!original) return;
    setState(buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name.replace(/\.[^.]+$/, '')));
    setPast([]); setFuture([]);
  };

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
          <Preview source={original.img} state={state} onRender={(_, blob) => {
            if (preview?.url) URL.revokeObjectURL(preview.url);
            const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
            const url = URL.createObjectURL(blob);
            setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
          }} />
          <EditorToolbar canUndo={past.length > 0} canRedo={future.length > 0} onUndo={undo} onRedo={redo} onReset={reset} />
          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Rotated"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Quick actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn-secondary" onClick={() => update((s) => ({ ...s, transform: { ...s.transform, rotation: (s.transform.rotation + 90) % 360 } }))}>Rotate 90°</button>
              <button type="button" className="btn-secondary" onClick={() => update((s) => ({ ...s, transform: { ...s.transform, rotation: (s.transform.rotation + 180) % 360 } }))}>Rotate 180°</button>
              <button type="button" className="btn-secondary" onClick={() => update((s) => ({ ...s, transform: { ...s.transform, flipH: !s.transform.flipH } }))}>Flip horizontal</button>
              <button type="button" className="btn-secondary" onClick={() => update((s) => ({ ...s, transform: { ...s.transform, flipV: !s.transform.flipV } }))}>Flip vertical</button>
            </div>
            <label className="block">
              <span className="text-xs text-ink-700 flex justify-between"><span>Fine rotation</span><span>{state.transform.rotation}°</span></span>
              <input type="range" min={-180} max={180} step={1} value={state.transform.rotation} onChange={(e) => update((s) => ({ ...s, transform: { ...s.transform, rotation: parseFloat(e.target.value) } }))} className="mt-2 w-full accent-brand-600" />
            </label>
            <button type="button" className="btn-ghost text-xs" onClick={() => update((s) => ({ ...s, transform: { ...DEFAULT_TRANSFORM } }))}>Reset rotation & flip</button>
          </div>
          <button type="button" className="btn-secondary w-full" onClick={() => {
            if (original?.url) URL.revokeObjectURL(original.url);
            if (preview?.url) URL.revokeObjectURL(preview.url);
            setOriginal(null); setPreview(null); setState(null);
          }}>Start over</button>
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
