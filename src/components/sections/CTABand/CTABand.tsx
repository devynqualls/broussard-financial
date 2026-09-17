import styles from './CTABand.module.css';
import { Button } from '../../ui/Button/Button';

const details = [
  'Complimentary, 30-minute consultation',
  'Available in person or virtually — nationwide',
  '(619) 581-0010',
  '1420 Kettner Blvd, Suite 100, San Diego',
];

export default function CTABand() {
  return (
    <section className={styles.band} aria-labelledby="cta-heading">
      <div className={styles.left}>
        <div className={styles.eyebrow}>Free Consultation · No Obligation</div>
        <h2 className={styles.title} id="cta-heading">
          Ready to take the next step toward the retirement you deserve?
        </h2>
        <p className={styles.sub}>
          Your financial future deserves attention today. Schedule a complimentary appointment
          with our team and discover how personalized planning can help you protect, grow, and
          enjoy your wealth with confidence.
        </p>
      </div>
      <div className={styles.right}>
        <Button href="/#contact" variant="primary">Schedule Free Consultation</Button>
        {details.map((d, i) => (
          <div key={i} className={styles.detail}>{d}</div>
        ))}
      </div>
    </section>
  );
}
