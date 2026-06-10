'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { fetchRelatedProducts } from '@/lib/products';
import type { Product } from '@/types';

interface RelatedProductsProps {
  slug: string;
}

export function RelatedProducts({ slug }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchRelatedProducts(slug)
      .then(setProducts)
      .catch(console.error);
  }, [slug]);

  if (products.length === 0) return null;

  return (
    <section>
      <div className="mb-10">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60">
          You May Also Like
        </p>
        <h2 className="font-heading text-2xl font-black uppercase tracking-[-0.02em] text-white">
          Related Products
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
