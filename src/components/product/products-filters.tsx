'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface ProductsFiltersProps {
  categories: FilterOption[];
  brands: FilterOption[];
  selectedCategory?: string;
  selectedBrand?: string;
  onCategoryChange?: (category: string | undefined) => void;
  onBrandChange?: (brand: string | undefined) => void;
}

export function ProductsFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: ProductsFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between p-4 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-medium text-primary">Category</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.category && (
          <div className="p-4 pt-0 space-y-2">
            <button
              onClick={() => onCategoryChange?.(undefined)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                !selectedCategory
                  ? 'bg-accent/10 text-accent'
                  : 'text-secondary hover:bg-background'
              )}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange?.(category.id)}
                className={cn(
                  'flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                  selectedCategory === category.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:bg-background'
                )}
              >
                <span>{category.name}</span>
                {category.count && (
                  <span className="text-xs text-secondary/60">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between p-4 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-medium text-primary">Brand</span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.brand && (
          <div className="p-4 pt-0 space-y-2">
            <button
              onClick={() => onBrandChange?.(undefined)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                !selectedBrand
                  ? 'bg-accent/10 text-accent'
                  : 'text-secondary hover:bg-background'
              )}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onBrandChange?.(brand.id)}
                className={cn(
                  'flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                  selectedBrand === brand.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:bg-background'
                )}
              >
                <span>{brand.name}</span>
                {brand.count && (
                  <span className="text-xs text-secondary/60">({brand.count})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-medium text-primary">Price Range</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.price && (
          <div className="p-4 pt-0">
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
              <span className="text-secondary">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
