import { useEffect, useRef, useState } from 'react';
import { renderEditor } from '../lib/editor';

interface EditorPreviewProps {
  /** Source image (e.g., original upload or background-removed foreground) */
  source: HTMLImageElement | null;
  /** Background-removal foreground (when applicable) */
  foreground: HTMLImageElement | null;
  /** Editor state */
  state: import('../lib/editor').EditorState;
  /** Notify parent when render is complete */
  onRender?: (canvas: HTMLCanvasElement, blob: Blob) => void;
  /** Disable controls while busy */
  busy?: boolean;
}

export function EditorPreview({ source, foreground, state, onRender, busy }: EditorPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);
  const renderToken = useRef(0);

  useEffect(() => {
    if (!source) return;
    const token = ++renderToken.current;
    setRendering(true);
    renderEditor(source, foreground, state, {
      onProgress: () => {},
    })
      .then(({ canvas, blob }) => {
        if (token !== renderToken.current) return;
        if (canvasRef.current) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(canvas, 0, 0);
        }
        onRender?.(canvas, blob);
      })
      .catch(() => {})
      .finally(() => {
        if (token === renderToken.current) setRendering(false);
      });
  }, [source, foreground, state, onRender]);

  if (!source) {
    return (
      <div className="card aspect-video flex items-center justify-center text-ink-500 text-sm">
        Upload an image to see the preview
      </div>
    );
  }

  return (
    <div className="card relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-auto bg-ink-100 checker-bg"
        aria-label="Editor preview"
      />
      {(rendering || busy) && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center text-sm text-ink-700 font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
            Rendering…
          </span>
        </div>
      )}
    </div>
  );
}
