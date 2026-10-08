import { Link } from 'react-router-dom';
import ConsultationCTA from '../ui/ConsultationCTA';
import styles from './AnnuityBenefits.module.css';

const steps = [
  { number: '01', title: 'You set aside money', copy: 'You place a portion of your savings into an annuity contract with an insurance company.' },
  { number: '02', title: 'You choose an income plan', copy: 'The contract sets out when payments can begin, how they are calculated, and which options you select.' },
  { number: '03', title: 'You receive income', copy: 'Depending on the contract and option chosen, payments may last for a set period or for your lifetime.' },
];

const benefits = [
  { title: 'A more predictable paycheck', copy: 'Contract-defined payments can help cover regular expenses alongside Social Security and a pension.' },
  { title: 'Income that can last for life', copy: 'Certain options can pay for as long as you live, helping address the risk of outliving your savings.' },
  { title: 'A start date that fits your plan', copy: 'You may be able to begin payments soon or reserve them for a later stage of retirement.' },
  { title: 'Protection and family options', copy: 'Some fixed contracts protect value from direct stock-market losses. Some contracts offer choices for beneficiaries.' },
];

export default function AnnuityBenefits() {
  return <section className="planning-card" aria-labelledby="annuity-basics-heading">
    <span>ANNUITIES, EXPLAINED SIMPLY</span>
    <h2 id="annuity-basics-heading">An annuity, explained simply</h2>
    <p>An annuity is a contract with an insurance company. You set aside money, and the contract can provide income now or later. The main reason many people consider one is to create a dependable source of retirement income.</p>
    <div className={styles.protection} aria-labelledby="annuity-protection-heading">
      <div className={styles.protectionIntro}>
        <span>SAFE MONEY IN A DOWN MARKET</span>
        <h3 id="annuity-protection-heading">Market down. No index-linked loss.</h3>
        <p>With a fixed indexed annuity that has a 0% floor, a falling index credits no interest for that term rather than subtracting the market decline from your indexed account. Your money is not invested directly in the index.</p>
      </div>
      <div className={styles.scenario} aria-label="Illustration: a 20 percent index decline results in zero percent index-linked interest credited, before contract charges or withdrawals">
        <div className={styles.scenarioRow}>
          <span>Illustrative index change</span>
          <strong className={styles.marketDrop}>−20%</strong>
        </div>
        <div className={styles.scenarioRow}>
          <span>Fixed indexed annuity interest for that term</span>
          <strong className={styles.protectedCredit}>0%</strong>
        </div>
        <p>Index decline alone does not reduce the indexed interest account under an applicable 0% floor.</p>
      </div>
      <figure className={styles.growthFigure}>
        <picture>
          <source media="(max-width: 600px)" srcSet="/images/fixed-indexed-annuity-growth-mobile.svg" />
          <img src="/images/fixed-indexed-annuity-growth.svg" width="960" height="420" alt="Illustrative fixed indexed annuity account: level when the linked market index falls, and higher when positive interest is credited." loading="lazy" decoding="async" />
        </picture>
        <figcaption>A 0% floor can keep an indexed account level when the linked index falls. Interest credits when the index rises depend on the contract’s terms; they will not necessarily match the index’s gain.</figcaption>
      </figure>
      <p className={styles.scenarioNote}>Hypothetical example, not a quote or a promise of a return. Contract terms vary. Rider fees, withdrawals, surrender charges and taxes may reduce what you receive. Guarantees rely on the issuing insurer’s claims-paying ability. <a href="https://content.naic.org/sites/default/files/publication-anb-lp-consumer-annuities-fixed.pdf">NAIC buyer’s guide to fixed deferred annuities →</a></p>
    </div>
    <div className={styles.steps} aria-label="How an annuity works">
      {steps.map(step => <div key={step.number} className={styles.step}>
        <span className={styles.number}>{step.number}</span>
        <h3>{step.title}</h3>
        <p>{step.copy}</p>
      </div>)}
    </div>
    <h3 className={styles.benefitsHeading}>Why people consider annuities</h3>
    <div className={styles.benefits}>
      {benefits.map(benefit => <div key={benefit.title}>
        <h4>{benefit.title}</h4>
        <p>{benefit.copy}</p>
      </div>)}
    </div>
    <p className="tool-note">Benefits vary by contract and the options chosen. Guarantees depend on the issuing insurer’s financial strength and claims-paying ability. Withdrawal limits, surrender charges, fees, and taxes can affect what you receive. An annuity inside an IRA or other tax-deferred retirement account does not add another layer of tax deferral.</p>
    <ConsultationCTA label="Talk with us about retirement income" />
    <p><Link to="/planning-tools#gap">Estimate your retirement income gap →</Link></p>
  </section>;
}
