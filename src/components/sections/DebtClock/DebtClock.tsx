import styles from './DebtClock.module.css';
import { useDebtClock } from '../../../hooks/useDebtClock';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function DebtClock() {
  const { totalDebt, perCitizen, perTaxpayer } = useDebtClock();

  return (
    <section className={styles.section} id="resources" aria-labelledby="debt-heading">
      <div className={styles.header}>
        <div>
          <div className={styles.kicker}>Live National Debt Tracker</div>
          <h2 className={styles.title} id="debt-heading">
            The US national debt — <em>in real time</em>
          </h2>
        </div>
        <p className={styles.sub}>
          Understanding fiscal context matters for retirement planning. The national debt
          affects interest rates, tax policy, and Social Security funding.
        </p>
      </div>

      <div className={styles.clockDisplay}>
        <div
          className={styles.debtNumber}
          aria-live="polite"
          aria-label={`Current US national debt: ${formatCurrency(totalDebt)}`}
        >
          {formatCurrency(totalDebt)}
        </div>
        <div className={styles.debtLabel}>
          Total U.S. National Debt · Updates every second · Source: U.S. Treasury
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statN}>{formatCurrency(perCitizen)}</div>
          <div className={styles.statL}>Debt per U.S. citizen</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statN}>{formatCurrency(perTaxpayer)}</div>
          <div className={styles.statL}>Debt per taxpayer</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statN}>~$2.1T</div>
          <div className={styles.statL}>Annual interest payments</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statN}>~35%</div>
          <div className={styles.statL}>Debt held by foreign entities</div>
        </div>
      </div>

      <p className={styles.note}>
        Figures are approximate and based on publicly available U.S. Treasury data. Debt increases
        approximately $100,000 per second. This information is provided for educational context —
        not as investment advice.
      </p>
    </section>
  );
}
