import styles from './CTABand.module.css';
import { Button } from '../../ui/Button/Button';

const details = [
  'Complimentary, 30-minute consultation',
  'Available in person or virtually — nationwide',
  '(619) 581-0010',
  '1420 Kettner Blvd, Suite 321, San Diego',
];

export default function CTABand() {
  return (
    <section className={styles.band} aria-labelledby="cta-heading">
      <div className={styles.left}>
        <div className={styles.eyebrow}>Free Consultation · No Obligation</div>
        <h2 className={styles.title} id="cta-heading">
          Let’s talk about your next step.
        </h2>
        <p className={styles.sub}>
          Ask your questions and explore your options in a free 30-minute phone consultation with one of our consultants.
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
