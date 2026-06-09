'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Magnetic } from '@/components/motion/magnetic';
import { CountUp } from '@/components/motion/count-up';

const ticker = [
  'New Drop SS26',
  'Free Shipping Over $100',
  'Engineered for Speed',
  '30-Day Returns',
  'Carbon-Neutral',
  'Worn by 50,000+ Athletes',
];

const EASE = [0.16, 1, 0.3, 1] as const;

const word = {
  hidden: { opacity: 0, y: '110%' },
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 },
  }),
};

export function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col bg-[#0a0a0a] text-white">
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[800px] h-[800px] bg-accent/[0.07] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,165,32,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,32,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Navbar offset */}
      <div className="h-20 flex-shrink-0" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* Left — headline */}
            <div className="lg:col-span-6 xl:col-span-5">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="flex h-7 items-center rounded-full bg-accent/10 border border-accent/20 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  New Drop · SS26
                </span>
                <span className="text-white/30 text-[10px] uppercase tracking-[0.25em]">
                  Volume 01
                </span>
              </motion.div>

              {/* Animated headline */}
              <h1 className="font-heading font-black uppercase leading-[0.82] tracking-[-0.04em] text-[clamp(3.25rem,8vw,7rem)]">
                {['Run', 'Your'].map((w, i) => (
                  <span key={w} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      custom={i}
                      variants={word}
                      initial="hidden"
                      animate="show"
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden">
                  <motion.span
                    className="block gradient-text pb-[0.1em]"
                    custom={2}
                    variants={word}
                    initial="hidden"
                    animate="show"
                  >
                    Own Race
                  </motion.span>
                </span>
              </h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                className="mt-7 max-w-md text-white/45 text-base sm:text-lg leading-relaxed"
              >
                Performance footwear built for those who move different. Engineered to break records — designed to break necks.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
                className="mt-9 flex flex-wrap items-center gap-5"
              >
                <Magnetic>
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold transition-all duration-300 hover:shadow-gold-lg"
                  >
                    Shop the Drop
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-white/30">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider">Our Story</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 flex items-center gap-8"
              >
                <Stat value={50} suffix="K+" label="Athletes" />
                <span className="h-10 w-px bg-white/10" />
                <Stat value={100} suffix="+" label="Styles" />
                <span className="h-10 w-px bg-white/10" />
                <Stat value={4.9} suffix="★" label="Rated" decimals={1} />
              </motion.div>
            </div>

            {/* Right — hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="lg:col-span-6 xl:col-span-7 relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] xl:aspect-[16/11] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/images/products/flyknit-red.jpg"
                  alt="TrackSpike Velocity — signature racing flyknit"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 55vw"
                  className="object-cover"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

                {/* Floating spec tag */}
                <div className="absolute top-5 left-5 glass-dark rounded-2xl px-4 py-3 border border-white/15">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">Featured</p>
                  <p className="text-sm font-bold">Velocity Racer</p>
                </div>

                {/* Price chip */}
                <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-full bg-accent px-5 py-2.5 text-black shadow-gold">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">From</span>
                  <span className="font-heading font-black text-lg">$149</span>
                </div>
              </div>

              {/* Big outlined index */}
              <span className="pointer-events-none absolute -bottom-8 -left-4 font-heading font-black text-[7rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]">
                01
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t border-white/[0.06] py-4 overflow-hidden flex-shrink-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center">
              {ticker.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-8 text-[11px] font-bold uppercase tracking-[0.25em] text-white/25">
                    {item}
                  </span>
                  <span className="text-accent/40">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  return (
    <div>
      <CountUp
        value={value}
        suffix={suffix}
        decimals={decimals}
        className="font-heading font-black text-2xl sm:text-3xl text-white"
      />
      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">{label}</p>
    </div>
  );
}
