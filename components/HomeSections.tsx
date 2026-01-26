
import React from 'react';
import { motion } from 'framer-motion';

interface HomeSectionsProps {
  onNavigate: (page: any) => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-black space-y-24 md:space-y-48 pb-24 md:pb-40">
      {/* CEO & Intelligence Section (RE-CENTERED) */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 pt-16 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-12"
          >
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-2xl md:text-4xl text-white tracking-tight">Meridin & Co™</h3>
              <div className="h-[1px] w-16 bg-white/20" />
              <p className="text-lg md:text-xl font-medium text-[#666] tracking-tight">Intelligence Oversight</p>
            </div>

            <div className="space-y-6 md:space-y-8 text-base md:text-xl text-[#aaa] font-light leading-relaxed max-w-lg">
              <p>Guiding the world’s most discerning leaders, Meridin & Co™ is the epitome of luxury cyber-intelligence. Each engagement delivers assured confidentiality and precision.</p>
              <p>Our team, operating globally, deliver proactive, confidential threat intelligence and mitigation, designed for high-net-worth circles and ambitious professionals.</p>
            </div>

            <div className="pt-4 group">
              <p className="font-serif-luxury italic text-xl md:text-2xl text-white group-hover:pl-4 transition-all duration-500">Dhairya Singh</p>
              <p className="text-[9px] md:text-[10px] font-bold text-[#555] uppercase tracking-intel mt-2">Founder & CEO, Meridin & Co™</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] order-first lg:order-last"
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
              className="w-full aspect-video md:aspect-[5/4] object-cover opacity-60 grayscale hover:scale-110 transition-transform duration-[4s]"
              alt="Meridin Intelligence HQ"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/80" />
          </motion.div>
        </div>
      </section>

      {/* Strategic Intelligence Quote (RE-CENTERED) */}
      <section className="text-center py-24 md:py-48 bg-[#050505] border-y border-white/5 relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="font-serif-luxury text-[15rem] md:text-[25rem] leading-none opacity-20 select-none"
          >
            M
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 space-y-8 md:space-y-10"
        >
          <h2 className="font-serif-luxury text-3xl md:text-6xl text-white tracking-tighter leading-tight">
            Strategic Intelligence for <br />the <span className="italic opacity-50">Discerning Elite.</span>
          </h2>
          <div className="w-12 md:w-24 h-[1px] bg-white/20 mx-auto" />
          <p className="text-[10px] md:text-lg text-[#444] font-medium uppercase tracking-[0.4em] md:tracking-[0.6em]">
            Sophisticated defense for high-value assets.
          </p>
        </motion.div>
      </section>

      {/* PAIN POINTS SECTION (RE-CENTERED) */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 text-center">
        <div className="space-y-10">
          <span className="text-[10px] md:text-[11px] font-bold text-white/30 uppercase tracking-[0.6em]">The Risk is Real</span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
            A Single Breach Can <br /><span className="italic opacity-50 underline decoration-white/10 underline-offset-[10px]">End Your Career.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-left">
            {[
              { icon: '!', title: 'Data Exploitation', desc: 'Your private client lists and sensitive communications are sold to the highest bidder.', color: 'text-red-500 border-red-500/20' },
              { icon: '?', title: 'Reputation Loss', desc: 'Trust takes years to build and seconds to break. A leak can destroy relationships forever.', color: 'text-white border-white/10' },
              { icon: '$', title: 'Financial Theft', desc: 'Unprotected infrastructure is an open invitation for sophisticated takeovers.', color: 'text-white border-white/10' }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-colors group"
              >
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-transform group-hover:scale-110 ${p.color}`}>{p.icon}</div>
                <h4 className="text-white font-serif-luxury text-xl italic">{p.title}</h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US / PROCESS SECTION (RE-CENTERED) */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4 text-left">
              <span className="text-[10px] md:text-[11px] font-bold text-white/30 uppercase tracking-[0.6em]">Professional Standards</span>
              <h2 className="font-serif-luxury text-4xl md:text-5xl text-white tracking-tight leading-none italic">
                Why Professionals <br />Choose Us.
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { n: '01', t: 'Local-First Audit', d: 'Every audit is performed with specialized research tailored to your specific digital shadow.' },
                { n: '02', t: 'Absolute Discretion', d: 'Your data remains yours. We operate with strict zero-knowledge protocols.' },
                { n: '03', t: 'Rapid Response', d: 'Our team is available to neutralize exposures and establish your perimeter.' }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <span className="font-serif-luxury text-3xl md:text-4xl text-white/5 group-hover:text-white transition-all">{step.n}</span>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-[11px] md:text-xs uppercase tracking-widest">{step.t}</h4>
                    <p className="text-zinc-600 text-xs md:text-sm italic">{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative group"
          >
            <div className="p-8 md:p-12 bg-[#050505] border border-white/5 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] space-y-8 text-left">
              <h3 className="font-serif-luxury text-xl md:text-2xl text-white italic">"Meridin turned our security from a liability into a professional advantage. Every freelancer needs this."</h3>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                <div>
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest">Marcus Chen</p>
                  <p className="text-zinc-600 text-[8px] uppercase tracking-widest leading-none">Fintech Consultant</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION PATHWAYS (RE-CENTERED) */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="group relative p-10 md:p-14 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[3rem] flex flex-col justify-between hover:border-white/20 transition-all duration-1000"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase block">[Continuous Support]</span>
              <h3 className="font-serif-luxury text-3xl md:text-4xl text-white italic leading-tight text-left">Ongoing Monitoring <br />and Safety.</h3>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xs italic text-left">Regular support plans for small businesses and individuals.</p>
            </div>
            <div className="pt-12 uppercase text-left">
              <button
                onClick={() => onNavigate('pricing')}
                className="pill-button px-8 py-4 text-[9px]"
              >
                View Plans &rarr;
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="group relative p-10 md:p-14 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[3rem] flex flex-col justify-between hover:border-white/20 transition-all duration-1000"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase block">[On-Demand Audit]</span>
              <h3 className="font-serif-luxury text-3xl md:text-4xl text-white italic leading-tight text-left">One-time Deep <br />Security Review.</h3>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xs italic text-left">Identify immediate risks with a standalone professional assessment.</p>
            </div>
            <div className="pt-12 text-left">
              <button
                onClick={() => onNavigate('marketplace')}
                className="pill-button px-8 py-4 text-[9px] bg-transparent border border-white/20 hover:bg-white/10 text-white"
              >
                View Services &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* LEAD MAGNET SECTION (RE-CENTERED) */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto space-y-10 md:space-y-12 p-12 md:p-24 bg-gradient-to-t from-white/[0.03] to-transparent border border-white/5 rounded-[4rem] relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-white/20" />
          <div className="space-y-6">
            <span className="text-[10px] md:text-[11px] font-bold text-white opacity-40 uppercase tracking-[0.8em]">Priority Initiation</span>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-white tracking-tighter leading-none">
              Start Your <br /><span className="italic">Free Audit.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#777] font-light leading-relaxed max-w-2xl mx-auto italic">
              "Get a professional baseline assessment of your digital vulnerabilities at zero cost."
            </p>
          </div>
          <div className="pt-8">
            <button
              className="pill-button px-12 py-6 text-[11px]"
              onClick={() => onNavigate('free-report')}
            >
              Get Free Exposure Report
            </button>
            <p className="text-[8px] text-zinc-800 uppercase tracking-[0.4em] mt-8">Professional Review • 24hr Turnaround</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
