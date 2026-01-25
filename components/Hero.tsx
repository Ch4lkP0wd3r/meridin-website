
import React, { useMemo, useState, useEffect } from 'react';

interface HeroProps {
  onNavigate: (page: 'services') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 1}px`,
      duration: `${Math.random() * 12 + 8}s`,
      delay: `${Math.random() * 10}s`,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-24 md:pt-32 pb-20 bg-black overflow-hidden px-6">
      {/* Parallax Layers */}
      <div className="absolute inset-0 z-0">
        <div 
          className="glow-blob -top-40 md:-top-60 -left-40 md:-left-60" 
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          style={{ animationDelay: '-5s', transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.15}px)` }} 
        />
        <div 
          className="glow-blob -bottom-40 md:-bottom-60 -right-40 md:-right-60" 
          style={{ animationDelay: '-10s', transform: `translateY(${scrollY * -0.1}px)` }} 
        />
        
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle opacity-20"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              transform: `translateY(${scrollY * 0.4}px)`
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
               backgroundSize: '100px 100px',
               transform: `translateY(${scrollY * 0.1}px)`
             }} 
        />
        <div className="scanline" />
      </div>

      <div className="max-w-7xl w-full mx-auto space-y-8 md:space-y-12 animate-fade relative z-10 transition-transform duration-300">
        <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
          Meridin & Co™
        </h1>
        
        <p className="text-xl md:text-4xl lg:text-5xl text-[#888] font-light tracking-tight max-w-5xl mx-auto leading-snug italic transition-all duration-700">
          Tailored Cyber Intelligence for <span className="text-white font-normal not-italic underline decoration-white/20 underline-offset-8">Global Power</span>
        </p>
        
        <div className="pt-16 md:pt-24">
          <button 
            className="pill-button"
            onClick={() => onNavigate('services')}
          >
            Access Services
          </button>
        </div>
      </div>

      <div id="discovery" className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-4">
         <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
         <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.6em] text-white/50">Establish Link</span>
      </div>
    </section>
  );
};
