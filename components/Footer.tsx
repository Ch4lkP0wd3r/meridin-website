
import React from 'react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-16 md:py-24 bg-black px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img
              src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png"
              alt="Meridin Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <span className="font-serif-luxury text-xl md:text-2xl text-white">Meridin & Co.<sup>™</sup></span>
          </div>
          <p className="text-zinc-600 text-xs md:text-sm font-medium leading-relaxed max-w-xs uppercase tracking-[0.2em]">
            Professional security services for organizations and individuals. Practical solutions for modern information protection.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h5 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white">Navigation</h5>
          <ul className="space-y-2 text-[10px] md:text-[11px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
            <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Services</button></li>
            <li><button onClick={() => onNavigate('free-report')} className="hover:text-white transition-colors">Free Audit</button></li>
            <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">One-time Services</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Monthly Plans</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-40">
        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-center md:text-left">© {new Date().getFullYear()} Meridin & Co.<sup>™</sup> Security Services.</p>
      </div>
    </footer>
  );
};
