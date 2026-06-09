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
    <section className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
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

      {/* Navbar height spacer — keeps content below the fixed navbar */}
      <div className="h-20 flex-shrink-0" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left — text */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-accent" />
                <p className="text-accent/70 font-medium text-[11px] tracking-[0.3em] uppercase">
                  New Collection 2026
                </p>
              </div>

              {/* Headline — no animation so it's always visible */}
              <div className="space-y-1">
                <h1 className="font-heading font-black text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.03em] text-white">
                  RUN
                </h1>
                <h1 className="font-heading font-black text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.03em] text-white">
                  YOUR
                </h1>
                <h1 className="font-heading font-black text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.03em] gradient-text">
                  OWN RACE
                </h1>
              </div>

              {/* Body */}
              <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm">
                Premium athletic footwear engineered for those who push limits and break records.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-5">
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

              {/* Stats — hardcoded, no dynamic Tailwind classes */}
              <div className="flex items-center pt-2">
                <div className="pr-8">
                  <p className="font-heading font-bold text-2xl sm:text-3xl text-white">50K+</p>
                  <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">Athletes</p>
                </div>
                <div className="w-px h-10 bg-white/10 flex-shrink-0" />
                <div className="px-8">
                  <p className="font-heading font-bold text-2xl sm:text-3xl text-white">100+</p>
                  <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">Products</p>
                </div>
                <div className="w-px h-10 bg-white/10 flex-shrink-0" />
                <div className="pl-8">
                  <p className="font-heading font-bold text-2xl sm:text-3xl text-white">4.9★</p>
                  <p className="text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">Rating</p>
                </div>
              </div>
            </div>

            {/* Right — shoe */}
            <div className="relative flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[440px] h-[440px] rounded-full border border-white/[0.04]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[340px] h-[340px] rounded-full border border-accent/[0.08]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[240px] h-[240px] rounded-full bg-accent/[0.05] blur-2xl" />
              </div>

              {/* Shoe image — float animation is fine, it doesn't affect opacity */}
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
              <div className="absolute top-4 right-0 lg:-right-4 glass-dark px-4 py-3 rounded-2xl border border-white/[0.08]">
                <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-1">Featured</p>
                <p className="text-white font-bold text-sm">Air Sprint Pro</p>
                <p className="text-accent font-bold text-sm">$149.99</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div className="relative z-10 border-t border-white/[0.06] py-4 overflow-hidden flex-shrink-0">
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
