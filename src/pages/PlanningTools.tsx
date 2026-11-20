import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { incomeGap } from '../utils/planning';
import './PlanningTools.css';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import LeadReviewForm from '../components/ui/LeadReviewForm';
import CDCalculator from '../components/sections/CDCalculator';
import {historicalDeclines} from '../utils/historicalDeclines';
import CompoundCalculator from '../components/sections/CompoundCalculator';
import ReportActions from '../components/ui/ReportActions';
import HelpHint from '../components/ui/HelpHint';

const money = (n: number) => n.toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});
const fieldHelp:Record<string,string> = {
  expenses:'Enter expected monthly living costs after tax, such as housing, food, utilities, and transportation.',
  pension:'Enter monthly pension income you expect after deductions, not the annual amount.',
  social:'Enter the monthly Social Security benefit you expect at your chosen claiming age.',
  other:'Enter other dependable monthly income, excluding the pension and Social Security already entered.',
  balance:'Enter the current balance of the investment account you want to discuss.',
  decline:'Choose a hypothetical percentage drop for the full account. This is a what-if question, not a prediction of how your holdings will perform.',
};
function Field({label,help,value,onChange,max=100000000,suffix=''}:{label:string;help?:string;value:string;onChange:(s:string)=>void;max?:number;suffix?:string}) {
  return <label className="tool-field">{label}<HelpHint text={help ?? label}/>{suffix && <small>{suffix}</small>}<input type="number" min="0" max={max} step="any" value={value} onChange={e=>onChange(e.target.value)} /></label>;
}
export default function PlanningTools() {
  useEffect(()=>{if(window.location.hash){document.getElementById(window.location.hash.slice(1))?.scrollIntoView();}else{window.scrollTo(0,0);}},[]);
  const [income,setIncome]=useState({expenses:'6000',pension:'2000',social:'2500',other:'0'});
  const [market,setMarket]=useState({balance:'500000',decline:'30'});
  const [historical,setHistorical]=useState('custom');
  const valid = (o:Record<string,string>, limits:Record<string,number>={})=>Object.entries(o).every(([k,v])=>v.trim()!=='' && Number.isFinite(Number(v)) && Number(v)>=0 && Number(v)<=(limits[k]??100000000));
  const incomeValid=valid(income);
  const gap=incomeGap(+income.expenses,+income.pension,+income.social,+income.other);
  const marketValid=valid(market,{decline:100});
  const amountLost=+market.balance*+market.decline/100;
  const afterDecline=+market.balance-amountLost;
  const selectedHistory=historicalDeclines.find(event=>event.peak===historical);
  return <div className="planning-page">
    <Helmet><title>Retirement Planning Tools | Broussard Financial Services</title><meta name="description" content="Free retirement calculators for income gaps, compound growth, CD comparisons, and market decline scenarios. No signup required."/><link rel="canonical" href="https://www.broussardfinancialservices.com/planning-tools"/></Helmet>
    <header className="planning-intro"><span>EXPLORE YOUR RETIREMENT</span><h1>See how your choices<br/><em>could shape your income.</em></h1><p>Explore income, investment risk and savings—or start with our dedicated federal retirement tools. No signup required. The amounts entered here are calculated in your browser and are not submitted to us.</p></header>
    <nav className="tool-directory" aria-label="Start with a planning tool">
      <Link to="/federal-planning"><strong>Federal retirement</strong><small>Explore pension, eligibility, paycheck and survivor decisions →</small></Link>
      <Link to="/know-your-paycheck"><strong>Know Your Paycheck</strong><small>Understand every major part of a federal Leave and Earnings Statement →</small></Link>
      <a href="#gap"><strong>Retirement income</strong><small>Find the gap between monthly income and expenses →</small></a>
      <a href="#market"><strong>Market decline</strong><small>See a possible account loss and consider your comfort with it →</small></a>
      <a href="#savings"><strong>Savings &amp; CDs</strong><small>Compare compound growth and CD choices →</small></a>
    </nav>
    <details className="more-tools"><summary>Explore more tools and guides</summary><nav aria-label="More planning tools and guides" className="more-tools-grid"><Link to="/cd-replacement">CD replacement comparison →</Link><Link to="/estate-planning-checklist">Estate-planning checklist →</Link><Link to="/annuity-education">Annuity education →</Link><Link to="/learning-library#bucket-strategy">Bucket strategy →</Link><Link to="/learning-library#three-legged-stool">Three-legged stool →</Link><Link to="/learning-library">Learning library →</Link><Link to="/tax-planning">2026 tax reference &amp; estimator →</Link><Link to="/medicare-irmaa">Medicare IRMAA calculator →</Link><a href="#risk-diversification">Risk &amp; Diversification →</a><Link to="/federal-resources">Official federal resources →</Link></nav></details>
    <section className="federal-planning-teaser" aria-labelledby="federal-planning-teaser-title">
      <div><span>FOR FEDERAL EMPLOYEES</span><h2 id="federal-planning-teaser-title">Your benefits deserve a plan.</h2><p>Get help with retirement paperwork, TSP decisions, and the income your benefits need to provide.</p></div>
      <Link to="/federal-planning#federal-guidance">Explore federal retirement guidance →</Link>
    </section>
    <section className="planning-card risk-section" id="risk-diversification" aria-labelledby="risk-diversification-title"><span>UNDERSTAND THE TRADEOFFS</span><h2 id="risk-diversification-title">Risk &amp; Diversification</h2>
      <a className="risk-graphic-link" href="/images/investment-diversification.png" target="_blank" rel="noopener noreferrer" aria-label="Open the investment diversification graphic at full size">
        <img src="/images/investment-diversification.png" width="2562" height="1442" loading="lazy" alt="Investment diversification graphic: protected and at-risk categories across banks and credit unions, insurance companies, traditional investments, and alternatives." />
      </a>
      <p className="tool-note">Select the image to view it at full size. Protections and risks vary by product and account.</p>
    </section>
    <section className="planning-card" id="gap" aria-labelledby="gap-title"><span>01 · YOUR MONTHLY PICTURE</span><h2 id="gap-title">Retirement income gap <HelpHint text="Enter monthly after-tax spending and income. The calculator subtracts income from spending to show a monthly gap or surplus and annualizes it." /></h2><p>Use monthly amounts in today’s dollars, after taxes. Include all spending you expect in retirement.</p>
      <div className="planning-inputs">{Object.entries({expenses:'Monthly expenses',pension:'Monthly pension income',social:'Monthly Social Security income',other:'Other monthly income'}).map(([k,label])=><Field key={k} label={label} help={fieldHelp[k]} value={income[k as keyof typeof income]} onChange={v=>setIncome({...income,[k]:v})}/>)}</div>
      {!incomeValid?<p role="alert">Enter nonnegative amounts up to $100 million in every field.</p>:<div className="planning-results" aria-live="polite"><div><small>Total monthly income</small><strong>{money(gap.income)}</strong></div><div><small>{gap.gap>0?'Monthly income gap':gap.surplus>0?'Monthly surplus':'Monthly income matches expenses'}</small><strong>{money(gap.gap||gap.surplus)}</strong></div><div><small>{gap.gap>0?'Annual income gap':gap.surplus>0?'Annual surplus':'Annual balance'}</small><strong>{money((gap.gap||gap.surplus)*12)}</strong></div></div>}
      <p className="tool-note">A gap is the amount you would need from savings or other sources. A surplus does not establish that your retirement plan is sufficient. This snapshot does not project future changes in income, expenses, or taxes.</p>
      <ReportActions targetId="gap" title="Retirement income gap" disabled={!incomeValid} />
      <LeadReviewForm topic="Retirement income review" />
      <ConsultationCTA label="Discuss my retirement income" />
    </section>
    <section className="planning-card market-simple" id="market" aria-labelledby="market-title">
      <span>02 · A SIMPLE WHAT-IF</span>
      <h2 id="market-title">What if your account declined? <HelpHint text="Enter an account balance and choose a hypothetical full-account decline. The illustration shows the immediate dollar change only." /></h2>
      <p>This is one question to discuss: <strong>Would you be comfortable if this happened to your account?</strong></p>
      <div className="planning-inputs">
        <Field label="Current account balance ($)" help={fieldHelp.balance} value={market.balance} onChange={v=>setMarket(current=>({...current,balance:v}))}/>
        <Field label="What if it declined by (%)" help={fieldHelp.decline} value={market.decline} max={100} onChange={v=>{setHistorical('custom');setMarket(current=>({...current,decline:v}));}}/>
      </div>
      <div className="stress-presets" role="group" aria-label="Hypothetical full-account declines">{[20,30,40].map(decline=><button type="button" className="tool-button" key={decline} aria-pressed={historical==='custom'&&Number(market.decline)===decline} onClick={()=>{setHistorical('custom');setMarket(current=>({...current,decline:String(decline)}));}}>{decline}% decline</button>)}</div>
      <label className="tool-field market-history">Choose a past market decline <HelpHint text="Choose an S&P price-index peak-to-trough decline from the historical list. Its percentage fills the what-if field above; it does not represent the return of your own account."/><select value={historical} onChange={e=>{const peak=e.target.value;setHistorical(peak);const event=historicalDeclines.find(item=>item.peak===peak);if(event)setMarket(current=>({...current,decline:String(event.loss)}));}}><option value="custom">Custom decline</option>{historicalDeclines.map(event=><option key={event.peak} value={event.peak}>{event.event} · {event.peak}–{event.trough} · −{event.loss}%</option>)}</select></label>
      {selectedHistory&&<p className="market-history-note">The S&amp;P price index fell {selectedHistory.loss}% from {selectedHistory.peak} to {selectedHistory.trough}. The illustration applies that percentage to the account amount you entered; it does not replay the event or show what your holdings would have done.</p>}
      {!marketValid?<p role="alert">Enter an account balance from $0 to $100 million and a decline from 0% to 100%.</p>:<div className="market-simple-result" aria-live="polite">
        <div className="market-visual-head"><span>SEE THE CHANGE</span><h3>Same account. One hypothetical drop.</h3></div>
        <div className="market-visual-bars">
          <div className="market-visual-row"><div><span className="market-visual-dot market-green"/>Account today</div><div className="market-visual-track"><span className="market-green" style={{width:'100%'}}/></div><strong>{money(+market.balance)}</strong></div>
          <div className="market-visual-row"><div><span className="market-visual-dot market-blue"/>After the drop</div><div className="market-visual-track"><span className="market-blue" style={{width:`${100-Number(market.decline)}%`}}/></div><strong>{money(afterDecline)}</strong></div>
          <div className="market-visual-row"><div><span className="market-visual-dot market-rust"/>Amount lost</div><div className="market-visual-track"><span className="market-rust" style={{width:`${Number(market.decline)}%`}}/></div><strong>−{money(amountLost)}</strong></div>
        </div>
        <h3>Would you be okay if this happened?</h3>
        <p>If this loss would change your plans or keep you up at night, that is worth discussing with an advisor.</p>
      </div>}
      <p className="tool-note">The dropdown uses historical S&amp;P price-index declines, including 22 bear markets and four notable corrections through 2022. <a href="https://yardeni.com/wp-content/uploads/BullBearTables.pdf" target="_blank" rel="noopener noreferrer">Source: Yardeni Research, January 2024, pp. 4–6.</a> Your actual investments may rise or fall differently. This what-if applies one decline to the entire entered amount and does not model withdrawals, recovery, taxes, fees, or an annuity contract.</p>
      <ReportActions targetId="market" title="Market decline conversation" disabled={!marketValid} />
      <ConsultationCTA label="Talk through my market comfort" />
    </section>
    <div id="savings"><CompoundCalculator /></div>
    <CDCalculator />
    <section className="planning-next"><h2>Put the numbers in context.</h2><p>Discuss your income needs, current accounts, trusts, life insurance, annuity options, or real estate goals in a complimentary consultation.</p><a href="/book">Request a free consultation →</a></section>
  </div>;
}
