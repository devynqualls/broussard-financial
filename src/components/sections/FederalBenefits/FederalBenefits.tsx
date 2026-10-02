import styles from './FederalBenefits.module.css';
import { Button } from '../../ui/Button/Button';

const bullets = ['Pension estimates and retirement timing','TSP withdrawals and Social Security','Insurance and survivor-benefit decisions'];

export default function FederalBenefits() {
  return (
    <section className={styles.banner} aria-labelledby="fed-heading">
      <div className={styles.left}>
        <div className={styles.kicker}>For Federal Employees</div>
        <h2 className={styles.fedTitle} id="fed-heading">
          Make your <em>federal benefits</em> work together.
        </h2>
        <p className={styles.body}>
          Explore your retirement paycheck, then discuss the decisions that need a personal review.
        </p>
        <Button href="/federal-planning" variant="primary">Explore federal planning tools</Button><p style={{marginTop:20}}><a className="text-link" href="/services/federal-retirement">Learn about our free benefits review →</a></p>
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
