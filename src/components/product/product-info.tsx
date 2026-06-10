'use client';

import { Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Brand & category */}
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          {product.brand}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-white/30">{product.category}</span>
      </div>

      {/* Name */}
      <h1 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn('h-4 w-4', i < 5 ? 'fill-accent text-accent' : 'fill-white/10 text-white/10')}
            />
          ))}
        </div>
        <span className="text-sm text-white/40">4.9 · 128 reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className={cn('font-heading text-4xl font-black', hasDiscount ? 'text-accent' : 'text-white')}>
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-white/25 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/45">{product.description}</p>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-white/50">
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'Over $100' },
          { icon: Shield, label: '2-Year Warranty', sub: 'Full coverage' },
          { icon: RotateCcw, label: '30-Day Returns', sub: 'Easy & free' },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 text-center">
            <b.icon className="mb-2 h-5 w-5 text-accent" />
            <span className="text-[10px] font-bold text-white/60">{b.label}</span>
            <span className="text-[9px] text-white/25">{b.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
