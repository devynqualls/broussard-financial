import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnnuityBenefits from '../components/sections/AnnuityBenefits';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import './PlanningTools.css';

const reviewQuestions = [
  'How much monthly income do I want to cover, and when should it begin?',
  'Which payments are guaranteed by the contract, and for how long?',
  'How much of my savings should stay available for emergencies?',
  'What are the withdrawal limits, surrender charges, and other costs?',
  'If I already own an annuity, what benefits would I lose by changing it?',
];

export default function AnnuityEducation() {
  return <div className="planning-page">
    <Helmet>
      <title>Safe Retirement Income & Annuity Reviews | Broussard Financial Services</title>
      <meta name="description" content="See how an annuity may help provide steady retirement income. Learn what to check in your current contract and request a free annuity review." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/annuity-education" />
    </Helmet>
    <header className="planning-intro">
      <Link to="/learning-library">← Learning library</Link>
      <h1>Plan for income you can count on.</h1>
      <p>When a paycheck ends, your need for reliable income does not. An annuity may help cover part of your monthly expenses with payments defined by an insurance contract. We can review an annuity you own or help you explore a new one.</p>
      <ConsultationCTA label="Schedule my free annuity review" />
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
      <h2>Five questions worth asking</h2>
      <ol>{reviewQuestions.map(question => <li key={question}>{question}</li>)}</ol>
      <p className="tool-note">Annuities are long-term insurance contracts. Guarantees depend on the issuing insurer’s financial strength and claims-paying ability. Features, income terms, fees, surrender charges, and tax treatment vary by contract. <a href="https://www.investor.gov/introduction-investing/investing-basics/investment-products/annuities">Read the SEC’s annuity guide →</a></p>
    </section>
    <ConsultationCTA label="Talk with us about safe retirement income" />
  </div>;
}
