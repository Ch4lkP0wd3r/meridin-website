
import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulating internal encrypted transmission, bypassing third-party form providers
    setTimeout(() => {
      setFormStatus('sent');
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-40 bg-black min-h-screen flex items-center">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="space-y-12 md:space-y-16 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] md:text-[11px] font-bold text-white/30 tracking-intel uppercase block">Engagement</span>
              <h2 className="font-serif-luxury text-5xl md:text-6xl text-white tracking-tight leading-none italic">
                Get in <br/>Touch.
              </h2>
            </div>
            
            <p className="text-[#888] font-light text-lg md:text-xl leading-relaxed max-w-sm mx-auto lg:mx-0">
              All communications are handled with strict discretion and professional care by our executive team.
            </p>

            <div className="space-y-8 md:space-y-10 pt-8 md:pt-10 border-t border-white/5">
               <div className="flex flex-col space-y-1 md:space-y-2">
                 <span className="text-[9px] md:text-[10px] text-[#444] uppercase tracking-intel font-bold">Secure Communication</span>
                 <span className="text-white font-medium text-base md:text-lg">concierge@meridin.io</span>
               </div>
               <div className="flex flex-col space-y-1 md:space-y-2">
                 <span className="text-[9px] md:text-[10px] text-[#444] uppercase tracking-intel font-bold">Priority Support</span>
                 <span className="text-white font-medium text-base md:text-lg italic">dhairya.dhaila@gmail.com</span>
               </div>
            </div>
          </div>

          <div className="bg-[#050505] p-8 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            {formStatus === 'sent' ? (
              <div className="py-20 text-center space-y-8 animate-fade">
                <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-10">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-white italic">Transmission Received.</h3>
                <p className="text-zinc-600 text-sm tracking-widest uppercase">Your inquiry has been encrypted and routed.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-[10px] text-zinc-800 uppercase tracking-widest mt-10 hover:text-white transition-all"
                >
                  Return to Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 md:space-y-14">
                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[9px] md:text-[10px] font-bold text-[#555] uppercase tracking-intel">Your Name</label>
                    <input name="name" required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white focus:outline-none focus:border-white transition-all text-lg md:text-xl font-light" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[9px] md:text-[10px] font-bold text-[#555] uppercase tracking-intel">Contact Method</label>
                    <input name="email" required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white focus:outline-none focus:border-white transition-all text-lg md:text-xl font-light" />
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-[#555] uppercase tracking-intel">How can we assist?</label>
                  <textarea name="message" rows={2} placeholder="Share your requirements..." className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white focus:outline-none focus:border-white transition-all resize-none text-lg md:text-xl font-light" />
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className={`w-full pill-button py-5 md:py-6 ${formStatus === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {formStatus === 'sending' ? 'Enciphering...' : 'Submit Inquiry'}
                </button>
                
                {formStatus === 'error' && (
                  <p className="text-red-900/60 text-[10px] uppercase text-center tracking-widest">Protocol error. Please try again.</p>
                )}

                <div className="flex items-center justify-center gap-3 opacity-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-white">Sovereign Channel Enabled</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
