import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnnuityBenefits from '../components/sections/AnnuityBenefits';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import './PlanningTools.css';

const reviewQuestions = [
  'How much dependable monthly income would help cover essential expenses?',
  'When would I want that income to begin, and for how long?',
  'How much of my savings should stay readily available?',
  'Which benefits, costs, and withdrawal terms are written into the contract?',
];

export default function AnnuityEducation() {
  return <div className="planning-page">
    <Helmet>
      <title>What Is an Annuity? Retirement Income Benefits | Broussard Financial Services</title>
      <meta name="description" content="Learn what an annuity is and how it may provide dependable retirement income. Explore common benefits and request a free review with Broussard Financial Services." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/annuity-education" />
    </Helmet>
    <header className="planning-intro">
      <Link to="/learning-library">← Learning library</Link>
      <h1>What is an annuity?</h1>
      <p>When your paycheck ends, essential expenses continue. An annuity can turn part of your savings into income you can plan around. We’ll explain the benefits in plain language, review a contract you already own, or help you explore a new one.</p>
      <ConsultationCTA label="Discuss my retirement income" />
      <p className="tool-note">Your initial consultation and review are free.</p>
    </header>

    <AnnuityBenefits />

    <section className="planning-card">
      <h2>Start with the income you need</h2>
      <p>List the expenses that continue every month. Subtract income you expect from Social Security and any pension. The remaining gap gives you a practical starting point for discussing how much additional income you want and when it should begin.</p>
      <p><Link to="/planning-tools#gap">Estimate your monthly income gap →</Link></p>
      <p className="tool-note">The calculator organizes your numbers; it does not provide an annuity quote or determine suitability.</p>
    </section>

    <section className="planning-card">
      <h2>Already own an annuity? Know what it can do for you.</h2>
      <p>A free review can clarify when income may begin, what payments or protections your contract provides, what money remains accessible, and what would happen if you changed the contract. Bring your statement and contract for your own reference.</p>
      <p>There is no need to replace an annuity simply because it is older. We will discuss your goals and compare any proposed change with the benefits and costs of the contract you have.</p>
      <ConsultationCTA label="Review my current annuity" />
    </section>

    <section className="planning-card">
      <h2>Make the benefits work for you</h2>
      <p>The right conversation starts with your income goal, your timeline, and the savings you want to keep accessible. We can then compare contract benefits with the terms that matter to you.</p>
      <ol>{reviewQuestions.map(question => <li key={question}>{question}</li>)}</ol>
      <p className="tool-note">Annuities are long-term insurance contracts. Features and guarantees vary by contract; review costs, liquidity, and tax treatment before deciding. <a href="https://www.investor.gov/introduction-investing/investing-basics/investment-products/annuities">Read the SEC’s annuity guide →</a></p>
    </section>
    <ConsultationCTA label="Talk with us about safe retirement income" />
  </div>;
}
