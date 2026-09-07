import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AUTH_CONFIGURED, clearSession, getSession, signInWithGoogle, type Session } from '../lib/auth';

interface AuthValue {
  session: Session | null;
  signedIn: boolean;
  configured: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  /** Sign-in is required for downloads */
  requireSignIn: () => boolean;
}

const AuthCtx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => getSession());

  useEffect(() => {
    // Keep state in sync if localStorage changes (e.g. multiple tabs).
    const onStorage = () => setSession(getSession());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signIn = useCallback(async () => {
    await signInWithGoogle();
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const requireSignIn = useCallback(() => Boolean(session), [session]);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      signedIn: Boolean(session),
      configured: AUTH_CONFIGURED,
      signIn,
      signOut,
      requireSignIn,
    }),
    [session, signIn, signOut, requireSignIn],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthValue {
  const v = useContext(AuthCtx);
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>');
  return v;
}
