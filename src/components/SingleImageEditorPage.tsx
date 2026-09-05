/**
 * A small reusable page for single-output image utilities that don't need
 * the full background/transform editor (compressor, converter, cropper, etc.).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { EditorToolbar } from './EditorToolbar';
import { DownloadButton } from './DownloadButton';
import { ResultPanel } from './ResultPanel';
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
              afterLabel="Result"
              beforeStats={{ size: original.size, width: original.img.naturalWidth, height: original.img.naturalHeight, format: original.type }}
              afterStats={{ size: preview.size, width: preview.width, height: preview.height, format: preview.format }}
              actions={<DownloadButton primary={preview} filename={preview.name} />}
            />
          )}
          {footer}
        </div>
        <div className="space-y-4">
          {sidebar({ state, setState: update, original })}
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
      .catch(() => {});
  }, [source, state]);
  return (
    <div className="card overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-auto bg-ink-100 checker-bg" />
    </div>
  );
}
