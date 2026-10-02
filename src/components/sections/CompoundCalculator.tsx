import ConsultationCTA from '../ui/ConsultationCTA';
import { useState } from 'react';
import { compoundGrowth } from '../../utils/planning';

const money=(n:number)=>n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
export default function CompoundCalculator(){
 const [values,setValues]=useState({principal:'10000',monthly:'250',years:'20',rate:'5'});
 const fields=[{key:'principal',label:'Starting balance ($)',max:100000000},{key:'monthly',label:'Monthly contribution ($)',max:1000000},{key:'years',label:'Years to grow',max:60},{key:'rate',label:'Assumed annual rate (%)',max:20}];
 const valid=fields.every(f=>{const v=values[f.key as keyof typeof values];return v.trim()!==''&&Number.isFinite(+v)&&+v>=0&&+v<=f.max})&&Number.isInteger(+values.years)&&+values.years>=1;
 const rows=valid?compoundGrowth(+values.principal,+values.monthly,+values.years,+values.rate):[];
 const final=rows.at(-1);
 return <section className="planning-card" aria-labelledby="compound-title"><span>03 · TIME & CONSISTENCY</span><h2 id="compound-title">Compound-interest calculator</h2><p>Explore how a starting balance and regular monthly contributions could grow over time.</p>
 <div className="planning-inputs">{fields.map(f=><label className="tool-field" key={f.key}>{f.label}<input type="number" min={f.key==='years'?1:0} max={f.max} step={f.key==='years'?1:'any'} value={values[f.key as keyof typeof values]} onChange={e=>setValues({...values,[f.key]:e.target.value})}/></label>)}</div>
 {!valid?<p role="alert">Enter a starting balance of $0–$100 million, monthly contributions of $0–$1 million, 1–60 whole years, and an annual rate of 0–20%.</p>:final&&<>
 <div className="planning-results" aria-live="polite"><div><small>Projected ending balance</small><strong>{money(final.balance)}</strong></div><div><small>Your total contributions</small><strong>{money(final.contributions)}</strong></div><div><small>Projected growth</small><strong>{money(final.balance-final.contributions)}</strong></div></div>
 <svg className="planning-chart" viewBox="0 0 760 300" role="img" aria-label="Projected balance and total contributions over time. Exact annual amounts are available in the table below.">
 {[0,.5,1].map(f=><g key={f}><line x1="95" x2="725" y1={250-f*210} y2={250-f*210} stroke="#ddd"/><text x="5" y={254-f*210}>{money(final.balance*f)}</text></g>)}
 {[{key:'balance' as const,color:'#315c86'},{key:'contributions' as const,color:'#756444'}].map(s=><polyline key={s.key} fill="none" stroke={s.color} strokeWidth="3" strokeDasharray={s.key==='contributions'?'7 4':undefined} points={rows.map(r=>`${95+r.year/+values.years*630},${250-r[s.key]/Math.max(1,final.balance)*210}`).join(' ')}/>)}
 <text x="95" y="280">Year 0</text><text x="725" y="280" textAnchor="end">Year {values.years}</text></svg>
 <div className="chart-legend"><span style={{color:'#315c86'}}>━ Projected balance</span><span style={{color:'#756444'}}>┄ Total contributions</span></div>
 <details><summary>View annual growth breakdown</summary><div className="planning-table"><table><caption>Year-end projections, rounded to the nearest dollar</caption><thead><tr><th>Year</th><th>Contributions</th><th>Growth</th><th>Balance</th></tr></thead><tbody>{rows.map(r=><tr key={r.year}><th>{r.year}</th><td>{money(r.contributions)}</td><td>{money(r.balance-r.contributions)}</td><td>{money(r.balance)}</td></tr>)}</tbody></table></div></details>
 </>}
 <p className="tool-note">Illustration only, not a forecast or product quote. Assumes a constant nominal annual rate divided by 12, compounded monthly, with contributions at the end of each month. Contributions include the starting balance. Excludes fees, taxes, inflation, withdrawals, and market losses. The assumed rate is not an APY, guaranteed return, or annuity crediting rate; actual investment returns vary.</p>
 <ConsultationCTA label="Discuss my savings goals" /></section>;
}
