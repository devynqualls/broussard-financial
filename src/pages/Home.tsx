import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from '../components/ui/ErrorBoundary/ErrorBoundary';
import Hero from '../components/sections/Hero/Hero';

import Services from '../components/sections/Services/Services';
import About from '../components/sections/About/About';
import Process from '../components/sections/Process/Process';
import FederalBenefits from '../components/sections/FederalBenefits/FederalBenefits';
import {Link} from 'react-router-dom';
import Seminars from '../components/sections/Seminars/Seminars';

import Contact from '../components/sections/Contact/Contact';
import ClientReviews from '../components/sections/ClientReviews';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Financial Planning in San Diego | Broussard Financial Services</title>
        <meta
          name="description"
          content="Financial planning for people nearing or in retirement. Based in San Diego and serving clients nationwide, with guidance on income, Social Security, annuities, and federal benefits."
        />
        <meta property="og:title" content="Financial Planning in San Diego | Broussard Financial Services" />
        <meta
          property="og:description"
          content="Helping you build a confident retirement with personalized income strategies, tax planning, and wealth protection. Serving clients nationwide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.broussardfinancialservices.com" />
        <meta property="og:site_name" content="Broussard Financial Services" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.broussardfinancialservices.com/images/bfs-logo-clean.png" />
        <meta property="og:image:alt" content="Broussard Financial Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Planning in San Diego | Broussard Financial Services" />
        <meta
          name="twitter:description"
          content="Helping you build a confident retirement with personalized income strategies, tax planning, and wealth protection. Serving clients nationwide."
        />
        <meta name="twitter:image" content="https://www.broussardfinancialservices.com/images/bfs-logo-clean.png" />
        <link rel="canonical" href="https://www.broussardfinancialservices.com" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Diego" />
        <meta name="geo.position" content="32.7157;-117.1611" />
        <meta name="ICBM" content="32.7157, -117.1611" />
      </Helmet>

      <ErrorBoundary sectionName="Hero">
        <Hero />
      </ErrorBoundary>

      

      <ErrorBoundary sectionName="Services">
        <Services />
      </ErrorBoundary>

      <ErrorBoundary sectionName="About">
        <About />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Process">
        <Process />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Federal Benefits">
        <FederalBenefits />
      </ErrorBoundary>

      <section className="home-resources" id="resources" aria-labelledby="resources-heading"><div><span>EXPLORE AT YOUR OWN PACE</span><h2 id="resources-heading">Turn questions into a clearer plan.</h2><p>Explore free tools. No signup or account numbers needed.</p></div><nav aria-label="Planning resources"><Link to="/learning-library">Learning library &amp; estate checklist →</Link><Link to="/planning-tools">Income, savings &amp; market scenarios →</Link><Link to="/federal-planning">Federal retirement planning center →</Link><Link to="/tax-planning">2026 tax reference &amp; estimator →</Link><Link to="/federal-resources">Official civilian federal benefits resources →</Link><Link to="/military-retirement">Military retirement &amp; TSP guide →</Link></nav></section>

      <section className="home-review-offers" aria-labelledby="review-offers-heading">
        <span>START WITH YOUR QUESTION</span>
        <h2 id="review-offers-heading">Choose the review that fits your next decision.</h2>
        <p>Each starts with a free conversation with a Broussard consultant. Tell us what you want to understand, and we will contact you to arrange a time.</p>
        <div className="home-review-grid">
          <Link to="/services/annuities"><strong>Retirement income review</strong><small>Monthly income needs and existing annuity questions</small><span>Request a review →</span></Link>
          <Link to="/services/federal-retirement"><strong>Federal retirement review</strong><small>FERS, TSP, Social Security, and survivor choices</small><span>Request a review →</span></Link>
          <Link to="/services/trust-reviews"><strong>Trust and estate review</strong><small>Existing trusts, trust accounts, updates, and new trusts</small><span>Request a review →</span></Link>
        </div>
      </section>

      <ErrorBoundary sectionName="Seminars">
        <Seminars />
      </ErrorBoundary>

      

      <ErrorBoundary sectionName="Contact">
        <ClientReviews />
        <Contact />
      </ErrorBoundary>
    </>
  );
}
