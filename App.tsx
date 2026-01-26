
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { Pricing } from './components/Pricing';
import { Services } from './components/Services';
import { ReconReports } from './components/ReconReports';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Checkout } from './components/Checkout';
import { CartDrawer } from './components/CartDrawer';
import { Marketplace } from './components/Marketplace';
import { Labs } from './components/Labs';

export type Page = 'home' | 'pricing' | 'services' | 'contact' | 'free-report' | 'marketplace' | 'payment-success' | 'payment-cancel';

export interface Plan {
  name: string;
  price: string;
  id: string;
  billingType: 'monthly' | 'one-time';
  widgetId?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartPlan, setCartPlan] = useState<Plan | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    setCartPlan(plan);
    setIsCartOpen(true);
  };

  const removeFromCart = () => {
    setCartPlan(null);
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
      case 'payment-success':
        return (
          <div className="animate-fade min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8">
              <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-white italic mb-4">Transaction Confirmed.</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light max-w-lg mb-12 italic">
              Thank you for trusting Meridin & Co™. Your secure intelligence setup is now underway. Our team will contact you shortly.
            </p>
            <button onClick={() => setCurrentPage('home')} className="pill-button px-12 py-5">Return Home &rarr;</button>
          </div>
        );
      case 'payment-cancel':
        return (
          <div className="animate-fade min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-red-900/10 border border-red-500/20 rounded-full flex items-center justify-center mb-8">
              <span className="text-red-500 text-3xl">!</span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-white italic mb-4">Process Aborted.</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light max-w-lg mb-12 italic">
              The payment process was cancelled. No charges were made. If you need assistance, please contact our support team.
            </p>
            <button onClick={() => setCurrentPage('home')} className="pill-button px-12 py-5 bg-transparent border border-white/20 text-white">Return Home &rarr;</button>
          </div>
        );
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative bg-[#000000] min-h-screen text-white selection:bg-white selection:text-black">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartItemCount={cartPlan ? 1 : 0}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {renderPage()}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        item={cartPlan}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {isCheckoutOpen && cartPlan && (
        <Checkout
          plan={cartPlan}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
