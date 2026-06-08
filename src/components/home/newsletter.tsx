'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-hover to-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and insider updates.
            Join 50,000+ athletes who never miss a beat.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <p className="font-heading font-semibold text-lg">Thanks for subscribing!</p>
              <p className="text-white/80 mt-1">Check your inbox for a welcome gift.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors duration-200"
              />
              <Button type="submit" size="lg" className="whitespace-nowrap">
                Subscribe
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          <p className="text-white/50 text-sm mt-6">
            No spam, unsubscribe anytime. Read our{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
