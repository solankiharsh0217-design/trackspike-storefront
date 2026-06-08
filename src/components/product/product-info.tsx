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
        <span className="text-sm text-secondary uppercase tracking-wide">
          {product.brand}
        </span>
        <span className="text-secondary">•</span>
        <span className="text-sm text-secondary capitalize">
          {product.category}
        </span>
      </div>

      {/* Name */}
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-5 h-5',
                i < 4 ? 'fill-accent text-accent' : 'fill-border text-border'
              )}
            />
          ))}
        </div>
        <span className="text-sm text-secondary">(4.0) • 128 reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className={cn(
          'text-3xl font-bold',
          hasDiscount ? 'text-accent' : 'text-primary'
        )}>
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-secondary/60 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
            <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-secondary leading-relaxed">
        {product.description}
      </p>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-primary">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-secondary">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="flex flex-col items-center text-center">
          <Truck className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Shield className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary">2 Year Warranty</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <RotateCcw className="w-6 h-6 text-accent mb-2" />
          <span className="text-xs text-secondary">30-Day Returns</span>
        </div>
      </div>
    </div>
  );
}
