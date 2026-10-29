import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import ReportActions from '../components/ui/ReportActions';
import HelpHint from '../components/ui/HelpHint';
import {irmaaEstimate, type FilingStatus} from '../utils/irmaa';
import './PlanningTools.css';
import './MedicareIrmaa.css';

const dollars = (value: number) => value.toLocaleString('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});
const wholeDollars = (value: number) => value.toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});

export default function MedicareIrmaa() {
  const [status, setStatus] = useState<FilingStatus>('joint');
  const [agi, setAgi] = useState('200000');
  const [taxExemptInterest, setTaxExemptInterest] = useState('0');
  const [additionalMagi, setAdditionalMagi] = useState('0');
  const [partBPeople, setPartBPeople] = useState(1);
  const [partDPeople, setPartDPeople] = useState(1);
  const maxPeople = status === 'joint' ? 2 : 1;
  const fields = [agi, taxExemptInterest, additionalMagi];
  const valid = fields.every(value => value.trim() !== '' && Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 100000000)
    && Number(agi) + Number(taxExemptInterest) + Number(additionalMagi) <= 100000000;
  const magi = Number(agi) + Number(taxExemptInterest);
  const baseline = valid ? irmaaEstimate(magi, status, partBPeople, partDPeople) : null;
  const scenario = valid ? irmaaEstimate(magi + Number(additionalMagi), status, partBPeople, partDPeople) : null;
  const annualDifference = baseline && scenario ? scenario.annualKnownCost - baseline.annualKnownCost : 0;

  return <div className="planning-page irmaa-page">
    <Helmet><title>2026 Medicare IRMAA Calculator | Broussard Financial Services</title><meta name="description" content="Estimate 2026 Medicare Part B premiums and Part D IRMAA using 2024 income. Compare an additional-income scenario and print your results."/><link rel="canonical" href="https://www.broussardfinancialservices.com/medicare-irmaa"/></Helmet>
    <header className="planning-intro"><Link to="/planning-tools">← Planning tools</Link><span>MEDICARE &amp; RETIREMENT INCOME</span><h1>See how income can affect<br/><em>Medicare premiums.</em></h1><p>Estimate your 2026 Part B premium and Part D income adjustment, then compare a what-if income amount. Your entries stay in your browser.</p></header>
    <section className="planning-card" id="irmaa-report" aria-labelledby="irmaa-title">
      <span>2026 MEDICARE PREMIUM ESTIMATE</span><h2 id="irmaa-title">Your IRMAA picture <HelpHint text="Use your 2024 federal tax return to enter filing status, adjusted gross income, and tax-exempt interest. Select how many people have Part B and Part D coverage to estimate 2026 premiums." /></h2>
      <p>For <strong>2026</strong>, Social Security generally uses income from your <strong>2024</strong> federal tax return. IRMAA modified adjusted gross income (MAGI) is adjusted gross income plus tax-exempt interest.</p>
      <div className="irmaa-fields">
        <label className="tool-field">2024 tax filing status<HelpHint text="Choose the filing status on the tax return Social Security generally uses for 2026 IRMAA. Married filing separately here means you lived with your spouse during 2024."/><select value={status} onChange={event=>{const next=event.target.value as FilingStatus;setStatus(next);if(next!=='joint'){setPartBPeople(Math.min(partBPeople,1));setPartDPeople(Math.min(partDPeople,1));}}}><option value="single">Single / head of household / qualifying surviving spouse</option><option value="joint">Married filing jointly</option><option value="separate">Married filing separately (lived with spouse)</option></select></label>
        <label className="tool-field">2024 adjusted gross income (Form 1040, line 11)<HelpHint text="Copy adjusted gross income from line 11 of the 2024 Form 1040; enter dollars, not the taxable-income line."/><input type="number" min="0" max="100000000" step="0.01" value={agi} onChange={event=>setAgi(event.target.value)} /></label>
        <label className="tool-field">2024 tax-exempt interest (Form 1040, line 2a)<HelpHint text="Copy tax-exempt interest from line 2a of the 2024 Form 1040. Enter zero if none. This amount is added to AGI for IRMAA MAGI."/><input type="number" min="0" max="100000000" step="0.01" value={taxExemptInterest} onChange={event=>setTaxExemptInterest(event.target.value)} /></label>
        <label className="tool-field">People with Medicare Part B<HelpHint text="Select how many people on this filing-status return will pay Part B premiums for the full modeled year."/><select value={partBPeople} onChange={event=>setPartBPeople(Number(event.target.value))}><option value={0}>0</option><option value={1}>1</option>{maxPeople===2&&<option value={2}>2</option>}</select></label>
        <label className="tool-field">People with Medicare Part D drug coverage<HelpHint text="Select how many people will have Part D drug coverage. The result includes the Part D income adjustment, not the plan premium."/><select value={partDPeople} onChange={event=>setPartDPeople(Number(event.target.value))}><option value={0}>0</option><option value={1}>1</option>{maxPeople===2&&<option value={2}>2</option>}</select></label>
      </div>
      <p className="tool-note">For married filing separately, this tool uses the CMS table for someone who lived with their spouse during the tax year. If you lived apart for the entire year, select the single schedule for an illustration and confirm your treatment with Social Security.</p>
      <div className="irmaa-scenario"><h3>What if income changes? <HelpHint text="Add a hypothetical amount to the MAGI above. Compare the current-income and higher-income columns to see whether the selected 2026 IRMAA tier changes." /></h3><p>Enter an <strong>additional MAGI amount</strong> to see how the 2026 table responds. This is a comparison using 2026 rules—not a prediction of future premiums or a calculation of how much a withdrawal will increase MAGI.</p><label className="tool-field">Additional MAGI to model ($)<HelpHint text="Enter only the extra taxable income or tax-exempt interest you want to test. A direct traditional IRA rollover generally is not entered here as added MAGI."/><input type="number" min="0" max="100000000" step="0.01" value={additionalMagi} onChange={event=>setAdditionalMagi(event.target.value)} /></label></div>
      {!valid?<p role="alert">Enter nonnegative amounts up to $100 million. The combined income amount must also be no more than $100 million.</p>:baseline&&scenario&&<>
        <div className="irmaa-comparison" aria-live="polite"><div><span>CURRENT 2024 INCOME</span><strong>{wholeDollars(magi)} MAGI</strong><p>2026 Part B premium: {dollars(baseline.monthlyPartB)}/month</p><p>Part D IRMAA: {dollars(baseline.monthlyPartDAdjustment)}/month</p><b>Known annual amount: {dollars(baseline.annualKnownCost)}</b></div><div><span>WHAT-IF INCOME</span><strong>{wholeDollars(magi+Number(additionalMagi))} MAGI</strong><p>2026 Part B premium: {dollars(scenario.monthlyPartB)}/month</p><p>Part D IRMAA: {dollars(scenario.monthlyPartDAdjustment)}/month</p><b>Known annual amount: {dollars(scenario.annualKnownCost)}</b></div></div>
        <p className="irmaa-difference">Difference under 2026 rates: <strong>{annualDifference===0?'No change in the modeled annual amount':`${dollars(annualDifference)} more per year`}</strong></p>
        <p className="tool-note">“Known annual amount” includes the full standard or income-adjusted Part B premium for the number of people selected, plus the Part D <em>income adjustment only</em>. It does not include the Part D plan premium, Part A, Medigap, Medicare Advantage, penalties, or other health costs. Assumes all selected people have the coverage for 12 months and share the filing-status MAGI shown.</p>
      </>}
      <p className="tool-note">A decision made in 2026 would generally affect 2028 Medicare premiums; 2028 thresholds and rates are not known here. A direct rollover to a traditional IRA generally does not add taxable income by itself. Roth conversions and taxable distributions can affect MAGI. Review the actual tax impact with your tax professional before choosing an amount.</p>
      <p className="tool-note">If retirement or another qualifying life event reduced your income, you may be able to ask Social Security to use more recent information. <a href="https://www.ssa.gov/medicare/lower-irmaa" target="_blank" rel="noopener noreferrer">Learn about requesting a lower IRMAA (SSA-44) →</a></p>
      <p className="tool-note">Sources: <a href="https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles" target="_blank" rel="noopener noreferrer">CMS 2026 Part B and Part D tables</a> and <a href="https://secure.ssa.gov/poms.nsf/lnx/0601101010" target="_blank" rel="noopener noreferrer">Social Security MAGI definition</a>. Educational estimate only; Social Security determines actual IRMAA. Updated for the published 2026 tables.</p>
      <ReportActions targetId="irmaa-report" title="2026 Medicare IRMAA estimate" disabled={!valid} />
      <ConsultationCTA label="Review my retirement income plan" />
    </section>
  </div>;
}
