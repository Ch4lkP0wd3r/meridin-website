
import React, { useState } from 'react';

interface SupportCategory {
    id: string;
    title: string;
    icon: string;
    description: string;
    steps: string[];
}

const supportCategories: SupportCategory[] = [
    {
        id: 'fraud',
        title: 'Online Fraud & Scams',
        icon: '🎯',
        description: 'Phishing, identity theft, financial scams, and fraudulent schemes',
        steps: [
            'Stop all communication with the fraudster immediately',
            'Document everything: emails, messages, transaction IDs, screenshots',
            'Contact your bank/payment provider to freeze accounts if money was transferred',
            'Change passwords for all affected accounts using strong, unique passwords',
            'Report to your local cybercrime cell and file an FIR',
            'Report to the National Cybercrime Reporting Portal (cybercrime.gov.in)',
            'Monitor your credit reports for suspicious activity'
        ]
    },
    {
        id: 'harassment',
        title: 'Cyberbullying & Harassment',
        icon: '🛡️',
        description: 'Online threats, stalking, abusive messages, and targeted harassment',
        steps: [
            'Do not engage or respond to the harasser',
            'Block the person on all platforms immediately',
            'Take screenshots of all threatening or abusive messages (include timestamps)',
            'Report the account to the platform (Facebook, Instagram, Twitter, etc.)',
            'Document the harassment pattern with dates and times',
            'File a complaint with local police and cybercrime authorities',
            'Consider seeking a restraining order if harassment escalates'
        ]
    },
    {
        id: 'doxxing',
        title: 'Doxxing & Privacy Violations',
        icon: '🔒',
        description: 'Unauthorized sharing of personal information, address, or private data',
        steps: [
            'Contact the website/platform hosting your information for immediate removal',
            'File DMCA takedown requests for copyrighted content',
            'Report to Google to remove search results (google.com/webmasters/tools/removals)',
            'Secure all online accounts with 2FA and strong passwords',
            'Consider freezing your credit to prevent identity theft',
            'File a police report documenting the doxxing incident',
            'Consult with a lawyer about legal recourse options'
        ]
    },
    {
        id: 'sextortion',
        title: 'Sextortion & Blackmail',
        icon: '⚠️',
        description: 'Threats to share intimate images or personal information',
        steps: [
            'DO NOT pay any money - it will not stop the threats',
            'Stop all communication with the blackmailer immediately',
            'Preserve all evidence: messages, emails, payment requests, screenshots',
            'Report to local police immediately - this is a serious crime',
            'Report to FBI IC3 (ic3.gov) or your country\'s equivalent',
            'Contact the platform where contact occurred',
            'Seek support from organizations like NCMEC or Cyber Civil Rights Initiative',
            'Consider professional counseling - this is traumatic'
        ]
    },
    {
        id: 'financial',
        title: 'Financial Fraud',
        icon: '💳',
        description: 'Unauthorized transactions, payment fraud, and account compromise',
        steps: [
            'Contact your bank/financial institution immediately',
            'Freeze or close compromised accounts',
            'Dispute fraudulent charges with your bank',
            'File a report with your local police',
            'Report to the National Cybercrime Reporting Portal',
            'Place fraud alerts on your credit reports',
            'Monitor all financial accounts for suspicious activity',
            'Consider credit monitoring services'
        ]
    }
];

const emergencyResources = [
    { name: 'National Cybercrime Helpline (India)', contact: '1930', available: '24/7' },
    { name: 'Cybercrime Reporting Portal', contact: 'cybercrime.gov.in', available: 'Online' },
    { name: 'Women Helpline (India)', contact: '181', available: '24/7' },
    { name: 'Child Helpline (India)', contact: '1098', available: '24/7' },
    { name: 'Emergency Services', contact: '112', available: '24/7' }
];

export const VictimSupport: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const selectedCategoryData = supportCategories.find(cat => cat.id === selectedCategory);

    return (
        <section className="min-h-screen pt-32 pb-24 md:pb-40 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-950/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-[1300px] mx-auto px-6 md:px-10 space-y-24 md:space-y-32 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-8 md:space-y-12 reveal">
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-4">
                            <span className="h-[1px] w-12 bg-red-500/30" />
                            <span className="text-[10px] md:text-[11px] font-bold text-red-500/60 tracking-widest uppercase">Free Support</span>
                            <span className="h-[1px] w-12 bg-red-500/30" />
                        </div>
                        <h1 className="font-serif-luxury text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.85]">
                            You Are Not <br />
                            <span className="italic font-light opacity-40">Alone.</span>
                        </h1>
                    </div>

                    <p className="text-zinc-500 text-lg md:text-2xl font-light leading-relaxed italic max-w-3xl mx-auto">
                        Free, confidential support for victims of online fraud, harassment, and cybercrime.
                        We're here to help you take back control.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                        <div className="flex items-center gap-3 px-6 py-3 bg-red-950/20 border border-red-900/30 rounded-full">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Confidential</span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">100% Free</span>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Expert Guidance</span>
                        </div>
                    </div>
                </div>

                {/* Emergency Resources */}
                <div className="reveal space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tight">
                            Emergency <span className="italic opacity-30">Resources</span>
                        </h2>
                        <p className="text-zinc-700 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em]">
                            Immediate Help Available
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {emergencyResources.map((resource, idx) => (
                            <div key={idx} className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-red-900/30 hover:bg-red-950/10 transition-all duration-500">
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-white text-sm font-medium leading-tight">{resource.name}</h3>
                                        <span className="text-[8px] text-zinc-700 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full">
                                            {resource.available}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-serif-luxury text-white/80 italic">{resource.contact}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Categories */}
                <div className="reveal space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tight">
                            How We Can <span className="italic opacity-30">Help</span>
                        </h2>
                        <p className="text-zinc-700 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em]">
                            Select Your Situation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supportCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                                className={`group p-10 text-left transition-all duration-700 rounded-[2.5rem] ${selectedCategory === category.id
                                    ? 'bg-white/10 border-2 border-white/20 shadow-[0_20px_60px_rgba(255,255,255,0.1)]'
                                    : 'bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div className="space-y-6">
                                    <div className="text-5xl opacity-60">{category.icon}</div>
                                    <div className="space-y-3">
                                        <h3 className="text-white text-xl font-serif-luxury tracking-tight">{category.title}</h3>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{category.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                                        {selectedCategory === category.id ? 'Hide Steps' : 'View Steps'}
                                        <span className="text-base">→</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Selected Category Details */}
                    {selectedCategoryData && (
                        <div className="animate-fade p-10 md:p-16 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[3rem]">
                            <div className="space-y-10">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="space-y-3">
                                        <h3 className="font-serif-luxury text-3xl md:text-4xl text-white tracking-tight">
                                            {selectedCategoryData.title}
                                        </h3>
                                        <p className="text-zinc-500 text-sm italic">{selectedCategoryData.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className="text-white/40 hover:text-white text-2xl transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em]">
                                        Step-by-Step Action Plan
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedCategoryData.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-6 items-start group">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 text-sm font-bold group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-zinc-400 text-base leading-relaxed pt-1">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Evidence Collection Tips */}
                <div className="reveal space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tight">
                            Preserve <span className="italic opacity-30">Evidence</span>
                        </h2>
                        <p className="text-zinc-700 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em]">
                            Critical for Legal Action
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                            <h3 className="text-white text-xl font-serif-luxury">What to Document</h3>
                            <ul className="space-y-4 text-zinc-500">
                                <li className="flex gap-3"><span className="text-green-500">✓</span> Screenshots with visible timestamps</li>
                                <li className="flex gap-3"><span className="text-green-500">✓</span> Email headers and full message content</li>
                                <li className="flex gap-3"><span className="text-green-500">✓</span> URLs and web page archives</li>
                                <li className="flex gap-3"><span className="text-green-500">✓</span> Transaction IDs and payment receipts</li>
                                <li className="flex gap-3"><span className="text-green-500">✓</span> Phone numbers and caller information</li>
                                <li className="flex gap-3"><span className="text-green-500">✓</span> Social media profiles and posts</li>
                            </ul>
                        </div>

                        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                            <h3 className="text-white text-xl font-serif-luxury">Best Practices</h3>
                            <ul className="space-y-4 text-zinc-500">
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Save everything in multiple locations</li>
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Don't edit or crop screenshots</li>
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Keep a detailed timeline of events</li>
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Note witness names and contact info</li>
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Back up evidence to cloud storage</li>
                                <li className="flex gap-3"><span className="text-blue-500">→</span> Print physical copies when possible</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Free Consultation Form */}
                <div className="reveal">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="font-serif-luxury text-3xl md:text-5xl text-white tracking-tight">
                                    Request Free <span className="italic opacity-30">Support</span>
                                </h2>
                                <p className="text-zinc-600 text-base leading-relaxed">
                                    Our team will review your case and provide guidance on next steps. All consultations are completely free and confidential.
                                </p>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="space-y-2">
                                    <h4 className="text-white text-sm font-bold">What Happens Next?</h4>
                                    <ul className="space-y-3 text-zinc-600 text-sm">
                                        <li className="flex gap-3"><span className="text-white/40">1.</span> Submit your request below</li>
                                        <li className="flex gap-3"><span className="text-white/40">2.</span> Our team reviews within 24-48 hours</li>
                                        <li className="flex gap-3"><span className="text-white/40">3.</span> We provide initial guidance via email</li>
                                        <li className="flex gap-3"><span className="text-white/40">4.</span> Schedule a consultation if needed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-[#050505]/95 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 overflow-hidden">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLScERncz8_fwu_tKBhO31ZY5Fm0ovqg9f5Q9yU4yP30cnsOYbQ/viewform?embedded=true"
                                width="100%"
                                height="1447"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                className="w-full"
                                title="Victim Support Request Form"
                            >
                                Loading…
                            </iframe>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="reveal text-center space-y-8 pt-16 border-t border-white/5">
                    <h3 className="font-serif-luxury text-2xl md:text-3xl text-white tracking-tight">
                        Additional <span className="italic opacity-30">Resources</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                            National Cybercrime Portal
                        </a>
                        <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                            FBI IC3 (International)
                        </a>
                        <a href="mailto:support@meridin.co.in" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                            Email Support Team
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
