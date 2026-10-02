import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from '../components/ui/ErrorBoundary/ErrorBoundary';
import Hero from '../components/sections/Hero/Hero';
import Ticker from '../components/sections/Ticker/Ticker';
import Services from '../components/sections/Services/Services';
import About from '../components/sections/About/About';
import Process from '../components/sections/Process/Process';
import FederalBenefits from '../components/sections/FederalBenefits/FederalBenefits';
import TaxRates from '../components/sections/TaxRates/TaxRates';
import Seminars from '../components/sections/Seminars/Seminars';
import CTABand from '../components/sections/CTABand/CTABand';
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
          content="Broussard Financial Services helps business owners, high net worth individuals, and federal employees reduce taxes and build confident retirement income. Free consultation with AIF® Fiduciary Rene Broussard."
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

      <ErrorBoundary sectionName="Ticker">
        <Ticker />
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

      <ErrorBoundary sectionName="Tax Rates">
        <TaxRates />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Seminars">
        <Seminars />
      </ErrorBoundary>

      <ErrorBoundary sectionName="CTA">
        <CTABand />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Contact">
        <Contact />
      </ErrorBoundary>
    </>
  );
}
