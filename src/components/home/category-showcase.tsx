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
    accent: 'from-[#d4a520]/20 to-[#d4a520]/5',
    hoverBorder: 'hover:border-[#d4a520]/40',
  },
  {
    name: 'Casual',
    description: 'Style meets everyday comfort',
    href: '/products?category=casual',
    image: '/images/category-casual.svg',
    accent: 'from-[#6b7280]/15 to-[#6b7280]/5',
    hoverBorder: 'hover:border-[#6b7280]/40',
  },
  {
    name: 'Trail',
    description: 'Conquer any terrain',
    href: '/products?category=trail',
    image: '/images/category-trail.svg',
    accent: 'from-[#22c55e]/15 to-[#22c55e]/5',
    hoverBorder: 'hover:border-[#22c55e]/40',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-24 sm:py-32 bg-surface relative">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            Browse
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Shop by Category
          </h2>
          <p className="text-secondary mt-4 text-lg max-w-2xl mx-auto">
            Find the perfect shoe for your activity, from daily runs to weekend adventures.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${category.accent} border border-border ${category.hoverBorder} transition-all duration-500 hover-lift animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background image */}
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/70 mb-6 text-sm">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Shop Now
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
