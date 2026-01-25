
import React, { useState } from 'react';
import { Plan } from '../App';

const plans = [
  {
    id: 'foundation',
    name: "Foundation",
    price: "₹4,999",
    for: "For: Professionals & early-stage teams. Essential visibility and digital protection protocols.",
    features: [
      { name: "Digital Presence Monitoring", incl: true },
      { name: "Managed Security Alerts", incl: true },
      { name: "Monthly Risk Summary", incl: true },
      { name: "Quarterly Security Audit", incl: false },
      { name: "Crisis Response Support", incl: false },
      { name: "Executive Privacy Protection", incl: false },
    ],
    btnText: "Add to Engagement",
    delay: '0.1s'
  },
  {
    id: 'professional',
    name: "Professional",
    price: "₹9,999",
    for: "For: Growing businesses and leadership teams. Advanced monitoring and readiness frameworks.",
    features: [
      { name: "Digital Presence Monitoring", incl: true },
      { name: "Advanced Security Management", incl: true },
      { name: "Monthly Strategic Risk Reports", incl: true },
      { name: "Full Vulnerability Assessment", incl: true },
      { name: "Executive Privacy Protection", incl: true },
      { name: "Crisis Response Support", incl: false },
    ],
    btnText: "Add to Engagement",
    featured: true,
    delay: '0.2s'
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    price: "₹19,999",
    for: "For: Global organizations and high-risk entities. Comprehensive 24/7 protection suite.",
    features: [
      { name: "Advanced Threat Intelligence", incl: true },
      { name: "Real-time Incident Detection", incl: true },
      { name: "Annual Deep-Security Audits", incl: true },
      { name: "24/7 Crisis Response & Recovery", incl: true },
      { name: "Executive Privacy Protection", incl: true },
      { name: "Bespoke Intelligence Research", incl: true },
    ],
    btnText: "Add to Engagement",
    delay: '0.3s'
  }
];

interface PricingProps {
  onAddToCart: (plan: Plan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (p: any) => {
    onAddToCart({ name: p.name, price: p.price, id: p.id });
    setAddedIds(prev => new Set(prev).add(p.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(p.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section id="pricing" className="py-32 md:py-60 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal mb-24 md:mb-40">
          <span className="text-[10px] md:text-[12px] font-bold text-white/30 tracking-intel uppercase block mb-6">Service Plans</span>
          <h2 className="font-serif-luxury text-6xl md:text-9xl text-white mb-6 tracking-tight">Investment</h2>
          <p className="text-2xl md:text-4xl font-light text-[#555] tracking-tight italic">Select your tiers of engagement.</p>
        </div>

        <div className="space-y-16 md:space-y-32">
          {plans.map((p, i) => (
            <div 
              key={i} 
              className="reveal price-card p-10 md:p-20 space-y-12 md:space-y-16"
              style={{ transitionDelay: p.delay }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-white/40 text-[10px] md:text-[11px] font-bold uppercase tracking-intel">{p.name} Tier</p>
                  <h3 className="font-serif-luxury text-5xl md:text-8xl text-white tracking-tighter">
                    {p.price} <span className="text-xl md:text-2xl font-light text-zinc-700 tracking-normal">/ mo</span>
                  </h3>
                </div>
                <p className="text-[#888] font-light text-xl md:text-2xl leading-relaxed max-w-md italic md:text-right">
                  {p.for}
                </p>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-24 gap-y-6 md:gap-y-8">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-6 group">
                    <span className={`text-sm shrink-0 transition-transform group-hover:scale-125 ${f.incl ? 'checkmark' : 'cross opacity-20'}`}>
                      {f.incl ? '✔' : '✘'}
                    </span>
                    <span className={`text-base md:text-lg font-medium leading-tight ${f.incl ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-10 md:pt-16">
                <button 
                  onClick={() => handleAdd(p)}
                  className={`w-full py-5 md:py-8 rounded-3xl text-[11px] md:text-[13px] font-bold tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden relative ${p.featured ? 'bg-white text-black' : 'bg-[#151515] text-zinc-400 border border-white/5 hover:border-white/20'}`}
                >
                  <span className={`transition-all duration-500 block ${addedIds.has(p.id) ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                    {p.btnText}
                  </span>
                  <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${addedIds.has(p.id) ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    Staged in Folder
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
