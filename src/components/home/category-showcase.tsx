'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';

const categories = [
  {
    name: 'Running',
    tagline: 'Chase the clock',
    description: 'Engineered for speed and endurance',
    href: '/products?category=running',
    image: '/images/lifestyle/jump-rooftop.jpg',
    num: '01',
  },
  {
    name: 'Casual',
    tagline: 'Everyday icons',
    description: 'Street-ready style, all-day comfort',
    href: '/products?category=casual',
    image: '/images/lifestyle/converse-tan.jpg',
    num: '02',
  },
  {
    name: 'Trail',
    tagline: 'Off the grid',
    description: 'Grip and protection for any terrain',
    href: '/products?category=trail',
    image: '/images/products/nb-olive.jpg',
    num: '03',
  },
];

export function CategoryShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <Reveal direction="up">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
              ✦ Find Your Fit
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
              Shop by
              <br />
              Category
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="hidden max-w-[220px] text-right text-sm leading-relaxed text-white/30 sm:block">
              Three disciplines. One obsession with going faster.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <RevealItem key={category.name}>
              <Link
                href={category.href}
                className="group relative block h-[460px] overflow-hidden rounded-2xl border border-white/[0.07] sm:h-[540px]"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />

                {/* Number */}
                <span className="absolute right-5 top-5 font-heading text-sm font-bold tracking-[0.2em] text-white/50">
                  {category.num}
                </span>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    {category.tagline}
                  </p>
                  <h3 className="mb-2 font-heading text-4xl font-black uppercase tracking-[-0.02em] text-white">
                    {category.name}
                  </h3>
                  <p className="mb-5 text-sm text-white/55">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 group-hover:gap-3">
                    Shop Now
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
