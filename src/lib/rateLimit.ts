/**
 * Rate limiter — token-bucket per session, persisted in localStorage.
 *
 * Pixcuro is hosted free on GitHub Pages (a static site), so all rate
 * limiting is local. This protects against:
 *   1. Accidental spam-clicks from a single user
 *   2. Browser-based bots abusing the free download pipeline
 *
 * To download more, users must sign in (free) for unlimited daily
 * downloads. Anonymous users get 30 burst + 60/hr refill, capped at
 * 100 downloads per day per browser session.
 */

const STORAGE_KEY = 'pixcuro.rate.v1';
const AUTH_KEY = 'pixcuro.auth.v1';

interface Bucket {
  tokens: number;
  lastRefill: number; // ms epoch
  downloadsToday: number;
  dayKey: string; // YYYY-MM-DD
}

const CAPACITY = 30;          // burst size
const REFILL_PER_HOUR = 60;   // tokens per hour
const DAILY_LIMIT = 100;      // max downloads per day per session
const SIGNED_IN_DAILY_LIMIT = 10000; // effectively unlimited

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function load(): Bucket {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const b = JSON.parse(raw) as Bucket;
      if (b.dayKey !== todayKey()) {
        return { tokens: CAPACITY, lastRefill: Date.now(), downloadsToday: 0, dayKey: todayKey() };
      }
      return b;
    }
  } catch { /* ignore */ }
  return { tokens: CAPACITY, lastRefill: Date.now(), downloadsToday: 0, dayKey: todayKey() };
}

function save(b: Bucket) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(b)); } catch { /* ignore */ }
}

function isSignedIn(): boolean {
  try {
    // Quick sync check for the public auth state. Matches AuthProvider's
    // localStorage key. Avoids importing the full auth module (which is
    // async for Google OAuth) just for a boolean.
    const raw = localStorage.getItem(AUTH_KEY) || localStorage.getItem('pixcuro.session.v1');
    return raw !== null && raw !== 'null';
  } catch { return false; }
}

/** Try to consume one token. Returns true on success. */
export function tryConsumeDownloadToken(): boolean {
  const signedIn = isSignedIn();
  const b = load();
  // Refill
  const elapsedHours = (Date.now() - b.lastRefill) / (1000 * 60 * 60);
  const refilled = Math.min(CAPACITY, b.tokens + elapsedHours * REFILL_PER_HOUR);
  b.tokens = refilled;
  b.lastRefill = Date.now();
  if (b.tokens < 1) return false;
  const effectiveLimit = signedIn ? SIGNED_IN_DAILY_LIMIT : DAILY_LIMIT;
  if (b.downloadsToday >= effectiveLimit) return false;
  b.tokens -= 1;
  b.downloadsToday += 1;
  save(b);
  return true;
}

export function getUsage(): { downloadsToday: number; remainingToday: number; bucketFull: boolean; signedIn: boolean } {
  const signedIn = isSignedIn();
  const b = load();
  const elapsedHours = (Date.now() - b.lastRefill) / (1000 * 60 * 60);
  const tokens = Math.min(CAPACITY, b.tokens + elapsedHours * REFILL_PER_HOUR);
  const effectiveLimit = signedIn ? SIGNED_IN_DAILY_LIMIT : DAILY_LIMIT;
  return {
    downloadsToday: b.downloadsToday,
    remainingToday: Math.max(0, effectiveLimit - b.downloadsToday),
    bucketFull: tokens < 1,
    signedIn,
  };
}

export const RATE_LIMITS = {
  DAILY_LIMIT,
  HOURLY_REFILL: REFILL_PER_HOUR,
  BURST: CAPACITY,
  SIGNED_IN_DAILY_LIMIT,
};
