import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the page to the top whenever the route changes.
 *
 * Without this, react-router can restore the previous page's scroll position
 * (so clicking a tool card from the bottom of the homepage drops the user at
 * the bottom of the new page). We always start each tool page at the top.
 *
 * Respects prefers-reduced-motion by jumping instantly instead of animating.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'auto' });
  }, [pathname]);
}
