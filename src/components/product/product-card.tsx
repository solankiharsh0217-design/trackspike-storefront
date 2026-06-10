'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star, ShoppingBag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;
  const num = String(index + 1).padStart(2, '0');

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-accent/20 hover:shadow-[0_32px_80px_-20px_rgba(212,165,32,0.15)]">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <div className="flex flex-col gap-2">
              {hasDiscount && (
                <span className="w-fit rounded-full bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black shadow-lg">
                  −{discountPercent}% OFF
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Add to wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:text-accent"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* Index watermark */}
          <span className="absolute bottom-4 left-4 font-heading text-[10px] font-bold tracking-[0.3em] text-white/20">
            {num}
          </span>

          {/* Quick add button */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <button
              onClick={quickAdd}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-500",
                isHovered 
                  ? "translate-y-0 opacity-100 shadow-[0_8px_30px_-5px_rgba(212,165,32,0.5)]" 
                  : "translate-y-4 opacity-0"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent/60">
              {product.brand}
            </p>
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-[10px] font-semibold text-white/50">4.9</span>
            </div>
          </div>

          <h3 className="mb-3 font-heading text-sm font-bold leading-tight text-white/90 transition-colors duration-300 group-hover:text-accent line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <p className={cn('font-heading text-lg font-black', hasDiscount ? 'text-accent' : 'text-white')}>
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-xs text-white/30 line-through">
                  {formatPrice(product.comparePrice!)}
                </p>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-white/25">
              {product.category}
            </span>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mt-4 flex items-center gap-2 border-t border-white/[0.04] pt-4">
              <div className="flex -space-x-1">
                {product.colors.slice(0, 4).map((color) => (
                  <span
                    key={color.name}
                    className="h-4 w-4 rounded-full border-2 border-[#0e0e0e]"
                    style={{ backgroundColor: color.hex === '#FFFFFF' ? '#e5e5e5' : color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              {product.colors.length > 4 && (
                <span className="text-[10px] text-white/30">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
