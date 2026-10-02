import styles from './Ticker.module.css';

const items = [
  { bold: 'Real Estate', rest: ' · Buy · Sell · Invest · Free Consultation' },
  { bold: 'Life Insurance', rest: ' · Family Protection · Free Consultation' },
  { bold: 'Annuity Reviews & Setup', rest: ' · Retirement Income Planning' },
  { bold: 'Tax Reduction Strategies', rest: ' · Individuals & Business Owners' },
  { bold: 'TSP Education', rest: ' · Maximize Your Retirement Income' },
  { bold: 'Social Security Optimization', rest: ' · Best Time to Start' },
  { bold: 'Free Trust Reviews', rest: ' · Trust Updates & New Trust Setup' },
  { bold: 'LTC Preparation', rest: ' · Long-Term Care Insurance' },
  { bold: 'Benefit Analysis', rest: ' · FERS · CSRS · TSP' },
];

export default function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className={styles.item}>
            <strong>{item.bold}</strong>
            {item.rest}
          </span>
        ))}
      </div>
    </div>
  );
}
