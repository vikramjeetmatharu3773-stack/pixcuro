/**
 * A reusable page that wraps the standard editor flow:
 *   upload → editor (background, transforms, filters, watermark, output) → preview → download.
 *
 * New Layout (all pages):
 *  1. Full-height Before/After slider at top (single image preview)
 *  2. Edit tools (EditorToolbar + BackgroundEditor) immediately below - visible without scrolling
 *  3. Compact file summary + single Download button at bottom
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { BackgroundEditor } from './BackgroundEditor';
import { EditorToolbar } from './EditorToolbar';
import { DownloadButton } from './DownloadButton';
import { ResultPanel } from './ResultPanel';
import { ToolEmptyState } from './ToolEmptyState';
import { BeforeAfter } from './Primitives';
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
  description?: string;
  defaultMode?: 'transparent' | 'solid';
  defaultColor?: string;
  showTransform?: boolean;
  showFilters?: boolean;
  showWatermark?: boolean;
  defaultFormat?: 'image/png' | 'image/jpeg' | 'image/webp';
  category?: 'remove' | 'id' | 'compress' | 'resize' | 'convert' | 'edit' | 'batch';
  badge?: string;
  faqs?: { q: string; a: string }[];
}

export function EditorPage({
  title,
  intro,
  description,
  defaultMode = 'transparent',
  defaultColor = '#ffffff',
  showTransform = true,
  showFilters = true,
  showWatermark = true,
  defaultFormat = 'image/png',
  category,
  badge,
  faqs,
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
      <ToolEmptyState
        title={title}
        intro={intro}
        description={description}
        badge={badge}
        category={category}
        features={[
          { title: 'Private by design', text: 'Every image is processed locally in your browser. Nothing is ever uploaded.' },
          { title: 'Live preview', text: 'Changes update instantly as you tweak settings — no waiting on a server.' },
          { title: 'No quality loss', text: 'You stay in control: pick the format, the quality, and the output dimensions.' },
        ]}
        faqs={faqs}
        upload={<ImageUploader onSelect={onSelect} onError={(m) => setError(m)} />}
        error={error}
      />
    );
  }

  return (
    <div className="container-wide py-6 sm:py-8 pb-24 lg:pb-8">
      <header className="max-w-2xl mb-4 sm:mb-6">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink-900">{title}</h1>
        <p className="mt-2 text-sm sm:text-base text-ink-700">{intro}</p>
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
          <BackgroundEditor
            state={state}
            onChange={(next) => update(next)}
            showFilters={showFilters}
            showTransform={showTransform}
            showWatermark={showWatermark}
          />
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
            note={<p className="text-xs text-ink-500">Downloads are rate-limited to prevent abuse. Your images are never uploaded.</p>}
          />
        )}

        {/* Start over button */}
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => {
            if (preview?.url) URL.revokeObjectURL(preview.url);
            setPreview(null);
            clear();
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
  state, 
  originalUrl,
  onRender, 
}: { 
  source: HTMLImageElement; 
  state: EditorState; 
  originalUrl: string;
  onRender: (canvas: HTMLCanvasElement, blob: Blob) => void;
}) {
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