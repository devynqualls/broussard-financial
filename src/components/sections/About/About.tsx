import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <div className={styles.inner}>
        <span className={styles.badge} id="about-heading">About Broussard Financial Services</span>

        <blockquote className={styles.lede}>
          "We help federal employees, retirees, and business owners turn retirement savings
          into <em>reliable income strategies designed to last</em>."
        </blockquote>

        <p className={styles.body}>
          Broussard Financial Services helps federal employees, retirees, families, and business
          owners build clear retirement income and wealth preservation strategies designed for
          long-term financial security.
          <br /><br />
          We specialize in retirement planning, federal benefit consulting, life insurance, and
          tax-efficient income strategies. Our work is focused on helping clients understand how
          their benefits, savings, insurance, and income sources fit together inside one
          complete financial plan.
          <br /><br />
          For federal employees, this includes guidance around FERS, TSP, Social Security,
          survivor benefits, pension decisions, and retirement income options. These benefits
          can be valuable, but they are often difficult to understand without a clear strategy.
          We help simplify the process so clients can make informed decisions before and during
          retirement.
          <br /><br />
          Broussard Financial Services also includes Federal Retirement Consultant<sup>™</sup>{' '}
          designation support, reflecting advanced training in the federal retirement system and
          the unique planning issues federal employees face when preparing for retirement.
          <br /><br />
          Our approach is built on education, clarity, and integrity. We take time to understand
          your goals, income needs, risk tolerance, family priorities, and long-term concerns
          before recommending a strategy.
          <br /><br />
          Whether you are preparing for retirement, protecting your family, preserving your
          wealth, or planning your legacy, our goal is to help you move forward with confidence
          and a plan you understand.
        </p>

        <div className={styles.frcCard}>
          <img
            src="/images/frc-logo.png"
            alt="Federal Retirement Consultant"
            className={styles.frcLogo}
            loading="lazy"
            width="160"
            height="62"
          />
          <div className={styles.frcText}>
            <div className={styles.frcTitle}>
              Federal Retirement Consultant<sup>™</sup>
            </div>
            <p className={styles.frcDesc}>
              Professional designation reflecting advanced training in federal retirement
              planning, including FERS, TSP, Social Security, survivor benefits, and retirement
              income decisions.
            </p>
            <p className={styles.frcDisclaimer}>
              Federal Retirement Consultant<sup>™</sup> is a professional designation and does
              not imply government endorsement.
            </p>
          </div>
        </div>

        <div className={styles.credRow}>
          <div className={styles.cred}>
            <div className={styles.credLabel}>Designation</div>
            <div className={styles.credVal}>AIF® Fiduciary</div>
          </div>
          <div className={styles.cred}>
            <div className={styles.credLabel}>Location</div>
            <div className={styles.credVal}>Nationwide</div>
          </div>
          <div className={styles.cred}>
            <div className={styles.credLabel}>Focus</div>
            <div className={styles.credVal}>Retirement & Tax</div>
          </div>
        </div>
      </div>
    </section>
  );
}
