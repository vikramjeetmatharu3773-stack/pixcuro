import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeOAuthCallback } from '../lib/auth';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await completeOAuthCallback();
        if (cancelled) return;
        if (session) {
          navigate('/', { replace: true });
        } else {
          setError('Could not complete sign-in. Please try again.');
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Sign-in failed');
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="container-narrow py-20 text-center">
      {error ? (
        <div className="card p-8 max-w-md mx-auto">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-xl text-ink-900">Sign-in failed</h1>
          <p className="mt-2 text-sm text-ink-600">{error}</p>
          <a className="btn-primary mt-5 inline-flex" href={import.meta.env.BASE_URL}>Go home</a>
        </div>
      ) : (
        <div className="card p-8 max-w-md mx-auto">
          <div className="mx-auto w-10 h-10 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
          <p className="mt-4 text-sm text-ink-700">Completing sign-in…</p>
        </div>
      )}
    </div>
  );
}
