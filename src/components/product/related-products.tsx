'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';

// Mock data - Replace with API call
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Gray', hex: '#6B7280' },
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Forest', hex: '#228B22' },
      { name: 'Earth', hex: '#8B4513' },
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Red', hex: '#DC2626' },
      { name: 'Black', hex: '#1C1917' },
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
      <h2 className="font-heading text-2xl font-bold text-primary mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
