import { Link } from 'react-router-dom';
import ConsultationCTA from '../ui/ConsultationCTA';
import styles from './AnnuityBenefits.module.css';

export default function AnnuityBenefits() {
  return <section className="planning-card" aria-labelledby="annuity-benefits-heading">
    <span>SAFE RETIREMENT INCOME</span>
    <h2 id="annuity-benefits-heading">A steadier way to plan your retirement paycheck.</h2>
    <p>For money set aside to support retirement, the right annuity can add a dependable income stream alongside Social Security and a pension. We start with the income you need and the savings you want to keep available.</p>
    <div className={styles.benefits}>
      <div><h3>Know what comes in</h3><p>Some annuity contracts can provide scheduled payments for a set period or for life. We’ll identify exactly what a proposed contract guarantees.</p></div>
      <div><h3>Choose when it starts</h3><p>Plan income for today or a later stage of retirement, based on your expenses and other income sources.</p></div>
      <div><h3>Keep your full plan in view</h3><p>Review how an annuity fits with your pension, Social Security, savings, and need for accessible cash.</p></div>
    </div>
    <p className="tool-note">“Safe” refers to contract-defined protections, not an absence of all risk. Guarantees depend on the issuing insurer’s financial strength and claims-paying ability. Withdrawal limits, surrender charges, fees, and taxes can affect what you receive.</p>
    <ConsultationCTA label="Explore safe income options" />
    <p><Link to="/planning-tools#gap">Estimate your retirement income gap →</Link></p>
  </section>;
}
