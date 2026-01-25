
import React from 'react';

const servicesList = [
  {
    title: "Security Readiness",
    desc: "Comprehensive simulations and architectural reviews designed to validate your long-term defensive posture against emerging vectors.",
    tag: "Active Advisory",
    delay: '0.1s'
  },
  {
    title: "Strategic Briefings",
    desc: "Exclusive intelligence on digital risks, shadow networks, and the global technology landscape for executive decision makers.",
    tag: "Board Counsel",
    delay: '0.3s'
  },
  {
    title: "Presence Monitoring",
    desc: "Continuous automated oversight of your organization's digital footprint and leak exposure across deep-web repositories.",
    tag: "Managed Insight",
    delay: '0.5s'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 md:py-60 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="reveal mb-20 md:mb-40">
          <span className="text-[10px] md:text-[12px] font-bold text-white/30 tracking-intel uppercase block mb-6">Core Competencies</span>
          <h2 className="font-serif-luxury text-6xl md:text-9xl text-white tracking-tighter leading-[0.85] mb-10">
            Tailored <br/><span className="italic opacity-40">Solutions.</span>
          </h2>
          <div className="w-32 md:w-60 h-[1px] bg-white/20" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
          {servicesList.map((s, i) => (
            <div 
              key={i} 
              className="reveal group p-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] md:rounded-[3.5rem]"
              style={{ transitionDelay: s.delay }}
            >
              <div className="p-10 md:p-16 bg-[#030303] rounded-[2.5rem] md:rounded-[3.5rem] h-full flex flex-col justify-between hover:bg-[#070707] transition-all duration-700">
                <div className="space-y-12 md:space-y-20">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-[11px] font-bold text-zinc-600 tracking-intel uppercase">{s.tag}</span>
                    <div className="w-2 h-2 rounded-full bg-white opacity-10 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  <div className="space-y-6 md:space-y-8">
                    <h3 className="font-serif-luxury text-4xl md:text-5xl text-white tracking-tight leading-tight transition-all duration-700">
                      {s.title}
                    </h3>
                    <p className="text-[#666] text-lg md:text-xl leading-relaxed font-light group-hover:text-zinc-400 transition-colors duration-700">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-16 md:pt-24">
                  <button className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] text-white/30 group-hover:text-white transition-all duration-700 flex items-center gap-6">
                    Analyze Methodology <span className="text-2xl transition-transform group-hover:translate-x-3">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
