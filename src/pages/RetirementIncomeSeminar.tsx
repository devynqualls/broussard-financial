import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SeminarSignup from '../components/sections/Seminars/SeminarSignup';
import './RetirementIncomeSeminar.css';

export default function RetirementIncomeSeminar() {
  return <div className="seminar-page">
    <Helmet>
      <title>Retirement Income Seminar | Broussard Financial Services</title>
      <meta name="description" content="Get notified about Broussard Financial Services' upcoming retirement income seminar with Rene Broussard. Learn how to compare retirement accounts, income options, and beneficiary choices." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/retirement-income-seminar" />
      <meta property="og:title" content="Retirement Income Seminar | Broussard Financial Services" />
      <meta property="og:description" content="A free educational seminar on turning retirement savings into income. Presenter: Rene Broussard. Date to be announced." />
      <meta property="og:url" content="https://www.broussardfinancialservices.com/retirement-income-seminar" />
      <meta property="og:image" content="https://www.broussardfinancialservices.com/images/retirement-income-seminar.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <header className="seminar-hero">
      <div>
        <span className="seminar-kicker">FREE EDUCATIONAL SEMINAR · DATE TO BE ANNOUNCED</span>
        <h1>From retirement savings to a retirement paycheck.</h1>
        <p>Join Rene Broussard for a clear look at income choices for people age 59½ and older. Compare what your current accounts provide, where an annuity may help create dependable income, and how your beneficiary decisions fit the plan.</p>
        <a className="seminar-primary-link" href="#seminar-signup">Get notified when the date is set →</a>
        <p className="seminar-hero-note">The date and format have not been announced. Joining the interest list does not reserve a seat.</p>
      </div>
      <aside className="seminar-facts" aria-label="Seminar details">
        <span>THE CONVERSATION</span>
        <div><small>Presenter</small><strong>Rene Broussard</strong></div>
        <div><small>For whom</small><strong>Adults 59½ and older, approaching or in retirement</strong></div>
        <div><small>Date</small><strong>To be announced</strong></div>
        <div><small>Cost</small><strong>Free</strong></div>
      </aside>
    </header>
    <div className="seminar-content">
      <section aria-labelledby="seminar-learn-heading">
        <span className="seminar-kicker">WHAT WE'LL COVER</span>
        <h2 id="seminar-learn-heading">The decisions behind dependable income.</h2>
        <div className="seminar-topic-grid">
          <article><span>01</span><h3>Know your income gap</h3><p>Put Social Security, pensions, savings, and essential expenses on one page. See which income is already dependable and which depends on withdrawals or market performance.</p></article>
          <article><span>02</span><h3>Compare your account choices</h3><p>Review what it means to keep assets in a TSP or workplace plan, use an IRA, or consider a partial rollover. Compare costs, access to funds, tax treatment, and available services before making a move.</p></article>
          <article><span>03</span><h3>Understand annuity income</h3><p>See how an annuity can provide contract-based income and what to ask about insurer strength, income riders, fees, surrender periods, and liquidity. Any illustration depends on an actual product and quote.</p></article>
          <article><span>04</span><h3>Coordinate the legacy</h3><p>Close with beneficiary designations, trust-account questions, and the documents your family may need. We help coordinate trust document preparation through a partner company.</p></article>
        </div>
      </section>
      <section className="seminar-takeaway" aria-labelledby="seminar-takeaway-heading">
        <div>
          <span className="seminar-kicker">YOUR TAKE-HOME TOOL</span>
          <h2 id="seminar-takeaway-heading">Start your retirement paycheck worksheet.</h2>
          <p>Use this one-page worksheet to list dependable monthly income, essential expenses, and the questions to ask before changing an account. Bring your completed copy to an individual conversation if you choose; you do not need to share it at the seminar.</p>
          <a href="/resources/retirement/retirement-paycheck-worksheet.pdf" download>Download the one-page worksheet (PDF) →</a>
        </div>
        <aside aria-label="About the presenter">
          <span className="seminar-kicker">MEET YOUR PRESENTER</span>
          <h3>Rene Broussard</h3>
          <p>Rene is an Accredited Investment Fiduciary® and Federal Retirement Consultant. He helps individuals and families connect income, investments, insurance, and legacy decisions into a retirement plan they can understand.</p>
          <Link to="/team">Meet the planning team →</Link>
        </aside>
      </section>
      <section className="seminar-next" aria-labelledby="seminar-next-heading">
        <div><span className="seminar-kicker">NEXT STEP</span><h2 id="seminar-next-heading">Get the announcement first.</h2><p>We will email the date and event details when they are confirmed. If you would rather talk one-on-one now, you can <Link to="/services/retirement-income">request a retirement income review</Link>.</p></div>
        <SeminarSignup standalone retirementIncome />
      </section>
      <p className="seminar-disclosure">This seminar is educational. It does not determine whether a rollover, annuity, or trust change is appropriate for any individual. Review costs, access to funds, taxes, plan rules, and contract terms before making a decision.</p>
    </div>
  </div>;
}
