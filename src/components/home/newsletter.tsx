'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px bg-accent/40" />
          <p className="text-[10px] font-bold text-accent/60 tracking-[0.3em] uppercase">
            Join 50,000+ Athletes
          </p>
          <div className="w-8 h-px bg-accent/40" />
        </div>

        {/* Heading */}
        <h2 className="font-heading font-black text-[clamp(2.5rem,6vw,5rem)] text-white tracking-[-0.03em] leading-[0.95] mb-6">
          Stay in the{' '}
          <span className="gradient-text">Loop</span>
        </h2>

        <p className="text-white/35 text-base sm:text-lg leading-relaxed mb-12 max-w-md mx-auto">
          Exclusive drops, early access, and insider updates — straight to your inbox.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-4 px-8 py-5 glass-dark rounded-2xl border border-white/[0.08] animate-scale-in">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-accent" />
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-white text-sm">You're in.</p>
              <p className="text-white/40 text-xs mt-0.5">Check your inbox for a welcome gift.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-6 py-4 bg-white/[0.05] border border-white/[0.08] rounded-full text-white placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all duration-300 text-sm"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-bold text-sm rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300 whitespace-nowrap group"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </form>
        )}

        <p className="text-white/20 text-xs mt-8">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
