
import React from 'react';

interface HomeSectionsProps {
  onNavigate: (page: any) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-black space-y-40 md:space-y-80 pb-32 md:pb-60">
      {/* CEO & Intelligence Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-40">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-40 items-start">
          <div className="reveal space-y-10 md:space-y-16">
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tight">Meridin & Co™</h3>
              <div className="h-[1px] w-24 bg-white/20" />
              <p className="text-xl md:text-2xl font-medium text-[#666] tracking-tight">Intelligence Oversight</p>
            </div>
            
            <div className="space-y-8 md:space-y-10 text-lg md:text-2xl text-[#aaa] font-light leading-relaxed max-w-xl">
              <p>Guiding the world’s most discerning leaders, Meridin & Co™ is the epitome of luxury cyber-intelligence. Each engagement delivers assured confidentiality and precision.</p>
              <p>Our operatives, operating globally, deliver proactive, confidential threat intelligence and mitigation, designed for high-net-worth circles.</p>
              <p>Absolute discretion, relentless innovation. Meridin & Co™ stands as the standard for cyber security in finance and energy sectors worldwide.</p>
            </div>

            <div className="pt-4 md:pt-8 group">
              <p className="font-serif-luxury italic text-2xl md:text-3xl text-white group-hover:pl-4 transition-all duration-500">Dhairya Singh</p>
              <p className="text-[10px] md:text-[11px] font-bold text-[#555] uppercase tracking-intel mt-3">Founder & CEO, Meridin & Co™</p>
            </div>
          </div>

          <div className="reveal relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] order-first lg:order-last" style={{ transitionDelay: '0.3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              className="w-full aspect-video md:aspect-[4/5] object-cover opacity-60 grayscale hover:scale-110 transition-transform duration-[2s]"
              alt="Meridin Intelligence HQ"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/90" />
          </div>
        </div>
      </section>

      {/* Strategic Intelligence Quote */}
      <section className="reveal text-center py-40 md:py-80 bg-[#050505] border-y border-white/5 relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
          <span className="font-serif-luxury text-[20rem] md:text-[40rem] leading-none opacity-20 select-none">M</span>
        </div>
        <div className="relative z-10 space-y-10 md:space-y-12">
          <h2 className="font-serif-luxury text-4xl md:text-8xl text-white tracking-tighter leading-tight">
            Strategic Intelligence for <br/>the <span className="italic opacity-50">Discerning Elite.</span>
          </h2>
          <div className="w-16 md:w-32 h-[1px] bg-white/20 mx-auto" />
          <p className="text-sm md:text-2xl text-[#444] font-medium uppercase tracking-[0.4em] md:tracking-[0.8em]">
            Sophisticated defense for high-value assets.
          </p>
        </div>
      </section>

      {/* Free Reports Section */}
      <section className="reveal max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
          <div className="space-y-6">
            <span className="text-[10px] md:text-[12px] font-bold text-white/30 uppercase tracking-[0.6em]">Small Business Intelligence</span>
            <h2 className="font-serif-luxury text-5xl md:text-8xl text-white tracking-tight">
              Baseline Assessment
            </h2>
          </div>
          <p className="text-xl md:text-3xl text-[#777] font-light leading-relaxed max-w-3xl mx-auto italic">
            "Every secure future begins with a baseline assessment. Request your complimentary exposure audit today and establish your perimeter."
          </p>
          <div className="pt-8 md:pt-12">
            <button 
              className="pill-button"
              onClick={() => onNavigate('free-report')}
            >
              Initiate Free Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
