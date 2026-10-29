import {Link} from 'react-router-dom';
const questions:Record<string,string>={
 'trust-reviews':'Which assets and accounts are intended to be covered, and what has changed since the documents were prepared? A review can identify questions; legal document changes require appropriate legal guidance.',
 annuities:'How much income do you need, when will you need access to the money, and what fees or surrender charges apply? Guarantees depend on the issuing insurer and contract terms.',
 'real-estate':'What location, timeline, and budget fit your goals? Investment property involves ongoing expenses, vacancy risk, and potential loss; projected rent is not guaranteed income.',
 'life-insurance':'Who relies on your income, how long might they need support, and what coverage do you already have? Policy costs and eligibility depend on the product and underwriting.',
 'retirement-income':'What spending must your income cover, and how would you handle unexpected costs or a decline while withdrawing? Compare essential expenses with other goals and consider taxes, fees, and access to savings.',
 'financial-planning':'How much income will you need, what sources can provide it, and which risks or family priorities matter most? Start with your current benefits and accounts before comparing strategies.',
 'tax-planning':'Which accounts will supply income in retirement, when might required distributions begin, and could a change in income affect Medicare premiums? Review potential tax effects with your tax professional before making a withdrawal or conversion decision.',
 'federal-retirement':'How do your pension start date, Social Security timing, survivor election, and TSP withdrawals fit together? Confirm personal eligibility and benefit estimates with your agency benefits office.',
 'tsp-planning':'What would change if you kept money in TSP or moved it? Compare fees, investment choices, withdrawal flexibility, services, and account protections before making a decision. A rollover is not automatically an improvement.'
};
export default function ServiceEducation({slug}:{slug:string}){const federal=['federal-retirement','tsp-planning'].includes(slug);return <>
 <section className="planning-card"><h2>Questions to consider</h2><p>{questions[slug]}</p><p>We start with your circumstances. A calculator or general example cannot determine which product or strategy is appropriate for you.</p></section>
 {slug==='financial-planning'&&<section className="planning-card" aria-labelledby="retirement-questions-heading">
  <h2 id="retirement-questions-heading">Financial planning questions before retirement</h2>
  <h3>Do I need to be a federal employee to work with Broussard?</h3>
  <p>No. From our San Diego office, we work with clients nationwide from many careers. Federal benefits are a specialty, and the same first conversation can start with a 401(k), IRA, pension, existing annuity, or other savings.</p>
  <h3>What should a financial plan answer before retirement?</h3>
  <p>Start with essential monthly spending, reliable income such as Social Security or a pension, and the amount your savings need to provide. Then review withdrawal timing, taxes, access to cash, market risk, and the needs of a spouse or beneficiaries. <Link to="/planning-tools#gap">Explore the income-gap tool →</Link></p>
  <h3>How would we evaluate an annuity?</h3>
  <p>We would compare the income you need and when it should start with a current carrier illustration. We would also review fees, surrender periods, withdrawal access, and the insurer behind any guarantee. An annuity may be useful for part of a plan; it is not automatically the right destination for every account. <Link to="/annuity-education">Learn about annuity income →</Link></p>
  <p><Link to="/team">Meet the team behind these conversations →</Link></p>
 </section>}
 <section className="planning-card"><h2>Explore reliable resources</h2><p><Link to="/learning-library">Read our retirement learning library →</Link></p>{slug==='annuities'&&<p><Link to="/annuity-education">See how annuities work and their potential benefits →</Link></p>}<p><Link to="/planning-tools">Use our free planning calculators →</Link></p><p>{federal?<><a href="https://www.opm.gov/retirement-center/">OPM retirement information</a> · <a href="https://www.tsp.gov/">Official Thrift Savings Plan</a></>:<a href="https://www.investor.gov/">Investor.gov financial education</a>}</p>{federal&&<p className="tool-note">Air traffic controllers, law enforcement officers, firefighters and other special-category employees should verify covered-service records and category-specific benefit rules. <Link to="/federal-planning#eligibility">Select your coverage in our federal calculators →</Link> Official agencies and plan documents determine benefit eligibility and rules.</p>}<p>Related services: <Link to="/services/retirement-income">Retirement income</Link> · <Link to="/services/federal-retirement">Federal retirement</Link> · <Link to="/services/tsp-planning">TSP education</Link></p></section>
 </>}
