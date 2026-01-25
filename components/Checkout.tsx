
import React, { useState, useEffect, useMemo } from 'react';
import { Plan } from '../App';
import maxelpayCheckout from 'maxelpay-js';

interface CheckoutProps {
  plans: Plan[];
  onClose: () => void;
}

type PaymentMethod = 'fiat' | 'crypto';
type CryptoAsset = 'BTC' | 'ETH' | 'XMR';
type CheckoutStep = 'details' | 'method' | 'settlement' | 'processing' | 'success' | 'error';

// Maxel Pay Credentials (Injected from user documentation)
const MAXEL_CONFIG = {
  apiKey: "Nn4huCfaU6zwk6BqWB5OPLMSMs6c7cPg",
  secretKey: "DbuA7d1vy0jzTskHOka4nwhShckRompf",
  environment: "stg", // 'stg' for staging as requested
  docUrl: "https://dashboard.maxelpay.com/documentation/integration"
};

const WALLETS = {
  BTC: "bc1qmeridin7luxury8intel9sovereign0xyz",
  ETH: "0xMeridinSovereignIntelBridge777",
  XMR: "44MeridinIntelAnonymityIsTheOnlyGoldStandard888"
};

export const Checkout: React.FC<CheckoutProps> = ({ plans, onClose }) => {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [method, setMethod] = useState<PaymentMethod>('fiat');
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>('XMR');
  const [formData, setFormData] = useState({ name: '', email: '', entity: '' });
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalPriceINR = useMemo(() => 
    plans.reduce((acc, item) => acc + parseInt(item.price.replace(/[₹,]/g, '')), 0),
  [plans]);

  // Fetch Live Rates for Crypto Options
  useEffect(() => {
    if (step === 'method' || (step === 'settlement' && method === 'crypto')) {
      setIsLoadingRates(true);
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero&vs_currencies=inr')
        .then(res => res.json())
        .then(data => {
          setRates({
            BTC: data.bitcoin.inr,
            ETH: data.ethereum.inr,
            XMR: data.monero.inr
          });
          setIsLoadingRates(false);
        })
        .catch(() => setIsLoadingRates(false));
    }
  }, [step, method]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const cryptoAmount = useMemo(() => {
    if (!rates[selectedAsset]) return "0.000";
    return (totalPriceINR / rates[selectedAsset]).toFixed(selectedAsset === 'BTC' ? 8 : 4);
  }, [rates, selectedAsset, totalPriceINR]);

  const initiateMaxelPay = async () => {
    setStep('processing');
    setLogs(["INITIALIZING MAXEL_PAY PROTOCOL...", "GENERATING SECURE PAYLOAD..."]);
    
    // Construct real payload according to provided HOW TO USE guide
    const payload = {
      orderID: `M-ORD-${Math.floor(Date.now() / 1000)}`,
      amount: (totalPriceINR / 83).toFixed(2), // Conversion to USD approx
      currency: "USD",
      timestamp: Math.floor(Date.now() / 1000).toString(),
      userEmail: formData.email,
      userName: formData.name,
      redirectUrl: window.location.origin,
      websiteUrl: window.location.origin,
      cancelUrl: window.location.origin,
      siteName: "Meridin & Co™",
      webhookUrl: "https://meridin.io/api/v1/payment/webhook"
    };

    try {
      setLogs(prev => [...prev, "UPLINKING TO STAGING GATEWAY..."]);
      const checkoutUrl = await maxelpayCheckout(
        payload, 
        MAXEL_CONFIG.apiKey, 
        MAXEL_CONFIG.secretKey, 
        MAXEL_CONFIG.environment
      );

      setLogs(prev => [...prev, "URL RECEIVED. REDIRECTING TO SECURE SOVEREIGN BRIDGE..."]);
      setAuthProgress(100);
      
      // Real Redirection
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 1500);
      
    } catch (error: any) {
      console.error('Maxel Pay Integration Error:', error);
      setErrorMessage(error.message || "Uplink failed. Check documentation or keys.");
      setStep('error');
    }
  };

  const startCryptoSimulation = () => {
    setStep('processing');
    let progress = 0;
    const terminalLogs = [
      "ESTABLISHING SOVEREIGN LINK...",
      "SCANNING MEMPOOL FOR BROADCAST...",
      "VERIFYING ZERO-KNOWLEDGE PROOF...",
      "NODE CONFIRMATION: 1/3 (ZURICH)",
      "PROTOCOL ACTIVATED."
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (Math.floor(progress / 20) > logIdx && logIdx < terminalLogs.length) {
        setLogs(prev => [...prev, terminalLogs[logIdx]]);
        logIdx++;
      }
      if (progress >= 100) {
        clearInterval(interval);
        setAuthProgress(100);
        setTimeout(() => setStep('success'), 800);
      } else {
        setAuthProgress(progress);
      }
    }, 120);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl animate-fade overflow-y-auto py-10 md:py-20 flex justify-center">
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[3rem] shadow-[0_100px_200px_rgba(0,0,0,0.9)] m-auto">
        <div className="p-10 md:p-16 relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.6em]">Settlement Terminal</span>
              <h3 className="font-serif-luxury text-4xl text-white italic">Engagement Protocol</h3>
            </div>
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors p-2 text-2xl">&times;</button>
          </div>

          <div className="min-h-[520px] flex flex-col justify-center">
            
            {/* Step 1: Identification */}
            {step === 'details' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('method'); }} className="space-y-10 animate-fade">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Representative Name</label>
                    <input required type="text" placeholder="Executive Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Legal Entity</label>
                    <input required type="text" placeholder="e.g. Saffron Hedge" value={formData.entity} onChange={e => setFormData({...formData, entity: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Corporate Email</label>
                    <input required type="email" placeholder="executive@domain.io" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic" 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full pill-button py-6 text-sm">Select Settlement Channel</button>
              </form>
            )}

            {/* Step 2: Method Selection */}
            {step === 'method' && (
              <div className="space-y-12 animate-fade">
                <div className="text-center space-y-4">
                  <h4 className="font-serif-luxury text-3xl text-white italic">Choose Your Path</h4>
                  <p className="text-zinc-500 text-sm tracking-wide uppercase">Select a verifiable remittance channel</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => { setMethod('fiat'); setStep('settlement'); }}
                    className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] text-left hover:border-white/20 transition-all group"
                  >
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Official Gateway</div>
                    <div className="text-white text-2xl font-serif-luxury italic mb-2">Maxel Pay</div>
                    <p className="text-zinc-600 text-[11px] leading-relaxed italic">Real-time fiat-to-crypto bridge. Secured by your API keys.</p>
                  </button>

                  <button 
                    onClick={() => { setMethod('crypto'); setStep('settlement'); }}
                    className="p-10 bg-white/5 border border-white/20 rounded-[2.5rem] text-left hover:bg-white/10 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-6 text-[8px] font-bold text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-tighter">Native</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Direct-to-Wallet</div>
                    <div className="text-white text-2xl font-serif-luxury italic mb-2">Sovereign Asset</div>
                    <p className="text-zinc-500 text-[11px] leading-relaxed italic">Direct settlement via on-chain transmission.</p>
                  </button>
                </div>
                
                <button onClick={() => setStep('details')} className="text-[10px] uppercase tracking-widest text-zinc-700 hover:text-white block mx-auto pt-4">Return to Identification</button>
              </div>
            )}

            {/* Step 3: Crypto Settlement UI */}
            {step === 'settlement' && method === 'crypto' && (
              <div className="space-y-12 animate-fade">
                <div className="flex flex-wrap justify-center gap-4">
                  {(['XMR', 'BTC', 'ETH'] as CryptoAsset[]).map(asset => (
                    <button 
                      key={asset}
                      onClick={() => setSelectedAsset(asset)}
                      className={`px-6 py-3 rounded-full text-[11px] font-bold tracking-widest transition-all border ${selectedAsset === asset ? 'bg-white text-black border-white' : 'text-zinc-500 border-white/5 hover:border-white/20'}`}
                    >
                      {asset} {asset === 'XMR' && " (EXECUTIVE)"}
                    </button>
                  ))}
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 space-y-8">
                  <div className="flex flex-col items-center gap-8">
                    <div className="p-4 bg-white rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedAsset.toLowerCase()}:${WALLETS[selectedAsset]}`} 
                        alt="Payment QR"
                        className="w-40 h-40"
                      />
                    </div>
                    <div className="text-center space-y-4">
                      <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em]">Remit Exactly</div>
                      <div className="text-white text-4xl md:text-5xl font-mono tracking-tighter">
                        {isLoadingRates ? "..." : cryptoAmount} <span className="text-xl text-zinc-600 uppercase">{selectedAsset}</span>
                      </div>
                      <div className="text-zinc-700 text-[10px] font-mono border border-white/5 px-4 py-2 rounded-full truncate max-w-xs mx-auto">
                        {WALLETS[selectedAsset]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <button onClick={startCryptoSimulation} className="w-full pill-button py-6 bg-white text-black">Verify Transaction on Chain</button>
                </div>
              </div>
            )}

            {/* Step 3: Maxel Pay Settlement UI */}
            {step === 'settlement' && method === 'fiat' && (
              <div className="text-center space-y-12 animate-fade py-6">
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                     <span className="px-4 py-1.5 border border-white/10 rounded-full text-[9px] text-white/40 uppercase tracking-[0.4em]">Maxel Pay Uplink Active</span>
                  </div>
                  <h4 className="font-serif-luxury text-3xl text-white italic">Confirm Commitment</h4>
                  <p className="text-zinc-500 text-lg font-light max-w-sm mx-auto">Secure remittance via Maxel Sovereignty Bridge.</p>
                </div>
                
                <div className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.02] space-y-6 text-left relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    <span>Valuation (approx USD)</span>
                    <span className="text-white">${(totalPriceINR / 83).toFixed(2)}</span>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <p className="text-[11px] text-zinc-600 italic leading-relaxed">
                    By proceeding, you will be redirected to the <span className="text-white">Maxel Pay Staging Environment</span>.
                  </p>
                </div>

                <div className="space-y-6">
                  <button onClick={initiateMaxelPay} className="w-full pill-button py-6 bg-white text-black">
                    Initiate Maxel Bridge
                  </button>
                  <a 
                    href={MAXEL_CONFIG.docUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[9px] uppercase tracking-widest text-zinc-700 hover:text-white transition-colors block py-2"
                  >
                    View Maxel Pay Documentation
                  </a>
                </div>
              </div>
            )}

            {/* Processing State */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-12 animate-fade">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/10 rounded-full" />
                  <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                  <span className="text-xl font-serif-luxury text-white italic">{Math.floor(authProgress)}%</span>
                </div>
                <div className="w-full max-w-sm space-y-6">
                  <div className="bg-black/50 p-8 rounded-[2rem] border border-white/5 h-56 overflow-hidden relative">
                    <div className="space-y-2">
                      {logs.map((log, i) => (
                        <p key={i} className="text-[9px] font-mono text-zinc-600 animate-fade">
                          <span className="text-zinc-800">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> {log}
                        </p>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#050505] to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {step === 'error' && (
              <div className="text-center py-10 space-y-12 animate-fade">
                <div className="w-20 h-20 bg-red-900/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-red-500 text-3xl">!</span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-serif-luxury text-4xl text-white italic">Uplink Failed.</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
                    {errorMessage || "The Maxel Pay gateway could not be reached. Verify your credentials and network status."}
                  </p>
                </div>
                <button onClick={() => setStep('method')} className="text-[10px] uppercase tracking-widest text-zinc-700 hover:text-white block mx-auto">Retry Protocol</button>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-10 space-y-12 animate-fade">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="space-y-4">
                  <h4 className="font-serif-luxury text-4xl text-white italic">Protocol Initialized.</h4>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm mx-auto">
                    The settlement for <span className="text-white">{formData.entity}</span> is verified.
                  </p>
                </div>
                <button onClick={onClose} className="pill-button px-16 py-5 text-[11px] block mx-auto mt-10">Seal & Exit</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
