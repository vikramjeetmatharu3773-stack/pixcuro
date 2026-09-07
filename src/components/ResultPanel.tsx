import { type ReactNode } from 'react';
import { formatBytes } from '../lib/imageOps';

interface ResultPanelProps {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeStats: { size: number; width: number; height: number; format?: string };
  afterStats: { size: number; width: number; height: number; format?: string };
  actions: ReactNode;
  note?: ReactNode;
}

/**
 * Compact result panel — single combined stats row + download action.
 * Merged into a tight, single-section layout to save vertical space.
 */
export function ResultPanel({
  beforeLabel = 'Original',
  afterLabel = 'Result',
  beforeStats,
  afterStats,
  actions,
  note,
}: ResultPanelProps) {
  const saved =
    beforeStats.size > 0 && afterStats.size <= beforeStats.size
      ? Math.max(0, (1 - afterStats.size / beforeStats.size) * 100)
      : 0;

  return (
    <section className="card p-3 animate-fade-in space-y-2" aria-label="Result">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Compact stats row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="font-medium text-ink-900 truncate">
            {beforeLabel}: {formatBytes(beforeStats.size)} ({beforeStats.width}×{beforeStats.height})
          </div>
          <div className="text-ink-400">→</div>
          <div className="font-semibold text-brand-700 truncate">
            {afterLabel}: {formatBytes(afterStats.size)} ({afterStats.width}×{afterStats.height})
          </div>
          {saved > 0 && (
            <span className="font-bold text-green-700">{saved.toFixed(0)}% saved</span>
          )}
        </div>

        {/* Combined action area */}
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </div>
      {note && <div className="text-[10px] text-ink-500">{note}</div>}
    </section>
  );
}
