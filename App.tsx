
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { Pricing } from './components/Pricing';
import { Services } from './components/Services';
import { ReconReports } from './components/ReconReports';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Marketplace } from './components/Marketplace';
import { Labs } from './components/Labs';
import { NotFoundError } from './components/NotFoundError';
import { VictimSupport } from './components/VictimSupport';

export type Page = 'home' | 'pricing' | 'services' | 'contact' | 'free-report' | 'marketplace' | 'victim-support';

export interface Plan {
  name: string;
  price: string;
  id: string;
  billingType: 'monthly' | 'one-time';
  widgetId?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<Plan[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const addToCart = (plan: Plan) => {
    setCartItems(prev => {
      // Prevent duplicate plans if it's a monthly subscription
      if (plan.billingType === 'monthly' && prev.some(item => item.id === plan.id)) {
        return prev;
      }
      return [...prev, plan];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

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
            <Pricing onAddToCart={addToCart} />
          </div>
        );
      case 'services':
        return (
          <div className="animate-fade">
            <Services onNavigate={setCurrentPage} />
          </div>
        );
      case 'free-report':
        return (
          <div className="animate-fade">
            <ReconReports />
          </div>
        );
      case 'marketplace':
        return (
          <div className="animate-fade">
            <Marketplace onAddToCart={addToCart} />
          </div>
        );
      case 'contact':
        return (
          <div className="animate-fade">
            <Contact />
          </div>
        );
      case 'victim-support':
        return (
          <div className="animate-fade">
            <VictimSupport />
          </div>
        );
        return <NotFoundError onNavigate={setCurrentPage} />;
      default:
        return <NotFoundError onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative bg-[#000000] min-h-screen text-white selection:bg-white selection:text-black">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartItemCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {renderPage()}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage('contact');
        }}
      />

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
