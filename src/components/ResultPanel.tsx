import { type ReactNode } from 'react';
import { BeforeAfter, FileStat } from './Primitives';
import { formatBytes } from '../lib/imageOps';

interface ResultPanelProps {
  /** Image to show on the left of the slider (typically the original) */
  before: string;
  /** Image to show on the right (typically the result) */
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Stats for the original */
  beforeStats: { size: number; width: number; height: number; format?: string };
  /** Stats for the result */
  afterStats: { size: number; width: number; height: number; format?: string };
  /** Primary action button area */
  actions: ReactNode;
  /** Optional secondary notes below the stats */
  note?: ReactNode;
}

export function ResultPanel({
  before,
  after,
  beforeLabel = 'Original',
  afterLabel = 'Result',
  beforeStats,
  afterStats,
  actions,
  note,
}: ResultPanelProps) {
  const saved = beforeStats.size > 0 ? Math.max(0, (1 - afterStats.size / beforeStats.size) * 100) : 0;

  return (
    <section className="space-y-5 animate-fade-in" aria-label="Result">
      <BeforeAfter before={before} after={after} beforeLabel={beforeLabel} afterLabel={afterLabel} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">{beforeLabel}</div>
          <div className="grid grid-cols-2 gap-2">
            <FileStat label="Size" value={formatBytes(beforeStats.size)} />
            <FileStat label="Dimensions" value={`${beforeStats.width} × ${beforeStats.height}`} />
            {beforeStats.format && <FileStat label="Format" value={beforeStats.format.replace('image/', '').toUpperCase()} />}
          </div>
        </div>
        <div className="card p-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-500 flex items-center justify-between">
            <span>{afterLabel}</span>
            {saved > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {saved.toFixed(1)}% smaller
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FileStat label="Size" value={formatBytes(afterStats.size)} />
            <FileStat label="Dimensions" value={`${afterStats.width} × ${afterStats.height}`} />
            {afterStats.format && <FileStat label="Format" value={afterStats.format.replace('image/', '').toUpperCase()} />}
          </div>
        </div>
      </div>

      <div className="card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-ink-900">Ready to download</h3>
          <p className="text-sm text-ink-600">Your file is generated locally — nothing was uploaded.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </div>

      {note && <div className="text-sm text-ink-600">{note}</div>}
    </section>
  );
}
