import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    name: 'Connect & Clarify',
    desc: 'Tell us about your goals, retirement timeline, and the questions you want answered.',
  },
  {
    num: '02',
    name: 'Strategize & Simplify',
    desc: 'Review your benefits, savings, and income needs with a clear explanation of your options.',
  },
  {
    num: '03',
    name: 'Implement & Elevate',
    desc: 'Agree on next steps and put your chosen strategy into action.',
  },
  {
    num: '04',
    name: 'Review & Renew',
    desc: 'Revisit your plan as your family, finances, and priorities change.',
  },
];

export default function Process() {
  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.header}>
        <h2 className={styles.title} id="process-heading">
          Your 4 steps to <em>financial confidence</em>
        </h2>
        <p className={styles.desc}>
          A clear process, from your first questions to ongoing reviews.
        </p>
      </div>

      <div className={styles.grid}>
        {steps.map((step) => (
          <div key={step.num} className={styles.step}>
            <div className={styles.stepNum} aria-hidden="true">{step.num}</div>
            <h3 className={styles.stepName}>{step.name}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
