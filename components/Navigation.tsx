
import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
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
      {/* Main Header Bar */}
      <div className="relative z-[1100] bg-black/80 backdrop-blur-md border-b border-white/5 py-4 md:py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center">
          <div 
            className="flex items-center gap-6 cursor-pointer group" 
            onClick={() => handleNavigate('home')}
          >
            <img 
              src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png" 
              alt="Meridin & Co.™ Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain brightness-110 contrast-125 transition-transform group-hover:scale-105 duration-700" 
            />
            <span className="font-serif-luxury text-xl md:text-3xl font-normal tracking-wide text-white">Meridin & Co.™</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[13px] font-medium transition-all relative py-1 uppercase tracking-[0.3em] ${
                  currentPage === item.id ? 'text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white animate-fade" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[1050] md:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-[40px]" />
        
        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="w-full max-w-xs space-y-10 text-center">
            {navItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="overflow-hidden"
              >
                <button
                  onClick={() => handleNavigate(item.id)}
                  style={{ transitionDelay: `${idx * 70}ms` }}
                  className={`text-4xl sm:text-5xl font-serif-luxury tracking-tighter block w-full transition-all duration-700 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  } ${
                    currentPage === item.id 
                      ? 'text-white italic underline underline-offset-[12px] decoration-white/30' 
                      : 'text-zinc-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
          
          <div className={`mt-16 h-[1px] w-12 bg-white/10 transition-all duration-1000 delay-500 ${isMenuOpen ? 'scale-x-100' : 'scale-x-0'}`} />
          
          <div className={`mt-12 text-center space-y-3 transition-all duration-1000 delay-700 ${isMenuOpen ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">Meridin Global Intelligence</p>
            <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-500">Tier 1 Encryption Active</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
