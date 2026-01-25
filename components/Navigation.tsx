
import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, cartItemCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'free-report', label: 'Free Audit' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] transition-all duration-300">
      <div className="relative z-[1100] bg-black/80 backdrop-blur-md border-b border-white/5 py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
          <div 
            className="flex items-center gap-6 cursor-pointer group" 
            onClick={() => handleNavigate('home')}
          >
            <img 
              src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png" 
              alt="Meridin & Co.™ Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain brightness-110 contrast-125 transition-transform group-hover:scale-105 duration-700" 
            />
            <span className="font-serif-luxury text-lg md:text-2xl font-normal tracking-wide text-white">Meridin & Co.™</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[11px] font-medium transition-all relative py-1 uppercase tracking-[0.3em] ${
                  currentPage === item.id ? 'text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Subtle Allocation Count */}
            {cartItemCount > 0 && (
              <button 
                onClick={onOpenCart}
                className="flex items-center gap-4 ml-6 pl-6 border-l border-white/10 group"
              >
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                  Allocations <span className="text-white font-mono ml-2">[{cartItemCount}]</span>
                </span>
              </button>
            )}
          </div>

          <button 
            className="md:hidden text-white p-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-8 h-6 flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-[1.5px] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[11px]' : ''}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? 'translate-x-full opacity-0' : ''}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[11px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-[1050] md:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-[40px]" />
        
        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="w-full max-w-xs space-y-10 text-center">
            {navItems.map((item, idx) => (
              <div key={item.id} className="overflow-hidden">
                <button
                  onClick={() => handleNavigate(item.id)}
                  className={`text-4xl font-serif-luxury tracking-tighter block w-full transition-all duration-700 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } ${
                    currentPage === item.id ? 'text-white italic' : 'text-zinc-700'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
            {cartItemCount > 0 && (
              <button
                onClick={() => { setIsMenuOpen(false); onOpenCart(); }}
                className="text-white/30 text-[10px] font-bold uppercase tracking-[0.6em] pt-10"
              >
                View Engagement Folder ({cartItemCount})
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
