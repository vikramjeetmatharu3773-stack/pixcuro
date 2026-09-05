import { useCallback, useRef, useState } from 'react';
import type { EditorState } from './editor';
import { buildDefaultState } from './editor';
import { fileToImage } from './imageOps';

export interface LoadedImage {
  img: HTMLImageElement;
  url: string;
  size: number;
  name: string;
  type: string;
}

/**
 * useEditorSession — bundles image loading, undo/redo state, and the
 * latest preview blob for a single-image editor page.
 */
export function useEditorSession() {
  const [original, setOriginal] = useState<LoadedImage | null>(null);
  const [state, setState] = useState<EditorState | null>(null);
  const past = useRef<EditorState[]>([]);
  const future = useRef<EditorState[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCanFlags = useCallback(() => {
    setCanUndo(past.current.length > 0);
    setCanRedo(future.current.length > 0);
  }, []);

  const loadFile = useCallback(
    async (file: File) => {
      setError(null);
      try {
        const url = URL.createObjectURL(file);
        const img = await fileToImage(file);
        const loaded: LoadedImage = { img, url, size: file.size, name: file.name, type: file.type };
        setOriginal(loaded);
        setState(buildDefaultState(img.naturalWidth, img.naturalHeight, file.name.replace(/\.[^.]+$/, '')));
        past.current = []; future.current = [];
        updateCanFlags();
        return loaded;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load image');
        throw e;
      }
    },
    [updateCanFlags],
  );

  const update = useCallback((u: EditorState | ((p: EditorState) => EditorState)) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = typeof u === 'function' ? u(prev) : u;
      if (Object.is(next, prev)) return prev;
      past.current.push(structuredClone(prev));
      if (past.current.length > 50) past.current.shift();
      future.current = [];
      updateCanFlags();
      return next;
    });
  }, [updateCanFlags]);

  const replace = useCallback((next: EditorState | null) => {
    setState(next);
    past.current = []; future.current = [];
    updateCanFlags();
  }, [updateCanFlags]);

  const undo = useCallback(() => {
    setState((prev) => {
      if (!prev || past.current.length === 0) return prev;
      const previous = past.current.pop()!;
      future.current.unshift(structuredClone(prev));
      if (future.current.length > 50) future.current.pop();
      updateCanFlags();
      return previous;
    });
  }, [updateCanFlags]);

  const redo = useCallback(() => {
    setState((prev) => {
      if (!prev || future.current.length === 0) return prev;
      const next = future.current.shift()!;
      past.current.push(structuredClone(prev));
      if (past.current.length > 50) past.current.shift();
      updateCanFlags();
      return next;
    });
  }, [updateCanFlags]);

  const reset = useCallback(() => {
    if (!original) return;
    setState(buildDefaultState(original.img.naturalWidth, original.img.naturalHeight, original.name.replace(/\.[^.]+$/, '')));
    past.current = []; future.current = [];
    updateCanFlags();
  }, [original, updateCanFlags]);

  const clear = useCallback(() => {
    if (original) URL.revokeObjectURL(original.url);
    setOriginal(null); setState(null);
    past.current = []; future.current = [];
    updateCanFlags();
  }, [original, updateCanFlags]);

  return { original, state, setState, update, replace, undo, redo, reset, clear, loadFile, error, setError, canUndo, canRedo };
}
