'use client';

import { useState, useEffect } from 'react';
import { ProductsGrid } from '@/components/product/products-grid';
import { fetchCategories } from '@/lib/products';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Alphabetical' },
];

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState('featured');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60">
            The Collection
          </p>
          <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
            All Kicks
          </h1>
          <p className="mt-5 max-w-md text-sm text-white/35">
            Every silhouette we make, engineered for speed and built to turn heads.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 border-b border-white/[0.04] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory(undefined)}
              className={cn(
                'rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300',
                !activeCategory
                  ? 'bg-accent text-black shadow-[0_4px_20px_-4px_rgba(212,165,32,0.5)]'
                  : 'border border-white/10 text-white/40 hover:border-white/25 hover:text-white/60'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-accent text-black shadow-[0_4px_20px_-4px_rgba(212,165,32,0.5)]'
                    : 'border border-white/10 text-white/40 hover:border-white/25 hover:text-white/60'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-white/30">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer rounded-full border border-white/10 bg-transparent px-4 py-2 text-[11px] font-semibold text-white/60 focus:border-accent focus:outline-none"
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
