import {Link} from 'react-router-dom';
import ConsultationCTA from '../ui/ConsultationCTA';

export default function AnnuityBenefits(){return <section className="planning-card" aria-labelledby="annuity-benefits-heading">
  <span>BUILD YOUR RETIREMENT PAYCHECK</span>
  <h2 id="annuity-benefits-heading">Give part of your savings a clear purpose.</h2>
  <p>An annuity can help turn a portion of your savings into income alongside Social Security and a pension. Start with the expenses you want covered and the money you need to keep accessible.</p>
  <div className="resource-grid">
    <div><h3>Income that can last a lifetime</h3><p>Eligible contracts or optional benefits can provide lifetime payments. Payment amounts, conditions, and any additional costs depend on the option selected.</p></div>
    <div><h3>A start date that fits your plan</h3><p>Explore income starting soon or later, aligned with your retirement timeline.</p></div>
    <div><h3>Options for different priorities</h3><p>Compare fixed interest, fixed indexed growth potential, and income features. Fixed indexed interest has a floor, but credited gains are limited and charges or withdrawals can reduce value.</p></div>
  </div>
  <p className="tool-note">Guarantees depend on the insurer’s financial strength and claims-paying ability. Annuities are long-term contracts; surrender charges, withdrawal rules, fees, and taxes may apply. Features vary by product.</p>
  <ConsultationCTA label="Explore my annuity income options"/>
  <p><Link to="/planning-tools#gap">Start by estimating your retirement income gap →</Link></p>
</section>}
