'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-surface rounded-2xl border border-border overflow-hidden hover-lift"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="accent" className="text-xs font-bold shadow-gold">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-200"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-200"
            aria-label="Quick add to cart"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-3 h-3',
                i < 4 ? 'fill-accent text-accent' : 'fill-border text-border'
              )}
            />
          ))}
          <span className="text-xs text-secondary/60 ml-1">(4.0)</span>
        </div>

        <p className="text-xs text-secondary/50 uppercase tracking-wider mb-1 font-medium">
          {product.brand}
        </p>
        <h3 className="font-heading font-semibold text-primary group-hover:text-accent transition-colors duration-200 line-clamp-1 text-base">
          {product.name}
        </h3>
        <p className="text-sm text-secondary/70 mt-1.5 line-clamp-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span
            className={cn(
              'font-bold text-lg',
              hasDiscount ? 'text-accent' : 'text-primary'
            )}
          >
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-secondary/40 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 mt-3">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-all duration-200',
                color.hex === '#FFFFFF' ? 'border-gray-200' : 'border-transparent'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-secondary/50 font-medium">
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
