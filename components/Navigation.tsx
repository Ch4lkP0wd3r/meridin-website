
import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, cartItemCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' as Page },
    { label: 'Services', id: 'services' as Page },
    { label: 'Free Audit', id: 'free-report' as Page },
    { label: 'One-time Services', id: 'marketplace' as Page },
    { label: 'Monthly Plans', id: 'pricing' as Page },
    { label: 'Contact', id: 'contact' as Page },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 md:py-10 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-3xl py-4 md:py-6 border-b border-white/5' : ''}`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-3 md:gap-4 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png"
              alt="Meridin Logo"
              width="48"
              height="48"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </motion.div>
          <span className="font-serif-luxury text-lg md:text-xl text-white tracking-tight hidden sm:block">Meridin & Co.<sup>™</sup></span>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <ul className="hidden lg:flex items-center gap-8 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`hover:text-white transition-colors duration-500 ${currentPage === item.id ? 'text-white' : ''}`}
                >
                  {item.label}
                </button>
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-40"
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={onOpenCart}
              className="relative p-2 group"
            >
              <div className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest hidden md:block mr-8">Your Cart</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={cartItemCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] font-bold border ${cartItemCount > 0 ? 'bg-white text-black border-white' : 'border-white/20 text-white/20'}`}
                  >
                    {cartItemCount}
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="pill-button px-6 py-3 text-[9px] md:text-[10px] hidden sm:block"
            >
              Buy Now!
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
