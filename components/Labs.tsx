
import React from 'react';
import { motion } from 'framer-motion';

const tools = [
  { name: "Aegis Flow", stats: "4.2k Active", tech: "Rust / WASM", icon: "Φ", height: 'h-[350px]' },
  { name: "Onyx Eye", stats: "128 Nodes", tech: "Neural Link", icon: "Ω", height: 'h-[400px]' },
  { name: "Cipher Vault", stats: "AES-512", tech: "Quantum Safe", icon: "Ξ", height: 'h-[380px]' },
  { name: "Void Trace", stats: "Invisible", tech: "Zero Log", icon: "Ψ", height: 'h-[360px]' }
];

export const Labs: React.FC = () => {
  return (
    <section id="labs" className="py-24 md:py-40 relative bg-black overflow-hidden px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="reveal mb-24">
          <h2 className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">Innovation Infrastructure</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3 className="font-serif-luxury text-5xl md:text-7xl italic text-white tracking-tighter">The <span className="opacity-30">Labs.</span></h3>
            <p className="text-zinc-700 text-[10px] tracking-widest uppercase font-mono border-b border-white/10 pb-2">
              Intelligence Frameworks // STABLE_REL_4.0
            </p>
          </div>
          <div className="mt-8 h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
          {tools.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`reveal ent-card p-10 md:p-12 flex flex-col justify-between bg-[#080808] border border-white/5 rounded-[2.5rem] relative group hover:border-white/10 transition-all duration-700 ${t.height}`}
            >
              <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-1000 pointer-events-none select-none">
                <span className="text-[180px] font-serif-luxury text-white italic">{t.icon}</span>
              </div>

              <div className="relative z-10">
                <div className="text-white text-4xl font-serif-luxury mb-10 opacity-20 group-hover:opacity-100 transition-all duration-700">{t.icon}</div>
                <h4 className="font-serif-luxury text-2xl md:text-3xl text-white mb-4 tracking-tighter italic">{t.name}</h4>
                <p className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-mono">{t.tech}</p>
              </div>

              <div className="relative z-10 pt-10 border-t border-white/5 flex flex-col gap-6">
                <div className="flex justify-between items-center text-zinc-700">
                  <span className="text-[9px] font-mono uppercase tracking-widest">{t.stats}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 animate-pulse transition-colors" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">READY</span>
                  </div>
                </div>
                <button className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.3em] border border-white/5 hover:border-white transition-all text-zinc-500 hover:text-white rounded-full">View Protocol</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
