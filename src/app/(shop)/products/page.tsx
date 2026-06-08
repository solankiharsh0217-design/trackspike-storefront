import { Metadata } from 'next';
import { ProductsGrid } from '@/components/product/products-grid';
import { ProductsFilters } from '@/components/product/products-filters';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our collection of premium athletic footwear.',
};

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
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary">
          All Products
        </h1>
        <p className="text-secondary mt-2">
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
