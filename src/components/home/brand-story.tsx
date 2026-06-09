'use client';

import { Award, Leaf, Truck, Shield } from 'lucide-react';

const stats = [
  { value: '50K+', label: 'Athletes worldwide' },
  { value: '100+', label: 'Products crafted' },
  { value: '4.9', label: 'Average rating' },
  { value: '2024', label: 'Year founded' },
];

const features = [
  { icon: Award, text: 'Premium materials sourced globally' },
  { icon: Shield, text: '30-day comfort guarantee' },
  { icon: Truck, text: 'Free shipping on orders over $100' },
  { icon: Leaf, text: 'Sustainable manufacturing' },
];

export function BrandStory() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-0">

          {/* Left: Stats column — dark background */}
          <div className="lg:col-span-4 bg-[#0a0a0a] py-20 lg:py-28 px-8 lg:px-12 relative">
            {/* Gold accent line top */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-accent/60 to-transparent" />

            <p className="text-[10px] font-bold text-accent/60 tracking-[0.3em] uppercase mb-12">
              By the numbers
            </p>

            <div className="space-y-0">
              {stats.map((stat, i) => (
                <div key={stat.label}>
                  <div className="py-8">
                    <p className="font-heading font-black text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.03em] text-white">
                      {stat.value}
                    </p>
                    <p className="text-white/30 text-xs uppercase tracking-[0.2em] mt-2">{stat.label}</p>
                  </div>
                  {i < stats.length - 1 && <div className="h-px bg-white/[0.06]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-8 py-20 lg:py-28 px-0 lg:px-16 xl:px-20">
            <p className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-5">
              Our Story
            </p>
            <h2 className="font-heading font-black text-[clamp(2rem,4vw,3.5rem)] text-primary tracking-[-0.03em] leading-[1] mb-8">
              Crafted for Athletes,{' '}
              <span className="gradient-text">by Athletes</span>
            </h2>

            <div className="space-y-5 text-secondary leading-relaxed mb-12 max-w-xl">
              <p>
                Founded in 2024, TrackSpike was born from a simple idea: create footwear that keeps up with your ambition. Every shoe we make is designed to help you push your limits and achieve your personal best.
              </p>
              <p>
                We combine cutting-edge technology with timeless design to deliver shoes that perform as good as they look. From the track to the street, TrackSpike is your trusted partner.
              </p>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-accent/8 rounded-lg flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                    <feature.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-primary text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
