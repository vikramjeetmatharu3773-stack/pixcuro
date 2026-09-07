import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface SignInPromptProps {
  open: boolean;
  onClose: () => void;
  /** What the user wanted to do, shown in the modal */
  reason?: 'anonymous' | 'rate-limit' | 'bot-detected' | string;
  /** Remaining free downloads today */
  remainingToday?: number;
  /** Daily free limit */
  dailyLimit?: number;
}

const REASON_COPY: Record<string, { title: string; subtitle: string }> = {
  'anonymous': {
    title: 'Sign in to download',
    subtitle: 'Create a free account in seconds to download your edited image. All processing still happens in your browser — we just need to verify you are human.',
  },
  'rate-limit': {
    title: 'Daily limit reached',
    subtitle: 'You have used all your free downloads for today. Sign in to unlock unlimited daily downloads, with no upload ever.',
  },
  'bot-detected': {
    title: 'Verify you are human',
    subtitle: 'We detected automated traffic from this browser. Sign in with a free account to confirm you are a real user and continue.',
  },
};

export function SignInPrompt({ open, onClose, reason = 'anonymous', remainingToday, dailyLimit }: SignInPromptProps) {
  const { signIn, configured } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const copy = REASON_COPY[reason] ?? REASON_COPY['anonymous'];

  const startSignIn = async () => {
    if (!configured) {
      onClose();
      navigate('/contact?reason=auth-not-configured');
      return;
    }
    await signIn();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      style={{ animation: 'fadeIn 200ms ease-out' }}
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
        className="bg-white rounded-2xl border border-ink-200 shadow-lg max-w-md w-full overflow-hidden"
        style={{ animation: 'fadeIn 220ms ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-2 flex items-start justify-between gap-3">
          <div>
            <h2 id="signin-title" className="font-display font-extrabold text-xl text-ink-900">{copy.title}</h2>
            <p className="mt-1 text-sm text-ink-600">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-lg hover:bg-ink-100 flex items-center justify-center"
            aria-label="Close"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-6 space-y-4">
          {typeof remainingToday === 'number' && typeof dailyLimit === 'number' && (
            <div className="rounded-lg bg-brand-50 border border-brand-200 px-3 py-2 text-xs text-brand-900">
              You have <strong>{remainingToday}</strong> of {dailyLimit} free downloads left today. Sign in for unlimited.
            </div>
          )}
          <ul className="space-y-2 text-sm text-ink-700">
            <li className="flex gap-2"><span aria-hidden="true">✓</span> Free account, no credit card</li>
            <li className="flex gap-2"><span aria-hidden="true">✓</span> Unlimited daily downloads</li>
            <li className="flex gap-2"><span aria-hidden="true">✓</span> Priority processing for large files</li>
            <li className="flex gap-2"><span aria-hidden="true">✓</span> Your images still never leave your device — processing stays in your browser</li>
          </ul>
          <button
            type="button"
            className="btn-primary w-full justify-center"
            onClick={startSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path fill="#fff" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"/>
              <path fill="#fff" fillOpacity=".9" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.4-2.6c-.9.6-2.1 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3v2.6C4.7 19.7 8.1 22 12 22z"/>
              <path fill="#fff" fillOpacity=".7" d="M6.5 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3C2.4 8.7 2 10.1 2 11.6s.4 2.9 1 4.1l3.5-2.8z"/>
              <path fill="#fff" fillOpacity=".85" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2 8.1 2 4.7 4.3 3 7.5l3.5 2.6C7.3 7.6 9.4 5.9 12 5.9z"/>
            </svg>
            Continue with Google
          </button>
          <p className="text-xs text-ink-500 text-center">
            By continuing, you agree to our <Link className="text-brand-700 hover:underline" to="/terms">Terms</Link> and <Link className="text-brand-700 hover:underline" to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
