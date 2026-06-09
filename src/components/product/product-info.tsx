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
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {product.brand}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="text-xs uppercase tracking-wider text-white/50">{product.category}</span>
      </div>

      {/* Name */}
      <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn('h-4 w-4', i < 5 ? 'fill-accent text-accent' : 'fill-white/10 text-white/10')}
            />
          ))}
        </div>
        <span className="text-sm text-white/50">4.9 · 128 reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className={cn('font-heading text-4xl font-black', hasDiscount ? 'text-accent' : 'text-white')}>
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-white/30 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-accent">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-white/55">{product.description}</p>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm text-white/55">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        {[
          { icon: Truck, label: 'Free Shipping' },
          { icon: Shield, label: '2-Year Warranty' },
          { icon: RotateCcw, label: '30-Day Returns' },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center p-3 text-center">
            <b.icon className="mb-2 h-6 w-6 text-accent" />
            <span className="text-xs font-medium text-white/50">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
