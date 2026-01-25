
import React from 'react';

export const Community: React.FC = () => {
  return (
    <section className="py-48 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none select-none opacity-[0.01]">
        <span className="text-[400px] font-display text-white uppercase whitespace-nowrap -translate-y-1/2 block tracking-tighter">THE NETWORK</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-32 items-center">
        <div className="space-y-16">
           <div className="group relative">
              <div className="ent-card p-20 bg-zinc-950">
                 <h4 className="font-display text-4xl tracking-tighter text-white mb-8 uppercase">Inner Circle.</h4>
                 <p className="text-zinc-500 font-light mb-14 text-lg leading-relaxed">
                   The heartbeat of the agency. A secured Discord gateway for real-time intelligence exchange and technical research. Verified operators only.
                 </p>
                 <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-mono text-zinc-700 tracking-[0.5em] uppercase mb-2">Member Count</span>
                       <span className="text-2xl text-white font-display tracking-widest">1,402 OPERATORS</span>
                    </div>
                    <div className="w-3 h-3 rounded-none bg-white animate-pulse" />
                 </div>
                 <button className="mt-14 w-full py-7 border border-white text-white font-bold tracking-[0.5em] uppercase text-[10px] hover:bg-white hover:text-black transition-all">
                    Initiate Onboarding
                 </button>
              </div>
           </div>
        </div>

        <div className="space-y-16 lg:text-right">
          <div className="space-y-6">
            <h2 className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.5em]">Network Expansion</h2>
            <h3 className="font-display text-6xl text-white leading-tight uppercase tracking-tighter">
              The Protocol <br/> CTF.
            </h3>
          </div>
          
          <div className="ent-card p-12 text-left group cursor-pointer border-dashed bg-black">
             <div className="flex justify-between items-center mb-8">
                <h4 className="font-display text-xl tracking-widest text-white uppercase">Alpha Key Window</h4>
                <span className="text-[9px] font-mono text-white animate-pulse">LIVE STATUS</span>
             </div>
             <p className="text-zinc-600 font-light text-base leading-relaxed mb-12">
               The next window for Alpha-Key acquisition opens in 72 hours. Test your frameworks against our private clusters. Excellence is the only metric.
             </p>
             <button className="text-[10px] tracking-[0.5em] uppercase text-white font-bold border-b border-white pb-2">Enroll Challenge</button>
          </div>

          <p className="font-serif text-2xl text-zinc-700 italic max-w-sm ml-auto">
            "We don't recruit. We recognize excellence."
          </p>
        </div>
      </div>
    </section>
  );
};
