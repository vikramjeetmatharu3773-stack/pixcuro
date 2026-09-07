import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { SITE, TOOLS, CATEGORY_META, type ToolCategory } from '../lib/site';
import { useScrollToTop } from '../lib/useScrollToTop';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label={`${SITE.name} home`}>
      <span className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 text-white flex items-center justify-center shadow-soft group-hover:scale-105 group-hover:shadow-md transition-all overflow-hidden">
        {/* Aperture/camera blade logo — P inside lens */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* Outer lens ring */}
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
          {/* Aperture blades (3 overlapping triangles) */}
          <path d="M12 4 L17 11 L7 11 Z" fill="currentColor" opacity="0.95" />
          <path d="M19 14 L13 19 L13 9 Z" fill="currentColor" opacity="0.85" />
          <path d="M5 14 L11 9 L11 19 Z" fill="currentColor" opacity="0.75" />
          {/* Center sparkle */}
          <circle cx="12" cy="12" r="1.6" fill="#fde68a" />
        </svg>
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
      </span>
      <span className="text-xl font-display font-extrabold tracking-tight text-ink-900 group-hover:text-brand-700 transition-colors">
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

/* =============================================================================
 * Search box — appears on desktop header (icon -> popover) and mobile drawer.
 * ============================================================================= */

function SearchBox({ onPick, autoFocus = false }: { onPick: () => void; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return TOOLS.filter((t) => {
      return (
        t.title.toLowerCase().includes(term) ||
        t.shortTitle.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.intro.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
      );
    }).slice(0, 8);
  }, [q]);

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const go = useCallback(
    (path: string) => {
      setOpen(false);
      setQ('');
      onPick();
      navigate(path);
    },
    [navigate, onPick],
  );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active].path); }
    else if (e.key === 'Escape') { setOpen(false); (e.target as HTMLInputElement).blur(); }
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder="Search tools (compress, passport, background…)"
          aria-label="Search image tools"
          className="input pl-10 pr-3 h-10 w-full"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {open && q.trim() && (
        <div
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-ink-200 shadow-lg overflow-hidden z-40 animate-slide-up"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-ink-500 text-center">
              No tools match “{q}”. Try another keyword.
            </div>
          ) : (
            <ul className="max-h-96 overflow-y-auto divide-y divide-ink-100">
              {results.map((t, i) => (
                <li
                  key={t.slug}
                  role="option"
                  aria-selected={i === active}
                  className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer transition-colors ${i === active ? 'bg-brand-50' : 'hover:bg-ink-50'}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => { e.preventDefault(); go(t.path); }}
                >
                  <span className={`mt-1 inline-flex w-7 h-7 rounded-md items-center justify-center text-[10px] font-bold uppercase tracking-wide ${i === active ? 'bg-brand-200 text-brand-800' : 'bg-ink-100 text-ink-600'}`}>
                    {t.category.slice(0, 3)}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-ink-900 truncate">{t.shortTitle}</span>
                    <span className="block text-xs text-ink-500 truncate">{t.description}</span>
                  </span>
                  <svg className="w-4 h-4 text-ink-400 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* =============================================================================
 * Desktop top-right menu — opens on hover/click; no janky animation.
 * ============================================================================= */

function DesktopMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  const go = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate],
  );

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open menu"
        className="flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-ink-100"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex flex-col gap-1">
          <span className="block w-5 h-0.5 rounded-full bg-ink-700" />
          <span className="block w-5 h-0.5 rounded-full bg-ink-700" />
          <span className="block w-5 h-0.5 rounded-full bg-ink-700" />
        </span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-ink-200 shadow-lg overflow-hidden z-40"
          style={{ animation: 'fadeIn 160ms ease-out' }}
        >
          <div className="p-3 border-b border-ink-100">
            <SearchBox onPick={() => setOpen(false)} autoFocus={false} />
          </div>
          <div className="max-h-[28rem] overflow-y-auto p-2">
            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Quick access</p>
            {[...PRIMARY_LINKS, { path: '/tools', label: 'All tools' }].map((l) => (
              <button
                key={l.path}
                type="button"
                role="menuitem"
                onClick={() => go(l.path)}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ink-50 text-sm text-ink-800"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                {l.label}
              </button>
            ))}
            <div className="my-2 border-t border-ink-100" />
            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Learn</p>
            {[
              { path: '/guides', label: 'Guides' },
              { path: '/faq', label: 'FAQ' },
            ].map((l) => (
              <button key={l.path} type="button" role="menuitem" onClick={() => go(l.path)} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ink-50 text-sm text-ink-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                {l.label}
              </button>
            ))}
            <div className="my-2 border-t border-ink-100" />
            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Company</p>
            {[
              { path: '/about', label: 'About' },
              { path: '/privacy', label: 'Privacy' },
              { path: '/terms', label: 'Terms' },
              { path: '/contact', label: 'Contact' },
            ].map((l) => (
              <button key={l.path} type="button" role="menuitem" onClick={() => go(l.path)} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ink-50 text-sm text-ink-800">
                {l.label}
              </button>
            ))}
            <div className="my-2 border-t border-ink-100" />
            <div className="px-3 py-2.5 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Trust & security</p>
              <div className="flex items-center gap-2 text-xs text-ink-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Sign-in required to download</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span>Hosted free on GitHub Pages</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                <span>100% in your browser · 0 uploads</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =============================================================================
 * Mobile drawer (slides in from the right).
 * ============================================================================= */

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
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

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  // Group tools by category for the drawer
  const groups: Record<string, typeof TOOLS> = {};
  TOOLS.forEach((t) => {
    (groups[t.category] ||= []).push(t);
  });
  const orderedCats: ToolCategory[] = ['remove', 'id', 'compress', 'resize', 'convert', 'edit', 'batch'];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden ${open ? '' : 'hidden'}`}
        style={{ animation: 'fadeIn 200ms ease-out' }}
        aria-hidden="true"
      />
      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 right-0 z-50 w-[min(360px,90vw)] bg-white border-l border-ink-200 flex flex-col md:hidden ${open ? '' : 'hidden'}`}
        style={{ animation: 'slideInRight 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-ink-200">
          <Logo />
          <button
            type="button"
            className="w-10 h-10 rounded-lg hover:bg-ink-100 flex items-center justify-center"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
        <div className="p-3 border-b border-ink-100">
          <SearchBox onPick={onClose} autoFocus={false} />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {[...PRIMARY_LINKS, { path: '/tools', label: 'All tools' }].map((l) => (
            <button
              key={l.path}
              type="button"
              onClick={() => go(l.path)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-ink-800 hover:bg-ink-50 border border-ink-100"
            >
              {l.label}
            </button>
          ))}
          <div className="border-t border-ink-100 pt-3 space-y-4">
            {orderedCats.map((cat) => {
              const tools = groups[cat] ?? [];
              if (tools.length === 0) return null;
              return (
                <div key={cat}>
                  <p className="px-2 text-[10px] uppercase tracking-wide text-ink-500 font-semibold mb-1">{CATEGORY_META[cat].title}</p>
                  <div className="space-y-0.5">
                    {tools.map((t) => (
                      <button
                        key={t.slug}
                        type="button"
                        onClick={() => go(t.path)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-ink-50 text-sm text-ink-800"
                      >
                        {t.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-ink-100 pt-3 space-y-1">
            <p className="px-2 text-[10px] uppercase tracking-wide text-ink-500 font-semibold mb-1">Company</p>
            {[
              { path: '/guides', label: 'Guides' },
              { path: '/faq', label: 'FAQ' },
              { path: '/about', label: 'About' },
              { path: '/privacy', label: 'Privacy Policy' },
              { path: '/terms', label: 'Terms' },
              { path: '/contact', label: 'Contact' },
            ].map((l) => (
              <button
                key={l.path}
                type="button"
                onClick={() => go(l.path)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-ink-50 text-sm text-ink-700"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="border-t border-ink-100 pt-3 space-y-2 px-2">
            <p className="text-[10px] uppercase tracking-wide text-ink-500 font-semibold">Trust & security</p>
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span>Sign-in required to download</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600 shrink-0"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              <span>Hosted free on GitHub Pages</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600 shrink-0"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
              <span>100% in your browser · 0 uploads</span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function Header({ onMenuToggle, onMenuClose, mobileOpen }: { onMenuToggle: () => void; onMenuClose: () => void; mobileOpen: boolean }) {
  const loc = useLocation();
  const isFirst = useRef(true);
  useEffect(() => {
    // Skip the very first render so the drawer doesn't pop open on initial load.
    if (isFirst.current) { isFirst.current = false; return; }
    onMenuClose();
  }, [loc.pathname, onMenuClose]);

  return (
    <header className="sticky top-0 z-30 bg-ink-50/90 backdrop-blur border-b border-ink-200/60">
      <div className="container-wide flex items-center justify-between h-16">
        <Logo />
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {PRIMARY_LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 rounded-lg text-sm font-medium',
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
                'px-3 py-1.5 rounded-lg text-sm font-medium',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:text-ink-900 hover:bg-ink-100',
              ].join(' ')
            }
          >
            All tools
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {/* Three-line menu button (mobile) or DesktopMenu (desktop) — kept visible everywhere */}
          <span className="hidden sm:inline-flex badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
            Sign-in protects downloads
          </span>
          {/* Desktop: dropdown menu */}
          <div className="hidden md:block">
            <DesktopMenu />
          </div>
          {/* Mobile: three-line button (no animation) */}
          <button
            type="button"
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-ink-100"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={onMenuToggle}
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[2px] rounded-full bg-ink-700" />
              <span className="block w-5 h-[2px] rounded-full bg-ink-700" />
              <span className="block w-5 h-[2px] rounded-full bg-ink-700" />
            </span>
          </button>
        </div>
      </div>
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
  useScrollToTop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = useCallback(() => setMobileOpen((v) => !v), []);
  const close = useCallback(() => setMobileOpen(false), []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuToggle={toggle} onMenuClose={close} mobileOpen={mobileOpen} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Render drawer at the top level (outside the sticky header)
          so position:fixed is not constrained by a sticky parent. */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
