'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { fetchProducts } from '@/lib/products';
import type { Product } from '@/types';

interface ProductsGridProps {
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;
}

export function ProductsGrid({ category, brand, search, sort }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    fetchProducts({ category, brand, search, limit: 100 })
      .then(({ products: fetchedProducts }) => {
        let sorted = [...fetchedProducts];
        
        switch (sort) {
          case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }
        
        setProducts(sorted);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [category, brand, search, sort]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-xl font-bold text-white">No products found.</p>
        <p className="mt-2 text-white/40">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
        {products.length} {products.length === 1 ? 'style' : 'styles'}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </>
  );
}
