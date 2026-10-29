import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Put each client-side navigation at the start of its page or named section. */
export default function RouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A new page can be lazy-loaded, so its hash target may arrive after this effect.
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      const header = document.querySelector('header');
      const offset = (header?.getBoundingClientRect().height ?? 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      return true;
    };

    // Start at the page top while waiting for a lazy-loaded section.
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (scrollToTarget()) return;

    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 3000);
    return () => { observer.disconnect(); window.clearTimeout(timeout); };
  }, [pathname, hash]);

  return null;
}
