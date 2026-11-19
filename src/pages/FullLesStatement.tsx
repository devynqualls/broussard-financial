import {Fragment,useEffect,useRef,useState} from 'react';

type LesItem={id:string;label:string;value?:string;meaning:string;check:string};
type LedgerRow=LesItem&{code:string;hours?:string;hoursYtd?:string;amount?:string;amountYtd?:string};

const header:LesItem[]=[
 {id:'form',label:'Form AD-334',value:'USDA · REV. 8/17',meaning:'The form name and revision printed on this type of earnings and leave statement.',check:'Use the guide for the payroll system that issued your statement.'},
 {id:'agency-code',label:'Agency payroll code',value:'EXAMPLE CODE',meaning:'The code payroll uses to identify the agency or payroll unit.',check:'Ask payroll about a code that changes unexpectedly.'},
 {id:'payroll-unit',label:'Payroll unit',value:'0000-0',meaning:'An internal payroll processing identifier printed beside the agency code.',check:'Use it when payroll asks you to identify the statement.'},
 {id:'agency',label:'Employing agency',value:'EXAMPLE FEDERAL AGENCY',meaning:'The agency responsible for your pay.',check:'Make sure this is your employer.'},
 {id:'pay-period-dates',label:'Pay period date: beginning / ending',value:'08/30/2026 – 09/12/2026',meaning:'The work dates this statement covers. They are different from the date you get paid.',check:'Match these dates to your timecard.'},
 {id:'pay-period',label:'Pay period number',value:'18',meaning:'The number of this pay cycle in the payroll year.',check:'Use it when asking payroll about a particular check.'},
 {id:'ta-contact',label:'T&A contact point',value:'EXAMPLE CODE',meaning:'The office or code used to route timecard questions.',check:'Ask your timekeeper if hours are wrong.'},
 {id:'accounting',label:'Acct. stat.',value:'0001',meaning:'A payroll accounting status code used by the agency.',check:'Payroll can explain a code that changes unexpectedly.'},
 {id:'organization',label:'Organization structure',value:'EXAMPLE CODE',meaning:'The internal unit or cost center associated with your job.',check:'Compare it with your agency record if you changed offices.'},
 {id:'personnel',label:'Personnel office',value:'EXAMPLE CODE',meaning:'The HR office responsible for your personnel record.',check:'Contact HR about grade, service date, or appointment questions.'},
 {id:'plan',label:'Pay plan',value:'GS',meaning:'The federal pay system used for your position.',check:'Compare with your SF-50.'},
 {id:'grade',label:'Grade',value:'12',meaning:'Your grade within the pay plan.',check:'Compare with your SF-50.'},
 {id:'step',label:'Step',value:'04',meaning:'Your step within the grade.',check:'Compare with your SF-50.'},
 {id:'name',label:'Name',value:'SAMPLE EMPLOYEE',meaning:'The person this pay record belongs to.',check:'Never upload an unredacted paystub to a public form.'},
 {id:'identifier',label:'Social Security No.',value:'***-**-****',meaning:'A partly hidden identifier used to connect the statement to your payroll record.',check:'Keep the full number private.'},
 {id:'salary',label:'Salary',value:'$99,840',meaning:'Your stated yearly pay rate. It is not the amount deposited every payday.',check:'Compare with your latest SF-50.'},
 {id:'rate',label:'Rate type',value:'PA',meaning:'Payroll shorthand for how the stated salary or rate is expressed.',check:'Ask payroll if the code differs from your job record.'},
 {id:'employment',label:'Type empl.',value:'F/T',meaning:'Shows whether this appointment is full-time or another schedule.',check:'Confirm it matches your appointment.'},
 {id:'scd',label:'SCD for leave',value:'05/12/2012',meaning:'Service Computation Date used to determine your annual-leave accrual category.',check:'It may differ from the service date used for your pension.'},
 {id:'retirement-to-date',label:'Ret. deductions this appointment',value:'$12,500',meaning:'A running record of employee retirement contributions during this appointment. It is not your TSP balance or estimated pension.',check:'Ask HR to reconcile it with your individual retirement record if it appears wrong.'},
];

const earnings:LedgerRow[]=[
 {id:'regular',code:'01',label:'Regular time',hours:'73',hoursYtd:'1,314',amount:'$3,504',amountYtd:'$63,072',meaning:'Pay for hours you worked in your normal schedule.',check:'Match the 73 hours with your timecard.'},
 {id:'award',code:'44',label:'Cash award',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'$500',meaning:'Extra pay from an award. This sample has an earlier award in the year-to-date column but none on this check.',check:'Check your award notice if this row has an amount.'},
 {id:'annual-paid',code:'61',label:'Annual leave',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Paid time off for vacation or personal needs. A current amount appears if you used annual leave in this period.',check:'Match any hours with your leave request and balance.'},
 {id:'sick-paid',code:'62',label:'Sick leave',hours:'6',hoursYtd:'108',amount:'$288',amountYtd:'$5,184',meaning:'Paid time off for an illness or medical need. In this sample, 6 hours were paid this period.',check:'Check that the hours match the leave you took.'},
 {id:'other-paid',code:'66',label:'Other leave',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Another paid or recorded leave category, depending on your agency.',check:'Ask your timekeeper what the code means on your statement.'},
 {id:'time-off-award',code:'66 61',label:'Time-off awards',hours:'1',hoursYtd:'18',amount:'$48',amountYtd:'$864',meaning:'Paid time off granted as an award. This sample shows one hour used in this pay period.',check:'Check the hours against your award record and expiration rule.'},
 {id:'gross',code:'**',label:'Pay period hours and gross pay',hours:'80',hoursYtd:'1,440',amount:'$3,840',amountYtd:'$69,620',meaning:'Total paid hours and earnings before deductions. This sample adds $3,504 regular, $288 sick leave, and $48 time-off award pay.',check:'73 work hours plus 6 sick leave hours plus 1 award hour equals 80. Gross pay equals the current earnings rows.'},
];

const deductions:LedgerRow[]=[
 {id:'retirement',code:'75 02',label:'Retirement',amount:'$164',amountYtd:'$2,952',meaning:'Your employee contribution toward your federal retirement system.',check:'This is separate from TSP and from your pension estimate.'},
 {id:'tsp',code:'75 15',label:'TSP–FERS',amount:'$400',amountYtd:'$7,200',meaning:'The amount you chose to contribute to your Thrift Savings Plan.',check:'Compare with your election and TSP account.'},
 {id:'tsp-fixed',code:'',label:'*Amount based on fixed amount',amount:'—',amountYtd:'—',meaning:'This note says the TSP contribution was elected as a dollar amount rather than a percentage.',check:'Compare the deduction with your current TSP election.'},
 {id:'oasdi',code:'76',label:'Social Security (OASDI)',amount:'$238',amountYtd:'$4,284',meaning:'Payroll tax for Social Security, when your coverage requires it.',check:'Coverage can differ for some federal employees; ask payroll about an unexpected charge.'},
 {id:'federal-tax',code:'77',label:'Federal tax exemptions M00',amount:'$480',amountYtd:'$8,640',meaning:'Federal income tax withheld. The status code reflects payroll instructions, not your final tax bill.',check:'Review your withholding election after major life changes.'},
 {id:'state-one',code:'78',label:'ST TAX MD EXEMPTS M01',amount:'—',amountYtd:'—',meaning:'A Maryland state-tax withholding line. A second state can appear on the same statement if payroll has recorded more than one state.',check:'Confirm the state and tax election with payroll if a state line is unexpected.'},
 {id:'state-two',code:'78',label:'ST TAX VA EXEMPTS 000',amount:'$150',amountYtd:'$2,700',meaning:'A separate Virginia state-tax withholding line in this fictional example.',check:'Ask payroll to explain the amount or state if it seems wrong.'},
 {id:'fegli',code:'81',label:'FEGLI — COVERAGE $150,000',amount:'$30',amountYtd:'$540',meaning:'Your Federal Employees’ Group Life Insurance premium; the description may show coverage amount.',check:'Confirm your election and coverage amount.'},
 {id:'fehb',code:'83',label:'FEHBA — ENROLL CODE EX1',amount:'$250',amountYtd:'$4,500',meaning:'Your share of Federal Employees Health Benefits coverage. Postal workers may see PSHB instead.',check:'Compare the plan code and premium with your enrollment.'},
 {id:'dental',code:'83 10',label:'Dental plan',amount:'$26',amountYtd:'$468',meaning:'Your dental coverage premium.',check:'Check the plan and amount after Open Season.'},
 {id:'vision',code:'83 11',label:'Vision plan',amount:'$6',amountYtd:'$108',meaning:'Your vision coverage premium.',check:'Check the plan and amount after Open Season.'},
 {id:'union',code:'87',label:'Union / association dues',amount:'$20',amountYtd:'$360',meaning:'Membership dues deducted from pay when authorized.',check:'Ask payroll or the association about an unfamiliar charge.'},
 {id:'allotment-one',code:'88',label:'Checking / savings ******',amount:'$50',amountYtd:'$900',meaning:'Money sent to another account at your request. The account number is masked.',check:'Look for the matching transfer in that account.'},
 {id:'allotment-two',code:'88',label:'Checking / savings ******',amount:'$40',amountYtd:'$720',meaning:'A second transfer to an account you selected.',check:'Look for the matching transfer in that account.'},
 {id:'allotment-three',code:'88',label:'Checking / savings ******',amount:'$30',amountYtd:'$540',meaning:'A third transfer to an account you selected.',check:'Look for the matching transfer in that account.'},
 {id:'tsp-loan-one',code:'88 40',label:'TSP loan repay (FED)',amount:'$100',amountYtd:'$1,800',meaning:'Repayment of a TSP loan. It is not a new TSP contribution.',check:'Compare the payment with your TSP loan schedule.'},
 {id:'tsp-loan-two',code:'88 40',label:'TSP loan repay (FED)',amount:'$75',amountYtd:'$1,350',meaning:'A second TSP loan repayment.',check:'Confirm each loan separately in your TSP account.'},
 {id:'fsa',code:'93 11',label:'FSA — health care',amount:'$50',amountYtd:'$900',meaning:'Money set aside from pay for eligible health expenses through a flexible spending account.',check:'Compare with your FSA election.'},
 {id:'medicare',code:'97',label:'Medicare tax withheld',amount:'$56',amountYtd:'$1,008',meaning:'Payroll tax for Medicare, shown separately from Social Security.',check:'Look for both tax lines when reviewing deductions.'},
 {id:'deduction-total',code:'**',label:'Total deductions',amount:'$2,165',amountYtd:'$38,970',meaning:'All deductions and allotments together for the period. In this sample, $3,840 gross pay minus $2,165 leaves $1,675 net pay.',check:'Add the current deduction amounts and compare with this total.'},
 {id:'net',code:'**',label:'Net pay',amount:'$1,675',amountYtd:'$30,650',meaning:'Money remaining after the listed deductions and allotments.',check:'Reconcile it with deposits; some amounts went to separate accounts.'},
 {id:'routing',code:'**',label:'DD/EFT routing no. ******',amount:'—',amountYtd:'—',meaning:'The masked routing number for the main direct deposit.',check:'Contact payroll if the deposit went to the wrong account.'},
];

const leave:LesItem[]=[
 {id:'credit-hours',label:'Credit hours',value:'—',meaning:'Approved hours worked beyond your basic schedule under a flexible work arrangement.',check:'Check your agency’s rules for earning and using them.'},
 {id:'religious-comp',label:'Religious compensatory time',value:'—',meaning:'Time earned or used to make up time off for religious observance.',check:'Check your timecard and agency rules.'},
 {id:'travel-comp',label:'Travel compensatory time',value:'—',meaning:'Time credited for certain official travel outside regular work hours.',check:'Ask your timekeeper about expiration and use.'},
 {id:'military-leave',label:'Military leave',value:'—',meaning:'A separate leave category for eligible military service.',check:'Check your agency record for eligibility and balance.'},
 {id:'award-balance',label:'Time-off award',value:'1 used / 19 left',meaning:'Unused hours from an approved time-off award.',check:'Check whether the award expires.'},
 {id:'bp-comp',label:'BPAPRA compensatory time',value:'—',meaning:'A specialized compensatory-time category that applies to certain Border Patrol agents.',check:'If it appears on your record, ask your timekeeper to confirm the balance.'},
 {id:'bp-debt',label:'BPAPRA obligated debt',value:'—',meaning:'A specialized Border Patrol Agent Pay Reform Act tracking field.',check:'Ask your agency to explain any amount shown.'},
 {id:'disabled-veteran',label:'Disabled veteran leave',value:'—',meaning:'A special leave category for eligible employees in a qualifying period.',check:'Confirm your eligibility and remaining hours with HR.'},
 {id:'restored-leave',label:'Restored annual leave',value:'—',meaning:'Annual leave restored after forfeiture under specific rules, tracked separately.',check:'Check the time limit for using restored leave.'},
 {id:'annual-balance',label:'Annual leave',value:'108 earned / 40 used / 239.5 left',meaning:'Vacation or personal leave. Accrued means earned; used means taken; balance means still available.',check:'Check hours used against your leave requests.'},
 {id:'sick-balance',label:'Sick leave',value:'72 earned / 22.5 used / 294 left',meaning:'Paid leave for qualifying illness or medical needs.',check:'Check hours used against your leave requests.'},
 {id:'comp-balance',label:'Compensatory leave',value:'—',meaning:'Approved time off earned instead of certain overtime pay, when applicable.',check:'Check your agency’s expiration and payout rules.'},
 {id:'use-lose',label:'Projected use or lose',value:'—',meaning:'An estimate of annual leave that could exceed your carryover limit at the end of the leave year.',check:'Confirm the projection and plan leave with your agency.'},
 {id:'unapproved',label:'Pt. hrs unapp.',value:'—',meaning:'Hours at the end of a pay period that have not yet been applied to leave accrual for a part-time employee.',check:'If you work part time, ask your timekeeper about hours you expected to count.'},
 {id:'carryover',label:'Max. C/O',value:'240 hours',meaning:'The maximum annual leave this fictional employee may carry into the next leave year. Individual rules can differ.',check:'Ask HR which ceiling applies to you.'},
 {id:'leave-category',label:'Leave categ.',value:'6 hours per pay period',meaning:'How quickly annual leave is normally earned based on creditable service and appointment.',check:'Compare with your leave SCD and HR record.'},
 {id:'remarks',label:'Remarks',value:'No changes this period',meaning:'Payroll or personnel notes, corrections, or other messages.',check:'Read this area on every statement, especially when pay changes.'},
 {id:'employee-address',label:'Employee mailing address',value:'ADDRESS OMITTED IN SAMPLE',meaning:'The address payroll has on file for you.',check:'Update it with your agency if you move.'},
 {id:'official-pay-date',label:'Official pay date',value:'09/18/2026',meaning:'The official date this pay was issued.',check:'Compare with your bank records.'},
 {id:'hr-address',label:'Agency HR contact address',value:'EXAMPLE HR OFFICE',meaning:'Where agency personnel questions can be directed.',check:'Use your own agency’s contact information.'},
];
const restoredYearFields:LesItem[]=[
 {id:'restored-year-one',label:'Restored leave — first year',value:'—',meaning:'Restored annual-leave hours tracked in their first leave year.',check:'Ask HR about the deadline for using any hours shown.'},
 {id:'restored-year-two',label:'Restored leave — second year',value:'—',meaning:'Restored annual-leave hours tracked in their second leave year.',check:'Ask HR about the deadline for using any hours shown.'},
 {id:'restored-year-three',label:'Restored leave — third year',value:'—',meaning:'Restored annual-leave hours tracked in their third leave year.',check:'Ask HR about the deadline for using any hours shown.'},
];

export default function FullLesStatement(){
 const [active,setActive]=useState<LesItem|null>(null);
 const [helpTop,setHelpTop]=useState(0);
 const layoutRef=useRef<HTMLDivElement>(null);
 const byId=(id:string)=>[...header,...leave,...restoredYearFields].find(item=>item.id===id)!;
 const desktopHover=()=>window.matchMedia('(hover: hover) and (min-width: 1151px)').matches;
 const show=(item:LesItem,button:HTMLButtonElement)=>{
  const layout=layoutRef.current;
  if(layout){const rect=button.getBoundingClientRect();const container=layout.getBoundingClientRect();const raw=rect.top-container.top;const viewportLimit=window.innerHeight-container.top-230;setHelpTop(Math.max(0,Math.min(raw,viewportLimit)));}
  setActive(item);
 };
 useEffect(()=>{const close=(event:PointerEvent)=>{if(!(event.target as Element).closest('.les-field,.les-explainer'))setActive(null);};const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setActive(null);};document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};},[]);
 const field=(item:LesItem,hideValue=false)=> <button key={item.id} className={`les-field${active?.id===item.id?' is-active':''}`} type="button" onMouseEnter={event=>{if(desktopHover())show(item,event.currentTarget);}} onMouseLeave={()=>{if(desktopHover())setActive(null);}} onFocus={event=>show(item,event.currentTarget)} onBlur={event=>{if(!layoutRef.current?.contains(event.relatedTarget as Node))setActive(null);}} onClick={event=>show(item,event.currentTarget)} aria-expanded={active?.id===item.id} aria-label={`${item.label}${item.value?' '+item.value:''}. Show explanation`}><span className="les-field-label">{item.label}</span>{!hideValue&&<span className="les-field-value">{item.value}</span>}</button>;
 const help=(item:LesItem)=><div className="les-inline-help" key={`${item.id}-help`}><strong>{item.label}</strong><p>{item.meaning}</p><p><b>Check:</b> {item.check}</p></div>;
 const group=(ids:string[],className:string)=><div className={className}>{ids.map(id=>field(byId(id)))}{active&&ids.includes(active.id)&&help(active)}</div>;
 const ledger=(rows:LedgerRow[])=>rows.map(item=><Fragment key={item.id}><tr><td className="les-code">{item.code}</td><th scope="row">{field(item,true)}</th><td>{item.hours??'—'}</td><td>{item.hoursYtd??'—'}</td><td>{item.amount??'—'}</td><td>{item.amountYtd??'—'}</td></tr>{active?.id===item.id&&<tr className="les-inline-row"><td colSpan={6}>{help(item)}</td></tr>}</Fragment>);
 const leaveAmounts:Record<string,[string,string,string]>={'annual-balance':['108','40','239.5'],'sick-balance':['72','22.5','294'],'award-balance':['—','1','19']};
 const leaveRow=(item:LesItem)=><Fragment key={item.id}><tr><th scope="row">{field(item,true)}</th>{(leaveAmounts[item.id]??['—','—','—']).map((amount,index)=><td key={index}>{amount}</td>)}</tr>{active?.id===item.id&&<tr className="les-inline-row"><td colSpan={4}>{help(item)}</td></tr>}</Fragment>;
 const leftLeave=['credit-hours','religious-comp','travel-comp','military-leave','award-balance','bp-comp','bp-debt','disabled-veteran'];
 const rightLeave=['annual-balance','sick-balance','comp-balance'];
 return <div ref={layoutRef} className="les-layout">
  <div className="les-scroll" aria-label="Scrollable fictional federal earnings and leave statement"><div className="les-sheet">
   <div className="les-topline"><strong>EPP</strong>{field(byId('agency'))}{field(byId('agency-code'))}{field(byId('payroll-unit'))}{active&&['agency','agency-code','payroll-unit'].includes(active.id)&&help(active)}</div>
   {group(['identifier','pay-period-dates','pay-period','ta-contact','accounting','organization','personnel','plan','grade','step'],'les-top-grid')}
   <div className="les-title-row">{group(['salary','rate','employment','scd','retirement-to-date'],'les-pay-grid')}<strong>STATEMENT OF EARNINGS AND LEAVE</strong>{field(byId('form'))}{active?.id==='form'&&help(active)}</div>
   <div className="les-section-title">EARNINGS AND DEDUCTIONS</div>
   <table className="les-ledger"><caption>Statement of earnings and deductions with current and year-to-date columns</caption><thead><tr><th rowSpan={2}>Item code</th><th rowSpan={2}>Description</th><th colSpan={2}>Hours</th><th colSpan={2}>Amount</th></tr><tr><th title="Hours this pay period">P/P</th><th title="Hours year to date">Yr. to date</th><th title="Amount this pay period">P/P</th><th title="Amount year to date">Yr. to date</th></tr></thead><tbody>{ledger(earnings)}{ledger(deductions)}</tbody></table>
   <div className="les-blank-rows" aria-hidden="true"/>
   <div className="les-leave-layout"><div><div className="les-section-title">YEAR TO DATE LEAVE STATUS</div><table className="les-leave-table"><caption>Credit, military, award and special leave</caption><thead><tr><th>Type</th><th>Accrued</th><th>Used</th><th>Balance</th></tr></thead><tbody>{leftLeave.map(id=>leaveRow(byId(id)))}</tbody></table><div className="les-restored-title">REST. ANN. LEAVE HRS.</div><table className="les-restored-table"><thead><tr><th>Type</th>{restoredYearFields.map(item=><th key={item.id}>{field(item,true)}</th>)}<th>Balance</th></tr></thead><tbody><tr><th scope="row">{field(byId('restored-leave'),true)}</th><td>—</td><td>—</td><td>—</td><td>—</td></tr>{active&&['restored-leave',...restoredYearFields.map(item=>item.id)].includes(active.id)&&<tr className="les-inline-row"><td colSpan={5}>{help(active)}</td></tr>}</tbody></table></div><div><div className="les-section-title">YEAR TO DATE LEAVE STATUS</div><table className="les-leave-table"><caption>Annual, sick and compensatory leave</caption><thead><tr><th>Type</th><th>Accrued</th><th>Used</th><th>Balance</th></tr></thead><tbody>{rightLeave.map(id=>leaveRow(byId(id)))}</tbody></table>{group(['use-lose','unapproved','carryover','leave-category'],'les-leave-meta')}{field(byId('remarks'))}{active?.id==='remarks'&&help(active)}</div></div>
   <div className="les-bottom-grid"><div>{field(byId('name'))}{field(byId('employee-address'))}</div><div>{field(byId('official-pay-date'))}{field(byId('hr-address'))}</div>{active&&['name','employee-address','official-pay-date','hr-address'].includes(active.id)&&help(active)}</div>
   <div className="les-footnote">Illustrative sample only. Every name, amount, date, and code value is fictional. P/P means this pay period; Yr. to date is the running total. A dash means no value in this example.</div>
  </div></div>
  {active&&<aside className="les-explainer" style={{top:helpTop}} role="status"><span>WHAT THIS FIELD MEANS</span><h2>{active.label}</h2><p>{active.meaning}</p><p className="les-check"><strong>What to check:</strong> {active.check}</p></aside>}
 </div>;
}
