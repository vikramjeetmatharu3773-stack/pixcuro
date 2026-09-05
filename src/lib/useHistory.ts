import { useCallback, useRef, useState } from 'react';

/**
 * useHistory — generic undo/redo stack for arbitrary state.
 * Snapshots are deep-cloned on push to keep the stack immutable.
 *
 * Accepts either a T or a T | null initial value. When T is nullable,
 * the updater function can short-circuit by returning null.
 */
export function useHistory<T>(initial: T, max = 50) {
  const [state, setState] = useState<T>(initial);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const last = useRef<T>(initial);

  const set = useCallback(
    (next: T | ((prev: T) => T | null) | null) => {
      setState((prev) => {
        if (typeof next === 'function') {
          const value = (next as (p: T) => T | null)(prev);
          if (value === null) return prev;
          if (Object.is(value, last.current)) return prev;
          past.current.push(structuredClone(last.current));
          if (past.current.length > max) past.current.shift();
          future.current = [];
          last.current = value as T;
          return value as T;
        }
        if (next === null) return prev;
        if (Object.is(next, last.current)) return prev;
        past.current.push(structuredClone(last.current));
        if (past.current.length > max) past.current.shift();
        future.current = [];
        last.current = next;
        return next;
      });
    },
    [max],
  );

  const replace = useCallback((next: T) => {
    setState(next);
    last.current = next;
    past.current = [];
    future.current = [];
  }, []);

  const undo = useCallback(() => {
    if (past.current.length === 0) return;
    const prev = past.current.pop()!;
    future.current.push(structuredClone(last.current));
    last.current = prev;
    setState(prev);
  }, []);

  const redo = useCallback(() => {
    if (future.current.length === 0) return;
    const next = future.current.pop()!;
    past.current.push(structuredClone(last.current));
    last.current = next;
    setState(next);
  }, []);

  const reset = useCallback(
    (value?: T) => {
      const v = (value !== undefined ? value : initial) as T;
      setState(v);
      last.current = v;
      past.current = [];
      future.current = [];
    },
    [initial],
  );

  return {
    state,
    set,
    replace,
    undo,
    redo,
    reset,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  };
}
