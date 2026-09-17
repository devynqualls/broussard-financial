import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    name: 'Connect & Clarify',
    desc: 'We start with a real conversation — about your goals, your lifestyle, and what financial freedom looks like to you. This is where your vision takes shape and your priorities come into focus.',
  },
  {
    num: '02',
    name: 'Strategize & Simplify',
    desc: "Next, we cut through the noise. We'll analyze your current financial picture, identify what's working, and simplify the path toward your long-term goals with clear, actionable strategies.",
  },
  {
    num: '03',
    name: 'Implement & Elevate',
    desc: 'Once your custom plan is ready, we put it into motion — aligning investments, protection, and income strategies designed to help your wealth grow and your confidence rise.',
  },
  {
    num: '04',
    name: 'Review & Renew',
    desc: "Life changes, and your plan should evolve with it. Through regular check-ins, we'll refine and adjust your strategy to make sure you stay on track and always moving forward.",
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
          We believe financial planning should be empowering, not overwhelming. Our simple
          four-step process turns your goals into action.
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
