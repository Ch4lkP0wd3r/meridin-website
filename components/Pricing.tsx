
import React, { useState } from 'react';
import { Plan } from '../App';

const plans = [
  {
    id: 'foundation',
    name: "Starter",
    price: "$59",
    billingType: 'monthly',
    widgetId: "4952622217",
    for: "For: Individuals and small teams. Basic monitoring and security support.",
    features: [
      { name: "Digital Presence Monitoring", incl: true },
      { name: "Security Alerts", incl: true },
      { name: "Monthly Summary Report", incl: true },
      { name: "Regular Security Audit", incl: false },
      { name: "Incident Support", incl: false },
      { name: "Personal Privacy Protection", incl: false },
    ],
    btnText: "Select Plan",
    delay: '0.1s'
  },
  {
    id: 'professional',
    name: "Standard",
    price: "$119",
    billingType: 'monthly',
    widgetId: "5246695972",
    for: "For: Growing businesses. Regular monitoring and practical security advice.",
    features: [
      { name: "Digital Presence Monitoring", incl: true },
      { name: "Active Security Management", incl: true },
      { name: "Strategic Risk Reports", incl: true },
      { name: "Full Vulnerability Audit", incl: true },
      { name: "Privacy Support", incl: true },
      { name: "Incident Response", incl: false },
    ],
    btnText: "Select Plan",
    featured: true,
    delay: '0.2s'
  },
  {
    id: 'enterprise',
    name: "Advanced",
    price: "$239",
    billingType: 'monthly',
    widgetId: "4894651201",
    for: "For: Organizations needing comprehensive, regular security oversight.",
    features: [
      { name: "Detailed Threat Monitoring", incl: true },
      { name: "Incident Detection", incl: true },
      { name: "Annual Security Checks", incl: true },
      { name: "24/7 Support Access", incl: true },
      { name: "Executive Privacy Support", incl: true },
      { name: "Specialized Security Research", incl: true },
    ],
    btnText: "Select Plan",
    delay: '0.3s'
  }
];

interface PricingProps {
  onAddToCart: (plan: Plan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (p: any) => {
    onAddToCart({ name: p.name, price: p.price, id: p.id, widgetId: p.widgetId, billingType: p.billingType });
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
    <section id="pricing" className="py-24 md:py-48 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="reveal mb-16 md:mb-32">
          <span className="text-[10px] md:text-[11px] font-bold text-white/30 tracking-widest uppercase block mb-6">Security Plans</span>
          <h1 className="font-serif-luxury text-5xl md:text-7xl text-white mb-4 tracking-tight">Support.</h1>
          <p className="text-xl md:text-2xl font-light text-[#555] tracking-tight italic">Select a security plan. All transactions via crypto.</p>
        </div>

        <div className="space-y-12 md:space-y-24">
          {plans.map((p, i) => (
            <div
              key={i}
              className="reveal price-card p-8 md:p-16 space-y-10 md:space-y-12"
              style={{ transitionDelay: p.delay }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                    <span className="font-mono opacity-20">[MONTHLY SUPPORT]</span>
                    {p.name} Plan
                  </p>
                  <h3 className="font-serif-luxury text-4xl md:text-6xl text-white tracking-tighter">
                    {p.price} <span className="text-lg md:text-xl font-light text-zinc-700 tracking-normal">/ mo</span>
                  </h3>
                </div>
                <p className="text-[#888] font-light text-lg md:text-xl leading-relaxed max-w-sm italic md:text-right">
                  {p.for}
                </p>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-16 gap-y-4 md:gap-y-6">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4 group">
                    <span className={`text-xs shrink-0 transition-transform group-hover:scale-125 ${f.incl ? 'checkmark' : 'cross opacity-20'}`}>
                      {f.incl ? '✔' : '✘'}
                    </span>
                    <span className={`text-sm md:text-base font-medium leading-tight ${f.incl ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-8 md:pt-12">
                <button
                  onClick={() => handleAdd(p)}
                  className={`w-full py-4 md:py-6 rounded-2xl text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden relative ${p.featured ? 'bg-white text-black' : 'bg-[#151515] text-zinc-400 border border-white/5 hover:border-white/20'}`}
                >
                  <span className={`transition-all duration-500 block ${addedIds.has(p.id) ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                    {p.btnText}
                  </span>
                  <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${addedIds.has(p.id) ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    Added to List
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
