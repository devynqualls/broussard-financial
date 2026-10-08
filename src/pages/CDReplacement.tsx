import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import ReportActions from '../components/ui/ReportActions';
import { calculateCDReplacement, type CDReplacementInputs } from '../utils/cdReplacement';
import './PlanningTools.css';
import './CDReplacement.css';

const dollars = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const percent = (value: number | null) => value === null ? '—' : `${value.toFixed(2)}%`;

type NumericKey = Exclude<keyof CDReplacementInputs, 'bonusInBasis'>;
const defaults: Record<NumericKey, string> = {
  deposit: '100000', cdRate: '3.5', mygaRate: '6.3', taxRate: '24', years: '10',
  simpleIndexReturn: '4', simpleMultiplier: '2.45', bonusPercent: '15',
  bonusIndexReturn: '13', bonusMultiplier: '0.45',
};

function NumberField({ label, hint, value, onChange, max, step = 'any' }: {
  label: string; hint?: string; value: string; onChange: (value: string) => void; max: number; step?: string;
}) {
  return <label className="tool-field">{label}{hint && <small>{hint}</small>}
    <input type="number" min="0" max={max} step={step} value={value} onChange={event => onChange(event.target.value)} />
  </label>;
}

export default function CDReplacement() {
  const [fields, setFields] = useState(defaults);
  const [simpleStrategy, setSimpleStrategy] = useState('S&P 500 Fut DRC 5% with Par');
  const [bonusStrategy, setBonusStrategy] = useState('S&P 500 Futures ER with Par');
  const [bonusInBasis, setBonusInBasis] = useState(true);
  const set = (key: NumericKey) => (value: string) => setFields(current => ({ ...current, [key]: value }));
  const limits: Record<NumericKey, number> = {
    deposit: 100000000, cdRate: 30, mygaRate: 30, taxRate: 100, years: 30,
    simpleIndexReturn: 30, simpleMultiplier: 10, bonusPercent: 100,
    bonusIndexReturn: 30, bonusMultiplier: 10,
  };
  const valid = (Object.keys(defaults) as NumericKey[]).every(key => {
    const value = fields[key];
    const number = Number(value);
    return value.trim() !== '' && Number.isFinite(number) && number >= (key === 'years' ? 1 : 0)
      && number <= limits[key] && (key !== 'years' || Number.isInteger(number));
  });
  const input: CDReplacementInputs = {
    deposit: +fields.deposit, cdRate: +fields.cdRate, mygaRate: +fields.mygaRate,
    taxRate: +fields.taxRate, years: +fields.years,
    simpleIndexReturn: +fields.simpleIndexReturn, simpleMultiplier: +fields.simpleMultiplier,
    bonusPercent: +fields.bonusPercent, bonusIndexReturn: +fields.bonusIndexReturn,
    bonusMultiplier: +fields.bonusMultiplier, bonusInBasis,
  };
  const result = valid ? calculateCDReplacement(input) : null;
  const summary = result && [
    { label: 'Bank CD', value: result.end.cd, note: 'Interest taxed annually' },
    { label: 'MYGA', value: result.end.myga, note: 'Illustrative fixed rate; gains taxed at withdrawal' },
    { label: 'Simple FIA', value: result.end.simpleFia, note: 'Illustrative index crediting; gains taxed at withdrawal' },
    { label: 'Bonus FIA', value: result.end.bonusFia, note: 'Illustrative bonus and crediting; selected tax basis' },
  ];

  return <div className="planning-page cd-replacement-page">
    <Helmet><title>CD Replacement Comparison | Broussard Financial Services</title>
      <meta name="description" content="Compare a bank CD, MYGA, and fixed indexed annuity scenarios with editable rates, tax assumptions, and a year-by-year table." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/cd-replacement" /></Helmet>
    <header className="planning-intro"><span>COMPARE THE TRADEOFFS</span><h1>Could another option <em>fit your CD dollars?</em></h1>
      <p>Compare a bank CD with a fixed annuity (MYGA) and two fixed indexed annuity examples. Change the assumptions to see a year-by-year, after-tax illustration. Figures are calculated in your browser and are not sent to us.</p>
      <p className="cd-replacement-banner">Illustration only. The annuity rates, bonuses and index assumptions below are examples—not current offers, guarantees of future indexed interest, or a recommendation to replace a CD.</p>
    </header>
    <section className="planning-card" id="cd-replacement" aria-labelledby="replacement-title">
      <span>01 · ENTER YOUR SCENARIO</span><h2 id="replacement-title">CD replacement comparison</h2>
      <p>Enter your deposit, quoted rates and federal marginal tax rate. The model assumes a nonqualified annuity funded with after-tax money, held for the full horizon, then fully withdrawn.</p>
      <div className="planning-inputs cd-replacement-inputs">
        <NumberField label="Initial deposit ($)" hint="Amount being placed" value={fields.deposit} onChange={set('deposit')} max={limits.deposit} />
        <NumberField label="CD annual rate (%)" hint="Assumed constant bank APY" value={fields.cdRate} onChange={set('cdRate')} max={limits.cdRate} />
        <NumberField label="MYGA annual rate (%)" hint="Assumed constant contract rate" value={fields.mygaRate} onChange={set('mygaRate')} max={limits.mygaRate} />
        <NumberField label="Marginal tax bracket (%)" hint="Federal income tax assumption" value={fields.taxRate} onChange={set('taxRate')} max={limits.taxRate} />
        <NumberField label="Time horizon (years)" hint="Whole years" value={fields.years} onChange={set('years')} max={limits.years} step="1" />
      </div>
      <h3>Fixed indexed annuity assumptions</h3>
      <div className="cd-replacement-strategies">
        <fieldset><legend>Simple FIA</legend><div className="planning-inputs">
          <label className="tool-field">Index strategy label<small>For your notes; does not change the math</small><input type="text" maxLength={80} value={simpleStrategy} onChange={event => setSimpleStrategy(event.target.value)} /></label>
          <NumberField label="Assumed index return (%)" hint="Same assumed return each year" value={fields.simpleIndexReturn} onChange={set('simpleIndexReturn')} max={limits.simpleIndexReturn} />
          <NumberField label="Index strategy multiplier" hint="Return × multiplier" value={fields.simpleMultiplier} onChange={set('simpleMultiplier')} max={limits.simpleMultiplier} />
        </div></fieldset>
        <fieldset><legend>Bonus FIA</legend><div className="planning-inputs">
          <NumberField label="Premium bonus (%)" hint="Credited at the start" value={fields.bonusPercent} onChange={set('bonusPercent')} max={limits.bonusPercent} />
          <label className="tool-field">Index strategy label<small>For your notes; does not change the math</small><input type="text" maxLength={80} value={bonusStrategy} onChange={event => setBonusStrategy(event.target.value)} /></label>
          <NumberField label="Assumed index return (%)" hint="Same assumed return each year" value={fields.bonusIndexReturn} onChange={set('bonusIndexReturn')} max={limits.bonusIndexReturn} />
          <NumberField label="Index strategy multiplier" hint="Return × multiplier" value={fields.bonusMultiplier} onChange={set('bonusMultiplier')} max={limits.bonusMultiplier} />
        </div></fieldset>
      </div>
      <fieldset className="cd-basis-choice"><legend>Bonus FIA tax-basis assumption</legend>
        <label><input type="radio" name="bonus-basis" checked={bonusInBasis} onChange={() => setBonusInBasis(true)} /> Include credited bonus in basis (matches the reference worksheet)</label>
        <label><input type="radio" name="bonus-basis" checked={!bonusInBasis} onChange={() => setBonusInBasis(false)} /> Use original premium only</label>
        <p className="tool-note">The reference worksheet treats the credited bonus as part of tax basis. That treatment may not apply to your contract. Confirm the actual basis with a tax professional before relying on the Bonus FIA after-tax figure.</p>
      </fieldset>
      {!valid && <p role="alert">Complete every field with a nonnegative number within its stated range. Time horizon must be a whole number from 1 to 30 years.</p>}
      {result && summary && <>
        <div className="cd-replacement-results" aria-live="polite"><h3>Results at the end of {input.years} years</h3><p>After modeled federal income taxes</p><div className="cd-replacement-cards">
          {summary.map(item => <div key={item.label}><small>{item.label}</small><strong>{dollars(item.value)}</strong><span>{item.note}</span>{item.label !== 'Bank CD' && <b>{item.value >= result.end.cd ? '+' : '−'}{dollars(Math.abs(item.value - result.end.cd))} vs. CD</b>}</div>)}
        </div></div>
        <div className="cd-replacement-summary"><h3>Comparison summary</h3><div className="planning-results">
          <div><small>Simple FIA extra vs. CD</small><strong>{dollars(result.end.simpleFia - result.end.cd)}</strong></div>
          <div><small>Bonus FIA extra vs. CD</small><strong>{dollars(result.end.bonusFia - result.end.cd)}</strong></div>
          <div><small>Simple FIA equivalent pretax CD rate</small><strong>{percent(result.simpleEquivalentCDRate)}</strong></div>
          <div><small>Bonus FIA equivalent pretax CD rate</small><strong>{percent(result.bonusEquivalentCDRate)}</strong></div>
          <div><small>Day-one bonus credit</small><strong>{dollars(result.bonus)}</strong></div>
        </div><p className="tool-note">Equivalent CD rates are the constant annual CD APYs that would produce the same modeled after-tax ending balance at the entered tax rate. They are not offered CD rates.</p></div>
        <div className="cd-replacement-table"><h3>Year-by-year growth</h3><p>CD values reflect annual tax on interest. Annuity values are gross until the final year; the ★ row shows each option after modeled tax.</p>
          <div className="planning-table"><table><caption>Illustrative year-end balances</caption><thead><tr><th scope="col">Year</th><th scope="col">Bank CD<br />(after tax)</th><th scope="col">MYGA<br />(gross / net at ★)</th><th scope="col">Simple FIA<br />(gross / net at ★)</th><th scope="col">Bonus FIA<br />(gross / net at ★)</th></tr></thead><tbody>
            {result.rows.map(row => <tr key={row.year}><th scope="row">{row.year}{row.year === input.years ? ' ★' : ''}</th><td>{dollars(row.cdAfterTax)}</td><td>{dollars(row.year === input.years ? result.end.myga : row.myga)}</td><td>{dollars(row.year === input.years ? result.end.simpleFia : row.simpleFia)}</td><td>{dollars(row.year === input.years ? result.end.bonusFia : row.bonusFia)}</td></tr>)}
          </tbody></table></div></div>
        <p className="tool-note">At these entries, simple FIA credited interest is modeled as {percent(result.simpleCredit * 100)} each year; bonus FIA credited interest is {percent(result.bonusCredit * 100)}. Actual indexed crediting depends on the contract formula and future index performance. A historical average multiplied by a strategy rate is not a contract illustration.</p>
        <p className="tool-note">If only the original {dollars(input.deposit)} premium is tax basis, the modeled Bonus FIA after-tax result would be {dollars(result.bonusAfterTaxWithOriginalBasis)}.</p>
      </>}
      <div className="cd-replacement-explainer"><h3>How the options differ</h3><div>
        <p><strong>Bank CD.</strong> The model reinvests interest after applying the entered federal tax rate each year. CDs at FDIC-insured banks may be insured within applicable limits; check your total deposits and CD terms.</p>
        <p><strong>MYGA.</strong> The model compounds the entered fixed rate and applies tax to gains at the end. A real contract may have rate guarantees for a different term, surrender charges, or a market value adjustment.</p>
        <p><strong>Simple FIA.</strong> The model credits the assumed index return multiplied by the entered rate every year. Actual index-linked interest can be zero and depends on contract terms that may change.</p>
        <p><strong>Bonus FIA.</strong> The model credits a bonus at the start, then compounds the assumed index credit. A bonus may be subject to vesting and other conditions; it is not necessarily an immediately withdrawable gain.</p>
      </div></div>
      <div className="cd-replacement-disclosure"><h3>Assumptions and limitations</h3><p>This is an educational arithmetic comparison, not an offer, a quote, or a recommendation. It assumes constant rates, no interim withdrawals, no fees, no surrender charges, no market value adjustment, no state tax, and the same federal marginal rate throughout. It does not model any actual insurer, contract, index history, cap, spread, participation-rate reset, renewal CD rate, or required minimum distribution. Annuities are not FDIC-insured and guarantees depend on the issuing insurer. A CD and an annuity have different liquidity, insurance, and tax features. Review the product disclosure and your tax situation before considering a replacement.</p>
        <p>Sources: <a href="https://www.fdic.gov/resources/deposit-insurance">FDIC deposit insurance</a> · <a href="https://www.irs.gov/publications/p575">IRS Publication 575</a> · <a href="https://content.naic.org/sites/default/files/publication-anb-lp-consumer-annuities-fixed.pdf">NAIC annuity buyer’s guide</a>.</p></div>
      <ReportActions targetId="cd-replacement" title="CD replacement comparison" disabled={!valid} />
      <ConsultationCTA label="Review my CD and annuity options" />
    </section>
    <p className="tool-note"><Link to="/planning-tools#cd">Compare bank CDs with one another →</Link></p>
  </div>;
}
