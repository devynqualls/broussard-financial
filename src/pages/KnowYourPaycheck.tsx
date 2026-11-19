import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import FullLesStatement from './FullLesStatement';
import './PlanningTools.css';
import './KnowYourPaycheck.css';

export default function KnowYourPaycheck(){
 return <div className="planning-page paycheck-guide">
  <Helmet><title>Know Your Paycheck: Federal LES Guide | Broussard Financial Services</title><meta name="description" content="Read every section of a federal civilian earnings and leave statement, including current and year-to-date pay, deductions, TSP, insurance, leave, and payroll codes."/><link rel="canonical" href="https://www.broussardfinancialservices.com/know-your-paycheck"/></Helmet>
  <header className="planning-intro"><Link to="/planning-tools">← Planning tools</Link><span>FEDERAL PAYCHECK GUIDE</span><h1>Know Your Paycheck.</h1><p>Move your mouse over a field or row on the sample statement to see what it means. On a phone or tablet, tap a field. Scroll sideways to read the whole statement.</p></header>
  <div className="paycheck-guide-note"><strong>This is a fictional learning example.</strong> It follows the layout and field types of a federal Statement of Earnings and Leave. It does not contain a client’s personal information or actual pay. Your agency may use different codes or a different format.</div>
  <FullLesStatement/>
  <section className="planning-card paycheck-next"><span>YOUR FIVE-MINUTE PAYCHECK CHECK</span><h2>Start with four checks.</h2><ol><li>Match the pay dates, job details, and hours to your timecard and SF-50.</li><li>Check that gross pay minus all deductions equals net pay. Remember that allotments may go to different accounts.</li><li>Compare TSP contributions, TSP loan payments, insurance, and taxes with your elections.</li><li>Review annual and sick leave, projected use-or-lose, and the remarks area.</li></ol><p>For a retirement review, bring your latest pay statement, SF-50, TSP statement, and retirement estimate if you have one. Do not put Social Security numbers, bank details, or full statements in the public contact form.</p><Link to="/federal-planning#paycheck">Explore your retirement paycheck →</Link></section>
  <section className="planning-card paycheck-sources"><h2>Official statement guides</h2><p>Use your payroll provider’s guide when a label differs from this example.</p><ul><li><a href="https://help.nfc.usda.gov/publications/PPO/67115.htm" target="_blank" rel="noopener noreferrer">National Finance Center: Statement of Earnings and Leave (AD-334)</a></li><li><a href="https://www.dfas.mil/CivilianEmployees/understandingyourcivilianpay/LES/" target="_blank" rel="noopener noreferrer">DFAS: civilian LES walkthrough</a></li><li><a href="https://www.opm.gov/policy-data-oversight/pay-leave/leave-administration/fact-sheets/annual-leave/" target="_blank" rel="noopener noreferrer">OPM: annual leave</a></li></ul></section>
 </div>;
}
