'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,165,32,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,32,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent/30 rounded-full animate-pulse-gold" />
        <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse-gold" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-accent/25 rounded-full animate-pulse-gold" style={{ animationDelay: '-2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm font-medium text-white/80 animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              New Collection 2026
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            {/* Heading */}
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
                Run Your
              </h1>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
                <span className="gradient-text">Own Race</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/60 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Premium athletic footwear engineered for performance. Built for those who
              push boundaries and break records.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/products">
                <Button size="lg" className="group bg-accent hover:bg-accent-hover text-black font-semibold px-8 py-4 text-base rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="lg"
                  className="group text-white/80 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 px-8 py-4 text-base rounded-full transition-all duration-300"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Our Story
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <p className="text-3xl sm:text-4xl font-bold gradient-text">50K+</p>
                <p className="text-white/40 text-sm mt-1 font-medium">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold gradient-text">100+</p>
                <p className="text-white/40 text-sm mt-1 font-medium">Products</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold gradient-text">4.9</p>
                <p className="text-white/40 text-sm mt-1 font-medium">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            {/* Glow behind shoe */}
            <div className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[80px]" />

            {/* Shoe image */}
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-shoe.svg"
                alt="TrackSpike Premium Athletic Shoe"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-2xl animate-float"
                priority
              />
            </div>

            {/* Floating badges */}
            <div className="absolute top-10 right-0 glass-dark px-4 py-3 rounded-2xl animate-fade-in-left" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">TS</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Air Sprint Pro</p>
                  <p className="text-white/50 text-xs">$149.99</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-0 glass-dark px-4 py-3 rounded-2xl animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#111] bg-gradient-to-br from-accent/40 to-accent/20"
                    />
                  ))}
                </div>
                <div className="ml-2">
                  <p className="text-white font-semibold text-sm">50K+</p>
                  <p className="text-white/50 text-xs">Athletes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
