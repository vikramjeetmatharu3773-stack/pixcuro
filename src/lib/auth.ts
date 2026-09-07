/**
 * Auth client — Supabase-based Google OAuth.
 *
 * Why Supabase: free tier includes Google OAuth, JWT verification, and a
 * PostgreSQL row-level security model. The Pixcuro server doesn't store user
 * images — Supabase only authenticates and authorizes downloads.
 *
 * For static hosting, we use the Supabase JS client directly. The anon key
 * is safe to ship in the browser bundle because row-level security prevents
 * abuse; download authorization is gated by a signed-URL flow that requires
 * an authenticated user.
 *
 * IMPORTANT: For full security, Vercel deploys set SUPABASE_URL and
 * SUPABASE_ANON_KEY. Without them, the auth flow degrades gracefully
 * (anonymous downloads are still possible for local dev only).
 */

export interface Session {
  userId: string;
  email: string | null;
  displayName: string | null;
  /** ISO timestamp the session expires at */
  expiresAt: string;
  /** Short-lived JWT to present for protected actions */
  accessToken: string;
}

const SESSION_KEY = 'pixcuro.session.v1';
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '';

export const AUTH_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Read the current session from localStorage (if any). */
export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (new Date(parsed.expiresAt).getTime() < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Save the session. Called after a successful OAuth round-trip. */
export function setSession(s: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Begin Google OAuth via Supabase.
 *
 * In dev (no Supabase configured), this throws a clear error so the UI can
 * surface a "sign-in is not configured yet" message.
 */
export async function signInWithGoogle(): Promise<void> {
  if (!AUTH_CONFIGURED) {
    throw new Error(
      'Sign-in is not configured for this build. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
  // We use Supabase's hosted signInWithOAuth. The redirect target is the
  // current page so we capture the hash fragment in /auth/callback.
  const redirectTo = `${window.location.origin}/auth/callback`;
  const url = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  window.location.assign(url);
}

/**
 * Exchange the OAuth callback hash for a session. Called from /auth/callback.
 */
export async function completeOAuthCallback(): Promise<Session | null> {
  if (!AUTH_CONFIGURED) return null;
  // The hash contains access_token, refresh_token, expires_in, etc.
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const access_token = params.get('access_token');
  const expires_in = parseInt(params.get('expires_in') ?? '3600', 10);
  if (!access_token) return null;
  // Fetch user profile
  const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${access_token}`, apikey: SUPABASE_ANON_KEY },
  });
  if (!resp.ok) return null;
  const user = await resp.json();
  const session: Session = {
    userId: user.id,
    email: user.email ?? null,
    displayName: (user.user_metadata?.full_name as string | undefined) ?? user.email ?? null,
    expiresAt: new Date(Date.now() + expires_in * 1000).toISOString(),
    accessToken: access_token,
  };
  setSession(session);
  return session;
}
