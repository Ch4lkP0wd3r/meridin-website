
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

export type Page = 'home' | 'pricing' | 'services' | 'contact' | 'free-report';

export interface Plan {
  name: string;
  price: string;
  id: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<Plan[]>([]);
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
    setCart(prev => [...prev, plan]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
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
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        cartItemCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {renderPage()}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {isCheckoutOpen && cart.length > 0 && (
        <Checkout 
          plans={cart} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      )}

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
