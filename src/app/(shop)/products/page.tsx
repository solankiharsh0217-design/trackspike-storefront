'use client';

import { useState } from 'react';
import { ProductsGrid } from '@/components/product/products-grid';
import { categories } from '@/lib/products';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Alphabetical' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState('featured');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header band */}
      <div className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
            ✦ The Collection
          </p>
          <h1 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
            All Kicks
          </h1>
          <p className="mt-4 max-w-md text-white/45">
            Every silhouette we make, engineered for speed and built to turn heads.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory(undefined)}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200',
                !activeCategory
                  ? 'bg-accent text-black'
                  : 'border border-white/15 text-white/60 hover:text-white'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200',
                  activeCategory === cat.id
                    ? 'bg-accent text-black'
                    : 'border border-white/15 text-white/60 hover:text-white'
                )}
              >
                {cat.name} <span className="opacity-50">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-white/40">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer rounded-full border border-white/15 bg-transparent px-4 py-2 text-xs font-semibold text-white focus:border-accent focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ProductsGrid category={activeCategory} sort={sort} />
      </div>
    </div>
  );
}
