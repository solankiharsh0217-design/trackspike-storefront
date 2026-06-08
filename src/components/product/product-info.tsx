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
      {/* Brand & Category */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-accent font-semibold uppercase tracking-wider">
          {product.brand}
        </span>
        <span className="w-1 h-1 bg-border rounded-full" />
        <span className="text-sm text-secondary capitalize">
          {product.category}
        </span>
      </div>

      {/* Name */}
      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < 4 ? 'fill-accent text-accent' : 'fill-border text-border'
              )}
            />
          ))}
        </div>
        <span className="text-sm text-secondary">4.0 out of 5</span>
        <span className="text-sm text-secondary/50">128 reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span
          className={cn(
            'text-3xl sm:text-4xl font-bold tracking-tight',
            hasDiscount ? 'text-accent' : 'text-primary'
          )}
        >
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-secondary/40 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
            <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-secondary leading-relaxed text-base">
        {product.description}
      </p>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-heading font-semibold text-primary text-base">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-secondary p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="flex flex-col items-center text-center p-3">
          <Truck className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary font-medium">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <Shield className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary font-medium">2 Year Warranty</span>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <RotateCcw className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary font-medium">30-Day Returns</span>
        </div>
      </div>
    </div>
  );
}
