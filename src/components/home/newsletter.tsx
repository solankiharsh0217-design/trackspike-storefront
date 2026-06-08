'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,165,32,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,32,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm text-white/60 mb-8">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Join 50,000+ Athletes
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Stay in the{' '}
            <span className="gradient-text">Loop</span>
          </h2>

          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new arrivals, and insider updates.
            Never miss a beat.
          </p>

          {isSubmitted ? (
            <div className="glass-dark rounded-3xl p-8 max-w-md mx-auto animate-scale-in">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <p className="font-heading font-semibold text-xl text-white mb-2">
                Thanks for subscribing!
              </p>
              <p className="text-white/60">
                Check your inbox for a welcome gift.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/8 transition-all duration-300 text-base"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-accent-hover text-black font-semibold px-8 py-4 rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          <p className="text-white/30 text-sm mt-8">
            No spam, unsubscribe anytime. Read our{' '}
            <a href="/privacy" className="underline hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
