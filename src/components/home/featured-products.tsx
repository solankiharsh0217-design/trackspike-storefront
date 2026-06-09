'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { Reveal, RevealStagger, RevealItem } from '@/components/motion/reveal';
import { featuredProducts } from '@/lib/products';

export function FeaturedProducts() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <Reveal direction="up">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
              ✦ The Lineup
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
              Trending
              <br />
              Now
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <Link
              href="/products"
              className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 transition-colors duration-300 hover:text-accent sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Grid */}
        <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} index={index} />
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Mobile view all */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
