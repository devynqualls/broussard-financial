import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import TaxRates from '../components/sections/TaxRates/TaxRates';
import './PlanningTools.css';
export default function TaxPlanning(){return <><div className="planning-page tax-intro"><Helmet><title>2026 Tax Reference & Estimator | Broussard Financial Services</title><meta name="description" content="Explore 2026 federal income tax brackets and an educational tax estimator. Discuss how taxes fit into your retirement income plan."/><link rel="canonical" href="https://www.broussardfinancialservices.com/tax-planning"/></Helmet><header className="planning-intro"><Link to="/planning-tools">← Planning tools</Link><h1>Understand your taxes.<br/><em>Plan your next step.</em></h1><p>A federal tax reference and simplified estimator for an informed planning conversation. These estimates do not replace a tax return or personalized tax advice.</p></header></div><TaxRates/></>;}
