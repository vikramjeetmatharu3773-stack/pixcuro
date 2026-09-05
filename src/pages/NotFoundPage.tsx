import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container-narrow py-20 text-center">
      <div className="font-display font-extrabold text-7xl text-brand-600">404</div>
      <h1 className="mt-4 font-display font-bold text-2xl text-ink-900">Page not found</h1>
      <p className="text-ink-600 mt-2">We couldn't find that page. It may have moved.</p>
      <Link to="/" className="btn-primary mt-6">Go home</Link>
    </div>
  );
}
