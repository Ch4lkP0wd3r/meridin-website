
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { Pricing } from './components/Pricing';
import { Services } from './components/Services';
import { ReconReports } from './components/ReconReports';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export type Page = 'home' | 'pricing' | 'services' | 'contact' | 'free-report';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Reveal On Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  // Handle scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="animate-fade">
            <Hero onNavigate={setCurrentPage} />
            <HomeSections onNavigate={setCurrentPage} />
          </div>
        );
      case 'pricing':
        return (
          <div className="animate-fade">
            <Pricing />
          </div>
        );
      case 'services':
        return (
          <div className="animate-fade">
            <Services />
          </div>
        );
      case 'free-report':
        return (
          <div className="animate-fade">
            <ReconReports />
          </div>
        );
      case 'contact':
        return (
          <div className="animate-fade">
            <Contact />
          </div>
        );
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative bg-[#000000] min-h-screen text-white selection:bg-white selection:text-black">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
