import AnalyticsConsent from './components/ui/AnalyticsConsent';
import Measurement from './components/ui/Measurement';
import {lazy, Suspense, type ComponentType} from 'react';
import type {HelmetServerState} from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/layout/Nav/Nav';
import Footer from './components/layout/Footer/Footer';
import SchemaOrg from './seo/SchemaOrg';
const LazyHome = lazy(() => import('./pages/Home'));
const LazyPlanningTools = lazy(() => import('./pages/PlanningTools'));
import ChatLauncher from './components/ui/ChatLauncher';
import NotFound from './pages/NotFound';
const LazyServicePage = lazy(() => import('./pages/ServicePage'));
import { CALENDLY_URL } from './config/site';
const LazyFederalPlanning = lazy(() => import('./pages/FederalPlanning'));
const LazyFederalResources = lazy(() => import('./pages/FederalResources'));
const LazyTeamPage = lazy(() => import('./pages/TeamPage'));

export default function App({helmetContext={},pages}:{helmetContext?:{helmet?:HelmetServerState};pages?:Record<string,ComponentType>}) {
  const {FederalPlanning=LazyFederalPlanning,FederalResources=LazyFederalResources,Home=LazyHome,PlanningTools=LazyPlanningTools,ServicePage=LazyServicePage,TeamPage=LazyTeamPage}=pages||{};
  return (
    <HelmetProvider context={helmetContext}>
      <SchemaOrg />
      <Measurement />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p className="planning-page">Loading page…</p>}><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/federal-planning" element={<FederalPlanning />} />
          <Route path="/federal-resources" element={<FederalResources />} />
          <Route path="/planning-tools" element={<PlanningTools />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense>
      </main>

      <Footer />
      <AnalyticsConsent />
      <nav className="mobile-contact-bar" aria-label="Quick contact"><a href="tel:+16195810010">Call us</a><a href={CALENDLY_URL}>Book a free consultation</a></nav>
      <ChatLauncher />
    </HelmetProvider>
  );
}
