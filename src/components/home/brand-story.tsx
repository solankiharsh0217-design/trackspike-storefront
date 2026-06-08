'use client';

import { Check, Award, Leaf, Truck, Shield } from 'lucide-react';

const features = [
  { icon: Award, text: 'Premium materials sourced globally' },
  { icon: Shield, text: '30-day comfort guarantee' },
  { icon: Truck, text: 'Free shipping on orders over $100' },
  { icon: Leaf, text: 'Sustainable manufacturing' },
];

export function BrandStory() {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative animate-fade-in-left">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
              {/* Abstract pattern inside */}
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-5xl font-heading font-bold gradient-text">TS</span>
                  </div>
                  <p className="text-white/40 text-sm font-medium tracking-widest uppercase">Est. 2024</p>
                </div>
              </div>
              {/* Gold accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 glass-dark px-6 py-4 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-3xl font-bold gradient-text">100%</p>
              <p className="text-white/60 text-sm">Customer Satisfaction</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in-right">
            <div>
              <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-tight">
                Crafted for Athletes,{' '}
                <span className="gradient-text">by Athletes</span>
              </h2>
            </div>

            <p className="text-secondary text-lg leading-relaxed">
              Founded in 2024, TrackSpike was born from a simple idea: create footwear that
              keeps up with your ambition. Every shoe we make is designed to help you push
              your limits and achieve your personal best.
            </p>

            <p className="text-secondary leading-relaxed">
              We combine cutting-edge technology with timeless design to deliver shoes that
              perform as good as they look. From the track to the street, TrackSpike is
              your trusted partner.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature.text}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border hover:border-accent/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-primary font-medium text-sm leading-relaxed pt-2">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
