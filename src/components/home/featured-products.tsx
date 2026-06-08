'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
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
    features: ['Lightweight', 'Responsive', 'Breathable'],
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
    features: ['Comfortable', 'Stylish', 'Durable'],
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
    features: ['Waterproof', 'Grip', 'Protection'],
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
    features: ['Carbon Plate', 'Responsive', 'Lightweight'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function FeaturedProducts() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mockProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
              Featured Collection
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-primary tracking-tight">
              Trending Now
            </h2>
            <p className="text-secondary mt-4 text-lg">
              Our most popular styles, chosen by athletes like you.
            </p>
          </div>

          {/* Navigation arrows - desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                setCurrent((prev) => (prev - 1 + mockProducts.length) % mockProducts.length);
                setIsAutoPlaying(false);
              }}
              className="w-12 h-12 rounded-full border border-border hover:border-accent hover:bg-accent/5 flex items-center justify-center transition-all duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5 text-secondary" />
            </button>
            <button
              onClick={() => {
                setCurrent((prev) => (prev + 1) % mockProducts.length);
                setIsAutoPlaying(false);
              }}
              className="w-12 h-12 rounded-full border border-border hover:border-accent hover:bg-accent/5 flex items-center justify-center transition-all duration-300"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {mockProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 text-center">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="group border-border hover:border-accent hover:bg-accent/5 px-10 py-4 rounded-full transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
