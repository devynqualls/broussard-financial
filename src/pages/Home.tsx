import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>Retirement Planning in San Diego | Broussard Financial Services</title>
        <meta
          name="description"
          content="San Diego retirement planning for federal employees, retirees and families. Explore income, TSP, estate planning, trusts and insurance. Free consultations."
        />
        <meta
          name="keywords"
          content="retirement planning, financial advisor, AIF fiduciary, TSP education, federal employee benefits, tax planning, Social Security planning, lifetime income planning, living trust"
        />
        <meta property="og:title" content="Retirement Planning | Broussard Financial Services" />
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
        <meta name="twitter:title" content="Retirement Planning | Broussard Financial Services" />
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

      <section className="home-resources" id="resources" aria-labelledby="resources-heading"><div><span>EXPLORE AT YOUR OWN PACE</span><h2 id="resources-heading">Turn questions into a clearer plan.</h2><p>Use our free tools before your consultation. No signup or account numbers required.</p></div><nav aria-label="Planning resources"><Link to="/learning-library">Learning library &amp; estate checklist →</Link><Link to="/planning-tools">Income, savings &amp; market scenarios →</Link><Link to="/federal-planning">Federal retirement planning center →</Link><Link to="/tax-planning">2026 tax reference &amp; estimator →</Link><Link to="/federal-resources">Official federal benefits resources →</Link></nav></section>

      <ErrorBoundary sectionName="Seminars">
        <Seminars />
      </ErrorBoundary>

      

      <ErrorBoundary sectionName="Contact">
        <Contact />
      </ErrorBoundary>
    </>
  );
}
