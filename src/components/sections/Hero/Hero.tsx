import styles from './Hero.module.css';
import { Button } from '../../ui/Button/Button';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-label="Hero">
      <div className={styles.left}>
        <div className={styles.eyebrow}>Fiduciary Advisors · AIF® · Nationwide</div>
        <h1 className={styles.h1}>
          Make your next<br />
          retirement decision <em>with confidence.</em>
        </h1>
        <p className={styles.sub}>
          Retirement income planning for federal employees, retirees, and families.
          Get guidance on your benefits, trusts, annuities, and life insurance—starting
          with a free consultation.
        </p>
        <div className={styles.btns}>
          <Button href="#contact" variant="primary">Schedule Free Consultation</Button>
          <Button href="#services" variant="ghost">Our Services</Button>
        </div>
      </div>

      <div className={styles.right} aria-hidden="true">
        <div className={styles.photoZone}>
          <img className={styles.heroImage} src="/images/downtown.avif" alt="" width="1280" height="800" fetchPriority="high" decoding="async" />
          <div className={styles.photoOverlay} />
        </div>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statNum}>25+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>AIF®</div>
            <div className={styles.statLabel}>Accredited Fiduciary</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>100%</div>
            <div className={styles.statLabel}>Client-First</div>
          </div>
        </div>
      </div>
    </section>
  );
}
