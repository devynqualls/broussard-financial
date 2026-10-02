import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ReviewHighlights() {
  const { pathname } = useLocation();
  const enabled = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  useEffect(() => {
    if (!enabled) return;
    const targets = [
      { selector: '#services a[aria-label^="Real Estate"]', label: 'NEW · Licensed Realtors · Buy, sell & invest' },
      { selector: '#services a[aria-label^="Life Insurance"]', label: 'NEW · Life insurance · Free consultation' },
      { selector: '#hero p', label: 'UPDATED · Trusts, annuities & free consultations' },
      { selector: '#services > div:first-child p', label: 'UPDATED · Free consultation for every service' },
      { selector: '#services a[aria-label^="Annuity"]', label: 'UPDATED · Annuity reviews & setup' },
      { selector: '#services a[aria-label^="Trust"]', label: 'UPDATED · Free trust reviews, updates & setup' },
      { selector: '#topic', label: 'UPDATED · Trust, annuity, insurance & real estate options' },
      { selector: 'footer ul', label: 'UPDATED · Service names' },
    ];
    const marked: Element[] = [];
    const badges: HTMLElement[] = [];
    for (const { selector, label } of targets) {
      const target = document.querySelector(selector);
      if (!target) continue;
      target.classList.add('review-highlight');
      const badge = document.createElement('span');
      badge.className = 'review-change-badge';
      badge.textContent = label;
      target.insertAdjacentElement(['A', 'P'].includes(target.tagName) ? 'afterbegin' : 'beforebegin', badge);
      marked.push(target); badges.push(badge);
    }
    return () => { marked.forEach(el => el.classList.remove('review-highlight')); badges.forEach(el => el.remove()); };
  }, [enabled, pathname]);
  if (!enabled) return null;
  return <div className="review-preview-note">Review preview · Updated service content is highlighted in gold. These markers appear only locally.</div>;
}
