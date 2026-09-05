import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { formatBytes, type ProcessResult } from '../lib/imageOps';
import { downloadPdf } from '../lib/pdf';

export type DownloadFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface DownloadButtonProps {
  /** Primary result (typically the most appropriate single format) */
  primary: ProcessResult;
  /** Optional secondary results in other formats — enables a dropdown menu */
  alternates?: Partial<Record<DownloadFormat, ProcessResult>>;
  /** PDF alternative for sheet-style outputs */
  pdf?: { filename: string; build: () => Promise<{ images: Parameters<typeof downloadPdf>[1]; opts: Parameters<typeof downloadPdf>[2] }> };
  /** Filename for direct download */
  filename?: string;
  /** Variant style */
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  /** Optional label override */
  label?: string;
}

function fmt(format: DownloadFormat): string {
  if (format === 'image/png') return 'PNG';
  if (format === 'image/jpeg') return 'JPG';
  return 'WebP';
}

function fmtDesc(format: DownloadFormat): string {
  if (format === 'image/png') return 'Best for transparent background';
  if (format === 'image/jpeg') return 'Smaller file size';
  return 'Modern format, great compression';
}

export function DownloadButton({
  primary,
  alternates = {},
  pdf,
  filename,
  variant = 'primary',
  size = 'lg',
  label,
}: DownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  const altEntries = Object.entries(alternates).filter(([, v]) => !!v) as [DownloadFormat, ProcessResult][];
  const hasMenu = altEntries.length > 0 || !!pdf;
  const sizeClasses = size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm';
  const variantClasses = variant === 'primary'
    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft'
    : 'bg-white text-ink-900 border border-ink-200 hover:bg-ink-50';

  const triggerDownload = async (result: ProcessResult) => {
    setBusy(true);
    try {
      const name = filename ?? result.name;
      saveAs(result.blob, name);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  const triggerPdf = async () => {
    if (!pdf) return;
    setBusy(true);
    try {
      const { images, opts } = await pdf.build();
      await downloadPdf(pdf.filename, images, opts);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  if (!hasMenu) {
    return (
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-50 ${sizeClasses} ${variantClasses}`}
        onClick={() => triggerDownload(primary)}
        disabled={busy}
        aria-label={`Download ${label ?? 'result'}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {label ?? `Download ${fmt(primary.format as DownloadFormat)}`}
      </button>
    );
  }

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-l-xl font-semibold transition-colors disabled:opacity-50 ${sizeClasses} ${variantClasses}`}
        onClick={() => triggerDownload(primary)}
        disabled={busy}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {label ?? `Download ${fmt(primary.format as DownloadFormat)}`}
      </button>
      <button
        type="button"
        aria-label="More download options"
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center justify-center px-2 rounded-r-xl border-l border-white/20 disabled:opacity-50 ${sizeClasses} ${variantClasses}`}
        onClick={() => setOpen((v) => !v)}
        disabled={busy}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-white border border-ink-200 shadow-lg overflow-hidden z-20 animate-slide-up"
        >
          <div className="p-2">
            <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide text-ink-500 font-medium">Download as</p>
            {[primary, ...altEntries.map(([, r]) => r)].map((r) => (
              <button
                type="button"
                key={r.format + r.size}
                role="menuitem"
                className="w-full flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-ink-50 text-left"
                onClick={() => triggerDownload(r)}
              >
                <span className="w-10 text-xs font-bold text-brand-700 mt-0.5">{fmt(r.format as DownloadFormat)}</span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink-900">{fmtDesc(r.format as DownloadFormat)}</span>
                  <span className="block text-xs text-ink-500">{formatBytes(r.size)} · {r.width}×{r.height}</span>
                </span>
              </button>
            ))}
            {pdf && (
              <>
                <div className="my-1 mx-3 border-t border-ink-100" />
                <button
                  type="button"
                  role="menuitem"
                  className="w-full flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-ink-50 text-left"
                  onClick={triggerPdf}
                >
                  <span className="w-10 text-xs font-bold text-red-700 mt-0.5">PDF</span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">Printable document</span>
                    <span className="block text-xs text-ink-500">Best for printing the photo sheet</span>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
