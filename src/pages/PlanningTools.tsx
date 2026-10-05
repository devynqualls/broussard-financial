import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CALENDLY_URL } from '../config/site';
import { incomeGap, simulate } from '../utils/planning';
import './PlanningTools.css';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import CDCalculator from '../components/sections/CDCalculator';
import {historicalDeclines} from '../utils/historicalDeclines';
import CompoundCalculator from '../components/sections/CompoundCalculator';

const money = (n: number) => n.toLocaleString('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});
function Field({label,value,onChange,max=100000000,suffix=''}:{label:string;value:string;onChange:(s:string)=>void;max?:number;suffix?:string}) {
  return <label className="tool-field">{label}{suffix && <small>{suffix}</small>}<input type="number" min="0" max={max} step="any" value={value} onChange={e=>onChange(e.target.value)} /></label>;
}
export default function PlanningTools() {
  useEffect(()=>{if(window.location.hash){document.getElementById(window.location.hash.slice(1))?.scrollIntoView();}else{window.scrollTo(0,0);}},[]);
  const [historical,setHistorical]=useState('custom');
  const [income,setIncome]=useState({expenses:'6000',pension:'2000',social:'2500',other:'0'});
  const [market,setMarket]=useState({balance:'500000',exposed:'60',decline:'30',withdrawal:'24000',growth:'4',inflation:'2'});
  const valid = (o:Record<string,string>, limits:Record<string,number>={})=>Object.entries(o).every(([k,v])=>v.trim()!=='' && Number.isFinite(Number(v)) && Number(v)>=0 && Number(v)<=(limits[k]??100000000));
  const incomeValid=valid(income); const marketValid=valid(market,{exposed:100,decline:100,growth:20,inflation:20});
  const gap=incomeGap(+income.expenses,+income.pension,+income.social,+income.other);
  const run=(year:number)=>simulate(+market.balance,+market.exposed,+market.decline,+market.withdrawal,+market.growth,+market.inflation,year);
  const early=marketValid?run(1):[]; const later=marketValid?run(10):[]; const base=marketValid?run(0):[];
  const series=[{name:'No decline',color:'#556f57',rows:base},{name:'Decline in year 1',color:'#b05436',rows:early},{name:'Decline in year 10',color:'#315c86',rows:later}];
  const scale=marketValid?Math.max(1,...series.flatMap(s=>s.rows.map(r=>r.balance))):1;
  return <div className="planning-page">
    <Helmet><title>Retirement Planning Tools | Broussard Financial Services</title><meta name="description" content="Explore your retirement income gap and hypothetical market declines with free interactive planning tools. No account or contact details required."/><link rel="canonical" href="https://www.broussardfinancialservices.com/planning-tools"/></Helmet>
    <header className="planning-intro"><span>EXPLORE YOUR RETIREMENT</span><h1>See how your choices<br/><em>could shape your income.</em></h1><p>Explore income, investment risk and savings—or start with our dedicated federal retirement tools. No signup required. The amounts entered here are calculated in your browser and are not submitted to us.</p></header><nav className="tool-directory" aria-label="Choose a planning tool"><Link to="/federal-planning"><strong>Federal retirement center</strong><small>Regular &amp; special-category FERS: pension, eligibility, paycheck &amp; survivors →</small></Link><a href="#gap">Retirement income gap →</a><a href="#market">TSP &amp; market withdrawal stress test →</a><a href="#savings">Compound growth &amp; CD comparison →</a><Link to="/estate-planning-checklist">Estate-planning checklist →</Link><Link to="/annuity-education">Annuity education →</Link><Link to="/learning-library#bucket-strategy">Bucket strategy illustrated →</Link><Link to="/learning-library#three-legged-stool">Three-legged stool illustrated →</Link><Link to="/learning-library">Retirement learning library →</Link><Link to="/tax-planning">2026 tax reference &amp; estimator →</Link><Link to="/federal-resources">Official federal employee resources →</Link></nav><p className="tool-note">Air traffic controllers, law enforcement officers, firefighters and other covered employees: <Link to="/federal-planning#eligibility">select your retirement coverage in the federal calculator</Link>. Its pension estimate also updates the paycheck and survivor tools. The general calculators below use your entered amounts; they do not determine pension eligibility, TSP early-withdrawal tax exceptions or supplement benefits.</p><button className="tool-button" onClick={()=>window.print()}>Print / save results</button>
    <section className="planning-card" id="gap" aria-labelledby="gap-title"><span>01 · YOUR MONTHLY PICTURE</span><h2 id="gap-title">Retirement income gap</h2><p>Use monthly amounts in today’s dollars, after taxes. Include all spending you expect in retirement.</p>
      <div className="planning-inputs">{Object.entries({expenses:'Monthly expenses',pension:'Monthly pension income',social:'Monthly Social Security income',other:'Other monthly income'}).map(([k,label])=><Field key={k} label={label} value={income[k as keyof typeof income]} onChange={v=>setIncome({...income,[k]:v})}/>)}</div>
      {!incomeValid?<p role="alert">Enter nonnegative amounts up to $100 million in every field.</p>:<div className="planning-results" aria-live="polite"><div><small>Total monthly income</small><strong>{money(gap.income)}</strong></div><div><small>{gap.gap>0?'Monthly income gap':'Monthly surplus'}</small><strong>{money(gap.gap||gap.surplus)}</strong></div><div><small>{gap.gap>0?'Annual income gap':'Annual surplus'}</small><strong>{money((gap.gap||gap.surplus)*12)}</strong></div></div>}
      <p className="tool-note">A gap is the amount you would need from savings or other sources. A surplus does not establish that your retirement plan is sufficient. This snapshot does not project future changes in income, expenses, or taxes.</p>
      <ConsultationCTA label="Discuss my retirement income" />
    </section>
    <section className="planning-card" id="market" aria-labelledby="market-title"><span>02 · EXPLORE A WHAT-IF</span><h2 id="market-title">TSP &amp; market-decline simulator</h2><p>Explore a TSP or other investment account with the same hypothetical decline early or later in a 25-year retirement. This does not model individual TSP funds or their actual returns.</p>
      <h3>Stress-test the next downturn</h3>
      <p>Try a hypothetical decline in the exposed portion of your account. These are planning scenarios, not predictions.</p>
      <div className="stress-presets" role="group" aria-label="Hypothetical decline scenarios">{[20,35,50].map(decline=><button type="button" className="tool-button" key={decline} aria-pressed={historical==='custom'&&Number(market.decline)===decline} onClick={()=>{setHistorical('custom');setMarket(current=>({...current,decline:String(decline)}));}}>{decline}% decline</button>)}</div>
      <p className="tool-note">For TSP participants: these are stock-market scenarios, not actual TSP fund returns. Your account's response depends on the investments you hold and the share exposed to the modeled loss. The simulator applies the decline only to the percentage you enter as exposed; it does not automatically apply it to your entire TSP balance.</p>
      <label className="tool-field">Historical decline<select value={historical} onChange={e=>{setHistorical(e.target.value);const h=historicalDeclines.find(v=>v.peak===e.target.value);if(h)setMarket({...market,decline:String(h.loss)});}}><option value="custom">Custom decline</option>{historicalDeclines.map(h=><option key={h.peak} value={h.peak}>{h.event} · {h.peak} – {h.trough} · −{h.loss}%{h.loss<20?' (correction)':''}</option>)}</select></label>
      {historicalDeclines.filter(h=>h.peak===historical).map(h=><div key={h.peak} aria-live="polite"><h3>{h.event}</h3><p>{h.peak} – {h.trough} · <strong>−{h.loss}% peak-to-trough decline</strong></p><p className="tool-note">The event name describes the historical setting, not a single proven cause. The loss covers the entire period shown, not just one day. Market dates may differ from recession dates. <a href="https://www.federalreservehistory.org/essays/federal-reserve-history">Historical context: Federal Reserve History.</a></p></div>)}
 <p className="tool-note">Includes 22 U.S. bear markets (1929–2022) and four notable corrections. Peak-to-trough S&amp;P price-index losses exclude dividends; early history predates the modern S&amp;P 500. <a href="https://yardeni.com/wp-content/uploads/BullBearTables.pdf">Source: Yardeni Research, January 2024, pages 4–6.</a> This is not a live market feed.</p><p className="tool-note">Selecting history applies only its loss percentage in one simulation year. It does not replay the event’s duration or recovery, or represent your actual holdings.</p>
 <div className="planning-inputs">{Object.entries({balance:'Starting account balance',exposed:'Share exposed to the decline (%)',decline:'Decline in the exposed share (%)',withdrawal:'First-year withdrawal ($)',growth:'Annual return in other years (%)',inflation:'Annual withdrawal increase (%)'}).map(([k,label])=><Field key={k} label={label} value={market[k as keyof typeof market]} max={k==='exposed'||k==='decline'?100:k==='growth'||k==='inflation'?20:100000000} onChange={v=>{setMarket({...market,[k]:v});if(k==='decline')setHistorical('custom');}}/>)}</div>
      {!marketValid?<p role="alert">Complete every field. Percentages must be 0–100%; annual return and withdrawal increase must be 0–20%. Dollar amounts must be 0–$100 million.</p>:<>
        <div className="decline-impact" aria-live="polite">
          <span>WHAT A LOSS COULD MEAN FOR YOUR ACCOUNT</span>
          <h3>Understand the loss. Plan for the recovery.</h3>
          <div className="decline-impact-grid">
            <div><small>Decline in the exposed share</small><strong>−{Number(market.decline).toLocaleString('en-US',{maximumFractionDigits:2})}%</strong></div>
            <div><small>Loss across your full account</small><strong>−{(+market.exposed*+market.decline/100).toLocaleString('en-US',{maximumFractionDigits:2})}%</strong><small>{money(+market.balance*+market.exposed/100*+market.decline/100)} of your starting balance</small></div>
            <div><small>Gain needed to recover that loss</small><strong>{+market.exposed*+market.decline/100>=100?'No balance left':`+${((+market.exposed*+market.decline/100)/(100-+market.exposed*+market.decline/100)*100).toLocaleString('en-US',{maximumFractionDigits:2})}%`}</strong><small>Before any withdrawals, fees, or taxes</small></div>
          </div>
          <p>A 50% loss needs a 100% gain to break even. Continuing withdrawals can make recovery harder.</p>
          <p className="tool-note">These percentages use your selected decline and exposure. They show an immediate shock to the starting balance, before withdrawals—not a prediction or a measure of your actual risk. With a total loss, recovery requires new money.</p>
        </div>
        <div className="chart-legend">{series.map(s=><span key={s.name} style={{color:s.color}}>━ {s.name}</span>)}</div>
        <svg className="planning-chart" viewBox="0 0 760 300" role="img" aria-label="Projected account balances over 25 years. Exact annual figures are available in the table below.">
          {[0,.5,1].map(f=><g key={f}><line x1="85" x2="735" y1={250-f*210} y2={250-f*210} stroke="#ddd"/><text x="5" y={254-f*210}>{money(scale*f)}</text></g>)}
          {series.map((s,i)=><polyline key={s.name} fill="none" stroke={s.color} strokeWidth="3" strokeDasharray={i===1?'8 4':i===2?'3 3':undefined} points={s.rows.map(r=>`${85+r.year/25*650},${250-r.balance/scale*210}`).join(' ')}/>)}
          {[0,5,10,15,20,25].map(y=><text key={y} x={85+y/25*650} y="278" textAnchor="middle">Year {y}</text>)}
        </svg>
        <div className="planning-results" aria-live="polite">{series.map(s=><div key={s.name}><small>{s.name} · year 25</small><strong>{money(s.rows[25].balance)}</strong><small>{s.rows.find(r=>r.year>0&&r.balance===0)?`Account reaches $0 in year ${s.rows.find(r=>r.year>0&&r.balance===0)!.year}`:'Balance remains above $0'} · Unfunded withdrawals: {money(s.rows.reduce((n,r)=>n+r.shortfall,0))}</small></div>)}</div>
        <details><summary>View annual account balances</summary><div className="planning-table"><table><caption>Year-end balances after returns and withdrawals, in future dollars</caption><thead><tr><th>Year</th>{series.map(s=><th key={s.name}>{s.name}</th>)}</tr></thead><tbody>{base.map((r,i)=><tr key={r.year}><th>{r.year}</th>{series.map(s=><td key={s.name}>{money(s.rows[i].balance)}</td>)}</tr>)}</tbody></table></div></details>
      </>}
      <p className="tool-note">Illustration only, not a forecast or an account analysis. The decline applies only to the selected share; the rest is unchanged during that year. The decline replaces the normal annual return that year. In other years, the selected return applies to the entire account. Returns occur before year-end withdrawals; withdrawals increase annually at the selected rate. No contributions, fees, taxes, rebalancing, or product guarantees are modeled. Balances cannot fall below zero; unfunded withdrawals are shown separately. Dollar results are not adjusted for inflation. Real returns vary and losses can recur.</p>
      <p className="tool-note">These are hypothetical investment-account scenarios, not annuity illustrations. Annuity income and guarantees require an actual contract review.</p>
      <h3>Could you cover expenses without selling investments during a downturn?</h3>
      <p>Start with the gap between your spending and available income. Then use the bucket worksheet to organize reserves and plan where withdrawals could come from.</p>
      <p><a href="#gap">Calculate my retirement income gap →</a></p>
      <p><a href="/resources/retirement/broussard-bucket-strategy-worksheet.pdf" download>Download the fillable bucket worksheet (PDF)</a> · <Link to="/learning-library#bucket-strategy">Explore the bucket strategy →</Link></p>
      <ConsultationCTA label="Review my retirement risk" />
    </section>
    <div id="savings"><CompoundCalculator /></div>
    <CDCalculator />
    <section className="planning-next"><h2>Put the numbers in context.</h2><p>Discuss your income needs, current accounts, trusts, life insurance, annuity options, or real estate goals in a complimentary consultation.</p><a href={CALENDLY_URL}>Schedule a free consultation →</a></section>
  </div>;
}
