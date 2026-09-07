import { useState, useCallback, useEffect, useRef } from 'react';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { DownloadButton } from '../components/DownloadButton';
import { EditorToolbar } from '../components/EditorToolbar';
import { ResultPanel } from '../components/ResultPanel';
import { BeforeAfter } from '../components/Primitives';
import { useEditorSession } from '../lib/useEditorSession';
import { type EditorState, renderEditor } from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';

const TOOL = TOOL_BY_PATH['/remove-image-metadata'];

export function ExifRemoverPage() {
  usePageMeta({
    title: TOOL?.title,
    description: TOOL?.description,
    path: '/remove-image-metadata',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: TOOL?.title,
      url: `${SITE.url}/remove-image-metadata`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: TOOL?.description,
    },
  });

  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);

  useEffect(() => {
    if (state) update((s) => ({ ...s, output: { ...s.output, format: 'image/png' } }));
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
        <p className="mt-4 text-xs text-ink-500">
          Re-encoding an image in your browser strips the EXIF block. We do not have access to the raw EXIF
          block; we can only guarantee the metadata is gone by virtue of re-encoding.
        </p>
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{TOOL!.title}</h1>
        <p className="text-ink-700 mt-2">{TOOL!.intro}</p>
      </header>

      <div className="space-y-5">
        {/* 1. MAIN PREVIEW - Full height Before/After slider */}
        <LivePreview
          source={original.img}
          state={state}
          originalUrl={original.url}
          onRender={(_, blob) => {
            if (preview?.url) URL.revokeObjectURL(preview.url);
            const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
            const url = URL.createObjectURL(blob);
            setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
          }}
        />

        {/* 2. EDIT TOOLS - Visible without scrolling down */}
        <div className="card p-4 space-y-4">
          <EditorToolbar 
            canUndo={canUndo} 
            canRedo={canRedo} 
            onUndo={undo} 
            onRedo={redo} 
            onReset={reset} 
          />
          <div className="space-y-3">
            <h3 className="font-display font-bold text-ink-900">Output format</h3>
            <p className="text-xs text-ink-500 mt-1">Both formats drop EXIF. PNG keeps transparency; JPG produces a smaller file.</p>
            <label className="block mt-3">
              <span className="text-xs text-ink-700">Format</span>
              <select className="select mt-1" value={state.output.format} onChange={(e) => update((s) => ({ ...s, output: { ...s.output, format: e.target.value as typeof s.output.format } }))}>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
              </select>
            </label>
          </div>
        </div>

        {/* 3. COMPACT RESULT PANEL - File summary + single download button */}
        {preview && (
          <ResultPanel
            beforeLabel="Original"
            afterLabel="Clean"
            beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
            afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
            actions={<DownloadButton primary={preview} filename={preview.name} />}
          />
        )}

        <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>Start over</button>
      </div>
    </div>
  );
}

function LivePreview({ source, state, originalUrl, onRender }: { source: HTMLImageElement; state: EditorState; originalUrl: string; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderedUrl, setRenderedUrl] = useState<string>(originalUrl);
  const [rendering, setRendering] = useState(false);
  const token = useRef(0);
  useEffect(() => {
    const t = ++token.current;
    setRendering(true);
    renderEditor(source, null, state).then(({ canvas, blob }) => {
      if (t !== token.current) return;
      if (canvasRef.current) {
        canvasRef.current.width = canvas.width;
        canvasRef.current.height = canvas.height;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.drawImage(canvas, 0, 0);
      }
      setRenderedUrl(canvas.toDataURL());
      onRender(canvas, blob);
    }).catch(() => {}).finally(() => { if (t === token.current) setRendering(false); });
  }, [source, state]);
  if (!source) return <div className="card aspect-video flex items-center justify-center text-ink-500 text-sm">Upload an image to see the preview</div>;

  return (
    <div className="card relative overflow-hidden">
      <BeforeAfter
        before={originalUrl}
        after={renderedUrl}
        beforeLabel="Original"
        afterLabel="Clean"
        fullHeight
      />
      <canvas ref={canvasRef} className="hidden" />
      {rendering && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center text-sm text-ink-700 font-medium pointer-events-none">
          Rendering…
        </div>
      )}
    </div>
  );
}