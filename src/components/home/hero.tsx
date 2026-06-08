'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ticker = [
  'Free Shipping Over $100',
  'New Collection 2026',
  '30-Day Returns',
  'Carbon-Neutral Shipping',
  'Premium Athletic Footwear',
  'Engineered for Performance',
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden -mt-20">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-accent/[0.06] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,165,32,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,32,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">

            {/* Text — 7 cols */}
            <div className="lg:col-span-7 space-y-8">
              {/* Eyebrow label */}
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="w-10 h-px bg-accent" />
                <p className="text-accent/70 font-medium text-[11px] tracking-[0.3em] uppercase">
                  New Collection 2026
                </p>
              </div>

              {/* Headline */}
              <div className="animate-fade-in-up space-y-1" style={{ animationDelay: '0.1s' }}>
                <h1 className="font-heading font-black text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em] text-white">
                  RUN
                </h1>
                <h1 className="font-heading font-black text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em] text-white">
                  YOUR
                </h1>
                <h1 className="font-heading font-black text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em] gradient-text">
                  OWN RACE
                </h1>
              </div>

              {/* Body */}
              <p
                className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Premium athletic footwear engineered for those who push limits and break records.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap items-center gap-5 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent-hover text-black font-bold px-10 rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300 group"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/about" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300">
                  <span className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center transition-colors duration-300">
                    <Play className="w-3 h-3 fill-white/60 ml-0.5" />
                  </span>
                  <span className="text-sm font-medium">Our Story</span>
                </Link>
              </div>

              {/* Stats */}
              <div
                className="flex items-stretch gap-0 pt-2 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                {[
                  { value: '50K+', label: 'Athletes' },
                  { value: '100+', label: 'Products' },
                  { value: '4.9★', label: 'Rating' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`${i > 0 ? 'pl-8 border-l border-white/[0.08]' : ''} ${i < 2 ? 'pr-8' : ''}`}
                  >
                    <p className="font-heading font-bold text-2xl sm:text-3xl text-white">{stat.value}</p>
                    <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shoe — 5 cols */}
            <div
              className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] lg:min-h-0 animate-fade-in-right"
              style={{ animationDelay: '0.2s' }}
            >
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[440px] h-[440px] rounded-full border border-white/[0.04]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[340px] h-[340px] rounded-full border border-accent/[0.08]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[240px] h-[240px] rounded-full bg-accent/[0.04] blur-xl" />
              </div>

              {/* Shoe image */}
              <div className="relative w-full max-w-[460px]">
                <Image
                  src="/images/hero-shoe.svg"
                  alt="TrackSpike Air Sprint Pro"
                  width={480}
                  height={480}
                  className="w-full h-auto animate-float drop-shadow-[0_40px_100px_rgba(212,165,32,0.18)]"
                  priority
                />
              </div>

              {/* Product badge */}
              <div
                className="absolute top-4 right-0 lg:-right-4 glass-dark px-4 py-3 rounded-2xl border border-white/[0.08] animate-fade-in-left"
                style={{ animationDelay: '0.7s' }}
              >
                <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-1">Featured</p>
                <p className="text-white font-bold text-sm">Air Sprint Pro</p>
                <p className="text-accent font-bold text-sm">$149.99</p>
              </div>

              {/* Section indicator */}
              <div
                className="absolute bottom-0 left-0 hidden lg:flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-0.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-6 bg-accent' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div className="relative z-10 border-t border-white/[0.06] py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">
              {ticker.map((item) => (
                <span key={item} className="flex items-center gap-10">
                  <span className="text-[10px] font-semibold text-white/20 tracking-[0.25em] uppercase">
                    {item}
                  </span>
                  <span className="text-accent/40 text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
