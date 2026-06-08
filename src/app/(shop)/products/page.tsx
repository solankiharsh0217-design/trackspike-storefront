'use client';

import { Metadata } from 'next';
import { ProductsGrid } from '@/components/product/products-grid';
import { ProductsFilters } from '@/components/product/products-filters';

const categories = [
  { id: 'running', name: 'Running', count: 12 },
  { id: 'casual', name: 'Casual', count: 8 },
  { id: 'trail', name: 'Trail', count: 6 },
];

const brands = [
  { id: 'trackspike', name: 'TrackSpike', count: 20 },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">
          Collection
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary tracking-tight">
          All Products
        </h1>
        <p className="text-secondary mt-3 text-lg">
          Find your perfect pair from our complete collection.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductsFilters
            categories={categories}
            brands={brands}
          />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <ProductsGrid />
        </main>
      </div>
    </div>
  );
}
