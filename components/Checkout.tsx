
import React, { useState, useEffect } from 'react';
import { Plan } from '../App';

interface CheckoutProps {
  plan: Plan;
  onClose: () => void;
}

type CheckoutStep = 'details' | 'generating' | 'payment_link' | 'error' | 'success';

export const Checkout: React.FC<CheckoutProps> = ({ plan, onClose }) => {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [formData, setFormData] = useState({ name: '', email: '', entity: '' });
  const [logs, setLogs] = useState<string[]>([]);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const generateInvoice = async () => {
    setStep('generating');
    setLogs(["INITIALIZING SECURE SESSION...", "GENERATING UNIQUE ORDER ID..."]);

    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    const orderId = `MERIDIN_${plan.id.toUpperCase()}_${formData.email.split('@')[0].toUpperCase()}_${timestamp}`;

    const metadata = {
      user: formData.email,
      userName: formData.name,
      entity: formData.entity,
      plan: plan.name,
      planId: plan.id,
      billing: plan.billingType,
      date: new Date().toISOString()
    };

    setLogs(prev => [...prev, `ORDER_ID: ${orderId}`, "STRUCTURING METADATA...", "ESTABLISHING API LINK..."]);

    try {
      const response = await fetch("/api/nowpayments/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_amount: parseInt(plan.price.replace(/[$,]/g, '')),
          price_currency: "usd",
          order_id: orderId,
          order_description: JSON.stringify(metadata),
          success_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancel`
        })
      });

      const data = await response.json();

      if (response.ok && data.invoice_url) {
        setInvoiceUrl(data.invoice_url);
        setStep('payment_link');
      } else {
        throw new Error(data.message || "Failed to generate invoice");
      }
    } catch (err: any) {
      console.error("Invoice generation failed:", err);
      setErrorMessage(err.message || "Could not connect to payment gateway.");
      setStep('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl animate-fade overflow-y-auto py-10 md:py-20 flex justify-center">
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[3rem] shadow-[0_100px_200px_rgba(0,0,0,0.9)] m-auto">
        <div className="p-10 md:p-16 relative z-10">

          <div className="flex justify-between items-start mb-12 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.6em]">Secure Checkout</span>
              <h3 className="font-serif-luxury text-4xl text-white italic">{plan.name} Access</h3>
            </div>
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors p-2 text-2xl">&times;</button>
          </div>

          <div className="min-h-[450px] flex flex-col justify-center">
            {step === 'details' && (
              <form onSubmit={(e) => { e.preventDefault(); generateInvoice(); }} className="space-y-10 animate-fade">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Full Name</label>
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Organization</label>
                    <input required type="text" placeholder="Entity Name" value={formData.entity} onChange={e => setFormData({ ...formData, entity: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Email Address</label>
                    <input required type="email" placeholder="email@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-white outline-none transition-all placeholder:text-zinc-800 text-xl font-light italic"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full pill-button py-6 text-sm">Initialize Payment &rarr;</button>
              </form>
            )}

            {step === 'generating' && (
              <div className="flex flex-col items-center justify-center space-y-12 animate-fade">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" />
                  <img src="https://i.postimg.cc/Bvfb3nW4/logo-no-bg.png" className="w-8 h-8 brightness-150 opacity-40 animate-pulse" alt="Meridin Logo" />
                </div>
                <div className="w-full max-w-sm space-y-4">
                  <div className="bg-black/50 p-8 rounded-[2rem] border border-white/5 h-48 overflow-hidden relative custom-scrollbar overflow-y-auto">
                    <div className="space-y-2">
                      {logs.map((log, i) => (
                        <p key={i} className="text-[9px] font-mono text-zinc-600 animate-fade">
                          <span className="text-zinc-800">[{new Date().toLocaleTimeString([], { hour12: false })}]</span> {log}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'payment_link' && (
              <div className="text-center space-y-10 animate-fade">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                  <h4 className="font-serif-luxury text-3xl text-white italic">Invoice Generated</h4>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm mx-auto">
                    Your secure payment link for the <span className="text-white font-medium">{plan.name}</span> plan is ready.
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <a
                    href={invoiceUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full pill-button py-6 text-sm flex items-center justify-center gap-4 group"
                  >
                    Pay with Crypto <span className="text-xl transition-transform group-hover:translate-x-2">&rarr;</span>
                  </a>
                  <p className="text-[10px] text-zinc-700 uppercase tracking-[0.3em]">
                    Clicking will redirect to NOWPayments Secure Portal
                  </p>
                </div>
              </div>
            )}

            {step === 'error' && (
              <div className="text-center py-10 space-y-10 animate-fade">
                <div className="w-20 h-20 bg-red-900/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-red-500 text-3xl">!</span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-serif-luxury text-3xl text-white italic">Generation Failed.</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
                    {errorMessage || "We could not establish a connection to the payment gateway."}
                  </p>
                </div>
                <button onClick={() => setStep('details')} className="text-[10px] uppercase tracking-widest text-zinc-700 hover:text-white block mx-auto pt-6">Back to Details</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
