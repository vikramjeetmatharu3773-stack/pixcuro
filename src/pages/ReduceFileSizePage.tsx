import { useState, useCallback, useEffect, useRef } from 'react';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor } from '../lib/editor';
import { formatBytes, type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/reduce-file-size'];

export function ReduceFileSizePage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/reduce-file-size',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/reduce-file-size`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);
  const [targetKB, setTargetKB] = useState(200);
  const [autoQuality, setAutoQuality] = useState(true);
  const [quality, setQuality] = useState(0.8);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (state) update((s) => ({ ...s, output: { ...s.output, format: 'image/jpeg', quality } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.sourceWidth, quality]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
      setTargetKB(Math.max(50, Math.round(file.size / 1024 / 2)));
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load image'); }
  }, [loadFile, setError, preview]);

  const findQualityForTargetKB = useCallback(async (target: number) => {
    if (!original) return 0.8;
    const sizes: { q: number; size: number }[] = [];
    for (const q of [0.95, 0.85, 0.7, 0.55, 0.4, 0.25]) {
      const blob = await new Promise<Blob>((resolve) => {
        const c = document.createElement('canvas');
        c.width = original.img.naturalWidth;
        c.height = original.img.naturalHeight;
        const ctx = c.getContext('2d')!;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(original.img, 0, 0);
        c.toBlob((b) => resolve(b!), 'image/jpeg', q);
      });
      sizes.push({ q, size: blob.size });
    }
    let best = sizes[sizes.length - 1].q;
    for (const s of sizes) {
      if (s.size <= target * 1024) { best = s.q; break; }
    }
    return best;
  }, [original]);

  const onApply = async () => {
    if (!original) return;
    setBusy(true);
    try {
      if (autoQuality) {
        const q = await findQualityForTargetKB(targetKB);
        setQuality(q);
      }
    } finally {
      setBusy(false);
    }
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
          <EditorToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onReset={reset} />
          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Compressed"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-4 space-y-3">
            <h3 className="font-display font-bold text-ink-900">Target size</h3>
            <label className="block">
              <span className="text-xs text-ink-700 flex justify-between"><span>Target (KB)</span><span>{targetKB} KB</span></span>
              <input type="range" min={10} max={Math.max(50, Math.ceil(original.size / 1024))} step={5} value={targetKB} onChange={(e) => setTargetKB(parseInt(e.target.value, 10))} className="mt-2 w-full accent-brand-600" />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-800">
              <input type="checkbox" checked={autoQuality} onChange={(e) => setAutoQuality(e.target.checked)} />
              Auto-pick quality to hit target
            </label>
            {!autoQuality && (
              <label className="block">
                <span className="text-xs text-ink-700 flex justify-between"><span>Quality</span><span>{Math.round(quality * 100)}%</span></span>
                <input type="range" min={0.3} max={1} step={0.01} value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="mt-2 w-full accent-brand-600" />
              </label>
            )}
            <button type="button" className="btn-primary w-full" onClick={onApply} disabled={busy}>
              {busy ? 'Calculating…' : 'Compress to target'}
            </button>
            <p className="text-xs text-ink-500">Original: {formatBytes(original.size)}</p>
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
