
import React from 'react';

const tools = [
  { name: "Aegis Flow", stats: "4.2k Active", tech: "Rust / WASM", icon: "Φ", height: 'h-[350px]' },
  { name: "Onyx Eye", stats: "128 Nodes", tech: "Neural Link", icon: "Ω", height: 'h-[400px]' },
  { name: "Cipher Vault", stats: "AES-512", tech: "Quantum Safe", icon: "Ξ", height: 'h-[380px]' },
  { name: "Void Trace", stats: "Invisible", tech: "Zero Log", icon: "Ψ", height: 'h-[360px]' }
];

export const Labs: React.FC = () => {
  return (
    <section id="labs" className="py-40 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">Innovation Infrastructure</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3 className="font-display text-6xl uppercase tracking-tighter text-white">The Labs.</h3>
            <p className="text-zinc-700 text-[10px] tracking-widest uppercase font-mono border-b border-white/10 pb-2">
              Intelligence Frameworks // STABLE_REL_4.0
            </p>
          </div>
          <div className="mt-8 h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
          {tools.map((t, idx) => (
            <div key={idx} className={`ent-card p-12 flex flex-col justify-between bg-zinc-950 ${t.height}`}>
              <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none select-none">
                <span className="text-[200px] font-display text-white">{t.icon}</span>
              </div>
              
              <div className="relative z-10">
                <div className="text-white text-4xl font-display mb-10 opacity-20">{t.icon}</div>
                <h4 className="font-display text-2xl text-white mb-4 tracking-tighter uppercase">{t.name}</h4>
                <p className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-mono">{t.tech}</p>
              </div>
              
              <div className="relative z-10 pt-10 border-t border-white/5 flex flex-col gap-6">
                 <div className="flex justify-between items-center text-zinc-700">
                    <span className="text-[9px] font-mono uppercase tracking-widest">{t.stats}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest">READY</span>
                 </div>
                 <button className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.3em] border border-white/5 hover:border-white transition-all text-zinc-500 hover:text-white">View Protocol</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
