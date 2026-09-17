import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from '../components/ui/ErrorBoundary/ErrorBoundary';
import Team from '../components/sections/Team/Team';
import CTABand from '../components/sections/CTABand/CTABand';

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Meet the Team | Broussard Financial Services</title>
        <meta
          name="description"
          content="Meet the team at Broussard Financial Services — led by AIF® Fiduciary Rene Broussard, helping business owners, high net worth individuals, and federal employees plan confident retirements."
        />
        <meta property="og:title" content="Meet the Team | Broussard Financial Services" />
        <meta
          property="og:description"
          content="Get to know the advisors and team members behind Broussard Financial Services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.broussardfinancialservices.com/team" />
        <meta property="og:site_name" content="Broussard Financial Services" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.broussardfinancialservices.com/images/bfs-logo.png" />
        <meta property="og:image:alt" content="Broussard Financial Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meet the Team | Broussard Financial Services" />
        <meta name="twitter:description" content="Get to know the advisors and team members behind Broussard Financial Services." />
        <meta name="twitter:image" content="https://www.broussardfinancialservices.com/images/bfs-logo.png" />
        <link rel="canonical" href="https://www.broussardfinancialservices.com/team" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ErrorBoundary sectionName="Team">
        <Team />
      </ErrorBoundary>

      <ErrorBoundary sectionName="CTA">
        <CTABand />
      </ErrorBoundary>
    </>
  );
}
