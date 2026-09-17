import styles from './FederalBenefits.module.css';
import { Button } from '../../ui/Button/Button';

const bullets = [
  'Knowing what your monthly annuity income will be when you retire',
  'How Social Security will impact your retirement benefits',
  'Secrets to maximizing your TSP payout',
  'Your Group Life Insurance benefits options during retirement',
  "Making the right survivors' benefits decisions",
  'FERS supplement strategies and timing',
  'CSRS offset planning and coordination',
];

export default function FederalBenefits() {
  return (
    <section className={styles.banner} aria-labelledby="fed-heading">
      <div className={styles.left}>
        <div className={styles.kicker}>For Federal Employees</div>
        <h2 className={styles.fedTitle} id="fed-heading">
          Avoid the costliest mistakes people make when electing <em>federal benefits</em>
        </h2>
        <p className={styles.body}>
          Our FREE Benefits Analysis Report will uncover opportunities to save you thousands
          of dollars while you work and help you maximize your benefits throughout retirement.
          This exclusive tool will show you ways to protect yourself from losing hundreds of
          thousands to market volatility.
        </p>
        <Button href="#contact" variant="primary">Get Your Free Pension Analysis Report</Button>
      </div>

      <div className={styles.right}>
        <div className={styles.kicker} style={{ marginBottom: '24px' }}>What you'll uncover:</div>
        <ul className={styles.bullets}>
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
