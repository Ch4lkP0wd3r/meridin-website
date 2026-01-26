
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate: (page: any) => void;
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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-20 pb-20 bg-black overflow-hidden px-6">
      {/* Parallax Layers */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            y: scrollY * 0.2,
          }}
          className="glow-blob -top-40 md:-top-60 -left-40 md:-left-60"
        />
        <motion.div
          animate={{
            x: -50 + scrollY * -0.05,
            y: -50 + scrollY * 0.1,
          }}
          transition={{ duration: 0.1 }}
          className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: '-5s' }}
        />
        <motion.div
          animate={{
            y: scrollY * -0.1,
          }}
          className="glow-blob -bottom-40 md:-bottom-60 -right-40 md:-right-60"
          style={{ animationDelay: '-10s' }}
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

      <div className="max-w-7xl w-full mx-auto space-y-8 md:space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
            Meridin & Co<sup>™</sup>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl lg:text-4xl text-[#888] font-light tracking-tight max-w-4xl mx-auto leading-snug italic"
        >
          Tailored Cyber Intelligence for <span className="text-white font-normal not-italic underline decoration-white/20 underline-offset-8">Every Business</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 md:pt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
        >
          <button
            className="pill-button px-10 py-5"
            onClick={() => onNavigate('free-report')}
          >
            Get Free Security Audit
          </button>
          <button
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all duration-700 underline underline-offset-[16px] decoration-white/10 hover:decoration-white"
            onClick={() => onNavigate('pricing')}
          >
            Monthly Support
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="pt-10 md:pt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 grayscale"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Fintech</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Freelance</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">E-Commerce</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Private Equity</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.5 }}
        id="discovery"
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.6em] text-white/50">Establish Link</span>
      </motion.div>
    </section>
  );
};
