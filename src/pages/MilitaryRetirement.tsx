import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ConsultationCTA from '../components/ui/ConsultationCTA';
import './PlanningTools.css';

const preparation = [
  'Which military retirement system applies to me, and what does my official estimate show?',
  'When will retired pay, TSP withdrawals, and Social Security each begin?',
  'How much monthly spending remains after dependable income?',
  'How much of my TSP or other savings should stay accessible?',
  'What survivor and beneficiary choices should my household review?',
];

export default function MilitaryRetirement() {
  return <div className="planning-page">
    <Helmet>
      <title>Military Retirement & TSP Planning | Broussard Financial Services</title>
      <meta name="description" content="A simple guide to coordinating military retired pay, TSP, Social Security, and monthly spending. Find official BRS resources and plan your next questions." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/military-retirement" />
    </Helmet>
    <header className="planning-intro">
      <Link to="/learning-library">← Learning library</Link>
      <h1>Military retirement &amp; TSP</h1>
      <p>Your service earned benefits. See how military retired pay, TSP savings, Social Security, and your monthly expenses fit together in one retirement income picture.</p>
      <p className="tool-note">For service members, veterans, and military families · Educational guide</p>
    </header>

    <nav className="tool-directory" aria-label="Military retirement guide sections">
      <a href="#retirement-system">Know your retirement system →</a>
      <a href="#retirement-income">Build your income picture →</a>
      <a href="#brs">Blended Retirement System resources →</a>
      <a href="#prepare">Prepare for a conversation →</a>
    </nav>

    <section className="planning-card" id="retirement-system">
      <span>01 · START WITH YOUR RECORDS</span>
      <h2>Know which retirement system applies to you</h2>
      <p>Military retired pay depends on your service record and retirement system. Some people are covered by a legacy plan; others participate in the Blended Retirement System (BRS). Guard and Reserve retirement also has different timing and service rules. Start with your official retirement estimate and confirm plan details with your service or benefits office.</p>
      <p className="tool-note">Military retirement is separate from civilian FERS. Our <Link to="/federal-planning">FERS calculator</Link> estimates certain civilian federal benefits; it does not calculate military retired pay.</p>
    </section>

    <section className="planning-card" id="retirement-income">
      <span>02 · SEE THE FULL PAYCHECK</span>
      <h2>Put each income source on a timeline</h2>
      <p>Write down when military retired pay, TSP withdrawals, Social Security, and any other income may begin. Then compare that income with housing, health care, food, taxes, and other monthly costs. The difference is the amount your savings may need to cover.</p>
      <p><Link to="/planning-tools#gap">Estimate your monthly income gap →</Link></p>
      <p><Link to="/planning-tools#market">Explore how a market decline could affect withdrawals →</Link></p>
      <p className="tool-note">These general planning tools use the amounts you enter. They do not determine military benefit eligibility, retired pay, or TSP withdrawal rules.</p>
    </section>

    <section className="planning-card" id="brs">
      <span>03 · IF BRS APPLIES TO YOU</span>
      <h2>Understand where BRS fits</h2>
      <p>BRS combines military retired pay for those who qualify with government contributions to TSP. It also includes continuation pay for eligible members who agree to additional service. Whether BRS applies to you depends on when you entered service and any election you made. Your TSP balance is savings, not an automatic monthly pension.</p>
      <div className="resource-grid">
        <a href="https://www.militaryonesource.mil/resources/millife-guides/blended-retirement-system/" target="_blank" rel="noopener noreferrer"><h3>Official BRS guide ↗</h3><p>Check eligibility, pension and TSP basics with Military OneSource.</p><small>Military OneSource · opens in a new tab</small></a>
        <a href="https://militarypay.defense.gov/Calculators/Blended-Retirement-System-Standalone-Calculator/" target="_blank" rel="noopener noreferrer"><h3>Official BRS calculator ↗</h3><p>Explore an individualized BRS estimate using the government calculator.</p><small>Military Pay · opens in a new tab</small></a>
        <a href="https://www.tsp.gov/" target="_blank" rel="noopener noreferrer"><h3>Thrift Savings Plan ↗</h3><p>Review your account, plan rules, and withdrawal choices directly with TSP.</p><small>TSP.gov · opens in a new tab</small></a>
        <a href="https://www.militaryonesource.mil/resources/millife-guides/retirement-transition/" target="_blank" rel="noopener noreferrer"><h3>Military retirement transition ↗</h3><p>Find guidance for retirement from military service and family decisions.</p><small>Military OneSource · opens in a new tab</small></a>
      </div>
    </section>

    <section className="planning-card" id="prepare">
      <span>04 · BRING THE RIGHT QUESTIONS</span>
      <h2>Prepare for a useful conversation</h2>
      <ol>{preparation.map(question => <li key={question}>{question}</li>)}</ol>
      <p>Bring your official estimate and TSP statement for your own reference. Keep account numbers and sensitive documents out of the website contact form.</p>
      <ConsultationCTA label="Discuss my retirement income plan" />
    </section>
  </div>;
}
