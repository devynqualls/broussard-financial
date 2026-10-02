import styles from './FederalBenefits.module.css';
import { Button } from '../../ui/Button/Button';

const bullets = [
  'Knowing what your monthly annuity income will be when you retire',
  'How Social Security will impact your retirement benefits',
  'Understanding your TSP withdrawal options',
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
          Our complimentary benefits analysis helps you understand how your pension, TSP,
          Social Security, and survivor benefits fit together. Start with a conversation
          about your retirement timing and the information needed for your review.
        </p>
        <Button href="#contact" variant="primary">Discuss Your Free Benefits Analysis</Button>
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
