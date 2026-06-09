'use client';

import { ProductCard } from './product-card';
import { getRelatedProducts } from '@/lib/products';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const products = getRelatedProducts(category, currentProductId, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-24 border-t border-white/10 pt-16">
      <div className="mb-8">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          ✦ More to Love
        </p>
        <h2 className="font-heading text-3xl font-black uppercase tracking-[-0.02em] text-white">
          You May Also Like
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
