'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';

const mockRelatedProducts: Product[] = [
  {
    id: '2',
    name: 'Urban Stride',
    slug: 'urban-stride',
    description: 'Casual everyday sneaker with premium materials.',
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
    features: ['Comfortable', 'Stylish'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Trail Blazer X',
    slug: 'trail-blazer-x',
    description: 'Rugged trail running shoe with superior grip.',
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
    features: ['Waterproof', 'Grip'],
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
    features: ['Carbon Plate', 'Responsive'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const related = mockRelatedProducts
        .filter((p) => p.id !== currentProductId)
        .slice(0, 4);
      setProducts(related);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, currentProductId]);

  if (isLoading) {
    return (
      <section className="mt-24">
        <h2 className="font-heading text-2xl font-bold text-primary mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="mb-8">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">
          Related
        </p>
        <h2 className="font-heading text-3xl font-bold text-primary">
          You May Also Like
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
