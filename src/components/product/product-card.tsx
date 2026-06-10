'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Fallback images for error states
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;
  const num = String(index + 1).padStart(2, '0');
  const isNew = index % 4 === 1;

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    const color = product.colors[0];
    addItem({
      productId: product.id,
      variantId: `${product.id}-${color?.name ?? 'default'}-9`,
      name: product.name,
      price: product.price,
      image: imgSrc,
      color: color?.name ?? 'Default',
      size: '9',
      quantity: 1,
      stock: 10,
    });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0e0e] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#161616]">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        {/* Top row badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="flex flex-col gap-1.5">
            {hasDiscount && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black">
                −{discountPercent}%
              </span>
            )}
            {isNew && !hasDiscount && (
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black">
                New
              </span>
            )}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-md transition-colors duration-200 hover:text-accent"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Index watermark */}
        <span className="absolute bottom-3 left-4 font-heading text-xs font-bold tracking-[0.2em] text-white/40">
          {num}
        </span>

        {/* Quick add */}
        <button
          onClick={quickAdd}
          className="absolute bottom-3 right-3 flex translate-y-3 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black opacity-0 shadow-gold transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25">
            {product.brand}
          </p>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-[10px] font-semibold text-white/40">4.9</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <h3 className="font-heading text-base font-bold leading-tight text-white transition-colors duration-300 group-hover:text-accent line-clamp-2">
            {product.name}
          </h3>
          <div className="flex-shrink-0 text-right">
            <p className={cn('font-heading font-black', hasDiscount ? 'text-accent' : 'text-white')}>
              {formatPrice(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-[10px] text-white/25 line-through">
                {formatPrice(product.comparePrice!)}
              </p>
            )}
          </div>
        </div>

        {/* Colors */}
        <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-4">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              className="h-3.5 w-3.5 rounded-full border border-white/15"
              style={{ backgroundColor: color.hex === '#FFFFFF' ? '#e5e5e5' : color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-white/30">+{product.colors.length - 4}</span>
          )}
          <span className="ml-auto text-[10px] uppercase tracking-wider text-white/30">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
