
import React from 'react';

const servicesList = [
  {
    title: "Security Infrastructure Review",
    desc: "We look at your digital setup to find and fix common security gaps, helping protect your information from unauthorized access.",
    tag: "Infrastructure",
    delay: '0.1s'
  },
  {
    title: "Public Data Risk Analysis",
    desc: "We check public and private data sources to see if your information has been exposed, helping you understand and manage your risks.",
    tag: "Data Check",
    delay: '0.2s'
  },
  {
    title: "Personal Digital Privacy Support",
    desc: "Simple and professional advice on how to reduce your digital footprint and keep your personal information private.",
    tag: "Privacy Support",
    delay: '0.3s'
  },
  {
    title: "Systems Monitoring and Audits",
    desc: "Regular checks of your security systems to make sure they are working correctly and identifying areas for improvement.",
    tag: "Monitoring",
    delay: '0.4s'
  },
  {
    title: "Information Protection Help",
    desc: "Assistance with setting up standard encryption and other tools to help keep your sensitive data secure and private.",
    tag: "Data Security",
    delay: '0.5s'
  },
  {
    title: "Incident Recovery Assistance",
    desc: "Professional support if you experience a security issue, helping you restore normal operations and protect your data.",
    tag: "Support",
    delay: '0.6s'
  }
];

interface ServicesProps {
  onNavigate: (page: any) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-24 md:py-48 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="reveal mb-16 md:mb-32 border-l border-white/10 pl-8 md:pl-16">
          <span className="text-[10px] md:text-[11px] font-bold text-white/30 tracking-widest uppercase block mb-6">Service List</span>
          <h1 className="font-serif-luxury text-5xl md:text-7xl text-white tracking-tighter leading-[0.85] mb-8">
            Our <br /><span className="italic opacity-30">Services.</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-600 font-light max-w-2xl italic leading-relaxed">
            Professional security services to help you protect your digital information and infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {servicesList.map((s, i) => (
            <div
              key={i}
              className="reveal group relative"
              style={{ transitionDelay: s.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative p-8 md:p-12 border border-white/5 bg-[#050505] rounded-[2.5rem] h-full flex flex-col justify-between hover:border-white/20 transition-all duration-700">
                <div className="space-y-8 md:space-y-12">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase">{s.tag}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif-luxury text-2xl md:text-3xl text-white tracking-tight leading-tight group-hover:text-zinc-300 transition-colors duration-700">
                      {s.title}
                    </h3>
                    <p className="text-[#555] text-sm md:text-base leading-relaxed font-light group-hover:text-zinc-400 transition-colors duration-700">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-12">
                  <div className="h-[1px] w-10 bg-white/10 group-hover:w-full transition-all duration-700 mb-6" />
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-all duration-700"
                  >
                    Contact Us
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
