
import React from 'react';
import { Plan } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Plan[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const totalPrice = items.reduce((acc, item) => acc + parseInt(item.price.replace(/[₹,]/g, '')), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[1500] bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-lg z-[1600] bg-[#050505] border-l border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-10 md:p-16">
          <div className="flex justify-between items-end mb-16 pb-8 border-b border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em]">Engagement Folder</span>
              <h3 className="font-serif-luxury text-4xl text-white italic">Allocations</h3>
            </div>
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors text-2xl p-2">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-10 pr-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
                <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.4em]">Folder Empty</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="group relative flex justify-between items-start animate-fade">
                  <div className="space-y-1">
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{item.id} Protocol</p>
                    <h4 className="text-xl font-serif-luxury text-white italic group-hover:text-zinc-400 transition-colors">{item.name}</h4>
                    <p className="text-zinc-500 font-mono text-sm">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-[9px] font-bold text-red-900/40 hover:text-red-500 uppercase tracking-widest pt-2 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-10 pt-10 border-t border-white/5 space-y-10">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Total Commitment</span>
                <span className="text-2xl font-serif-luxury text-white">₹{totalPrice.toLocaleString()} <span className="text-[10px] opacity-20 not-italic">/ mo</span></span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full pill-button py-6 text-sm"
              >
                Proceed to Authorization
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
