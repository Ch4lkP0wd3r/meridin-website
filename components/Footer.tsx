
import React from 'react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-20 md:py-32 bg-black px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2 space-y-8">
          <div className="flex items-center gap-6 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img 
              src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png" 
              alt="Meridin Logo" 
              className="w-16 h-16 md:w-24 md:h-24 object-contain transition-transform duration-700 group-hover:scale-110" 
            />
            <span className="font-serif-luxury text-2xl md:text-4xl text-white">Meridin & Co.™</span>
          </div>
          <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-sm uppercase tracking-[0.2em]">
            High-fidelity cyber intelligence for the most discerning global leaders. Secure by design. Precision by nature.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h5 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-white">Navigation</h5>
          <ul className="space-y-3 text-[11px] md:text-[13px] text-zinc-500 font-bold uppercase tracking-[0.3em]">
            <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Services</button></li>
            <li><button onClick={() => onNavigate('free-report')} className="hover:text-white transition-colors">Free Audit</button></li>
            <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-40">
        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-center md:text-left">© {new Date().getFullYear()} Meridin & Co.™ Global Operations.</p>
        <div className="flex gap-6 md:gap-10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
           <span>Zurich</span>
           <span>Singapore</span>
           <span>London</span>
        </div>
      </div>
    </footer>
  );
};
