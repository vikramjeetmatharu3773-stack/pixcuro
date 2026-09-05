interface EditorToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onReset?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  busy?: boolean;
}

export function EditorToolbar({ onUndo, onRedo, onReset, canUndo, canRedo, busy }: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="btn-secondary"
        onClick={onUndo}
        disabled={!canUndo || busy}
        aria-label="Undo last change"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>
        Undo
      </button>
      <button
        type="button"
        className="btn-secondary"
        onClick={onRedo}
        disabled={!canRedo || busy}
        aria-label="Redo change"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></svg>
        Redo
      </button>
      <button
        type="button"
        className="btn-ghost text-red-700 hover:bg-red-50"
        onClick={() => {
          if (window.confirm('Reset all edits? This cannot be undone.')) onReset?.();
        }}
        disabled={busy}
        aria-label="Reset all edits"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
        Reset
      </button>
    </div>
  );
}
