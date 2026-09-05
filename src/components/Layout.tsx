import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SITE, TOOLS } from '../lib/site';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label={`${SITE.name} home`}>
      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21V7l5 6 4-5 9 13H3z" fill="currentColor" stroke="none" />
          <circle cx="17" cy="6" r="2" fill="#fde68a" stroke="none" />
        </svg>
      </span>
      <span className="text-lg font-display font-extrabold tracking-tight text-ink-900">
        {SITE.name}
      </span>
    </Link>
  );
}

const PRIMARY_LINKS = [
  { path: '/background-remover', label: 'Background Remover' },
  { path: '/image-compressor', label: 'Compressor' },
  { path: '/image-resizer', label: 'Resizer' },
  { path: '/image-converter', label: 'Converter' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setMobileOpen(false), [loc.pathname]);

  return (
    <header className="sticky top-0 z-30 bg-ink-50/85 backdrop-blur border-b border-ink-200/60">
      <div className="container-wide flex items-center justify-between h-16">
        <Logo />
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {PRIMARY_LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:text-ink-900 hover:bg-ink-100',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/tools"
            className={({ isActive }) =>
              [
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:text-ink-900 hover:bg-ink-100',
              ].join(' ')
            }
          >
            All tools
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
            100% private
          </span>
          <button
            type="button"
            className="md:hidden btn-ghost px-2"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav aria-label="Mobile" className="md:hidden border-t border-ink-200/60 bg-white">
          <div className="container-wide py-3 grid grid-cols-2 gap-1">
            {[...PRIMARY_LINKS, { path: '/tools', label: 'All tools' }].map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className={({ isActive }) =>
                  [
                    'px-3 py-2 rounded-lg text-sm font-medium',
                    isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-800 hover:bg-ink-100',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-200/60 bg-white">
      <div className="container-wide py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-ink-600 max-w-xs">
            {SITE.tagline}. Built for speed and privacy — every image stays on your device.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Tools</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
            {TOOLS.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link to={t.path} className="hover:text-ink-900">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">More tools</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
            {TOOLS.slice(6).map((t) => (
              <li key={t.slug}>
                <Link to={t.path} className="hover:text-ink-900">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Company</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
            <li><Link to="/about" className="hover:text-ink-900">About</Link></li>
            <li><Link to="/privacy" className="hover:text-ink-900">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-ink-900">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-ink-900">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-ink-900">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200/60">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} {SITE.name}. Free for everyone, forever.</p>
          <p>Made with care · No tracking · No uploads</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
