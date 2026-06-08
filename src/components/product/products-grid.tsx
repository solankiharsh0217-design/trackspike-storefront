'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
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
  {
    id: '5',
    name: 'Comfort Walk',
    slug: 'comfort-walk',
    description: 'All-day comfort for walking and light activity.',
    price: 99.99,
    sku: 'TSP-005',
    brand: 'TrackSpike',
    category: 'casual',
    images: ['/images/shoe-white.svg'],
    colors: [
      { name: 'Beige', hex: '#D4C5A9', images: ['/images/shoe-white.svg'] },
      { name: 'White', hex: '#FFFFFF', images: ['/images/shoe-white.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: ['Cushioned', 'Lightweight', 'Breathable'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Mountain Peak',
    slug: 'mountain-peak',
    description: 'Technical hiking shoe for challenging trails.',
    price: 179.99,
    sku: 'TSP-006',
    brand: 'TrackSpike',
    category: 'trail',
    images: ['/images/shoe-gold.svg'],
    colors: [
      { name: 'Orange', hex: '#F97316', images: ['/images/shoe-gold.svg'] },
      { name: 'Black', hex: '#1C1917', images: ['/images/shoe-gold.svg'] },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    features: ['Waterproof', 'Ankle Support', 'Grip'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface ProductsGridProps {
  category?: string;
  brand?: string;
  search?: string;
}

export function ProductsGrid({ category, brand, search }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = mockProducts;

      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (brand) {
        filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
      }
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }

      setProducts(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, brand, search]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-secondary text-xl font-heading font-semibold">No products found.</p>
        <p className="text-secondary/60 mt-2">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
