
import React from 'react';

export const Community: React.FC = () => {
  return (
    <section className="py-24 md:py-48 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none select-none opacity-[0.01]">
        <span className="text-[150px] md:text-[250px] font-display text-white uppercase whitespace-nowrap -translate-y-1/2 block tracking-tighter">COMMUNITY</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="group relative">
            <div className="ent-card p-12 md:p-16 bg-zinc-950 rounded-[2.5rem]">
              <h4 className="font-display text-3xl tracking-tighter text-white mb-6 uppercase">Security Group.</h4>
              <p className="text-zinc-500 font-light mb-10 text-base md:text-lg leading-relaxed">
                Connect with our local security community. We share practical research and discuss modern security topics in our Discord group. Open to everyone interested in learning.
              </p>
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-zinc-700 tracking-[0.5em] uppercase mb-1">Community Count</span>
                  <span className="text-xl text-white font-display tracking-widest">1,402 MEMBERS</span>
                </div>
              </div>
              <button className="mt-10 w-full py-6 border border-white text-white font-bold tracking-[0.5em] uppercase text-[9px] hover:bg-white hover:text-black transition-all rounded-full">
                Join Discord
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-12 lg:text-right">
          <div className="space-y-4">
            <h2 className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.5em]">Network</h2>
            <h3 className="font-display text-4xl md:text-6xl text-white leading-tight uppercase tracking-tighter">
              Community <br /> Learning.
            </h3>
          </div>

          <div className="ent-card p-10 text-left group cursor-pointer border-dashed bg-black border border-white/10 rounded-[2rem]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-display text-lg tracking-widest text-white uppercase">Security Challenges</h4>
              <span className="text-[8px] font-mono text-white animate-pulse">UPCOMING</span>
            </div>
            <p className="text-zinc-600 font-light text-sm md:text-base leading-relaxed mb-10">
              We host regular security challenges and learning sessions. Test your skills and learn new techniques in a supportive environment.
            </p>
            <button className="text-[9px] tracking-[0.5em] uppercase text-white font-bold border-b border-white pb-1">Learn More</button>
          </div>

          <p className="font-serif text-xl text-zinc-700 italic max-w-sm ml-auto">
            "Sharing knowledge to build a more secure digital space."
          </p>
        </div>
      </div>
    </section>
  );
};
