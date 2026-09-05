/**
 * A reusable page that wraps the standard editor flow:
 *   upload → editor (background, transforms, filters, watermark, output) → preview → download.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { EmptyState } from './Primitives';
import { BackgroundEditor } from './BackgroundEditor';
import { EditorToolbar } from './EditorToolbar';
import { DownloadButton } from './DownloadButton';
import { ResultPanel } from './ResultPanel';
import {
  buildDefaultState,
  renderEditor,
  type EditorState,
} from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';
import { useEditorSession } from '../lib/useEditorSession';

export interface EditorPageProps {
  title: string;
  intro: string;
  defaultMode?: 'transparent' | 'solid';
  defaultColor?: string;
  showTransform?: boolean;
  showFilters?: boolean;
  showWatermark?: boolean;
  defaultFormat?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export function EditorPage({
  title,
  intro,
  defaultMode = 'transparent',
  defaultColor = '#ffffff',
  showTransform = true,
  showFilters = true,
  showWatermark = true,
  defaultFormat = 'image/png',
}: EditorPageProps) {
  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);

  const initialForImage = useMemo<EditorState | null>(() => {
    if (!original) return null;
    return {
      ...buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name.replace(/\.[^.]+$/, '')),
      background: {
        ...buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name).background,
        mode: defaultMode,
        color: defaultColor,
      },
      output: {
        ...buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name).output,
        format: defaultFormat,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [original]);

  // When the image changes, force the default state.
  useEffect(() => {
    if (initialForImage && state && state.sourceWidth === initialForImage.sourceWidth && state.background.mode !== defaultMode) {
      update((s) => ({ ...s, background: { ...s.background, mode: defaultMode, color: defaultColor }, output: { ...s.output, format: defaultFormat } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialForImage]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load file');
    }
  }, [loadFile, setError, preview]);

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
          <PreviewCanvas source={original.img} state={state} onRender={(_, blob) => {
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
              afterLabel="Result"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
        </div>
        <div className="space-y-4">
          <BackgroundEditor
            state={state}
            onChange={(next) => update(next)}
            showFilters={showFilters}
            showTransform={showTransform}
            showWatermark={showWatermark}
          />
          <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewCanvas({ source, state, onRender }: { source: HTMLImageElement; state: EditorState; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const token = useRef(0);

  useEffect(() => {
    if (!source) return;
    const t = ++token.current;
    setRendering(true);
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
      .catch(() => {})
      .finally(() => {
        if (t === token.current) setRendering(false);
      });
  }, [source, state]);

  if (!source) return <EmptyState title="Upload an image" description="Drag, click, or paste an image to begin." />;

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
