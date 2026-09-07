import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Global error boundary.
 *
 * Catches uncaught render errors and shows a friendly fallback page instead
 * of crashing the whole app. The actual error message is NEVER shown to the
 * user (privacy + UX).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to the console for the developer; do NOT render the error to the user.
    // eslint-disable-next-line no-console
    console.error('[Pixcuro] Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink-50 p-6">
          <div className="card p-8 max-w-md text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-ink-900">Something went wrong</h1>
            <p className="mt-2 text-sm text-ink-600">
              Pixcuro hit an unexpected error while loading this page. Your images were never sent anywhere.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                className="btn-primary"
                onClick={() => window.location.reload()}
              >
                Reload page
              </button>
              <a href={import.meta.env.BASE_URL} className="btn-secondary">Go home</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
