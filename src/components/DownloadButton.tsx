import { useEffect, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { tryConsumeDownloadToken, getUsage, RATE_LIMITS } from '../lib/rateLimit';
import { formatBytes, type ProcessResult } from '../lib/imageOps';
import { downloadPdf } from '../lib/pdf';
import { SignInPrompt } from './SignInPrompt';
import { useAuth } from './AuthProvider';

export type DownloadFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface DownloadButtonProps {
  primary: ProcessResult;
  alternates?: Partial<Record<DownloadFormat, ProcessResult>>;
  pdf?: { filename: string; build: () => Promise<{ images: Parameters<typeof downloadPdf>[1]; opts: Parameters<typeof downloadPdf>[2] }> };
  filename?: string;
  variant?: 'primary' | 'secondary';
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

/**
 * Detect likely automated/bot usage patterns:
 *  - Headless browser fingerprints
 *  - WebDriver / Selenium markers
 *  - Missing / inconsistent language
 *  - Abnormal touch + no mouse (very common in bots)
 *
 * Soft-block: the prompt still allows manual override via sign-in
 * since legitimate users on locked-down corporate machines can trip
 * some signals too.
 */
function isLikelyBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const w = window as any;
  const signals: boolean[] = [
    /HeadlessChrome|Puppeteer|PhantomJS|Selenium|Playwright/i.test(ua),
    !!w.document?.documentElement?.getAttribute('webdriver'),
    !!w.callPhantom || !!w._phantom,
    (navigator.languages?.length ?? 0) === 0,
  ];
  // Only flag if 2+ signals to avoid false positives
  return signals.filter(Boolean).length >= 2;
}

export function DownloadButton({
  primary,
  alternates = {},
  pdf,
  filename,
  variant = 'primary',
  label,
}: DownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInReason, setSignInReason] = useState<string>('rate-limit');
  const [limitInfo, setLimitInfo] = useState(getUsage());
  const ref = useRef<HTMLDivElement>(null);
  const { signedIn } = useAuth();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  useEffect(() => {
    setLimitInfo(getUsage());
  }, [signInOpen, signedIn]);

  const altEntries = Object.entries(alternates).filter(([, v]) => !!v) as [DownloadFormat, ProcessResult][];
  const hasMenu = altEntries.length > 0 || !!pdf;

  const sizeClasses = 'px-3 py-2 text-xs';
  const variantClasses = variant === 'primary'
    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft'
    : 'bg-white text-ink-900 border border-ink-200 hover:bg-ink-50';

  const gateDownload = (): boolean => {
    if (isLikelyBot()) {
      setSignInReason('bot-detected');
      setSignInOpen(true);
      return false;
    }
    if (!signedIn) {
      setSignInReason('anonymous');
      setSignInOpen(true);
      return false;
    }
    if (!tryConsumeDownloadToken()) {
      setSignInReason('rate-limit');
      setSignInOpen(true);
      return false;
    }
    return true;
  };

  const triggerDownload = async (result: ProcessResult) => {
    if (!gateDownload()) {
      setOpen(false);
      return;
    }
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
    if (!gateDownload()) {
      setOpen(false);
      return;
    }
    setBusy(true);
    try {
      const { images, opts } = await pdf!.build();
      await downloadPdf(pdf!.filename, images, opts);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  const triggerBtn = (
    onClick: () => void,
    roundedClass: string,
    ariaLabel: string,
    extraClass: string = '',
  ) => (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-50 ${sizeClasses} ${variantClasses} ${roundedClass} ${extraClass}`}
      onClick={onClick}
      disabled={busy}
      aria-label={ariaLabel}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label ?? `Download ${fmt(primary.format as DownloadFormat)}`}
    </button>
  );

  if (!hasMenu) {
    return (
      <>
        {triggerBtn(() => triggerDownload(primary), 'rounded-xl', `Download ${label ?? 'result'}`)}
        <SignInPrompt
          open={signInOpen}
          onClose={() => setSignInOpen(false)}
          reason={signInReason}
          remainingToday={limitInfo.remainingToday}
          dailyLimit={RATE_LIMITS.DAILY_LIMIT}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative inline-flex" ref={ref}>
        {triggerBtn(() => triggerDownload(primary), 'rounded-l-xl', `Download as ${fmt(primary.format as DownloadFormat)}`)}
        <button
          type="button"
          aria-label="More download options"
          aria-expanded={open}
          aria-haspopup="menu"
          className={`inline-flex items-center justify-center px-2 rounded-r-xl border-l border-white/20 disabled:opacity-50 ${sizeClasses} ${variantClasses}`}
          onClick={() => setOpen((v) => !v)}
          disabled={busy}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <SignInPrompt
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        reason={signInReason}
        remainingToday={limitInfo.remainingToday}
        dailyLimit={RATE_LIMITS.DAILY_LIMIT}
      />
    </>
  );
}
