import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import ReportActions from '../components/ui/ReportActions';
import HelpHint from '../components/ui/HelpHint';
import { calculateCDReplacement, type CDReplacementInputs } from '../utils/cdReplacement';
import './PlanningTools.css';
import './CDReplacement.css';

const dollars = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const percent = (value: number | null) => value === null ? '—' : `${value.toFixed(2)}%`;

type NumericKey = Exclude<keyof CDReplacementInputs, 'bonusInBasis'>;
const defaults: Record<NumericKey, string> = {
  deposit: '100000', cdRate: '3.5', mygaRate: '4', taxRate: '22', years: '10',
  simpleIndexReturn: '7', simpleMultiplier: '0.5', bonusPercent: '18', bonusVestingYears: '10',
  bonusIndexReturn: '7', bonusMultiplier: '0.5',
};

function NumberField({ label, hint, help, value, onChange, max, step = 'any' }: {
  label: string; hint?: string; help?: string; value: string; onChange: (value: string) => void; max: number; step?: string;
}) {
  return <label className="tool-field">{label}<HelpHint text={help ?? hint ?? label}/>{hint && <small>{hint}</small>}
    <input type="number" min="0" max={max} step={step} value={value} onChange={event => onChange(event.target.value)} />
  </label>;
}

export default function CDReplacement() {
  const [fields, setFields] = useState(defaults);
  const [simpleStrategy, setSimpleStrategy] = useState('Illustrative index strategy');
  const [bonusStrategy, setBonusStrategy] = useState('Illustrative index strategy');
  const [bonusInBasis, setBonusInBasis] = useState(false);
  const set = (key: NumericKey) => (value: string) => setFields(current => ({ ...current, [key]: value }));
  const limits: Record<NumericKey, number> = {
    deposit: 100000000, cdRate: 30, mygaRate: 30, taxRate: 100, years: 30,
    simpleIndexReturn: 30, simpleMultiplier: 10, bonusPercent: 100, bonusVestingYears: 30,
    bonusIndexReturn: 30, bonusMultiplier: 10,
  };
  const valid = (Object.keys(defaults) as NumericKey[]).every(key => {
    const value = fields[key];
    const number = Number(value);
    return value.trim() !== '' && Number.isFinite(number) && number >= (key === 'years' || key === 'bonusVestingYears' ? 1 : 0)
      && number <= limits[key] && (!['years','bonusVestingYears'].includes(key) || Number.isInteger(number));
  });
  const input: CDReplacementInputs = {
    deposit: +fields.deposit, cdRate: +fields.cdRate, mygaRate: +fields.mygaRate,
    taxRate: +fields.taxRate, years: +fields.years,
    simpleIndexReturn: +fields.simpleIndexReturn, simpleMultiplier: +fields.simpleMultiplier,
    bonusPercent: +fields.bonusPercent, bonusVestingYears: +fields.bonusVestingYears, bonusIndexReturn: +fields.bonusIndexReturn,
    bonusMultiplier: +fields.bonusMultiplier, bonusInBasis,
  };
  const result = valid ? calculateCDReplacement(input) : null;
  const summary = result && [
    { label: 'Bank CD', value: result.end.cd },
    { label: 'MYGA', value: result.end.myga },
    { label: 'Simple FIA', value: result.end.simpleFia },
    { label: 'Bonus FIA', value: result.end.bonusFia },
  ];

  return <div className="planning-page cd-replacement-page">
    <Helmet><title>CD Replacement Comparison | Broussard Financial Services</title>
      <meta name="description" content="Compare a bank CD, MYGA, and fixed indexed annuity scenarios with editable rates, tax assumptions, and a year-by-year table." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/cd-replacement" /></Helmet>
    <header className="planning-intro"><span>COMPARE THE TRADEOFFS</span><h1>Could another option <em>fit your CD dollars?</em></h1>
      <p>Compare a bank CD, a fixed annuity (MYGA), and two fixed indexed annuity scenarios. Enter your figures to see the year-by-year results.</p>
    </header>
    <section className="planning-card" id="cd-replacement" aria-labelledby="replacement-title">
      <span>01 · ENTER YOUR SCENARIO</span><h2 id="replacement-title">CD replacement comparison <HelpHint text="Enter the same deposit for a bank CD, MYGA, Simple FIA, and Bonus FIA. Set rates and tax assumptions, then compare after-tax ending values and annual balances." /></h2>
      <p>Enter an after-tax deposit, annual rates, a federal tax rate, and a holding period. The results apply the rates you enter each year.</p>
      <div className="planning-inputs cd-replacement-inputs">
        <NumberField label="Initial deposit ($)" hint="Amount being placed" help="Enter the after-tax amount to compare across all four options." value={fields.deposit} onChange={set('deposit')} max={limits.deposit} />
        <NumberField label="CD annual rate (%)" hint="Assumed constant bank APY" help="Enter the CD annual percentage yield, such as 3.5 for 3.5%. The model repeats this APY for every year." value={fields.cdRate} onChange={set('cdRate')} max={limits.cdRate} />
        <NumberField label="MYGA annual rate (%)" hint="Assumed constant contract rate" help="Enter the fixed annual MYGA rate as a percentage; the model compounds it through the full period." value={fields.mygaRate} onChange={set('mygaRate')} max={limits.mygaRate} />
        <NumberField label="Marginal tax bracket (%)" hint="Federal income tax assumption" help="Enter the federal rate used to estimate tax on interest or gains. For example, enter 24 for 24%." value={fields.taxRate} onChange={set('taxRate')} max={limits.taxRate} />
        <NumberField label="Time horizon (years)" hint="Whole years" help="Enter how many complete years to hold the money before comparing the ending balances." value={fields.years} onChange={set('years')} max={limits.years} step="1" />
      </div>
      <h3>Fixed indexed annuity assumptions <HelpHint text="Set the bonus, vesting period, assumed annual index return, and multiplier. The bonus may be credited at the start but only the vested portion enters the comparison result." /></h3>
      <div className="cd-replacement-strategies">
        <fieldset><legend>Simple FIA <HelpHint text="Model an FIA without a starting premium bonus. Enter a return assumption and multiplier to calculate annual credited growth." /></legend><div className="planning-inputs">
          <label className="tool-field">Index strategy label<HelpHint text="Name the strategy for your report. This text does not change any calculation."/><small>For your notes; does not change the math</small><input type="text" maxLength={80} value={simpleStrategy} onChange={event => setSimpleStrategy(event.target.value)} /></label>
          <NumberField label="Assumed index return (%)" hint="Same assumed return each year" help="Enter the annual index return to test, such as 7 for 7%. The multiplier determines how much of this input is credited in the model." value={fields.simpleIndexReturn} onChange={set('simpleIndexReturn')} max={limits.simpleIndexReturn} />
          <NumberField label="Index strategy multiplier" hint="1 = use the full assumed return; 0 = no credited growth" help="Enter 1 to model the full entered index return, 0.5 for half, or 0 for no credited growth. This is multiplication, not an added bonus." value={fields.simpleMultiplier} onChange={set('simpleMultiplier')} max={limits.simpleMultiplier} />
        </div></fieldset>
        <fieldset><legend>Bonus FIA <HelpHint text="Model a first-year premium bonus that vests evenly over the entered period. The full bonus is shown in account value; the vested portion is used in the comparison." /></legend><div className="planning-inputs">
          <NumberField label="Premium bonus (%)" hint="18% California example, age 75 or younger" help="The starting 18% is from F&G Performance Pro’s 2026 California example for issue ages 75 or younger. Change it to the actual quoted bonus for the client's age, state, and product." value={fields.bonusPercent} onChange={set('bonusPercent')} max={limits.bonusPercent} />
          <NumberField label="Bonus vesting period (years)" hint="10% vests at each year-end when set to 10" help="Enter the number of years for the bonus to become fully vested. The starting 10-year schedule models 10% vesting at the end of each year." value={fields.bonusVestingYears} onChange={set('bonusVestingYears')} max={limits.bonusVestingYears} step="1" />
          <label className="tool-field">Index strategy label<HelpHint text="Name the strategy for your report. This text does not change any calculation."/><small>For your notes; does not change the math</small><input type="text" maxLength={80} value={bonusStrategy} onChange={event => setBonusStrategy(event.target.value)} /></label>
          <NumberField label="Assumed index return (%)" hint="Same assumed return each year" help="Enter the annual index return to test. The multiplier scales this number before growth is calculated." value={fields.bonusIndexReturn} onChange={set('bonusIndexReturn')} max={limits.bonusIndexReturn} />
          <NumberField label="Index strategy multiplier" hint="1 = use the full assumed return; 0 = no credited growth" help="Enter 1 for the full assumed return, 0.5 for half, or 0 for zero modeled growth after the bonus." value={fields.bonusMultiplier} onChange={set('bonusMultiplier')} max={limits.bonusMultiplier} />
        </div></fieldset>
      </div>
      {result && (input.simpleMultiplier === 0 || input.bonusMultiplier === 0) &&
        <p className="cd-zero-multiplier-note" role="status">
          A multiplier of 0 makes the modeled index credit 0%, even when an assumed index return is entered.
          {input.simpleMultiplier === 0 && ' Simple FIA will not grow from index crediting.'}
          {input.bonusMultiplier === 0 && ' Bonus FIA will receive only the vested portion of the entered bonus.'}
          {' '}Enter 1 to use the full assumed return.
        </p>}
      <fieldset className="cd-basis-choice"><legend>Bonus FIA tax-basis assumption <HelpHint text="Choose whether the model treats only the deposit or both the deposit and credited bonus as tax basis. This changes the after-tax Bonus FIA result, not its gross balance." /></legend>
        <label><input type="radio" name="bonus-basis" checked={!bonusInBasis} onChange={() => setBonusInBasis(false)} /> Use original premium only (default)</label>
        <label><input type="radio" name="bonus-basis" checked={bonusInBasis} onChange={() => setBonusInBasis(true)} /> Include credited bonus in basis (reference worksheet assumption)</label>
      </fieldset>
      {!valid && <p role="alert">Complete every field within its stated range. Time horizon and bonus vesting period must be whole numbers from 1 to 30 years.</p>}
      {result && summary && <>
        <div className="cd-replacement-results" aria-live="polite"><h3>After-tax results at the end of {input.years} years <HelpHint text="Each card shows the ending balance after the entered tax rate. The Bonus FIA result uses the vested portion of its bonus and growth on that portion. Contract withdrawal charges are not subtracted." /></h3><div className="cd-replacement-cards">
          {summary.map(item => <div key={item.label}><small>{item.label}</small><strong>{dollars(item.value)}</strong>{item.label !== 'Bank CD' && <b>{item.value >= result.end.cd ? '+' : '−'}{dollars(Math.abs(item.value - result.end.cd))} vs. CD</b>}</div>)}
        </div></div>
        <div className="cd-replacement-summary"><h3>Comparison summary <HelpHint text="Read the dollar difference versus the CD, the equivalent pretax CD rate, and the bonus credited at the start. A negative difference means the modeled option ends below the CD." /></h3><div className="planning-results">
          <div><small>Simple FIA extra vs. CD</small><strong>{dollars(result.end.simpleFia - result.end.cd)}</strong></div>
          <div><small>Bonus FIA extra vs. CD</small><strong>{dollars(result.end.bonusFia - result.end.cd)}</strong></div>
          <div><small>Simple FIA equivalent pretax CD rate</small><strong>{percent(result.simpleEquivalentCDRate)}</strong></div>
          <div><small>Bonus FIA equivalent pretax CD rate</small><strong>{percent(result.bonusEquivalentCDRate)}</strong></div>
          <div><small>Day-one bonus credit</small><strong>{dollars(result.bonus)}</strong></div>
          <div><small>Bonus vested at year {input.years}</small><strong>{percent(result.rows.at(-1)!.bonusVestedPercent * 100)}</strong></div>
        </div></div>
        <div className="cd-replacement-table"><h3>Year-by-year growth <HelpHint text="The Bonus FIA account column includes the whole credited bonus. The vested column shows the modeled portion available for comparison; its final starred value includes the selected tax-basis calculation." /></h3><p>CD values reflect annual tax on interest. Annuity values are gross until the final year; the ★ row shows each option after modeled tax. The bonus account and vested values can differ before full vesting.</p>
          <div className="planning-table"><table><caption>Year-end balances from entered values</caption><thead><tr><th scope="col">Year</th><th scope="col">Bank CD<br />(after tax)</th><th scope="col">MYGA<br />(gross / net at ★)</th><th scope="col">Simple FIA<br />(gross / net at ★)</th><th scope="col">Bonus FIA account<br />(gross)</th><th scope="col">Bonus FIA vested<br />(gross / net at ★)</th></tr></thead><tbody>
            {result.rows.map(row => <tr key={row.year}><th scope="row">{row.year}{row.year === input.years ? ' ★' : ''}</th><td>{dollars(row.cdAfterTax)}</td><td>{dollars(row.year === input.years ? result.end.myga : row.myga)}</td><td>{dollars(row.year === input.years ? result.end.simpleFia : row.simpleFia)}</td><td>{dollars(row.bonusFia)}</td><td>{dollars(row.year === input.years ? result.end.bonusFia : row.bonusFiaVested)}</td></tr>)}
          </tbody></table></div></div>
        <p className="tool-note">At these entries, simple FIA credited interest is {percent(result.simpleCredit * 100)} each year; bonus FIA credited interest is {percent(result.bonusCredit * 100)}.</p>
        {bonusInBasis && <p className="tool-note">If only the original {dollars(input.deposit)} premium is tax basis, the modeled Bonus FIA after-tax result would be {dollars(result.bonusAfterTaxWithOriginalBasis)}.</p>}
      </>}
      <div className="cd-replacement-explainer"><h3>How the options differ</h3><div>
        <p><strong>Bank CD.</strong> Interest is reinvested after applying the entered federal tax rate each year.</p>
        <p><strong>MYGA.</strong> The entered fixed rate compounds; tax is applied to gains at the end.</p>
        <p><strong>Simple FIA.</strong> The entered index return is multiplied by the strategy multiplier each year.</p>
        <p><strong>Bonus FIA.</strong> The entered bonus is added at the start and earns the entered index credit. The comparison uses the vested portion based on the entered vesting period.</p>
      </div></div>
      <ReportActions targetId="cd-replacement" title="CD replacement comparison" disabled={!valid} showReportFooter={false} />
      <ConsultationCTA label="Review my CD and annuity options" />
    </section>
    <p className="tool-note"><Link to="/planning-tools#cd">Compare bank CDs with one another →</Link></p>
  </div>;
}
