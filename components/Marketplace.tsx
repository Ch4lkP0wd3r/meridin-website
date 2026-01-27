
import React, { useState } from 'react';
import { Plan } from '../App';

const onDemandServices = [
    {
        id: 'osint-check',
        name: "Security Risk Assessment",
        price: "$45",
        billingType: 'one-time' as const,
        desc: "A thorough check of your digital footprint to find potential risks and security vulnerabilities.",
        tag: "Digital Check",
        widgetId: "6338792588",
        delay: '0.1s'
    },
    {
        id: 'data-leak-scan',
        name: "Data Leak Review",
        price: "$25",
        billingType: 'one-time' as const,
        desc: "A scan of common leak databases to check if your personal or organization's data has been compromised.",
        tag: "Data Scan",
        widgetId: "5627455845",
        delay: '0.2s'
    },
    {
        id: 'vulnerability-audit',
        name: "System Audit",
        price: "$125",
        billingType: 'one-time' as const,
        desc: "A professional check of your external infrastructure to identify and suggest fixes for security issues.",
        tag: "Audit",
        widgetId: "5519067476",
        delay: '0.3s'
    },
    {
        id: 'monitoring-setup',
        name: "Network Protection Setup",
        price: "$85",
        billingType: 'one-time' as const,
        desc: "Assistance with setting up monitoring tools to help you keep a closer eye on your network security.",
        tag: "Setup",
        widgetId: "6353992192",
        delay: '0.4s'
    },
    {
        id: 'privacy-cleanup',
        name: "Privacy Assistance",
        price: "$65",
        billingType: 'one-time' as const,
        desc: "Help with removing sensitive personal information from public databases and search engine results.",
        tag: "Privacy",
        widgetId: "4984020369",
        delay: '0.5s'
    }
];

interface MarketplaceProps {
    onAddToCart: (plan: Plan) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart }) => {
    const [stagedId, setStagedId] = useState<string | null>(null);

    const handleAdd = (p: any) => {
        onAddToCart({ name: p.name, price: p.price, id: p.id, widgetId: p.widgetId, billingType: p.billingType });
        setStagedId(p.id);
        setTimeout(() => setStagedId(null), 2000);
    };

    return (
        <section id="marketplace" className="py-24 md:py-48 bg-[#050505]">
            <div className="max-w-[1300px] mx-auto px-6 md:px-10">
                <div className="reveal mb-20 md:mb-32">
                    <span className="text-[10px] md:text-[11px] font-bold text-white/30 tracking-widest uppercase block mb-6">Service List</span>
                    <h1 className="font-serif-luxury text-5xl md:text-7xl text-white tracking-tighter leading-[0.85] mb-8">
                        Available <br /><span className="italic opacity-40">Services.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-600 font-light max-w-2xl italic leading-relaxed">
                        Select a specific service for your security needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {onDemandServices.map((s, i) => (
                        <div
                            key={i}
                            className="reveal group p-8 md:p-14 bg-black border border-white/5 rounded-[3rem] hover:border-white/20 transition-all duration-700 flex flex-col justify-between"
                            style={{ transitionDelay: s.delay }}
                        >
                            <div className="space-y-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold text-zinc-600 tracking-widest uppercase">{s.tag}</span>
                                    <p className="font-serif-luxury text-xl md:text-3xl text-white">{s.price}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-2xl md:text-3xl text-white group-hover:text-zinc-400 transition-colors duration-700">
                                        {s.name}
                                    </h3>
                                    <p className="text-zinc-600 text-base md:text-lg font-light leading-relaxed italic">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-12">
                                <button
                                    onClick={() => handleAdd(s)}
                                    className={`w-full py-5 md:py-6 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-500 relative overflow-hidden ${stagedId === s.id ? 'bg-white text-black' : 'bg-white/5 text-white/30 hover:text-white hover:bg-white/10'}`}
                                >
                                    <span className={`transition-all duration-500 block ${stagedId === s.id ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                        Select Service
                                    </span>
                                    <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${stagedId === s.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
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
