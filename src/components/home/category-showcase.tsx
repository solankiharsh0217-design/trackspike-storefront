'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    name: 'Running',
    description: 'Engineered for speed and endurance',
    href: '/products?category=running',
    image: '/images/category-running.svg',
    bg: 'from-[#1c1408] to-[#0a0a0a]',
    glow: 'from-[#d4a520]/25 via-[#d4a520]/5 to-transparent',
    hoverBorder: 'hover:border-[#d4a520]/40',
    num: '01',
  },
  {
    name: 'Casual',
    description: 'Style meets everyday comfort',
    href: '/products?category=casual',
    image: '/images/category-casual.svg',
    bg: 'from-[#141414] to-[#0a0a0a]',
    glow: 'from-[#9ca3af]/20 via-[#9ca3af]/5 to-transparent',
    hoverBorder: 'hover:border-white/20',
    num: '02',
  },
  {
    name: 'Trail',
    description: 'Conquer any terrain',
    href: '/products?category=trail',
    image: '/images/category-trail.svg',
    bg: 'from-[#0b1610] to-[#0a0a0a]',
    glow: 'from-[#22c55e]/18 via-[#22c55e]/5 to-transparent',
    hoverBorder: 'hover:border-[#22c55e]/35',
    num: '03',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-[10px] font-bold text-accent/60 tracking-[0.3em] uppercase mb-4">
              ✦ Browse
            </p>
            <h2 className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] text-white tracking-[-0.03em] leading-[0.95]">
              Shop by<br />Category
            </h2>
          </div>
          <p className="hidden sm:block text-white/20 text-sm max-w-[200px] text-right leading-relaxed">
            Find the perfect shoe for your activity
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative h-[480px] sm:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br ${category.bg} border border-white/[0.07] ${category.hoverBorder} transition-all duration-500 hover-lift animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Colored glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.glow}`} />

              {/* Section number */}
              <div className="absolute top-5 right-5 text-[10px] font-bold text-white/15 tracking-[0.2em]">
                {category.num}
              </div>

              {/* Shoe image */}
              <div className="absolute inset-0 flex items-center justify-center p-10 opacity-45 group-hover:opacity-65 transition-opacity duration-500 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-contain brightness-110 saturate-50"
                />
              </div>

              {/* Bottom overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-heading font-black text-[2rem] leading-none tracking-[-0.02em] text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/45 text-xs mb-5">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.1em] uppercase group-hover:gap-3 transition-all duration-300">
                    Shop Now
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
