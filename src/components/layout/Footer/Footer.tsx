import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const serviceLinks = [
  'Financial Planning',
  'Lifetime Income Planning',
  'Tax Planning',
  'Social Security Planning',
  'Legacy Planning',
  'LTC Preparation',
  'Benefit Analysis',
  'TSP Education',
];

const companyLinks = [
  { label: 'About Us', to: '/#about' },
  { label: 'Meet the Team', to: '/team' },
  { label: 'Our Services', to: '/#services' },
  { label: 'Seminars & Events', to: '/#seminars' },
  { label: 'Contact Us', to: '/#contact' },
];

const resourceLinks = [
  { label: 'Schedule a Call', to: '/#contact' },
  { label: 'Free Benefits Analysis', to: '/#contact' },
  { label: 'Upcoming Seminars', to: '/#seminars' },
  { label: 'Tax Rate Reference', to: '/#resources' },
  { label: 'US Debt Tracker', to: '/#resources' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>Broussard Financial Services</div>
          <p className={styles.tagline}>
            We're here to help you navigate life's financial waters with clarity, confidence,
            and care.
          </p>
          <address className={styles.addr}>
            1420 Kettner Blvd, Suite 100<br />
            San Diego, CA 92101<br />
            Office:{' '}
            <a href="tel:+16195810010" className={styles.addrLink}>(619) 581-0010</a>
          </address>
        </div>

        <div>
          <div className={styles.colTitle}>Services</div>
          <ul className={styles.links}>
            {serviceLinks.map((label) => (
              <li key={label}>
                <Link to="/#services" className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Company</div>
          <ul className={styles.links}>
            {companyLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Resources</div>
          <ul className={styles.links}>
            {resourceLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Broussard Financial Services · 1420 Kettner Blvd Suite
          100, San Diego CA 92101 · (619) 581-0010
        </p>
        <div className={styles.right}>
          Serving Clients Nationwide<br />AIF® Fiduciary
        </div>
      </div>

      <div className={styles.disclaimer}>
        The information provided on this website is for educational and informational purposes
        only and should not be construed as investment, tax, or legal advice. Broussard
        Financial Services and its representatives do not provide specific recommendations
        without understanding your individual financial situation. All strategies and
        investments involve risk, including the possible loss of principal. Past performance
        is not indicative of future results. Insurance and annuity products are backed by the
        financial strength and claims-paying ability of the issuing company. We recommend
        consulting with qualified professionals before making any financial decisions. Tax rate
        information is for Tax Year 2025 per IRS Revenue Procedure 2024-40 and is subject to
        change. National debt figures are approximate estimates based on publicly available
        data.
      </div>
    </footer>
  );
}
