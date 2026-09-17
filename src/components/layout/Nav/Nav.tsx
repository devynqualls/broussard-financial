import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { CALENDLY_URL } from '../../../config/site';

const HOME_SECTIONS = ['about', 'services', 'seminars', 'resources'];

type NavLink = {
  label: string;
  to: string;
  hash?: string;
  matchPath?: string;
};

const navLinks: NavLink[] = [
  { label: 'About Us', to: '/', hash: 'about' },
  { label: 'Services', to: '/', hash: 'services' },
  { label: 'Meet the Team', to: '/team', matchPath: '/team' },
  { label: 'Seminars', to: '/', hash: 'seminars' },
  { label: 'Resources', to: '/', hash: 'resources' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const activeId = useScrollSpy(onHome ? HOME_SECTIONS : []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const isActive = (link: NavLink) => {
    if (link.matchPath) return location.pathname === link.matchPath;
    if (!onHome) return false;
    return link.hash === activeId;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="Broussard Financial Services — home" onClick={handleLinkClick}>
            <img
              src="/images/bfs-logo.png"
              alt="Broussard Financial Services"
              className={styles.logoImg}
            />
          </Link>
          <span className={styles.brandDivider} aria-hidden="true" />
          <img
            src="/images/frc-logo.png"
            alt="Federal Retirement Consultant"
            className={styles.frcBadge}
            loading="lazy"
            width="106"
            height="40"
          />
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`} role="list">
          {navLinks.map((link) => {
            const to = link.hash ? `${link.to}#${link.hash}` : link.to;
            return (
              <li key={link.label}>
                <Link
                  to={to}
                  className={`${styles.link} ${isActive(link) ? styles.linkActive : ''}`}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.cta}`} onClick={handleLinkClick}>
              Schedule a Call
            </a>
          </li>
        </ul>

        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
