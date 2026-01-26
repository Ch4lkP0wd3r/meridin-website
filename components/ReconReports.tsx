
import React, { useState, useEffect } from 'react';
import { ReportSample } from '../types';

const sampleReports: ReportSample[] = [
  { id: 'RPT-001', title: 'Financial Services Audit', severity: 'HIGH', date: '28.05.2024' },
  { id: 'RPT-002', title: 'Tech Infrastructure Review', severity: 'HIGH', date: '26.05.2024' },
  { id: 'RPT-003', title: 'Retail Network Check', severity: 'LOW', date: '24.05.2024' }
];

type FlowStep = 'intro' | 'request' | 'processing' | 'review' | 'submitting' | 'confirmed' | 'error';

export const ReconReports: React.FC = () => {
  const [step, setStep] = useState<FlowStep>('intro');
  const [regData, setRegData] = useState({ name: '', email: '', url: '', role: 'Representative' });
  const [provisioningProgress, setProvisioningProgress] = useState(0);
  const [isSigning, setIsSigning] = useState(false);

  const handleStartCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.url) return;
    setStep('processing');
  };

  const handleFinalSubmit = () => {
    const subject = encodeURIComponent(`Security Audit Request: ${regData.name}`);
    const body = encodeURIComponent(
      `Organization: ${regData.name}\nWebsite: ${regData.url}\nEmail: ${regData.email}\n\nI would like to request a free security audit for my organization.`
    );
    window.location.href = `mailto:support@meridin.co.in?subject=${subject}&body=${body}`;
    setStep('confirmed');
  };

  useEffect(() => {
    if (step === 'processing') {
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

  const processingMessages = [
    "Checking Infrastructure...",
    "Validating URL...",
    "Syncing Details...",
    "Preparing Request...",
    "Ready for Review."
  ];

  const currentMsgIndex = Math.min(
    Math.floor((provisioningProgress / 100) * processingMessages.length),
    processingMessages.length - 1
  );

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'HIGH': return 'text-white border-white bg-white/10';
      case 'MEDIUM': return 'text-zinc-400 border-zinc-700 bg-zinc-900/50';
      default: return 'text-zinc-600 border-zinc-800 bg-transparent';
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-24 md:pb-40 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-white/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-10 space-y-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center reveal">
          <div className="space-y-10 md:space-y-12 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="h-[1px] w-12 bg-white/20" />
                <span className="text-[10px] md:text-[11px] font-bold text-white/40 tracking-widest uppercase block">Audit Request</span>
              </div>
              <h2 className="font-serif-luxury text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.8] mb-4">
                {step === 'confirmed' ? 'Request' : 'Security'} <br />
                <span className="italic font-light opacity-30">{step === 'confirmed' ? 'Received.' : 'Audit.'}</span>
              </h2>
            </div>

            <p className="text-[#555] text-lg md:text-2xl font-light leading-relaxed italic max-w-xl mx-auto lg:mx-0">
              {step === 'confirmed'
                ? "Your request has been received. Our team will review the details and get back to you shortly."
                : "Request a baseline security audit for your organization. Each request is reviewed by our team to provide practical insights."}
            </p>

            <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 items-center border-t border-white/5 w-fit">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Email Support</span>
                <span className="text-white/60 text-[10px] font-mono">support@meridin.co.in</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Status</span>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${step === 'confirmed' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' : 'bg-white/10 animate-pulse'}`} />
                  <span className="text-white text-[10px] font-mono uppercase tracking-widest">{step === 'confirmed' ? 'Received' : 'Active'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="p-[1px] bg-gradient-to-br from-white/20 via-white/[0.03] to-transparent rounded-[3rem] overflow-hidden transition-all duration-1000">
              <div className="p-10 md:p-16 bg-[#050505]/95 backdrop-blur-3xl rounded-[2.9rem] shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative min-h-[580px] flex flex-col justify-center border border-white/5">
                {step === 'intro' && (
                  <div className="text-center space-y-12 animate-fade">
                    <div className="space-y-6">
                      <img
                        src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png"
                        className="w-16 h-16 mx-auto brightness-150 opacity-40 mb-6"
                        alt="Meridin Logo"
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                      <h3 className="font-serif-luxury text-3xl text-white italic tracking-tight">Security Audit Request</h3>
                      <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-bold">Please provide your details</p>
                    </div>
                    <div className="pt-10 border-t border-white/5">
                      <button
                        onClick={() => setStep('request')}
                        className="w-full pill-button py-6 text-[11px] transition-all"
                      >
                        Start Request
                      </button>
                    </div>
                  </div>
                )}

                {step === 'request' && (
                  <form onSubmit={handleStartCommission} className="space-y-10 md:space-y-12 animate-fade">
                    <div className="flex justify-between items-end border-b border-white/5 pb-6">
                      <div>
                        <h3 className="text-white text-[11px] font-bold tracking-[0.5em] uppercase mb-1">Request Details</h3>
                        <p className="text-zinc-700 text-[9px] uppercase tracking-widest italic">Phase 01: Identification</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Organization Name</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. My Business"
                          value={regData.name}
                          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                          className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-lg font-light italic"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Website URL</label>
                        <input
                          required
                          type="url"
                          placeholder="https://www.example.com"
                          value={regData.url}
                          onChange={(e) => setRegData({ ...regData, url: e.target.value })}
                          className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-lg font-light italic"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Business Email</label>
                        <input
                          required
                          type="email"
                          placeholder="name@company.com"
                          value={regData.email}
                          onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                          className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-white outline-none transition-all placeholder:text-zinc-900 text-lg font-light italic"
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full pill-button py-6 flex items-center justify-center gap-4 group">
                        Next Step <span className="text-xl opacity-30 transition-transform group-hover:translate-x-3">&rarr;</span>
                      </button>
                    </div>
                  </form>
                )}

                {step === 'processing' && (
                  <div className="flex flex-col items-center justify-center space-y-16 animate-fade">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-[-4px] border-t-[2px] border-white rounded-full animate-spin shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
                      <span className="text-xl font-serif-luxury italic text-white/60">{Math.floor(provisioningProgress)}%</span>
                    </div>
                    <div className="space-y-4 text-center">
                      <p className="text-white text-[11px] font-bold uppercase tracking-[0.6em] animate-pulse h-4">
                        {processingMessages[currentMsgIndex]}
                      </p>
                    </div>
                  </div>
                )}

                {step === 'review' && (
                  <div className="space-y-10 animate-fade">
                    <div className="space-y-8">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em]">Review Information</h3>
                      </div>
                      <div className="space-y-6 py-2">
                        <div className="grid grid-cols-2 gap-6 border-l border-white/5 pl-6">
                          <div className="space-y-1">
                            <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Entity</span>
                            <p className="text-white font-serif-luxury italic text-base">{regData.name}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Email</span>
                            <p className="text-white font-serif-luxury italic text-base truncate">{regData.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleFinalSubmit}
                      className="w-full pill-button py-6 text-[11px] transition-all"
                    >
                      Confirm and Send
                    </button>
                  </div>
                )}

                {step === 'submitting' && (
                  <div className="py-20 flex flex-col items-center justify-center space-y-12 animate-fade">
                    <div className="relative">
                      <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      </div>
                      <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" />
                    </div>
                    <div className="space-y-4 text-center">
                      <p className="text-white text-[11px] font-bold uppercase tracking-[0.8em] animate-pulse">Sending Request</p>
                    </div>
                  </div>
                )}

                {step === 'error' && (
                  <div className="text-center space-y-10 animate-fade">
                    <div className="w-16 h-16 mx-auto rounded-full border border-red-900/40 flex items-center justify-center">
                      <span className="text-red-500 text-2xl">!</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif-luxury text-2xl text-white italic">Something Went Wrong.</h3>
                      <p className="text-zinc-600 text-xs leading-relaxed">We couldn't process your request. Please try again.</p>
                    </div>
                    <button onClick={() => setStep('intro')} className="w-full py-5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">Retry</button>
                  </div>
                )}

                {step === 'confirmed' && (
                  <div className="space-y-12 animate-fade">
                    <div className="text-center space-y-6">
                      <img
                        src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png"
                        className="w-16 h-16 mx-auto brightness-150 opacity-40 mb-6"
                        alt="Meridin Logo"
                        width="64"
                        height="64"
                        loading="lazy"
                      />
                      <h4 className="text-white font-serif-luxury text-2xl italic">Request Received.</h4>
                      <p className="text-zinc-400 text-base leading-relaxed font-light italic">
                        Thank you. Your request for <span className="text-white">{regData.name}</span> has been received. Our team will review the details and contact you soon.
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('intro')}
                      className="text-[10px] font-bold text-zinc-700 uppercase hover:text-white transition-all tracking-[0.5em] flex items-center gap-3 mx-auto"
                    >
                      &larr; Return
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="reveal space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tighter">Recent <span className="opacity-20 italic">Reports.</span></h3>
              <p className="text-zinc-700 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.5em]">Verified Audits and Reviews</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sampleReports.map((report) => (
              <div
                key={report.id}
                className="group relative p-10 transition-all duration-1000 hover:-translate-y-3"
              >
                <div className="absolute inset-0 bg-white/[0.015] backdrop-blur-3xl border border-white/5 rounded-[3rem]" />
                <div className="relative z-10 space-y-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-zinc-800 tracking-[0.4em] uppercase">{report.id}</span>
                    <span className={`px-4 py-1.5 text-[8px] font-bold border rounded-full tracking-widest ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury text-2xl text-white tracking-tight leading-tight group-hover:italic transition-all duration-1000">
                      {report.title}
                    </h4>
                    <p className="text-zinc-800 text-[9px] font-bold uppercase tracking-[0.4em]">Date: {report.date}</p>
                  </div>
                  <div className="pt-4">
                    <button className="text-[9px] font-bold text-white/10 uppercase tracking-[0.6em] group-hover:text-white transition-colors duration-700">
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
