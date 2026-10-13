import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './PlanningTools.css';

export default function Privacy() {
  return <div className="planning-page">
    <Helmet>
      <title>Website Privacy Notice | Broussard Financial Services</title>
      <meta name="description" content="How Broussard Financial Services handles website inquiries, optional educational-email requests, and analytics choices." />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/privacy" />
    </Helmet>
    <header className="planning-intro"><h1>Website privacy notice</h1><p>Here is what happens when you use this website to contact Broussard Financial Services.</p></header>
    <section className="planning-card"><h2>Information you choose to send us</h2><p>Our inquiry and consultation forms ask for contact information and the topic you want to discuss. You may also give a brief question or preferred appointment time. We use those details to respond, arrange a consultation, and follow up on your request. A request does not confirm an appointment.</p><p>Our forms can record the page where you first arrived, the page where you submitted the form, and campaign labels in a link you used. These help us understand which resources brought you to us. Do not enter account numbers, Social Security numbers, or sensitive financial documents in a website form.</p></section>
    <section className="planning-card"><h2>Educational email and seminars</h2><p>The educational-email option on a review form is optional and starts unchecked. You can request a review without subscribing. The seminar-interest form asks for permission to email you about events. You can ask us to stop those updates by contacting us at the address below. A review request alone does not subscribe you to educational email.</p></section>
    <section className="planning-card"><h2>Website tools and analytics</h2><p>Amounts entered into our public calculators are calculated in your browser and are not submitted to us by those tools. Downloaded or printed reports are saved or printed through your own browser.</p><p>Google Analytics loads on this site only if you choose “Accept analytics.” The site measures page visits and actions such as a completed inquiry without sending calculator amounts or form contents as analytics events. You can change your analytics preference using the control in the footer; the choice applies while the page remains open.</p></section>
    <section className="planning-card"><h2>Service providers and questions</h2><p>Netlify hosts this website and processes website form submissions. Google provides optional analytics. If you open a linked service or a chat widget, that provider may handle information under its own terms and privacy practices.</p><p>For questions about information you submitted through this website, contact <a href="mailto:info@broussardfinancialservices.com">info@broussardfinancialservices.com</a> or call <a href="tel:+16195810010">(619) 581-0010</a>. You can also <Link to="/book">request a consultation</Link>.</p></section>
  </div>;
}
