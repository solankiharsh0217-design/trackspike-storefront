import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types';

// Mock data - Replace with API call
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Black', hex: '#1C1917' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gold', hex: '#CA8A04' },
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Gray', hex: '#6B7280' },
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Forest', hex: '#228B22' },
      { name: 'Earth', hex: '#8B4513' },
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
    images: ['/images/placeholder-shoe.jpg'],
    colors: [
      { name: 'Red', hex: '#DC2626' },
      { name: 'Black', hex: '#1C1917' },
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
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
              Featured Products
            </h2>
            <p className="text-secondary mt-2">
              Our most popular styles, chosen by athletes like you.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors duration-200"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors duration-200"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
