import { useEffect, useState, useRef, type ReactNode } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** If true, render as a full-height comparison slider for the main preview */
  fullHeight?: boolean;
}

export function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After', fullHeight = false }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, ratio)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateFromClientX(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  const containerClass = fullHeight 
    ? "relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-ink-200 bg-ink-100 checker-bg select-none"
    : "relative w-full aspect-video rounded-2xl overflow-hidden border border-ink-200 bg-ink-100 checker-bg select-none";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-ink-700">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ink-400" />
          {beforeLabel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          {afterLabel}
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        </span>
      </div>
      <div
        ref={ref}
        className={containerClass}
        aria-label="Before and after comparison slider"
        role="img"
      >
        {/* After image (full) */}
        <img
          src={after}
          alt={afterLabel}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Before image clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={before}
            alt={beforeLabel}
            draggable={false}
            className="absolute top-0 left-0 h-full w-full object-contain"
            style={{ width: `${(100 / (position || 0.1)) * 100}%`, maxWidth: 'none' }}
          />
        </div>
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />
        {/* Handle */}
        <button
          type="button"
          aria-label="Drag to compare before and after"
          className="absolute top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg border border-ink-200 flex items-center justify-center cursor-ew-resize"
          style={{ left: `${position}%` }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onTouchStart={() => setDragging(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" transform="translate(12,0)" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label = 'Processing' }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className="space-y-1" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <div className="flex justify-between text-xs font-medium text-ink-700">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full bg-brand-500 transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="card p-8 text-center">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
        {icon ?? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
      </div>
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-600 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function FileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink-50 px-3 py-2">
      <div className="text-xs uppercase tracking-wide text-ink-500">{label}</div>
      <div className="text-sm font-semibold text-ink-900 mt-0.5 break-all">{value}</div>
    </div>
  );
}
