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
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between p-5 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-heading font-semibold text-primary text-sm">Category</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.category && (
          <div className="px-5 pb-5 space-y-1">
            <button
              onClick={() => onCategoryChange?.(undefined)}
              className={cn(
                'block w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
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
                  'flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
                  selectedCategory === category.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:bg-background'
                )}
              >
                <span>{category.name}</span>
                {category.count && (
                  <span className="text-xs text-secondary/50">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between p-5 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-heading font-semibold text-primary text-sm">Brand</span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.brand && (
          <div className="px-5 pb-5 space-y-1">
            <button
              onClick={() => onBrandChange?.(undefined)}
              className={cn(
                'block w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
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
                  'flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
                  selectedBrand === brand.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-secondary hover:bg-background'
                )}
              >
                <span>{brand.name}</span>
                {brand.count && (
                  <span className="text-xs text-secondary/50">({brand.count})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-5 bg-surface hover:bg-background transition-colors duration-200"
        >
          <span className="font-heading font-semibold text-primary text-sm">Price Range</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-secondary" />
          )}
        </button>
        {openSections.price && (
          <div className="px-5 pb-5">
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <span className="text-secondary">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
