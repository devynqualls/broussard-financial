import {useEffect,useRef,useState} from 'react';

type LesItem={id:string;label:string;value?:string;meaning:string;check:string};
type LedgerRow=LesItem&{code:string;hours?:string;hoursYtd?:string;amount?:string;amountYtd?:string};

const header:LesItem[]=[
 {id:'form',label:'Form and payroll system',value:'EPP · AD-334',meaning:'The Employee Personal Page displays the Statement of Earnings and Leave; AD-334 is this statement form.',check:'Use the guide for the payroll system that issued your own statement.'},
 {id:'agency-code',label:'Agency payroll code',value:'EXAMPLE CODE',meaning:'The code payroll uses to identify the agency or payroll unit.',check:'Ask payroll about a code that changes unexpectedly.'},
 {id:'agency',label:'Employing agency',value:'EXAMPLE FEDERAL AGENCY',meaning:'The agency responsible for your pay.',check:'Make sure this is your employer.'},
 {id:'pay-period-dates',label:'Pay period dates',value:'08/30/2026 – 09/12/2026',meaning:'The work dates this statement covers. They are different from the date you get paid.',check:'Match these dates to your timecard.'},
 {id:'pay-period',label:'Pay period number',value:'18',meaning:'The number of this pay cycle in the payroll year.',check:'Use it when asking payroll about a particular check.'},
 {id:'ta-contact',label:'Time and attendance contact',value:'EXAMPLE CODE',meaning:'The office or code used to route timecard questions.',check:'Ask your timekeeper if hours are wrong.'},
 {id:'accounting',label:'Accounting status',value:'0001',meaning:'A payroll accounting code used by the agency.',check:'Payroll can explain a code that changes unexpectedly.'},
 {id:'organization',label:'Organization structure',value:'EXAMPLE CODE',meaning:'The internal unit or cost center associated with your job.',check:'Compare it with your agency record if you changed offices.'},
 {id:'personnel',label:'Personnel office',value:'EXAMPLE CODE',meaning:'The HR office responsible for your personnel record.',check:'Contact HR about grade, service date, or appointment questions.'},
 {id:'plan',label:'Pay plan',value:'GS',meaning:'The federal pay system used for your position.',check:'Compare with your SF-50.'},
 {id:'grade',label:'Grade',value:'12',meaning:'Your grade within the pay plan.',check:'Compare with your SF-50.'},
 {id:'step',label:'Step',value:'04',meaning:'Your step within the grade.',check:'Compare with your SF-50.'},
 {id:'name',label:'Employee name',value:'SAMPLE EMPLOYEE',meaning:'The person this pay record belongs to.',check:'Never upload an unredacted paystub to a public form.'},
 {id:'identifier',label:'Employee identifier',value:'XXX-XX-0000',meaning:'A partly hidden identifier used to connect the statement to your payroll record.',check:'Keep the full number private.'},
 {id:'salary',label:'Annual salary',value:'$99,320',meaning:'Your stated yearly pay rate. It is not the amount deposited every payday.',check:'Compare with your latest SF-50.'},
 {id:'rate',label:'Rate type',value:'PA',meaning:'Payroll shorthand for how the stated salary or rate is expressed.',check:'Ask payroll if the code differs from your job record.'},
 {id:'employment',label:'Type of employment',value:'F/T',meaning:'Shows whether this appointment is full-time or another schedule.',check:'Confirm it matches your appointment.'},
 {id:'scd',label:'SCD for leave',value:'05/12/2012',meaning:'Service Computation Date used to determine your annual-leave accrual category.',check:'It may differ from the service date used for your pension.'},
 {id:'retirement-to-date',label:'Retirement deductions this appointment',value:'$12,500',meaning:'A running record of employee retirement contributions during this appointment. It is not your TSP balance or estimated pension.',check:'Ask HR to reconcile it with your individual retirement record if it appears wrong.'},
];

const earnings:LedgerRow[]=[
 {id:'regular',code:'01',label:'Regular time',hours:'72',hoursYtd:'1,296',amount:'$3,438',amountYtd:'$61,884',meaning:'Pay for hours you worked in your normal schedule.',check:'Match the 72 hours with your timecard.'},
 {id:'award',code:'44',label:'Cash award',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Extra pay for an award, if one was issued. A blank row means none in this fictional period.',check:'Check your award notice if this row has an amount.'},
 {id:'annual-paid',code:'61',label:'Annual leave paid',hours:'8',hoursYtd:'144',amount:'$382',amountYtd:'$6,876',meaning:'Regular pay for approved vacation or personal time off. It is part of your 80 paid hours, not 8 extra work hours.',check:'Match the leave hours with your request and leave balance.'},
 {id:'sick-paid',code:'62',label:'Sick leave paid',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Pay for approved sick leave, when used.',check:'Check that any sick hours were actually taken.'},
 {id:'other-paid',code:'66',label:'Other leave',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Another paid or recorded leave category, depending on your agency.',check:'Ask your timekeeper what the code means on your statement.'},
 {id:'time-off-award',code:'66 61',label:'Time-off award',hours:'—',hoursYtd:'—',amount:'—',amountYtd:'—',meaning:'Awarded time off. It may show hours without an additional cash payment.',check:'Check any award notice and expiration rule.'},
 {id:'night',code:'—',label:'Night differential',hours:'12',hoursYtd:'216',amount:'$115',amountYtd:'$2,070',meaning:'Extra pay for eligible night work. These 12 hours overlap the regular work hours; they are not added to the 80 paid hours.',check:'Compare the premium with approved time and attendance.'},
 {id:'gross',code:'**',label:'Pay period hours and gross pay',hours:'80',hoursYtd:'1,440',amount:'$3,935',amountYtd:'$70,830',meaning:'Total paid hours and earnings before deductions. The sample adds $3,438 regular pay, $382 annual leave pay, and $115 night premium.',check:'72 work hours plus 8 leave hours equals 80 paid hours. Gross pay should equal the earnings rows.'},
];

const deductions:LedgerRow[]=[
 {id:'retirement',code:'75 02',label:'Retirement',amount:'$168',amountYtd:'$3,024',meaning:'Your employee contribution toward your federal retirement system.',check:'This is separate from your TSP savings and from your pension estimate.'},
 {id:'tsp',code:'75 15',label:'TSP–FERS',amount:'$300',amountYtd:'$5,400',meaning:'The amount you chose to contribute to your Thrift Savings Plan.',check:'Compare with your election and TSP account.'},
 {id:'tsp-fixed',code:'—',label:'Amount based on fixed amount',amount:'—',amountYtd:'—',meaning:'A payroll note indicating a TSP election may be expressed as a dollar amount rather than a percentage.',check:'Compare the TSP deduction with your current election.'},
 {id:'oasdi',code:'76',label:'Social Security (OASDI)',amount:'$234',amountYtd:'$4,212',meaning:'Payroll tax for Social Security, when your coverage requires it.',check:'Coverage can differ for some federal employees; ask payroll about an unexpected charge.'},
 {id:'federal-tax',code:'77',label:'Federal tax and withholding status',amount:'$466',amountYtd:'$8,388',meaning:'Federal income tax withheld. The status code reflects payroll instructions, not your final tax bill.',check:'Review your withholding election after major life changes.'},
 {id:'state-one',code:'78',label:'State tax withholding — first state',amount:'—',amountYtd:'—',meaning:'State income tax withheld when applicable. Some employees may see more than one state line.',check:'Confirm the state and withholding election with payroll.'},
 {id:'state-two',code:'78',label:'State tax withholding — second state',amount:'—',amountYtd:'—',meaning:'A separate state tax line if your payroll record requires one.',check:'Ask payroll to explain a state you do not expect.'},
 {id:'fegli',code:'81',label:'FEGLI coverage and premium',amount:'$22',amountYtd:'$396',meaning:'Your Federal Employees’ Group Life Insurance premium. A coverage amount or code may appear in the description.',check:'Confirm your election and coverage amount.'},
 {id:'fehb',code:'83',label:'FEHB or PSHB enrollment and premium',amount:'$155',amountYtd:'$2,790',meaning:'Your share of federal health coverage. Postal workers may have PSHB instead of FEHB.',check:'Compare the plan code and premium with your enrollment.'},
 {id:'dental',code:'83 10',label:'Dental plan',amount:'—',amountYtd:'—',meaning:'Your dental coverage premium, if enrolled.',check:'Check the plan and amount after Open Season.'},
 {id:'vision',code:'83 11',label:'Vision plan',amount:'—',amountYtd:'—',meaning:'Your vision coverage premium, if enrolled.',check:'Check the plan and amount after Open Season.'},
 {id:'union',code:'87',label:'Union or association dues',amount:'—',amountYtd:'—',meaning:'Membership dues deducted from pay when authorized.',check:'Ask payroll or the association about an unfamiliar charge.'},
 {id:'allotment-one',code:'88',label:'Checking or savings allotment 1',amount:'$30',amountYtd:'$540',meaning:'Money sent to another account at your request. Account numbers are masked.',check:'Look for the matching transfer in that account.'},
 {id:'allotment-two',code:'88',label:'Checking or savings allotment 2',amount:'$25',amountYtd:'$450',meaning:'A second transfer to an account you selected.',check:'Look for the matching transfer in that account.'},
 {id:'allotment-three',code:'88',label:'Checking or savings allotment 3',amount:'$25',amountYtd:'$450',meaning:'A third transfer to an account you selected.',check:'Look for the matching transfer in that account.'},
 {id:'tsp-loan-one',code:'88 40',label:'TSP loan repayment 1',amount:'—',amountYtd:'—',meaning:'Repayment of a TSP loan. It is not a new TSP contribution.',check:'Compare the payment with your TSP loan schedule.'},
 {id:'tsp-loan-two',code:'88 40',label:'TSP loan repayment 2',amount:'—',amountYtd:'—',meaning:'A second TSP loan repayment, if applicable.',check:'Confirm each loan separately in your TSP account.'},
 {id:'fsa',code:'93 11',label:'Health care FSA',amount:'—',amountYtd:'—',meaning:'Money set aside from pay for eligible health expenses, if you elected a flexible spending account.',check:'Compare with your FSA election.'},
 {id:'medicare',code:'97',label:'Medicare tax withheld',amount:'$55',amountYtd:'$990',meaning:'Payroll tax for Medicare, shown separately from Social Security on many statements.',check:'Look for both tax lines when reviewing total deductions.'},
 {id:'deduction-total',code:'**',label:'Total deductions',amount:'$1,480',amountYtd:'$26,640',meaning:'All deductions and allotments together for the period. In this sample, $3,935 gross pay minus $1,480 leaves $2,455 net pay.',check:'Add the current deduction amounts and compare with this total.'},
 {id:'net',code:'**',label:'Net pay',amount:'$2,455',amountYtd:'$44,190',meaning:'Money remaining after the listed deductions and allotments.',check:'Reconcile it with deposits; some amounts may have gone to separate accounts.'},
 {id:'routing',code:'**',label:'Direct deposit routing number',amount:'MASKED',amountYtd:'—',meaning:'The routing information for the main direct deposit, usually hidden on a shared copy.',check:'Contact payroll if the deposit went to the wrong account.'},
];

const leave:LesItem[]=[
 {id:'credit-hours',label:'Credit hours',value:'—',meaning:'Approved hours worked beyond your basic schedule under a flexible work arrangement.',check:'Check your agency’s rules for earning and using them.'},
 {id:'religious-comp',label:'Religious compensatory time',value:'—',meaning:'Time earned or used to make up time off for religious observance.',check:'Check your timecard and agency rules.'},
 {id:'travel-comp',label:'Travel compensatory time',value:'—',meaning:'Time credited for certain official travel outside regular work hours.',check:'Ask your timekeeper about expiration and use.'},
 {id:'military-leave',label:'Military leave',value:'—',meaning:'A separate leave category for eligible military service.',check:'Check your agency record for eligibility and balance.'},
 {id:'award-balance',label:'Time-off award balance',value:'—',meaning:'Unused hours from an approved time-off award.',check:'Check whether the award expires.'},
 {id:'bp-comp',label:'BPAPRA compensatory time',value:'—',meaning:'A specialized compensatory-time category that applies to certain Border Patrol agents.',check:'If it appears on your record, ask your timekeeper to confirm the balance.'},
 {id:'bp-debt',label:'BPAPRA obligated debt',value:'—',meaning:'A specialized Border Patrol Agent Pay Reform Act tracking field.',check:'Ask your agency to explain any amount shown.'},
 {id:'disabled-veteran',label:'Disabled veteran leave',value:'—',meaning:'A special leave category for eligible employees in a qualifying period.',check:'Confirm your eligibility and remaining hours with HR.'},
 {id:'restored-leave',label:'Restored annual leave',value:'—',meaning:'Annual leave restored after forfeiture under specific rules, tracked separately.',check:'Check the time limit for using restored leave.'},
 {id:'annual-balance',label:'Annual leave: accrued, used, balance',value:'108 earned / 144 used / 142 left',meaning:'Vacation or personal leave. Accrued means earned; used means taken; balance means still available.',check:'Check hours used against your leave requests.'},
 {id:'sick-balance',label:'Sick leave: accrued, used, balance',value:'72 earned / 0 used / 276 left',meaning:'Paid leave for qualifying illness or medical needs.',check:'Check hours used against your leave requests.'},
 {id:'comp-balance',label:'Compensatory leave',value:'—',meaning:'Approved time off earned instead of certain overtime pay, when applicable.',check:'Check your agency’s expiration and payout rules.'},
 {id:'use-lose',label:'Projected use or lose',value:'—',meaning:'An estimate of annual leave that could exceed your carryover limit at the end of the leave year.',check:'Confirm the projection and plan leave with your agency.'},
 {id:'unapproved',label:'Part-time hours unapplied',value:'—',meaning:'Hours at the end of a pay period that have not yet been applied to leave accrual for a part-time employee.',check:'If you work part time, ask your timekeeper about hours you expected to count.'},
 {id:'carryover',label:'Maximum carryover',value:'240 hours',meaning:'The annual-leave amount this fictional employee may generally carry into the next leave year. Individual rules can differ.',check:'Ask HR which ceiling applies to you.'},
 {id:'leave-category',label:'Leave category',value:'6 hours per pay period',meaning:'How quickly annual leave is normally earned based on creditable service and appointment.',check:'Compare with your leave SCD and HR record.'},
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
 const [inView,setInView]=useState(true);
 const statementRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=statementRef.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{rootMargin:'-110px 0px -170px 0px'});observer.observe(node);return()=>observer.disconnect();},[]);
 const field=(item:LesItem,hideValue=false)=> <button key={item.id} className={`les-field${active?.id===item.id?' is-active':''}`} type="button" onMouseEnter={()=>{if(window.matchMedia('(hover: hover) and (min-width: 1151px)').matches)setActive(item);}} onFocus={()=>setActive(item)} onClick={()=>setActive(item)} title={item.meaning}><span className="les-field-label">{item.label}</span>{!hideValue&&<span className="les-field-value">{item.value}</span>}</button>;
 const ledger=(rows:LedgerRow[])=>rows.map(item=><tr key={item.id}><td className="les-code">{item.code}</td><th scope="row">{field(item)}</th><td>{item.hours??'—'}</td><td>{item.hoursYtd??'—'}</td><td>{item.amount??'—'}</td><td>{item.amountYtd??'—'}</td></tr>);
 const leaveAmounts:Record<string,[string,string,string]>={'annual-balance':['108','144','142'],'sick-balance':['72','0','276']};
 return <div className="les-layout">
  <div ref={statementRef} className="les-scroll" aria-label="Scrollable fictional federal earnings and leave statement"><div className="les-sheet">
   <div className="les-mast"><strong>EPP · STATEMENT OF EARNINGS AND LEAVE</strong><span>ILLUSTRATIVE SAMPLE · ALL INFORMATION IS FICTIONAL</span></div>
   <div className="les-header-grid">{header.map(item=>field(item))}</div>
   <div className="les-section-title">EARNINGS AND DEDUCTIONS</div>
   <table className="les-ledger"><caption>Current pay period and year-to-date earnings and deductions</caption><thead><tr><th rowSpan={2}>Code</th><th rowSpan={2}>Description</th><th colSpan={2}>Hours</th><th colSpan={2}>Amount</th></tr><tr><th title="Hours for this pay period">P/P</th><th title="Hours so far this year">YTD</th><th title="Dollars for this pay period">P/P</th><th title="Dollars so far this year">YTD</th></tr></thead><tbody>{ledger(earnings)}{ledger(deductions)}</tbody></table>
   <div className="les-section-title">YEAR-TO-DATE LEAVE STATUS</div>
   <table className="les-leave-table"><caption>Year-to-date leave hours</caption><thead><tr><th scope="col">Type of leave</th><th scope="col">Accrued</th><th scope="col">Used</th><th scope="col">Balance</th></tr></thead><tbody>{leave.slice(0,12).map(item=>{const amounts=leaveAmounts[item.id]??['—','—','—'];return <tr key={item.id}><th scope="row">{field(item,true)}</th>{amounts.map((amount,index)=><td key={index}>{amount}</td>)}</tr>;})}</tbody></table>
   <div className="les-leave-details">{[...leave.slice(12,16),...restoredYearFields].map(item=>field(item))}</div>
   <div className="les-section-title">REMARKS AND CONTACT DETAILS</div>
   <div className="les-leave-details">{leave.slice(16).map(item=>field(item))}</div>
   <div className="les-footnote">P/P = this pay period. YTD = year to date. A dash means that line does not apply in this fictional sample. The sample covers common and specialized lines; your agency may show additional codes.</div>
  </div></div>
  <aside className={`les-explainer${active&&inView?' is-open':''}`} aria-live="polite"><span>WHAT THIS FIELD MEANS</span>{active?<><h2>{active.label}</h2><p>{active.meaning}</p><p className="les-check"><strong>What to check:</strong> {active.check}</p></>:<p>Hover over or tap a field to read its explanation here.</p>}</aside>
 </div>;
}
