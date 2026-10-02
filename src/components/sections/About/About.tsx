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
          Based in San Diego, we help you connect your benefits, savings, insurance,
          and tax considerations into a retirement income plan you understand.
          For federal employees, that includes FERS, TSP, Social Security, and survivor benefits.
          <br /><br />
          Start with your goals and questions. We’ll explain your options and discuss
          the next steps, including trusts, annuities, life insurance, or buying,
          selling, and investing in real estate.
          <br /><br />
          <a href="/team">Meet the people behind your plan →</a>
        </p>

        <div className={styles.frcCard}>
          <img
            src="/images/frc-logo-web.webp"
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
