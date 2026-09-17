import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/layout/Nav/Nav';
import Footer from './components/layout/Footer/Footer';
import SchemaOrg from './seo/SchemaOrg';
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';

export default function App() {
  return (
    <HelmetProvider>
      <SchemaOrg />

      <a href="#services" className="skip-link">Skip to main content</a>

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </HelmetProvider>
  );
}
