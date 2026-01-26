
import React from 'react';
import { motion } from 'framer-motion';

interface NotFoundErrorProps {
    onNavigate: (page: any) => void;
}

export const NotFoundError: React.FC<NotFoundErrorProps> = ({ onNavigate }) => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
            </div>

            <div className="relative z-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                >
                    <div className="w-24 h-24 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-12">
                        <span className="text-white/20 text-4xl font-serif-luxury italic">404</span>
                    </div>
                    <h2 className="font-serif-luxury text-5xl md:text-7xl text-white italic">Protocol <br /><span className="opacity-30">Interrupted.</span></h2>
                    <p className="text-[#666] text-lg md:text-xl font-light italic max-w-sm mx-auto">
                        "The requested link does not exist in our active intelligence database. Redirecting is advised."
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="pt-8"
                >
                    <button
                        onClick={() => onNavigate('home')}
                        className="pill-button px-12 py-5 text-[11px]"
                    >
                        Return to Perimeter &rarr;
                    </button>
                </motion.div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-10">
                <p className="text-[8px] font-bold uppercase tracking-[0.8em] text-white">Meridin & Co<sup>™</sup> Secure Layer</p>
            </div>
        </section>
    );
};
