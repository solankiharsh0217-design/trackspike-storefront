'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const num = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-[#0e0e0e] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/25 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <span className="text-[10px] font-bold text-accent/50 tracking-[0.25em]">{num}</span>
        <button
          className="text-white/15 hover:text-accent/70 transition-colors duration-200"
          onClick={(e) => e.preventDefault()}
          aria-label="Wishlist"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image area */}
      <div className="relative mx-4 rounded-xl overflow-hidden bg-[#151515] aspect-[4/3]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-5 group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-accent text-black text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">
            −{discountPercent}%
          </div>
        )}

        {/* Quick add — slides in on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-gold"
            onClick={(e) => e.preventDefault()}
            aria-label="Quick add"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-5">
        <p className="text-white/20 text-[9px] font-semibold uppercase tracking-[0.25em] mb-2">
          {product.brand}
        </p>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading font-bold text-white text-[15px] leading-snug group-hover:text-accent/90 transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex-shrink-0 text-right">
            <p className={cn('font-bold text-[15px]', hasDiscount ? 'text-accent' : 'text-white')}>
              {formatPrice(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-white/20 text-[10px] line-through mt-0.5">{formatPrice(product.comparePrice!)}</p>
            )}
          </div>
        </div>

        {/* Rating + colors */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-2.5 h-2.5', i < 4 ? 'fill-accent text-accent' : 'fill-white/10 text-white/10')}
              />
            ))}
            <span className="text-white/20 text-[9px] ml-1.5">(4.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color.name}
                className="w-3 h-3 rounded-full border border-white/10"
                style={{ backgroundColor: color.hex === '#FFFFFF' ? '#e5e5e5' : color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-white/20 text-[9px]">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
