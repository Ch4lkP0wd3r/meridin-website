
import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="analysis" className="py-40 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-6">
              <h2 className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em]">Our Approach</h2>
              <h3 className="font-display text-4xl md:text-7xl tracking-tighter text-white leading-tight uppercase">Bespoke <br/> Insights.</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  </div>
                  <div className="text-xl font-bold text-white uppercase tracking-tight">Global Reach</div>
                </div>
                <p className="text-zinc-500 leading-relaxed font-light text-lg">Our worldwide monitoring network provides real-time data correlation from major global business hubs.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <div className="text-xl font-bold text-white uppercase tracking-tight">Privacy First</div>
                </div>
                <p className="text-zinc-500 leading-relaxed font-light text-lg">We adhere to strict privacy policies, ensuring your inquiries and data are handled with complete confidentiality.</p>
              </div>
            </div>

            <div className="pt-16 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-white tracking-tighter">98%</div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Detection Accuracy</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-white tracking-tighter">15m</div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Avg. Response Time</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-zinc-900 border border-white/5 p-1 rounded-none overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                alt="Operations Center"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-10 glass-ui border-white/10">
                <div className="text-white font-bold text-2xl tracking-tight mb-2 uppercase">Operations Center</div>
                <div className="w-12 h-[1px] bg-white mb-6" />
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] leading-relaxed">Strategic Support // London Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
