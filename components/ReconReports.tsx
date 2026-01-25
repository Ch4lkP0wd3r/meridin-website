
import React, { useState, useEffect } from 'react';
import { ReportSample } from '../types';

const sampleReports: ReportSample[] = [
  { id: 'M-EXE-001', title: 'Geneva Wealth Management', severity: 'CRITICAL', date: '28.05.2024' },
  { id: 'M-EXE-002', title: 'Nordic Renewables Group', severity: 'HIGH', date: '26.05.2024' },
  { id: 'M-EXE-003', title: 'Tokyo Logistics Hub', severity: 'LOW', date: '24.05.2024' }
];

type FlowStep = 'intro' | 'commission' | 'provisioning' | 'review' | 'transmitting' | 'confirmed' | 'error';

export const ReconReports: React.FC = () => {
  const [step, setStep] = useState<FlowStep>('intro');
  const [regData, setRegData] = useState({ name: '', email: '', url: '', role: 'Executive Delegate' });
  const [provisioningProgress, setProvisioningProgress] = useState(0);
  const [isSigning, setIsSigning] = useState(false);

  const handleStartCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.url) return;
    setStep('provisioning');
  };

  const handleFinalSubmit = async () => {
    setStep('transmitting');
    
    try {
      // Direct integration with Web3Forms for secure email delivery
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "d89f8315-4a8b-4722-b781-faed84629d6f",
          subject: `NEW LUXURY COMMISSION: ${regData.name}`,
          from_name: "Meridin Intelligence Terminal",
          entity: regData.name,
          url: regData.url,
          email: regData.email,
          role: regData.role,
          message: `A bespoke intelligence audit has been commissioned for ${regData.name} (${regData.url}). Signature verified.`
        })
      });

      const result = await response.json();

      if (result.success) {
        setStep('confirmed');
      } else {
        setStep('error');
      }
    } catch (err) {
      console.error("Transmission failed:", err);
      setStep('error');
    }
  };

  useEffect(() => {
    if (step === 'provisioning') {
      const interval = setInterval(() => {
        setProvisioningProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('review'), 1200);
            return 100;
          }
          return prev + 1.5;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const provisioningMessages = [
    "Preparing Bespoke Chassis...",
    "Validating Corporate URL...",
    "Synchronizing Secure Gateway...",
    "Drafting Intelligence Directive...",
    "Commission Ready for Sign-off."
  ];

  const currentMsgIndex = Math.min(
    Math.floor((provisioningProgress / 100) * provisioningMessages.length),
    provisioningMessages.length - 1
  );

  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'CRITICAL': return 'text-white border-white bg-white/10';
      case 'HIGH': return 'text-zinc-400 border-zinc-700 bg-zinc-900/50';
      default: return 'text-zinc-600 border-zinc-800 bg-transparent';
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-24 md:pb-60 bg-black relative overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-white/[0.015] to-transparent pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[80%] bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none rounded-full blur-[160px]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-48 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20 md:gap-40 items-center reveal">
          {/* Left Side: Brand Narrative */}
          <div className="space-y-12 md:space-y-16 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="h-[1px] w-12 bg-white/20" />
                <span className="text-[10px] md:text-[11px] font-bold text-white/40 tracking-[0.7em] uppercase block">Bespoke Allocation Flow</span>
              </div>
              <h2 className="font-serif-luxury text-6xl md:text-8xl lg:text-[9rem] text-white tracking-tighter leading-[0.8] mb-4">
                {step === 'confirmed' ? 'Commission' : 'The Audit'} <br/>
                <span className="italic font-light opacity-30">{step === 'confirmed' ? 'Secured.' : 'Request.'}</span>
              </h2>
            </div>
            
            <p className="text-[#555] text-xl md:text-3xl font-light leading-relaxed italic max-w-xl mx-auto lg:mx-0">
              {step === 'confirmed' 
                ? "Your credentials have been successfully transmitted via our secure uplink. Our Founder is being notified of your request for engagement."
                : "Initiate the acquisition of your baseline intelligence report. Each trial is personally reviewed by our senior leadership to ensure absolute precision."}
            </p>
            
            <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 items-center border-t border-white/5 w-fit">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Direct Notification</span>
                <span className="text-white/60 text-[10px] font-mono">dhairya.dhaila@gmail.com</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Status</span>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${step === 'confirmed' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' : 'bg-white/10 animate-pulse'}`} />
                   <span className="text-white text-[10px] font-mono uppercase tracking-widest">{step === 'confirmed' ? 'Delivered' : 'Live Uplink'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Luxury "Configurator" */}
          <div className="relative group perspective-1000">
            <div className="absolute -inset-16 bg-white/[0.015] rounded-full blur-[120px] pointer-events-none group-hover:bg-white/[0.025] transition-all duration-1000" />
            
            <div className="p-[1px] bg-gradient-to-br from-white/20 via-white/[0.03] to-transparent rounded-[4rem] overflow-hidden transition-all duration-1000">
              <div className="p-10 md:p-24 bg-[#050505]/95 backdrop-blur-3xl rounded-[3.9rem] shadow-[0_80px_160px_rgba(0,0,0,0.8)] relative min-h-[680px] flex flex-col justify-center border border-white/5">
                
                {/* STEP 1: WELCOME */}
                {step === 'intro' && (
                  <div className="text-center space-y-16 animate-fade">
                    <div className="space-y-6">
                      <img src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png" className="w-20 h-20 mx-auto brightness-150 opacity-40 mb-8" alt="Meridin Logo" />
                      <h3 className="font-serif-luxury text-4xl text-white italic tracking-tight">The Path to Intelligence.</h3>
                      <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-bold">Verified Corporate Identity Required</p>
                    </div>
                    <div className="pt-12 border-t border-white/5">
                       <button 
                         onClick={() => setStep('commission')}
                         className="w-full pill-button py-7 text-[12px] hover:tracking-[0.5em] transition-all"
                       >
                         Enter Configurator
                       </button>
                       <p className="text-[9px] text-zinc-800 uppercase tracking-[0.4em] mt-8">Secure 4096-bit TLS Handshake Established</p>
                    </div>
                  </div>
                )}

                {/* STEP 2: COMMISSION FORM */}
                {step === 'commission' && (
                  <form onSubmit={handleStartCommission} className="space-y-12 md:space-y-16 animate-fade">
                    <div className="flex justify-between items-end border-b border-white/5 pb-8">
                       <div>
                         <h3 className="text-white text-[12px] font-bold tracking-[0.5em] uppercase mb-1">Commission Details</h3>
                         <p className="text-zinc-700 text-[9px] uppercase tracking-widest italic">Phase 01: Identification</p>
                       </div>
                       <span className="text-zinc-800 text-[10px] font-mono border border-white/10 px-3 py-1 rounded-full">SPEC_01</span>
                    </div>

                    <div className="space-y-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Business Entity Name</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Geneva Wealth Partners"
                          value={regData.name}
                          onChange={(e) => setRegData({...regData, name: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-xl font-light italic"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Corporate Domain (URL)</label>
                        <input
                          required
                          type="url"
                          placeholder="https://www.partners.ch"
                          value={regData.url}
                          onChange={(e) => setRegData({...regData, url: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-xl font-light italic"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Corporate Email Identity</label>
                        <input
                          required
                          type="email"
                          placeholder="executive@partners.ch"
                          value={regData.email}
                          onChange={(e) => setRegData({...regData, email: e.target.value})}
                          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-xl font-light italic"
                        />
                      </div>
                    </div>

                    <div className="pt-8">
                       <button type="submit" className="w-full pill-button py-7 flex items-center justify-center gap-6 group">
                         Finalize Configuration <span className="text-2xl opacity-30 transition-transform group-hover:translate-x-3">&rarr;</span>
                       </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: PROVISIONING */}
                {step === 'provisioning' && (
                  <div className="flex flex-col items-center justify-center space-y-20 animate-fade">
                     <div className="relative w-40 h-40 flex items-center justify-center">
                        <div className="absolute inset-0 border-[1px] border-white/5 rounded-full scale-[1.6] opacity-20" />
                        <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-[1.3]" />
                        <div 
                          className="absolute inset-[-6px] border-t-[3px] border-white rounded-full animate-spin shadow-[0_0_30px_rgba(255,255,255,0.15)]" 
                          style={{ animationDuration: '3.5s' }}
                        />
                        <span className="text-2xl font-serif-luxury italic text-white/60">{Math.floor(provisioningProgress)}%</span>
                     </div>
                     <div className="space-y-5 text-center">
                        <p className="text-white text-[13px] font-bold uppercase tracking-[0.6em] animate-pulse h-5">
                          {provisioningMessages[currentMsgIndex]}
                        </p>
                        <p className="text-zinc-800 text-[9px] uppercase tracking-[0.5em] font-mono">Channel: DIRECT_X_SECURE</p>
                     </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & SIGN */}
                {step === 'review' && (
                  <div className="space-y-12 animate-fade">
                    <div className="space-y-8">
                      <div className="flex justify-between items-center border-b border-white/5 pb-6">
                         <h3 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.5em]">Review Assignment</h3>
                         <span className="text-zinc-700 text-[10px] font-mono">VER_FINAL</span>
                      </div>
                      
                      <div className="space-y-8 py-4">
                        <div className="grid grid-cols-2 gap-8 border-l border-white/5 pl-8">
                           <div className="space-y-1">
                             <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Entity</span>
                             <p className="text-white font-serif-luxury italic text-lg">{regData.name}</p>
                           </div>
                           <div className="space-y-1">
                             <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Email</span>
                             <p className="text-white font-serif-luxury italic text-lg truncate">{regData.email}</p>
                           </div>
                        </div>
                        <div className="border-l border-white/5 pl-8 space-y-1">
                           <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Target URL</span>
                           <p className="text-white font-serif-luxury italic text-lg">{regData.url}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div 
                        className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col items-center gap-6 cursor-pointer group transition-all"
                        onClick={() => setIsSigning(!isSigning)}
                      >
                        <div className={`w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center transition-all ${isSigning ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : ''}`}>
                           {isSigning ? (
                             <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                           ) : (
                             <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                           )}
                        </div>
                        <p className={`text-[10px] uppercase tracking-widest transition-colors ${isSigning ? 'text-white' : 'text-zinc-600'}`}>
                          {isSigning ? 'Biometric Signature Applied' : 'Tap to Place Digital Signature'}
                        </p>
                      </div>
                      
                      <button 
                        onClick={handleFinalSubmit}
                        disabled={!isSigning}
                        className={`w-full pill-button py-8 text-[13px] transition-all ${!isSigning ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:scale-[1.03] active:scale-[0.98]'}`}
                      >
                        Sign & Transmit Commission
                      </button>
                    </div>
                  </div>
                )}

                {/* TRANSMITTING STATE */}
                {step === 'transmitting' && (
                  <div className="py-24 flex flex-col items-center justify-center space-y-16 animate-fade">
                    <div className="relative">
                      <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      </div>
                      <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" />
                    </div>
                    <div className="space-y-6 text-center">
                      <p className="text-white text-[12px] font-bold uppercase tracking-[0.8em] animate-pulse">Establishing Uplink</p>
                      <p className="text-zinc-700 text-[9px] uppercase tracking-[0.4em] font-mono">Transmitting Ciphered Packet...</p>
                      <div className="text-[8px] text-zinc-900 tracking-widest font-mono">DESTINATION: DH_ADMIN_GATEWAY</div>
                    </div>
                  </div>
                )}

                {/* ERROR STATE */}
                {step === 'error' && (
                  <div className="text-center space-y-12 animate-fade">
                    <div className="w-20 h-20 mx-auto rounded-full border border-red-900/40 flex items-center justify-center">
                       <span className="text-red-500 text-3xl">!</span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-serif-luxury text-3xl text-white italic">Protocol Interrupted.</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">The secure gateway encountered an anomaly. Please re-initiate the handshake.</p>
                    </div>
                    <button 
                      onClick={() => setStep('intro')}
                      className="w-full py-6 border border-white/10 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                      Re-Initialize
                    </button>
                  </div>
                )}

                {/* CONFIRMED STATE */}
                {step === 'confirmed' && (
                  <div className="space-y-16 animate-fade">
                    <div className="space-y-10">
                      <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-[pulseGlow_4s_infinite]">
                           <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7"/></svg>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <h4 className="text-white font-serif-luxury text-3xl italic">Transmission Successful.</h4>
                        <p className="text-zinc-600 text-[11px] uppercase tracking-[0.4em]">Protocol ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                      
                      <div className="relative border-l border-white/5 pl-10 py-6 space-y-6">
                        <p className="text-lg md:text-xl leading-relaxed font-light italic text-zinc-400">
                          Your commission for <span className="text-white">{regData.name}</span> has been logged. Senior Intelligence Officer <span className="text-white">Dhairya Singh</span> has been notified at his private desk. 
                        </p>
                        <p className="text-zinc-500 text-sm italic">Expect a secure briefing within 24-48 business hours.</p>
                      </div>
                    </div>
                    
                    <div className="pt-12 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setStep('intro');
                          setProvisioningProgress(0);
                          setIsSigning(false);
                        }}
                        className="text-[11px] font-bold text-zinc-700 uppercase hover:text-white transition-all tracking-[0.5em] flex items-center gap-4 mx-auto"
                      >
                        &larr; Exit Terminal
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Recent Archive - Subtle Social Proof */}
        <div className="reveal space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-4xl md:text-6xl text-white tracking-tighter">Engagement <span className="opacity-20 italic">Archive.</span></h3>
              <p className="text-zinc-700 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em]">Validated Intelligence Assignments // Recent Commissions</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sampleReports.map((report) => (
              <div 
                key={report.id}
                className="group relative p-12 md:p-16 transition-all duration-1000 hover:-translate-y-5"
              >
                <div className="absolute inset-0 bg-white/[0.015] backdrop-blur-3xl border border-white/5 group-hover:bg-white/[0.03] group-hover:border-white/10 transition-all duration-1000 rounded-[3.5rem]" />
                
                <div className="relative z-10 space-y-12">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-zinc-800 tracking-[0.4em] uppercase">{report.id}</span>
                    <span className={`px-4 py-1.5 text-[8px] font-bold border rounded-full tracking-widest ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-serif-luxury text-3xl text-white tracking-tight leading-tight group-hover:italic transition-all duration-1000">
                      {report.title}
                    </h4>
                    <div className="h-[1px] w-16 bg-white/5 transition-all duration-1000 group-hover:w-full" />
                    <p className="text-zinc-800 text-[10px] font-bold uppercase tracking-[0.4em]">Archived: {report.date}</p>
                  </div>

                  <div className="pt-4">
                    <button className="text-[10px] font-bold text-white/10 uppercase tracking-[0.6em] group-hover:text-white transition-colors duration-700">
                      View Summary &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
