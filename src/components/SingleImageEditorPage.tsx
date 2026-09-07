/**
 * A small reusable page for single-output image utilities that don't need
 * the full background/transform editor (compressor, converter, cropper, etc.).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { EditorToolbar } from './EditorToolbar';
import { DownloadButton } from './DownloadButton';
import { ResultPanel } from './ResultPanel';
import { BeforeAfter } from './Primitives';
import { useEditorSession } from '../lib/useEditorSession';
import {
  type EditorState,
  renderEditor,
} from '../lib/editor';
import { type ProcessResult } from '../lib/imageOps';

interface BaseEditorPageProps {
  title: string;
  intro: string;
  defaultFormat?: 'image/png' | 'image/jpeg' | 'image/webp';
  defaultQuality?: number;
  /** Extra sidebar controls (rendered below the upload state) */
  sidebar: (args: {
    state: EditorState;
    setState: (s: EditorState | ((prev: EditorState) => EditorState)) => void;
    original: { img: HTMLImageElement; name: string; type: string; size: number };
  }) => React.ReactNode;
  /** Optional footer below the result panel */
  footer?: React.ReactNode;
}

export function SingleImageEditorPage({ title, intro, defaultFormat = 'image/png', defaultQuality = 0.92, sidebar, footer }: BaseEditorPageProps) {
  const { original, state, update, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo } = useEditorSession();
  const [preview, setPreview] = useState<ProcessResult | null>(null);

  // Apply defaults whenever the loaded image changes or defaults change
  useEffect(() => {
    if (state) update((s) => ({ ...s, output: { ...s.output, format: defaultFormat, quality: defaultQuality } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFormat, defaultQuality, state?.sourceWidth]);

  const onSelect = useCallback(async (file: File) => {
    setError(null);
    try {
      await loadFile(file);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load image');
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
          {sidebar({ state, setState: update, original })}
        </div>

        {/* 3. COMPACT RESULT PANEL - File summary + single download button */}
        {preview && (
          <ResultPanel
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

        <button type="button" className="btn-secondary w-full" onClick={() => { if (preview?.url) URL.revokeObjectURL(preview.url); setPreview(null); clear(); }}>Start over</button>
        {footer}
      </div>
    </div>
  );
}

function LivePreview({ source, state, originalUrl, onRender }: { source: HTMLImageElement; state: EditorState; originalUrl: string; onRender: (c: HTMLCanvasElement, b: Blob) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const token = useRef(0);
  useEffect(() => {
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
  if (!source) return <div className="card aspect-video flex items-center justify-center text-ink-500 text-sm">Upload an image to see the preview</div>;

  return (
    <div className="card relative overflow-hidden">
      {/* Full-height Before/After slider with the rendered result */}
      <BeforeAfter
        before={originalUrl}
        after={canvasRef.current ? canvasRef.current.toDataURL() : originalUrl}
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