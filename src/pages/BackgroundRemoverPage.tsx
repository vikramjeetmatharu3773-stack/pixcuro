import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SITE, TOOL_BY_PATH } from '../lib/site';
import { usePageMeta } from '../lib/usePageMeta';
import { ImageUploader } from '../components/ImageUploader';
import { ToolEmptyState } from '../components/ToolEmptyState';
import { ProgressBar } from '../components/Primitives';
import { BackgroundEditor } from '../components/BackgroundEditor';
import { EditorToolbar } from '../components/EditorToolbar';
import { DownloadButton } from '../components/DownloadButton';
import { ResultPanel } from '../components/ResultPanel';
import { BeforeAfter } from '../components/Primitives';
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
      <ToolEmptyState
        title={tool?.title ?? 'Background Remover'}
        intro={tool?.intro ?? ''}
        description="Drop a JPG, PNG or WebP photo and get a clean transparent PNG. The AI model runs locally in your browser — the photo never leaves your device. Sign in (free, Google) to download. After removing the background you can replace it with any solid color, gradient, or uploaded image — all in one continuous editor."
        badge="Most popular"
        category="remove"
        features={[
          { title: 'Transparent PNG output', text: 'Get a clean alpha-channel PNG ready to drop on any new background.' },
          { title: 'Local AI model', text: 'The model runs in your browser via WebAssembly. No upload, no waiting on a server.' },
          { title: 'Built-in editor', text: 'After removal, change the background color or replace it with any image — without re-uploading.' },
        ]}
        faqs={[
          { q: 'What image formats are supported?', a: 'Input: PNG, JPG, WebP, BMP and GIF up to 25 MB. Output is a transparent PNG; you can also export JPG or WebP from the editor.' },
          { q: 'Does the image leave my device?', a: 'No. Background removal runs entirely in your browser. The only network request is the one-time download of the AI model (~40 MB) on your first use.' },
          { q: 'How accurate is the cut-out?', a: 'The model handles clean product photos, portraits and logos very well. Hair and fur are usually clean. Very busy backgrounds may need manual cleanup.' },
          { q: 'Can I remove the background from many images at once?', a: 'Yes — open the Batch Compress / Batch Convert pages or use the editor to apply the same change to multiple files.' },
        ]}
        upload={<ImageUploader onSelect={onUpload} onError={(m) => setError(m)} />}
        error={error}
        processing={
          processing ? (
            <div className="card p-5 space-y-3">
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
          ) : null
        }
      />
    );
  }

  return (
    <div className="container-wide py-8">
      <header className="max-w-2xl mb-6">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900">{tool?.title}</h1>
        <p className="text-ink-700 mt-2">{tool?.intro}</p>
      </header>

      <ProcessingBlock processing={processing} progress={progress} />

      <div className="space-y-5">
        {/* 1. MAIN PREVIEW - Full height Before/After slider */}
        <LivePreview
          source={fgImg}
          foreground={fgImg}
          state={state}
          originalUrl={original.url}
          onRender={(_, blob) => {
            if (preview?.url) URL.revokeObjectURL(preview.url);
            const url = URL.createObjectURL(blob);
            const ext = state.output.format.split('/')[1].replace('jpeg', 'jpg');
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
          <BackgroundEditor
            state={state}
            onChange={(next) => update(next)}
            showFilters
            showTransform
            showWatermark
          />
        </div>

        {/* 3. COMPACT RESULT PANEL - File summary + single download button */}
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

        {/* Start over button */}
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
  );
}

function LivePreview({ 
  source, 
  foreground, 
  state, 
  originalUrl,
  onRender, 
}: { 
  source: HTMLImageElement | null; 
  foreground: HTMLImageElement | null; 
  state: EditorState; 
  originalUrl: string;
  onRender: (canvas: HTMLCanvasElement, blob: Blob) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderedUrl, setRenderedUrl] = useState<string>(originalUrl);
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
        setRenderedUrl(canvas.toDataURL());
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
      <BeforeAfter
        before={originalUrl}
        after={renderedUrl}
        beforeLabel="Original"
        afterLabel="Result"
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