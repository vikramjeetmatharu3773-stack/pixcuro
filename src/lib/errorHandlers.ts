/**
 * Global runtime error catchers.
 *
 * We log silently to the console so the developer sees issues, but the user
 * never sees raw error messages — Pixcuro's UI handles UI-level errors with
 * friendly inline messages (the ErrorBoundary catches render errors).
 *
 * No PII, no image data, no network calls — just structured console output.
 */

export function installGlobalErrorHandlers() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { __pixcuroInstalled?: boolean };
  if (w.__pixcuroInstalled) return;
  w.__pixcuroInstalled = true;

  window.addEventListener('error', (e) => {
    // Avoid leaking stack traces to the user. Log only a sanitized summary.
    // eslint-disable-next-line no-console
    console.warn('[Pixcuro] runtime error:', e.message);
  });

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason instanceof Error ? e.reason.message : String(e.reason);
    // eslint-disable-next-line no-console
    console.warn('[Pixcuro] unhandled rejection:', reason);
  });
}
