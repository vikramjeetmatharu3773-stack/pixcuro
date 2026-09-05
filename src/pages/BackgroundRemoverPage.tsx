import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { BeforeAfter, ProgressBar } from '../components/Primitives';
import { BackgroundEditor } from '../components/BackgroundEditor';
import { EditorToolbar } from '../components/EditorToolbar';
import { DownloadButton } from '../components/DownloadButton';
import { ResultPanel } from '../components/ResultPanel';
import {
  buildDefaultState,
  renderEditor,
  type EditorState,
} from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';
import { removeImageBackground } from '../lib/backgroundRemoval';
import { useEditorSession } from '../lib/useEditorSession';

const TOOL = TOOL_BY_PATH['/background-remover'];

export function BackgroundRemoverPage() {
  const tool = TOOL;
  usePageMeta({
    title: tool?.title,
    description: tool?.description,
    path: '/background-remover',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Background Remover',
      url: `${SITE.url}/background-remover`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: tool?.description,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [original, setOriginal] = useState<{ img: HTMLImageElement; url: string; size: number; type: string; name: string } | null>(null);
  const [fgImg, setFgImg] = useState<HTMLImageElement | null>(null);
  const [fgMeta, setFgMeta] = useState<{ width: number; height: number; size: number; url: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ProcessResult | null>(null);

  const editor = useEditorSession();
  const { state, update, undo, redo, reset, canUndo, canRedo } = editor;

  // Initialize editor state once we have a foreground
  useEffect(() => {
    if (!fgImg || !original) return;
    const initial = buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name.replace(/\.[^.]+$/, ''));
    editor.replace(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fgImg]);

  const runBackgroundRemoval = useCallback(async (file: File) => {
    setError(null);
    setProcessing(true);
    setProgress(0);
    setFgImg(null);
    setFgMeta(null);
    try {
      const url = URL.createObjectURL(file);
      const orig = new Image();
      await new Promise<void>((resolve, reject) => { orig.onload = () => resolve(); orig.onerror = () => reject(); orig.src = url; });
      setOriginal({ img: orig, url, size: file.size, type: file.type, name: file.name });

      const result = await removeImageBackground(file, setProgress);
      const fg = new Image();
      await new Promise<void>((resolve, reject) => { fg.onload = () => resolve(); fg.onerror = () => reject(); fg.src = result.url; });
      setFgImg(fg);
      setFgMeta({ width: result.width, height: result.height, size: result.size, url: result.url });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Background removal failed');
    } finally {
      setProcessing(false);
    }
  }, []);

  // Auto-handle file passed from the homepage
  useEffect(() => {
    const state = location.state as { file?: File } | null;
    if (state?.file && !original) {
      runBackgroundRemoval(state.file);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, original, runBackgroundRemoval]);

  const onUpload = useCallback((file: File) => {
    runBackgroundRemoval(file);
  }, [runBackgroundRemoval]);

  if (!state || !original || !fgImg || !fgMeta) {
    return (
      <div className="container-narrow py-10">
        <header className="max-w-2xl mb-6">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{tool?.title}</h1>
          <p className="text-ink-700 mt-2">{tool?.intro}</p>
        </header>
        <ImageUploader onSelect={onUpload} onError={(m) => setError(m)} />
        {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">{error}</p>}
        <ProcessingBlock processing={processing} progress={progress} />
        <FeatureHighlights />
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{tool?.title}</h1>
        <p className="text-ink-700 mt-2">{tool?.intro}</p>
      </header>

      <ProcessingBlock processing={processing} progress={progress} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <EditorPreview
            source={fgImg}
            foreground={fgImg}
            state={state}
            onRender={(_, blob) => {
              if (preview?.url) URL.revokeObjectURL(preview.url);
              const url = URL.createObjectURL(blob);
              const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
              setPreview({ blob, url, width: state.output.width, height: state.output.height, size: blob.size, format: state.output.format, name: `${state.output.filename}.${ext}` });
            }}
          />
          <EditorToolbar
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={undo}
            onRedo={redo}
            onReset={reset}
          />

          {fgMeta && (
            <BeforeAfter
              before={original.url}
              after={preview?.url ?? fgMeta.url}
              beforeLabel="Original"
              afterLabel="Removed"
            />
          )}

          {preview && (
            <ResultPanel
              before={original.url}
              after={preview.url}
              beforeLabel="Original"
              afterLabel="Result"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={
                <DownloadButton
                  primary={preview}
                  filename={preview.name}
                />
              }
            />
          )}
        </div>
        <div className="space-y-4">
          <BackgroundEditor
            state={state}
            onChange={(next) => update(next)}
            showFilters
            showTransform
            showWatermark
          />
          <button
            type="button"
            className="btn-secondary w-full"
            onClick={() => {
              if (original?.url) URL.revokeObjectURL(original.url);
              if (fgMeta?.url) URL.revokeObjectURL(fgMeta.url);
              if (preview?.url) URL.revokeObjectURL(preview.url);
              setOriginal(null);
              setFgImg(null);
              setFgMeta(null);
              setPreview(null);
              editor.clear();
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

function EditorPreview({ source, foreground, state, onRender }: { source: HTMLImageElement | null; foreground: HTMLImageElement | null; state: EditorState; onRender: (canvas: HTMLCanvasElement, blob: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const token = useRef(0);

  useEffect(() => {
    if (!source) return;
    const t = ++token.current;
    setRendering(true);
    renderEditor(source, foreground, state)
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
      .catch(() => {})
      .finally(() => {
        if (t === token.current) setRendering(false);
      });
  }, [source, foreground, state]);

  if (!source) return <div className="card aspect-video flex items-center justify-center text-ink-500 text-sm">Upload an image to see the preview</div>;

  return (
    <div className="card relative overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-auto bg-ink-100 checker-bg" />
      {rendering && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center text-sm text-ink-700 font-medium pointer-events-none">
          Rendering…
        </div>
      )}
    </div>
  );
}

function ProcessingBlock({ processing, progress }: { processing: boolean; progress: number }) {
  if (!processing) return null;
  return (
    <div className="card p-5 my-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
        <p className="text-sm text-ink-800 font-medium">
          {progress < 0.2
            ? 'Loading background-removal model…'
            : progress < 0.5
            ? 'Model loaded. Removing background…'
            : 'Finishing up…'}
        </p>
      </div>
      <ProgressBar value={progress} label="Progress" />
      <p className="text-xs text-ink-500">First run downloads a small model to your browser cache. Later runs are instant.</p>
    </div>
  );
}

function FeatureHighlights() {
  return (
    <div className="grid sm:grid-cols-3 gap-3 mt-8">
      {[
        { title: 'Transparent PNG', text: 'Output a clean PNG with alpha so you can drop it on any background.' },
        { title: 'Then change it', text: 'After removing the background, change it to any color or image you want.' },
        { title: 'Local processing', text: 'Your image never leaves your device. No tracking, no uploads.' },
      ].map((f) => (
        <div key={f.title} className="card p-5">
          <h3 className="font-display font-bold text-base text-ink-900">{f.title}</h3>
          <p className="mt-1 text-sm text-ink-600">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
