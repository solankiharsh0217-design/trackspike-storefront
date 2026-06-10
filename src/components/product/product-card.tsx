'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80';

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

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
      className="group block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0e0e0e] transition-all duration-500 hover:border-accent/20 hover:shadow-[0_32px_80px_-20px_rgba(212,165,32,0.12)]">
        {/* Image container - fixed aspect ratio */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#161616]">
          {!imgError ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => {
                setImgSrc(FALLBACK_IMAGE);
                setImgError(true);
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-heading text-4xl font-black text-white/10">{product.brand[0]}</span>
            </div>
          )}
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top badges */}
          <div className="absolute left-0 right-0 top-0 flex items-start justify-between p-4">
            <div className="flex flex-col gap-2">
              {hasDiscount && (
                <span className="w-fit rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  −{discountPercent}%
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Add to wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/50 backdrop-blur-md transition-all duration-300 hover:text-accent"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={quickAdd}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-xs font-bold uppercase tracking-wider text-black transition-all duration-500",
                isHovered 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-3 opacity-0"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/50">
              {product.brand}
            </p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-[10px] text-white/40">4.9</span>
            </div>
          </div>

          <h3 className="mb-3 flex-1 font-heading text-sm font-bold leading-tight text-white/80 transition-colors duration-300 group-hover:text-accent line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className={cn('font-heading text-lg font-black', hasDiscount ? 'text-accent' : 'text-white')}>
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-[11px] text-white/25 line-through">
                  {formatPrice(product.comparePrice!)}
                </p>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-white/20">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
