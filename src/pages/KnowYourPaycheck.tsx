import {useEffect,useRef,useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import './PlanningTools.css';
import './KnowYourPaycheck.css';

type Field = {name:string; meaning:string; check:string};
type Block = {id:string; number:string; title:string; short:string; fields:Field[]};

const blocks:Block[] = [
 {id:'identity',number:'01',title:'Who, when, and which job?',short:'Header and employment record',fields:[
  {name:'Name, agency, and employee identifier',meaning:'Identifies whose record this is and the agency or payroll office that issued it. Some statements show a masked Social Security number.',check:'Confirm the record is yours. Never enter an unmasked identifier into a public website.'},
  {name:'Pay period and pay date',meaning:'The pay period covers the work dates; the pay date is when the money is issued. A year-to-date (YTD) column may follow the calendar tax year.',check:'Compare the correct period with your timecard and bank deposit.'},
  {name:'Pay plan, grade, step, and salary',meaning:'Shows your position and stated pay rate. Locality or special rates may appear separately or in adjusted basic pay.',check:'Compare a recent SF-50. The annual salary line is not the amount deposited every pay period.'},
  {name:'Leave service computation date (SCD)',meaning:'A date used for leave accrual. It may reflect credit for prior service.',check:'Do not assume this equals your retirement SCD or proves all service is creditable for a pension.'},
  {name:'Tax election/status',meaning:'Shows payroll withholding elections, including federal, state, or local entries where applicable.',check:'Check elections after a move or household change; withholding is not your final tax bill.'},
 ]},
 {id:'earnings',number:'02',title:'What did you earn?',short:'Hours, pay types, and gross pay',fields:[
  {name:'Regular hours and basic pay',meaning:'Hours and pay from your regular schedule. Some statements separate basic and locality pay.',check:'Compare hours with your timecard and rate with your personnel action.'},
  {name:'Overtime and premium pay',meaning:'Additional earnings such as overtime, night, Sunday, holiday, hazard, or availability pay when applicable.',check:'Compare the hours and pay type with approved time and attendance. Not every premium is treated the same for retirement calculations.'},
  {name:'Paid leave and adjustments',meaning:'Paid annual or sick leave, awards, retroactive pay, corrections, or debt adjustments may appear as separate rows.',check:'Read the remarks whenever a row changes from the prior statement.'},
  {name:'Current versus YTD columns',meaning:'Current is this pay period; YTD accumulates through the relevant year. The statement may show both hours and dollars.',check:'Use the current column to understand this deposit and YTD for trends, not as a second payment.'},
  {name:'Gross pay',meaning:'Total earnings before payroll deductions. Taxable wages can differ because certain deductions receive different tax treatment.',check:'Start here when reconciling gross pay minus deductions to net pay.'},
  {name:'Taxable, nontaxable, and tax-deferred wages',meaning:'Some statements break gross pay into amounts used for different tax calculations. A traditional TSP contribution can lower federal taxable wages while a Roth TSP contribution generally does not.',check:'Do not use gross pay as a substitute for a W-2 or assume every tax uses the same wage base.'},
 ]},
 {id:'deductions',number:'03',title:'Where did the money go?',short:'Taxes, benefits, retirement, and allotments',fields:[
  {name:'Federal, state, and local income tax',meaning:'Amounts withheld toward income taxes under your payroll elections. Local taxes appear only when applicable.',check:'A withholding change can alter take-home pay without changing your salary.'},
  {name:'Social Security (OASDI) and Medicare',meaning:'Payroll taxes shown separately where applicable. OASDI treatment can differ for some CSRS-covered employees.',check:'Check your coverage type before assuming every employee has identical deductions.'},
  {name:'FERS or CSRS retirement',meaning:'Your employee contribution to the federal retirement system, where applicable.',check:'This deduction is not your projected pension payment or your TSP contribution.'},
  {name:'Thrift Savings Plan (TSP)',meaning:'Your elected traditional and/or Roth contribution, sometimes with a separate TSP loan repayment.',check:'Verify the contribution amount and distinguish it from any agency contribution shown elsewhere.'},
  {name:'Health, dental, vision, and life insurance',meaning:'FEHB or PSHB, FEDVIP, FEGLI, and other premiums may appear if enrolled; names vary by payroll provider.',check:'Confirm the plan/enrollment code and employee premium after Open Season or a qualifying life event.'},
  {name:'FSA, HSA, allotments, union dues, or debts',meaning:'Optional accounts, savings transfers, dues, garnishments, or debt collections may be listed separately.',check:'Investigate an unfamiliar deduction with your payroll office; do not treat every deduction as an insurance premium.'},
  {name:'Total deductions',meaning:'The combined deductions for the period, including items above that apply to you.',check:'Gross pay minus total deductions should reconcile to net pay, subject to any statement-specific adjustments.'},
 ]},
 {id:'net',number:'04',title:'What reached your account?',short:'Net pay and deposit details',fields:[
  {name:'Net pay',meaning:'The amount remaining after deductions and applicable adjustments. This is the paycheck amount available for spending.',check:'Match it to your deposit; account allotments may be shown as separate deposits.'},
  {name:'Direct deposit / financial institution',meaning:'The destination for net pay or allotments. Routing and account details may be masked.',check:'Confirm the destination if a deposit is missing. Do not share the statement publicly.'},
 ]},
 {id:'leave',number:'05',title:'How much leave do you have?',short:'Accrued, used, balance, and use-or-lose',fields:[
  {name:'Annual leave',meaning:'Tracks earned hours, hours used, and current balance. Some statements show prior-year balance and leave category.',check:'Check the carryover ceiling and any projected use-or-lose hours before the leave year ends.'},
  {name:'Sick leave',meaning:'Tracks sick leave accrued, used, and remaining.',check:'Confirm the balance with your agency record; do not value it as a cash payout on this guide.'},
  {name:'Other leave and time',meaning:'Compensatory time, credit hours, military leave, restored leave, time-off awards, LWOP, or similar categories may appear when relevant.',check:'Check expiration dates, available balances, and any leave-without-pay entries.'},
  {name:'SCD, leave category, and maximum carryover',meaning:'These fields help explain your accrual rate and how much annual leave may carry to the next leave year.',check:'Ask HR about an unexpected accrual rate or a service date that differs from your record.'},
 ]},
 {id:'employer',number:'06',title:'What does the agency pay?',short:'Employer contributions are separate',fields:[
  {name:'Agency retirement and TSP contributions',meaning:'Some statements show the employer-funded share for FERS and TSP separately from your deductions.',check:'These figures are not additional take-home pay. Confirm TSP contributions on your TSP account statement.'},
  {name:'Agency health and payroll-tax share',meaning:'The employer share of health coverage and applicable payroll taxes may also be listed.',check:'Use this section to understand total benefits cost, not to add to your net pay.'},
 ]},
 {id:'remarks',number:'07',title:'What changed this period?',short:'Remarks and follow-up',fields:[
  {name:'Remarks and codes',meaning:'Payroll or personnel messages may explain a changed TSP election, retroactive adjustment, debt, leave change, or other action.',check:'Read this every period, especially when net pay changes.'},
  {name:'Retirement and service notes',meaning:'Some statements show cumulative employee retirement deductions or military deposit information. Formats vary.',check:'Neither an LES nor a single SCD replaces your official service record or agency retirement estimate.'},
  {name:'Military deposit paid or owed',meaning:'If applicable, an LES may show a military service deposit and outstanding balance.',check:'Ask your benefits office to confirm the service period and payment status; a payroll line alone does not establish pension credit.'},
  {name:'If something is wrong',meaning:'Timecard questions usually start with your timekeeper or supervisor; personnel-action questions with HR; tax or deduction questions with payroll.',check:'Keep a copy of the statement and ask the responsible office to reconcile the specific line.'},
 ]},
];
const positions:Record<string,{top:number;height:number}>={identity:{top:7.5,height:16.3},earnings:{top:23.8,height:22.3},deductions:{top:46.1,height:17.5},net:{top:63.6,height:6.3},leave:{top:69.9,height:12.4},employer:{top:82.3,height:7.6},remarks:{top:89.9,height:10.1}};

export default function KnowYourPaycheck(){
 const [active,setActive]=useState<string|null>(null);
 const [locked,setLocked]=useState(false);
 const selected=blocks.find(block=>block.id===active);
 const popover=useRef<HTMLElement>(null);
 useEffect(()=>{popover.current?.scrollTo(0,0);},[active]);
 function select(id:string){setActive(id);}
 function toggle(id:string){if(locked&&active===id){setActive(null);setLocked(false);}else{setActive(id);setLocked(true);}}
 return <div className="planning-page paycheck-guide">
  <Helmet><title>Know Your Paycheck: Federal LES Guide | Broussard Financial Services</title><meta name="description" content="Understand a federal civilian Leave and Earnings Statement: pay, deductions, TSP, insurance, leave, agency contributions, and remarks."/><link rel="canonical" href="https://www.broussardfinancialservices.com/know-your-paycheck"/></Helmet>
  <header className="planning-intro"><Link to="/planning-tools">← Planning tools</Link><span>FEDERAL PAYCHECK GUIDE</span><h1>Know Your Paycheck.</h1><p>Hover over a highlighted section of the sample Leave and Earnings Statement to see what it means. You can also tap a section or use Tab and Enter.</p></header>
  <div className="paycheck-guide-note"><strong>Start with your own statement.</strong> This sample contains no real employee data. DFAS, NFC, USPS, and other payroll providers use different layouts and labels. A field appears only when it applies to your job, coverage, or election. This guide explains common sections; your agency’s LES and payroll office control your actual record.</div>
  <div className="paycheck-demo" onMouseLeave={()=>{if(!locked)setActive(null);}} onKeyDown={event=>{if(event.key==='Escape'){setActive(null);setLocked(false);}}}>
   <aside ref={popover} className="paycheck-popover" id="paycheck-popover" role="region" aria-label={selected?`${selected.title} explanation`:'Section explanation'}>
    {selected?<><div className="paycheck-popover-head"><div><small>SECTION {selected.number} OF 07</small><h2>{selected.title}</h2></div><button type="button" onClick={()=>{setActive(null);setLocked(false);}} aria-label="Close explanation">×</button></div><p>{selected.short}</p><div className="paycheck-field-list">{selected.fields.map(field=><article key={field.name}><h3>{field.name}</h3><p>{field.meaning}</p><p className="paycheck-check"><strong>Check:</strong> {field.check}</p></article>)}</div></>:<div className="paycheck-popover-empty"><span>FIELD GUIDE</span><h2>Hover over a green section.</h2><p>Its explanation will appear here, beside the statement. Click or tap to keep it open while you read.</p></div>}
   </aside>
   <div className="paycheck-image-scroll"><div className="paycheck-image-stage">
   <img src="/images/sample-federal-les.svg" width="1000" height="1160" alt="Illustrative federal civilian Leave and Earnings Statement with fictional employee details, earnings, deductions, net pay, leave, agency benefits, and remarks." />
   {blocks.map(block=><button type="button" key={block.id} className={`paycheck-hotspot${active===block.id?' is-active':''}`} style={{top:`${positions[block.id].top}%`,height:`${positions[block.id].height}%`}} onMouseEnter={()=>select(block.id)} onFocus={()=>select(block.id)} onClick={()=>toggle(block.id)} aria-label={`Section ${block.number}: ${block.title}. Hover or activate to explain.`} aria-expanded={active===block.id} aria-controls="paycheck-popover"><span aria-hidden="true">{block.number}</span></button>)}
  </div></div></div>
  <p className="paycheck-help">The green outlines are interactive. Hover to preview a section; click or tap to keep its explanation open. Press Escape or use × to close it. On a phone, swipe sideways to view the full statement.</p>
  <section className="planning-card paycheck-next"><span>YOUR FIVE-MINUTE PAYCHECK CHECK</span><h2>Review three numbers first.</h2><ol><li>Confirm the pay period, pay plan, grade, step, and regular hours.</li><li>Compare gross pay, total deductions, and net pay with your deposit.</li><li>Check TSP and insurance elections, leave balances, and remarks for changes.</li></ol><p>For a retirement review, bring your latest LES, SF-50, TSP statement, and agency retirement estimate if available. Please keep Social Security numbers, bank details, and full statements out of the public contact form.</p><Link to="/federal-planning#paycheck">Explore your retirement paycheck →</Link></section>
  <section className="planning-card paycheck-sources"><h2>Official statement guides</h2><p>Use the guide for your payroll provider when a label differs from this example.</p><ul><li><a href="https://help.nfc.usda.gov/publications/PPO/67115.htm" target="_blank" rel="noopener noreferrer">National Finance Center: Statement of Earnings and Leave</a></li><li><a href="https://www.dfas.mil/CivilianEmployees/understandingyourcivilianpay/LES/" target="_blank" rel="noopener noreferrer">DFAS: civilian LES walkthrough</a></li><li><a href="https://www.irs.gov/publications/p721" target="_blank" rel="noopener noreferrer">IRS: traditional and Roth TSP tax treatment</a></li></ul></section>
 </div>;
}
