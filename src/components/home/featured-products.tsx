'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Sprint Pro',
    slug: 'air-sprint-pro',
    description: 'Lightweight running shoe with responsive cushioning for speed training.',
    price: 149.99,
    comparePrice: 179.99,
    sku: 'TSP-001',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/shoe-black.svg'],
    colors: [
      { name: 'Black', hex: '#1C1917', images: ['/images/shoe-black.svg'] },
      { name: 'White', hex: '#FFFFFF', images: ['/images/shoe-white.svg'] },
      { name: 'Gold', hex: '#CA8A04', images: ['/images/shoe-gold.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Urban Stride',
    slug: 'urban-stride',
    description: 'Casual everyday sneaker with premium materials and comfort.',
    price: 129.99,
    sku: 'TSP-002',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/shoe-white.svg'],
    colors: [
      { name: 'Navy', hex: '#1E3A5F', images: ['/images/shoe-white.svg'] },
      { name: 'Gray', hex: '#6B7280', images: ['/images/shoe-white.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Trail Blazer X',
    slug: 'trail-blazer-x',
    description: 'Rugged trail running shoe with superior grip and protection.',
    price: 169.99,
    comparePrice: 199.99,
    sku: 'TSP-003',
    brand: 'TrackSpike',
    category: 'trail',
    images: ['/images/shoe-gold.svg'],
    colors: [
      { name: 'Forest', hex: '#228B22', images: ['/images/shoe-gold.svg'] },
      { name: 'Earth', hex: '#8B4513', images: ['/images/shoe-gold.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Speed Elite',
    slug: 'speed-elite',
    description: 'Competition-level racing flat for serious athletes.',
    price: 199.99,
    sku: 'TSP-004',
    brand: 'TrackSpike',
    category: 'running',
    images: ['/images/shoe-black.svg'],
    colors: [
      { name: 'Red', hex: '#DC2626', images: ['/images/shoe-black.svg'] },
      { name: 'Black', hex: '#1C1917', images: ['/images/shoe-black.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 sm:py-32 bg-[#f8f7f5] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] font-bold text-secondary/50 tracking-[0.3em] uppercase mb-3">
              ✦ Featured Collection
            </p>
            <h2 className="font-heading font-black text-[clamp(2.5rem,5vw,4rem)] text-primary tracking-[-0.03em] leading-[0.95]">
              Trending<br />Now
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-secondary/60 hover:text-primary transition-colors duration-300 group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {mockProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary/60 hover:text-primary transition-colors duration-300 group"
          >
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
